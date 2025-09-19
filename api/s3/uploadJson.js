const AWS = require('aws-sdk');

const s3 = new AWS.S3();

async function uploadJsonTos3(fileName, fileContent) {
  const params = {
    Bucket: 'bbc-news-bucket-sprint2e3',
    Key: fileName,
    Body: fileContent,
    ContentType: 'application/json'
  };
  
  return s3.upload(params).promise();
}

module.exports = uploadJsonTos3;
