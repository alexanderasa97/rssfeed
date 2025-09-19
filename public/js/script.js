async function carregarLogs() {
  const box = document.getElementById('logBox');
  
  try {
    const resposta = await fetch('/logs');
    const logs = await resposta.json();
    

    box.innerHTML = logs.map(log => `<div class="log-item">${log}</div>`).join('');
    box.scrollTop = box.scrollHeight;  
  } catch (erro) {
    console.error('Erro ao carregar logs:', erro);
    const box = document.getElementById('logBox');
    box.innerHTML = 'Erro ao carregar logs.';
  }
}


async function carregarNoticias() {
  const container = document.getElementById('cards-container');
  const telaCarregando = document.getElementById('tela-carregando');

  try {
    const resposta = await fetch('/noticias');
    const noticias = await resposta.json();

    noticias.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    container.innerHTML = '';  

    noticias.forEach(noticia => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h2>${noticia.title}</h2>
        <p><strong>Data:</strong> ${new Date(noticia.pubDate).toLocaleDateString()}</p>
        <p>${noticia.description}</p>
        <p><a href="${noticia.link}" target="_blank">Leia mais</a></p>
      `;

      container.appendChild(card);
    });

    setTimeout(() => {
      telaCarregando.style.display = 'none';
      container.classList.remove('hidden');
    }, 3100);

  } catch (erro) {
    console.error('Erro ao buscar notícias:', erro);
    telaCarregando.style.display = 'none';
    container.innerHTML = '<p>Erro ao carregar notícias.</p>';
    container.classList.remove('hidden');
  }
}


async function refreshNews() {
  refreshButton('Atualizando...', true);

  try {
    const resposta = await fetch('/update', { method: 'POST' });
    if (!resposta.ok) throw new Error('Erro ao atualizar notícias');


    await carregarNoticias();
  } catch (erro) {
    console.error(erro);
    alert('Erro ao atualizar as notícias.');
  } finally {
    refreshButton('Atualizar Notícias', false);
  }
}

setInterval(carregarLogs, 30000);  


carregarNoticias();  
carregarLogs();      