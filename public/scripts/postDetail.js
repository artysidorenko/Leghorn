// LEGHORN - CLIENT SIDE DOM SEARCH RESULTS
/* eslint-disable */

(function() {

  document.addEventListener('DOMContentLoaded', function() {

    var postId = document.getElementById('postId');
    postId.value = window.location.href.split('=')[1];

    var xhr = new XMLHttpRequest();
    var xhr2 = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4 && xhr.status === 200){
        var data = JSON.parse(xhr.responseText);
        // use data to populate post info
        populatePost(data);
        // send the second xhr request asynchronously
        xhr2.open('GET', url2, true);
        xhr2.send();
      }
    }

    xhr2.onreadystatechange = function() {
      if(xhr2.readyState === 4 && xhr2.status === 200){
        var data = JSON.parse(xhr2.responseText);
        console.log('obtained data:' + data);
        data.forEach(function(entry) {
          displayEntry('replyResults', entry);
        });
        //do something with data
      }
    }

    var searchTerm = window.location.href.split('=')[1];
    var url = '/postDetail?' + searchTerm;
    var url2 = '/replyDetail?' + searchTerm;
    xhr.open('GET', url, true);
    xhr.send();
  });

  var populatePost = function (entry) {

    var postAuthor = document.getElementById('postAuthor');
    var postText = document.getElementById('postText');
    var postDate = document.getElementById('postDate');

    postAuthor.textContent = 'By: ' + entry.username;
    postText.textContent = entry.text_content;
    postDate.textContent = 'Clucked on: ' + formatDate(entry.post_date);
  };

  var displayEntry = function(target, entry) {

    var container = document.getElementById(target);
    var row = document.createElement('tr');
    var author = document.createElement('td');
    var message = document.createElement('td');
    var date = document.createElement('td');

    author.textContent = entry.username;
    message.textContent = entry.text_content;
    date.textContent = formatDate(entry.reply_date);

    container.appendChild(row);
    row.appendChild(author);
    row.appendChild(message);
    row.appendChild(date);
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
