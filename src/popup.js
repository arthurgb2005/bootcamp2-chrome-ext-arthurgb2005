document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('apiKey');
  const button = document.getElementById('saveBtn');
  const status = document.getElementById('status');

  button.addEventListener('click', () => {
    const value = input.value.trim();
    if (!value) {
      status.textContent = 'Por favor, digite uma API Key.';
      status.style.color = 'red';
      return;
    }
    localStorage.setItem('apiKey', value);
    status.textContent = 'API Key salva com sucesso!';
    status.style.color = 'green';
  });
});
