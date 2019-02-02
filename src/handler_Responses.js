// *****************************************************************************
// Handler Responses Controller - handles logic for sending resources
// to the client
//
// ******************************************************************************

const fs = require('fs');
const path = require('path');

const handlerResponses = {};

// Helper Functions used within most/all response functions

handlerResponses.sendResponse = (response, code, header, body) => {
  response.writeHead(code, header);
  response.end(body);
};

handlerResponses.redirect = (response, code, header) => {
  response.writeHead(code, header);
  response.end();
};

// Resource Responses

handlerResponses.htmlPage = (request, response, page) => {
  const fullPath = path.join(__dirname, '..', 'public', 'html', `${page}.html`);
  fs.readFile(fullPath, 'utf8', (error, file) => {
    /* istanbul ignore if */
    if (error) {
      console.log(error);
      handlerResponses.serverError(response);
    } else {
      handlerResponses.sendResponse(response, 200, { 'Content-Type': 'text/html' }, file);
    }
  });
};


handlerResponses.cssPage = (request, response, page) => {
  const fullPath = path.join(__dirname, '..', 'public', page);
  fs.readFile(fullPath, 'utf8', (error, file) => {
    /* istanbul ignore if */
    if (error) {
      handlerResponses.serverError(response);
    } else {
      handlerResponses.sendResponse(response, 200, { 'Content-Type': 'text/css' }, file);
    }
  });
};

handlerResponses.scriptPage = (request, response, page) => {
  const fullPath = path.join(__dirname, '..', 'public', 'scripts', page);
  fs.readFile(fullPath, 'utf8', (error, file) => {
    /* istanbul ignore if */
    if (error) {
      handlerResponses.serverError(response);
    } else {
      handlerResponses.sendResponse(response, 200, { 'Content-Type': 'text/javascript' }, file);
    }
  });
};

handlerResponses.pngPage = (request, response, page) => {
  const fullPath = path.join(__dirname, '..', 'public', page);
  fs.readFile(fullPath, (error, file) => {
    /* istanbul ignore if */
    if (error) {
      handlerResponses.serverError(response);
    } else {
      handlerResponses.sendResponse(response, 200, { 'Content-Type': 'image/png' }, file);
    }
  });
};

handlerResponses.imgPage = (request, response, page) => {
  const fullPath = path.join(__dirname, '..', 'public', page);
  fs.readFile(fullPath, (error, file) => {
    /* istanbul ignore if */
    if (error) {
      handlerResponses.serverError(response);
    } else {
      handlerResponses.sendResponse(response, 200, { 'Content-Type': 'image/svg+xml' }, file);
    }
  });
};

// Error Responses

handlerResponses.loginError = (response) => {
  const fullPath = path.join(__dirname, '..', 'public', 'html', 'loginError.html');
  fs.readFile(fullPath, 'utf8', (error, file) => {
    /* istanbul ignore if */
    if (error) handlerResponses.serverError(response);
    else handlerResponses.sendResponse(response, 401, { 'Content-Type': 'text/html' }, file);
  });
};

handlerResponses.forbidden = (response) => {
  const fullPath = path.join(__dirname, '..', 'public', 'html', '401Error.html');
  fs.readFile(fullPath, 'utf8', (error, file) => {
    /* istanbul ignore if */
    if (error) handlerResponses.serverError(response);
    else handlerResponses.sendResponse(response, 401, { 'Content-Type': 'text/html' }, file);
  });
};

handlerResponses.serverError = (response) => {
  const fullPath = path.join(__dirname, '..', 'public', 'html', '500Error.html');
  fs.readFile(fullPath, 'utf8', (error, file) => {
    /* istanbul ignore if */
    handlerResponses.sendResponse(response, 500, { 'Content-Type': 'text/html' }, file);
  });
};

handlerResponses.notFound = (response) => {
  const fullPath = path.join(__dirname, '..', 'public', 'html', '404Error.html');
  fs.readFile(fullPath, 'utf8', (error, file) => {
    /* istanbul ignore if */
    if (error) handlerResponses.serverError(response);
    else handlerResponses.sendResponse(response, 404, { 'Content-Type': 'text/html' }, file);
  });
};

module.exports = handlerResponses;
