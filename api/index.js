const uploadJsonTos3 = require('./s3/uploadJson');
const downloadJsonFromS3 = require('./s3/downloadJson');
const monitoreS3 = require('./utils/verificationLog');

module.exports = {
  uploadJsonTos3,
  downloadJsonFromS3,
  monitoreS3
};