require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const { automaticUpdate } = require('./api/utils/autoUpdate');
automaticUpdate();


const { uploadJsonTos3, downloadJsonFromS3, monitoreS3 } = require('./api/index');
const fetchRss = require('./api/rss/fetchRss');

const app = express();
const PORT = process.env.PORT || 3000;



const rssRouter = require('./api/rss'); // Adiciona a API de RSS
app.use('/api', rssRouter); // Monta a rota /api/rss

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('public'));

const logs = []; 

function log(message) {
  const timestamp = new Date().toLocaleString('pt-BR');
  const entry = `[${timestamp}] ${message}`;
  logs.push(entry);
  if (logs.length > 20) logs.shift(); // Limita a quantidade de logs armazenados
}


app.get('/logs', (req, res) => {
  res.json(logs);
});


setInterval(() => {
  log('Notícias atualizadas e enviadas ao S3!');
}, 30000);

app.get('/update', async (req, res) => {
  try {
    console.log('Buscando RSS');
    const noticias = await fetchRss();
    console.log('RSS ok', noticias.length);

    // Caminho do diretório atual
    const currentDir = __dirname;

    const fileContent = JSON.stringify(noticias, null, 2);
    const fileName = 'bbc-news.json';

    // Caminho completo para o arquivo local
    const filePath = path.join(currentDir, 'bbc-news.json');
    console.log('Salvando arquivo localmente em:', filePath);

    // Salva o arquivo localmente no diretório atual
    fs.writeFileSync(filePath, fileContent);
    console.log(`Arquivo salvo localmente em: ${filePath}`);

    // Enviando para o S3
    console.log('Enviando para o S3');
    await uploadJsonTos3(fileName, fileContent);
    console.log('Arquivo enviado ao S3');


    res.json({ message: 'Notícias atualizadas, enviadas ao S3 e salvas localmente!' });
  } catch (error) {
    console.error('ERRO DETALHADO:', error);
    res.status(500).json({ message: 'Erro ao atualizar notícias!', error: error.message });
  }
});

app.get('/last-update', (req, res) => {
  const lastUpdate = getLastUpdateTime();
  if (lastUpdate) {
    res.json({ lastUpdate: lastUpdate.toISOString() });
  } else {
    res.json({ lastUpdate: null, message: 'Ainda não foi executado.' });
  }
});

// ler noticias no s3
app.get('/noticias', async (req, res) => {
  try {
    const noticias = await downloadJsonFromS3('bbc-news.json');
    res.json(noticias);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erro ao buscar noticias do S3!' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});