const fs = require('fs');
const path = require('path');

const handlerResponses = {};

handlerResponses.sendResponse = (response, code, header, body) => {
  response.writeHead(code, header);
  response.end(body);
};

handlerResponses.htmlPage = (request, response, page) => {
  const fullPath = path.join(__dirname, '..', 'public', `${page}.html`);
  fs.readFile(fullPath, 'utf8', (error, file) => {
    /* istanbul ignore if */
    if (error) {
      handlerResponses.serverError(error, response);
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
      handlerResponses.serverError(error, response);
    } else {
      handlerResponses.sendResponse(response, 200, { 'Content-Type': 'text/css' }, file);
    }
  });
};

handlerResponses.scriptPage = (request, response, page) => {
  const fullPath = path.join(__dirname, '..', 'public', page);
  fs.readFile(fullPath, 'utf8', (error, file) => {
    /* istanbul ignore if */
    if (error) {
      handlerResponses.serverError(error, response);
    } else {
      handlerResponses.sendResponse(response, 200, { 'Content-Type': 'text/javascript' }, file);
    }
  });
};

handlerResponses.imgPage = (request, response, page) => {
  const fullPath = path.join(__dirname, '..', 'public', page);
  fs.readFile(fullPath, 'utf8', (error, file) => {
    /* istanbul ignore if */
    if (error) {
      handlerResponses.serverError(error, response);
    } else {
      handlerResponses.sendResponse(response, 200, { 'Content-Type': 'image/svg+xml' }, file);
    }
  });
};

handlerResponses.serverError = (error, response) => {
  handlerResponses.sendResponse(
    response, 500, { 'Content-Type': 'text/html' },
    '<h1>Sorry, there was a problem loading the homepage</h1>',
  );
  /* istanbul ignore next */
  // eslint-disable-next-line no-console
  console.log(error);
};

handlerResponses.notFound = (error, response) => {
  handlerResponses.sendResponse(
    response, 404, { 'Content-Type': 'text/html' },
    '<h1>404 - Sorry, the requested information was not found</h1>',
  );
};

module.exports = handlerResponses;
