const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path')

const filePath = path.join(__dirname, 'bbc-news.json');

function monitoreS3(){
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Erro ao ler o arquivo:', err);
          return;
        }
    
        try {
          const noticias = JSON.parse(data);
          if (noticias && noticias.length > 0) {
            console.log(`O arquivo contém ${noticias.length} notícias.`);
          } else {
            console.log('O arquivo está vazio ou não contém notícias.');
          }
        } catch (e) {
          console.error('Erro ao analisar o conteúdo do arquivo:', e);
        }
      });
    }

    chokidar.watch(filePath, { persistent: true })
    .on('change', () => {
      console.log(`O arquivo ${filePath} foi atualizado.`);
      verificarConteudo();
    })
    .on('error', (error) => {
      console.error('Erro no monitoramento do arquivo:', error);
    });
  
    module.exports = monitoreS3