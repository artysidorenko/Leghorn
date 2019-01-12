const test = require('tape');
const logic = require('../public/logic');

test('Initiate testing framework', (t) => {
  t.equals(1, 1, '1 equals 1 (dummy test)');
  t.end();
});

test('Test for blank input validation', (t) => {
  t.equals(logic.validateInput('abc'), true, 'Non whitespace input returns true');
  t.equals(logic.validateInput(' '), false, 'Whitespace input returns false');
  t.equals(logic.validateInput(''), false, 'Blank input returns false');
  t.end();
});

test('Test password validation', (t) => {
  t.equals(logic.passwordMatch('password', 'password'), true, 'Same password returns true');
  t.equals(logic.passwordMatch('password', 'other password'), false, 'Different password returns false');
  t.end();
});

test('Test email validation', (t) => {
  t.equals(logic.validateEmail('test@test.com'), true, 'Valid email format returns true');
  t.equals(logic.validateEmail('test.com'), false, 'Invalid email format returns false: no @ symbol');
  t.equals(logic.validateEmail('test@com'), false, 'Invalid email format returns false: no web extension');
  t.end();
});
