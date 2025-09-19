const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  region: 'us-east-1' // ou a região do teu bucket
});

const bucketName = 'bbc-news-bucket-sprint2e3';
const fileName = 'bbc-news.json'.trim();

module.exports = { s3, bucketName, fileName };
