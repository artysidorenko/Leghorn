const handlerResponses = require('./handler_Responses');
const handlerAuth = require('./handler_Auth');
const getData = require('./queries/getData');
const postData = require('./queries/postData');

const handlerPosts = {};

handlerPosts.addPost = (req, res) => {
  handlerAuth.processForm(req, (formError, body) => {
    if (formError) throw new Error('unable to process request form');
    const { username } = handlerAuth.parseCookie(req.headers.cookie);
    console.log(username);
    getData.authorId(username, (cookieError, userID) => {
      if (cookieError) throw new Error('unable to find user ID');
      postData.addPost(userID, body.postText, (sqlError) => {
        if (sqlError) throw new Error('problem saving post to database');
        handlerResponses.sendResponse(res, 200, { 'Content-Type': 'text/plain' }, 'SUCCESS!!!');
      });
    });
  });
};

handlerPosts.getRecentPosts = (req, res) => {
  getData.postHistory((error, response) => {
    if (error) throw new Error('SQL error getting historical posts');
    console.log(response);
    const recentPosts = [];
    while (recentPosts.length < 3) recentPosts.push(response[recentPosts.length]);
    handlerResponses.sendResponse(res, 200, { 'Content-Type': 'application/json' }, JSON.stringify(recentPosts));
  });
};


module.exports = handlerPosts;
