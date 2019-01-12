const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const querystring = require('querystring');
const getData = require('./queries/getData');
const postData = require('./queries/postData');
const handlerResponses = require('./handler_Responses');

const handlerAuth = {};

// Attempt to implement a signed cookie session management system without using external libraries:

handlerAuth.secret = 'artyfarty';

handlerAuth.signCookie = (cookie) => {
  const hmac = crypto.createHmac('sha256', handlerAuth.secret);
  hmac.update(cookie, 'utf8');
  return hmac.digest('hex');
};

/* eslint-disable */
handlerAuth.parseCookie = (cookie) => {
  const cookieArray = cookie.split('; ');
  const parsedCookie = cookieArray.reduce((object, elem) => {
    const key = elem.split('=')[0];
    const value = elem.split('=')[1];
    object[key] = value;
    return object;
  }, {});
  return parsedCookie;
};
/* eslint-enable */

handlerAuth.validateSignedCookie = (cookie, hash) => hash === handlerAuth.signCookie(cookie);

handlerAuth.startSession = (req, res, username) => {
  crypto.randomBytes(10, (error, buffer) => {
    if (error) throw new Error(error);
    const sessionID = buffer.toString('hex');
    res.writeHead(
      303,
      {
        'Set-Cookie': [
          `username=${username}; HttpOnly; Max-Age=9000`,
          `sessionID=${sessionID}; HttpOnly; Max-Age=9000`,
          `signature=${handlerAuth.signCookie(username + sessionID)};HttpOnly; Max-Age=9000`,
        ],
        Location: '/homepage',
      },
    );
    return res.end();
  });
};

handlerAuth.verifySession = (req) => {
  const cookie = handlerAuth.parseCookie(req.headers.cookie);
  return handlerAuth.validateSignedCookie(cookie.username + cookie.sessionID, cookie.signature);
};

// Everything related to the actual login and register processes:

handlerAuth.processForm = (req, callback) => {
  let requestBody = '';
  req.on('error', error => callback(error));
  req.on('data', (chunk) => { requestBody += chunk; });
  req.on('end', () => {
    console.log(querystring.parse(requestBody));
    callback(null, querystring.parse(requestBody));
  });
};

handlerAuth.comparePasswords = (password, hashedPassword, callback) => {
  bcrypt.compare(password, hashedPassword, (error, result) => {
    if (error) callback(new Error('Verifcation process failed.'));
    callback(null, result);
  });
};

handlerAuth.login = (req, res) => {
  handlerAuth.processForm(req, (formError, form) => {
    if (formError) throw new Error(`form process error: ${formError}`);
    getData.fetch('authorisation', 'password', 'username', form.username, (error, response) => {
      if (error) throw new Error('Error verifying user data');
      handlerAuth.comparePasswords(form.password, response[0].password, (error2, result) => {
        if (error2) throw new Error('Error verifying user data');
        if (result === false) handlerResponses.sendResponse(res, 200, { 'Content-Type': 'text/plain' }, 'Login details incorrect');
        else if (result === true) {
          handlerAuth.startSession(req, res, form.username);
          // handlerResponses.sendResponse(
          // res, 200, { 'Content-Type': 'text/plain' }, 'Logged in succesfully');
        }
      });
    });
  });
};

handlerAuth.hashText = (text, callback) => {
  bcrypt.hash(text, 10, (error, hash) => {
    if (error) callback(error);
    callback(null, hash);
  });
};

handlerAuth.validateUniqueData = (database, column, input, callback) => {
  getData.fetch(database, column, column, input, (error, response) => {
    if (error) callback(error);
    if (response.length > 0) {
      callback(null, false);
    } else callback(null, true);
  });
};

handlerAuth.register = (req, res) => {
  handlerAuth.processForm(req, (formError, form) => {
    if (formError) throw new Error(`form process error: ${formError}`);
    handlerAuth.validateUniqueData('authorisation', 'username', form.username, (sqlError, unique) => {
      if (sqlError) {
        throw new Error(`username SQL validation error: ${sqlError}`);
      } else if (unique === false) {
        handlerResponses.sendResponse(res, 200, { 'Content-Type': 'text/plain' }, 'USERNAME ALREADY EXITS!!!');
      } else {
        handlerAuth.hashText(form.password, (passHashError, hashedPassword) => {
          if (passHashError) throw new Error(`password hashing error: ${passHashError}`);
          postData.addUser(form.username, hashedPassword, (addUserError, success) => {
            if (addUserError) throw new Error(`error adding user details to DB: ${addUserError}`);
            console.log(`SUCCESS: ${success}`);
            handlerResponses.sendResponse(res, 200, { 'Content-Type': 'text/plain' }, 'SUCCESS!!!');
          });
        });
      }
    });
  });
};

module.exports = handlerAuth;
