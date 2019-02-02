// *****************************************************************************
// Post handler - handles logic for responding to post or search requests
//
// ******************************************************************************

// Import dependencies

const handlerResponses = require('./handler_Responses');
const handlerAuth = require('./handler_Auth');
const getData = require('./queries/getData');
const postData = require('./queries/postData');
const dbConnection = require('./database/db_connection');

const handlerPosts = {};

// Handles requests to add a new post

// TODO: FIX SUCCESS Responses

handlerPosts.addPost = (req, res) => {
  // need to collect request form data async
  handlerAuth.processForm(req, (formError, body) => {
    if (formError) throw new Error('unable to process request form');
    const { username } = handlerAuth.parseCookie(req.headers.cookie);
    // query SQL database for existing user id
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
    const recentPosts = [];
    while (recentPosts.length < 5) recentPosts.push(response[recentPosts.length]);
    handlerResponses.sendResponse(res, 200, { 'Content-Type': 'application/json' }, JSON.stringify(recentPosts));
  });
};

handlerPosts.searchResults = (req, res) => {
  // define results array that will capture SQL responses
  let results = {};
  // specify SQL parameters
  const searchTerm = req.url.split('?')[1];
  console.log(`handler: ${searchTerm}`);
  const postsTable = 'posts INNER JOIN users ON users.id = posts.author_id';
  const postsLookupColumns = ['users.username', 'posts.text_content'];
  const postsOutput = 'users.username, posts.text_content, posts.post_date';
  const repliesTable = 'replies INNER JOIN users ON users.id = replies.author_id';
  const repliesLookupColumns = ['users.username', 'replies.text_content'];
  const repliesOutput = 'users.username, replies.text_content, replies.reply_date';
  // step 1: search post data, receive author name, text_content, post_date from results
  getData.searchAll(postsTable,
    postsOutput, postsLookupColumns, searchTerm, (error, response) => {
      if (error) throw new Error('SQL error fetching data');
      // log results and append to results array
      console.log(`response: ${response.length} ${typeof response} ${response}`);
      results.posts = response;
      // step 2: search replies by author, receive author name, text_content, post_date from results
      getData.searchAll(repliesTable,
        repliesOutput, repliesLookupColumns, searchTerm, (error2, response2) => {
          if (error2) {
            console.log(error2);
            throw new Error('SQL error fetching data');
          }
          // log results and append to existing results array
          console.log(`response2: ${response.length} ${typeof response} ${response}`);
          results.replies = response2;
          handlerResponses.sendResponse(res, 200, { 'Content-Type': 'application/json' }, JSON.stringify(results));
        });
    });
};


module.exports = handlerPosts;
