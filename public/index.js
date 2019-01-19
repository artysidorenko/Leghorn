// LEGHORN - CLIENT SIDE DOM
/* eslint-disable */

(function() {

  window.onload = function()  {
    var loginUsername = document.getElementById('login-username');
    var loginPassword = document.getElementById('login-password');

    var regUsername = document.getElementById('reg-username');
    var regPassword = document.getElementById('reg-password');
    var regConfirmPassword = document.getElementById('reg-confirmPassword');

    var loginForm = document.getElementById('loginForm');
    var registerForm = document.getElementById('registerForm');

    var appendWarningMessage = function(warning) {
      var warningMessage = document.createElement('h3');
      warningMessage.style.textAlign = 'center';
      warningMessage.style.marginTop = '20px';
      warningMessage.textContent = warning;
      document.body.appendChild(warningMessage);
    }

    loginForm.addEventListener('submit', function(event) {
      if (!validationFunctions.validateInput(loginUsername.value)) {
        event.preventDefault();
        loginUsername.value = '';
        loginUsername.placeholder = 'Enter a valid username';
      }
      if (!validationFunctions.validateInput(loginPassword.value)) {
        event.preventDefault();
        loginPassword.value = '';
        loginPassword.placeholder = 'Enter a valid password';
      }
    });

    registerForm.addEventListener('submit', function(event) {
      if (!validationFunctions.validateInput(regUsername.value)) {
        event.preventDefault();
        regUsername.value = '';
        regUsername.placeholder = 'Enter a valid username';
      }
      if (!validationFunctions.validateInput(regPassword.value)) {
        event.preventDefault();
        regPassword.value = '';
        regPassword.placeholder = 'Enter a valid password';
      }
      if (!validationFunctions.passwordMatch(regPassword.value, regConfirmPassword.value))  {
        event.preventDefault();
        regConfirmPassword.value = '';
        regConfirmPassword.placeholder = 'Passwords need to match';
      }
    });
  }

})();
