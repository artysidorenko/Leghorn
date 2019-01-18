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

  var displayPosts = function(post) {
    var newsfeed = document.getElementById('newsfeed');
    var postBox = document.createElement('article');
    var postAuthor = document.createElement('p');
    var postText = document.createElement('p');
    var postDate = document.createElement('p');

    postAuthor.textContent = 'From: ' + post.username;
    postText.textContent = post.text_content;
    postDate.textContent = 'Posted: ' + post.post_date;

    postBox.classList.add('newsfeed__article');
    postAuthor.classList.add('newsfeed__author');
    postDate.classList.add('newsfeed__date');

    newsfeed.appendChild(postBox);
    postBox.appendChild(postAuthor);
    postBox.appendChild(postText);
    postBox.appendChild(postDate);
  };

})();
