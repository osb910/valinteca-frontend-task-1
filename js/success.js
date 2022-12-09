const emailEl = document.querySelector('#logged-email')
const email = sessionStorage.getItem('email');

emailEl.textContent = email;