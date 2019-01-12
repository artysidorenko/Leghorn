// LEGHORN - CLIENT SIDE LOGIC

/* eslint-disable */

var validationFunctions = {

  validateInput: function(input)  {
    var inputRegex = new RegExp('\\S');
    return inputRegex.test(input);
  },

  passwordMatch: function(password, confirmPassword) {
    return password === confirmPassword;
  },

  validateEmail: function(email)  {
    var emailRegex = new RegExp('[\\w-]+@([\\w-]+\\.)+[\\w-]+');
    return emailRegex.test(email);
  },

}

module.exports = validationFunctions;
