const form = document.querySelector('form');
const passwordInputs = document.querySelectorAll(`input[type='password']`);

const sendData = async data => {
  try {
    const res = await fetch('https://goldblv.com/api/hiring/tasks/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const {email, errors} = await res.json();

    if (errors) {
      if (errors.password) {
        passwordInputs.forEach(input => {
          const errorEl = input.closest('.group').querySelector('.error');
          errorEl.textContent = errors.password[0];
          errorEl.style.display = 'block';
        });
      }
    } else {
      sessionStorage.setItem('email', email);
      window.location.href = '../pages/success.html';
    }
  } catch (err) {
    console.error(err);
  }
};

// initialize input validation errors with event delegation
document.body.addEventListener('focusout', evt => {
  const focusouted = evt.target;
  if (focusouted.tagName === 'INPUT') {
    const group = focusouted.closest('.group');
    group.classList.add('initialized');
  }
});

form.addEventListener('submit', evt => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  const formKeys = [...formData.keys()];
  const data = {};
  formKeys.forEach(key => (data[key] = formData.get(key)));
  sendData(data);
});
