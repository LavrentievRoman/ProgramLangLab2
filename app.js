// Инициализация PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js');
  }
  
  const passwordList = document.getElementById('password-list');
  const passwordForm = document.getElementById('password-form');
  const generatePasswordBtn = document.getElementById('generate-password');
  
  // Генерация случайного пароля
  function generatePassword(length = 12) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars[Math.floor(Math.random() * chars.length)];
    }
    return password;
  }
  
  // Сохранение пароля в localStorage
  function savePassword(site, login, password) {
    const passwords = JSON.parse(localStorage.getItem('passwords') || '[]');
    passwords.push({ site, login, password });
    localStorage.setItem('passwords', JSON.stringify(passwords));
    displayPasswords();
  }
  
  // Отображение списка сохраненных паролей
  function displayPasswords() {
    passwordList.innerHTML = '';
    const passwords = JSON.parse(localStorage.getItem('passwords') || '[]');
    passwords.forEach(({ site, login, password }) => {
      const entry = document.createElement('div');
      entry.textContent = `Сайт: ${site}, Логин: ${login}, Пароль: ${password}`;
      passwordList.appendChild(entry);
    });
  }
  
  // Обработка события формы
  passwordForm.addEventListener('submit', event => {
    event.preventDefault();
    const site = document.getElementById('site').value;
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    savePassword(site, login, password);
    passwordForm.reset();
  });
  
  // Обработка генерации пароля
  generatePasswordBtn.addEventListener('click', () => {
    document.getElementById('password').value = generatePassword();
  });
  
  // Инициализация отображения паролей при загрузке
  displayPasswords();
  