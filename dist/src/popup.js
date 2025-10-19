const input = document.getElementById('apiKey');
const button = document.getElementById('saveBtn');
const status = document.getElementById('status');

button.addEventListener('click', () => {
  const key = input.value.trim();
  if (key) {
    status.textContent = 'API Key salva com sucesso!';
    status.style.color = 'green';
  } else {
    status.textContent = 'Por favor, insira uma API Key válida.';
    status.style.color = 'red';
  }
});
