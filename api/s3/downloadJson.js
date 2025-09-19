// Função: Baixa o arquivo JSON do S3 e converte pra objeto JavaScript.

const {s3, bucketName} = require('./configS3');

async function downloadJsonFromS3(filename) {
    const trimmedFilename = filename.trim();

    const params = {
        Bucket: bucketName,
        Key: trimmedFilename,
      };
      
      try{
        const data = await s3.getObject(params).promise();

        if (!data.Body){
          throw new Error(`O arquivo "${trimmedFilename}" não foi encontrado no bucket "${bucketName}".`);
        }


// Deverá converter body para string

        const jsonString = data.Body.toString('utf-8');
        return JSON.parse(jsonString);
        } catch (err){
          console.error('Erro ao ler o arquivo do S3:', err);
          throw err;
        }
}

module.exports = downloadJsonFromS3