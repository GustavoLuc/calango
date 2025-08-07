// Função para controlar barra de progresso
function startProgressBar() {
  const container = document.getElementById('progress-bar-container');
  const bar = document.getElementById('progress-bar');
  const text = document.getElementById('progress-bar-text');
  const status = document.getElementById('status-message');
  container.style.display = 'flex';
  bar.style.width = '0%';
  text.style.display = 'block';
  status.style.display = 'none';
  status.textContent = '';
  let progress = 0;
  window.progressInterval = setInterval(() => {
    if (progress < 90) {
      progress += Math.random() * 5;
      bar.style.width = Math.min(progress, 90) + '%';
    }
  }, 200);
}
function finishProgressBar(success = true, message = '') {
  const bar = document.getElementById('progress-bar');
  const text = document.getElementById('progress-bar-text');
  const status = document.getElementById('status-message');
  bar.style.width = '100%';
  text.textContent = success ? 'Processando' : 'Erro!';
  setTimeout(() => {
    document.getElementById('progress-bar-container').style.display = 'none';
    bar.style.width = '0%';
    text.textContent = 'Processando...';
    clearInterval(window.progressInterval);
    status.style.display = 'block';
    status.style.color = success ? '#28a745' : '#d9534f';
    status.textContent = message || (success ? 'Processamento concluído com sucesso!' : 'Ocorreu um erro no processamento.');
  }, 900);
}
window.startProgressBar = startProgressBar;
window.finishProgressBar = finishProgressBar;
