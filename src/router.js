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
  //
  // define relevant request parameters
  //
  const { url } = req;
  const querystring = req.url.split('?')[1];
  //
  // landing page: or homepage if user is already authenticated
  //
  if (url === '/' && handlerAuth.verifySession(req)) return handlerResponses.htmlPage(req, res, 'home');
  if (url === '/') return handlerResponses.htmlPage(req, res, 'index');
  //
  // basic resource loaders for png, css, js files
  //
  if (url.slice(-4) === '.png') return handlerResponses.pngPage(req, res, url.slice(1));
  if (url.slice(-4) === '.css') return handlerResponses.cssPage(req, res, url.slice(1));
  if (url.slice(-3) === '.js') return handlerResponses.scriptPage(req, res, req.url.slice(1));
  //
  // login, logout and registration actions that do not require auth
  //
  if (url === '/login') return handlerAuth.login(req, res);
  if (url === '/logout') return handlerAuth.logout(req, res);
  if (url === '/register') return handlerAuth.register(req, res);
  //
  // other routes that require authentication
  //
  if (url === '/homepage' && handlerAuth.verifySession(req)) return handlerResponses.htmlPage(req, res, 'home');
  if (url === '/recentPosts' && handlerAuth.verifySession(req)) return handlerPosts.getRecentPosts(req, res);
  if (url === `/search?${querystring}` && handlerAuth.verifySession(req)) return handlerResponses.htmlPage(req, res, 'results');
  if (url === `/results?${querystring}` && handlerAuth.verifySession(req)) return handlerPosts.searchResults(req, res);
  if (url === `/cluck?${querystring}` && handlerAuth.verifySession(req)) return handlerResponses.htmlPage(req, res, 'cluck');
  if (url === `/postDetail?${querystring}` && handlerAuth.verifySession(req)) return handlerPosts.postDetail(req, res);
  if (url === `/replyDetail?${querystring}` && handlerAuth.verifySession(req)) return handlerPosts.replyDetail(req, res);
  if (url === '/postNew' && handlerAuth.verifySession(req)) return handlerPosts.addPost(req, res);
  if (url === '/postReply' && handlerAuth.verifySession(req)) return handlerPosts.addReply(req, res);
  //
  // all other requests are redirected to notFound/Forbidden page (the same for simplicity)
  //
  return handlerResponses.notFound(res);
};

module.exports = router;
