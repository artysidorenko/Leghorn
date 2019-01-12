// const querystring = require('querystring');
const handlerAuth = require('./handler_Auth');
const handlerResponses = require('./handler_Responses');
// const handlerDAO = require('./handler_DAO');

const router = (req, res) => {
  switch (`${req.method} ${req.url}`) {
    case 'GET /':
      return handlerResponses.htmlPage(req, res, 'index');
    case 'GET /styles.css':
      return handlerResponses.cssPage(req, res, 'styles.css');
    case 'GET /index.js':
    case 'GET /logic.js':
      return handlerResponses.scriptPage(req, res, req.url.slice(1));
    case 'GET /homepage':
      if (handlerAuth.verifySession(req)) return handlerResponses.htmlPage(req, res, 'home');
      return handlerResponses.sendResponse(res, 401, { 'Content-Type': 'text/plain' }, 'Access Denied');
    case 'POST /login':
      return handlerAuth.login(req, res);
    case 'POST /logout':
      return handlerAuth.logout(req, res);
    case 'POST /register':
      return handlerAuth.register(req, res);
    default:
      return handlerResponses.notFound(req, res);
  }
};

module.exports = router;

// } else if (method === 'GET' && url.slice(-4) === '.css') {
//   handler.cssPage(request, response, url);
// } else if (method === 'GET' && url.slice(-3) === '.js') {
//   handler.scriptPage(request, response, url);