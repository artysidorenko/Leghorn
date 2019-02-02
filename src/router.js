// *****************************************************************************
// router.js - central routing logic.
//
// ******************************************************************************

// Import dependencies

const handlerAuth = require('./handler_Auth');
const handlerResponses = require('./handler_Responses');
const handlerPosts = require('./handler_Posts');

// Router uses a switch/case code block to handle multiple request paths

const router = (req, res) => {
  // define relevant request parameters
  const { method, url } = req;
  const querystring = req.url.split('?')[1];
  switch (`${method} ${url}`) {
    case 'GET /':
      return handlerResponses.htmlPage(req, res, 'index');
    case 'GET /sadrobot.png':
    case 'GET /rooster.png':
      return handlerResponses.pngPage(req, res, req.url.slice(1));
    case 'GET /styles.css':
      return handlerResponses.cssPage(req, res, 'styles.css');
    case 'GET /index.js':
    case 'GET /logic.js':
    case 'GET /home.js':
    case 'GET /results.js':
      return handlerResponses.scriptPage(req, res, req.url.slice(1));
    case 'GET /homepage':
      if (true) return handlerResponses.htmlPage(req, res, 'home');
      return handlerResponses.forbidden(res);
    case 'GET /recentPosts':
      if (true) return handlerPosts.getRecentPosts(req, res);
      return handlerResponses.forbidden(res);
    case `GET /search?${querystring}`:
      if (true) {
        return handlerResponses.htmlPage(req, res, 'results');
      }
      return handlerResponses.forbidden(res);
    case `GET /results?${querystring}`:
      if (true) {
        console.log(`router: ${querystring}`);
        return handlerPosts.searchResults(req, res);
      }
      return handlerResponses.forbidden(res);
    case 'POST /postNew':
      if (handlerAuth.verifySession(req)) {
        return handlerPosts.addPost(req, res);
      } return handlerResponses.forbidden(res);
    case 'POST /login':
      return handlerAuth.login(req, res);
    case 'GET /logout':
      return handlerAuth.logout(req, res);
    case 'POST /register':
      return handlerAuth.register(req, res);
    default:
      return handlerResponses.notFound(res);
  }
};

module.exports = router;
