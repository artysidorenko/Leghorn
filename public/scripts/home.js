// LEGHORN - CLIENT SIDE DOM
/* eslint-disable */

(function() {

  document.addEventListener('DOMContentLoaded', function() {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4 && xhr.status === 200){
        console.log(xhr.responseText);
        var data = JSON.parse(xhr.responseText);
        console.log(data);
        data.forEach(elem => displayPosts(elem));
      }
    }
    xhr.open('GET', '/recentPosts', true);
    xhr.send();
  });

  var logOut = function(){

  };

  var displayPosts = function(post) {
    var newsfeed = document.getElementById('newsfeed');
    var postBox = document.createElement('a');
    var postAuthor = document.createElement('p');
    var postText = document.createElement('p');
    var postDate = document.createElement('p');

    postAuthor.textContent = 'From: ' + post.username;
    postText.textContent = post.text_content;
    postDate.textContent = 'Posted: ' + formatDate(post.post_date);

    postBox.classList.add('newsfeed__article');
    postAuthor.classList.add('newsfeed__author');
    postDate.classList.add('newsfeed__date');

    postBox.href = 'cluck?id=' + post.id;

    newsfeed.appendChild(postBox);
    postBox.appendChild(postAuthor);
    postBox.appendChild(postText);
    postBox.appendChild(postDate);

    if (post.replies > 0) {
      var replies = document.createElement('p');
      replies.textContent = post.replies + ' response(s)';
      postBox.appendChild(replies);
    }
  };

  var formatDate = function(data) {
    var timestamp = new Date(data);
    var now = new Date();
    var ageMinutes = (now - timestamp) / 60000;
    var ageHours = (now - timestamp) / (60000*60);
    var ageDays = (now - timestamp) / (60000*60*24);
    var ageWeeks = (now - timestamp) / (60000*60*24*7);

    if (ageHours < 1) return Math.round(ageMinutes) + ' minute(s) ago';
    if (ageDays < 1 && now.getDay() === timestamp.getDay()) return 'today at ' + timestamp.getHours() + ':' + timestamp.getMinutes();
    if (now.getFullYear() === timestamp.getFullYear()) return timestamp.toString().slice(0, 10);
    return timestamp.toString().slice(0, 15);
  };

})();
