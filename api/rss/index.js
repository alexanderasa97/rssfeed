const express = require('express');
const fetchRss = require('./fetchRss');
const { uploadJsonTos3 } = require('..');

const router = express.Router();

router.get('/rss', async (req, res) => {
  try {
    const items = await fetchRss();

    await uploadJsonTos3(items);

    //return request
    res.json({
      status: 'success',
      data: items
    });
  } catch (error) {
    console.error('Detalhes do erro:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Erro ao extrair o RSS: ' + error.message
    });
  }
});

module.exports = router;