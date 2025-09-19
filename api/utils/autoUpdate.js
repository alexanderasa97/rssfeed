const axios = require('axios');

function automaticUpdate(baseURL = 'http://44.196.30.136:3000') {
  const updateURL = `${baseURL}/update`;

  console.log(`[AUTO-UPDATE] Agendado para rodar a cada 30 segundos: ${updateURL}`);

  setInterval(async () => {
    try {
      console.log('[AUTO-UPDATE] Chamando /update automaticamente...');
      const resposta = await axios.get(updateURL);
      console.log('[AUTO-UPDATE] Sucesso:', resposta.data.message);


    } catch (erro) {
      console.error('[AUTO-UPDATE] Erro ao chamar /update:', erro.message);
    }
  }, 30 * 1000); // 30 segundos
}


function getLastUpdateTime() {
    return lastUpdateTime;
  }


  module.exports = {
    automaticUpdate,
    getLastUpdateTime
  };