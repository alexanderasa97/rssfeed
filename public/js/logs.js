function carregarLogs() {
    const box = document.getElementById('logBox');
    
    if (!box) {
      console.error('Elemento logBox não encontrado!');
      return; 
    }
  
    fetch('http://44.196.30.136:3000/logs') 
      .then(res => res.json())
      .then(logs => {
        console.log('Logs recebidos:', logs);  
        box.innerHTML = logs.map(log => `<div class="log-item">${log}</div>`).join('');
        box.scrollTop = box.scrollHeight;  
      })
      .catch(error => {
        console.error('Erro ao carregar logs:', error);
        box.innerHTML = 'Erro ao carregar logs.';
      });
  }

  window.onload = () => {
    carregarLogs();
    setInterval(carregarLogs, 30000); 
  };