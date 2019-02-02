// LEGHORN - CLIENT SIDE DOM SEARCH RESULTS
/* eslint-disable */

(function() {

  document.addEventListener('DOMContentLoaded', function() {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4 && xhr.status === 200){
        var data = JSON.parse(xhr.responseText);
        console.log(data);
        console.log(data.posts);
        data.posts.forEach(function(post) {
          displayEntry('postResults', post);
        });
        data.replies.forEach(function(reply) {
          displayEntry('repliesResults', reply);
        });
      }
    }

    var searchTerm = window.location.href.split('=')[1];
    console.log(searchTerm);
    var url = '/results?' + searchTerm;
    console.log(url);
    xhr.open('GET', url, true);
    xhr.send();
  });

  var displayEntry = function(target, entry) {

    var container = document.getElementById(target);
    var row = document.createElement('tr');
    var author = document.createElement('td');
    var message = document.createElement('td');
    var date = document.createElement('td');

    author.textContent = entry.username;
    message.textContent = entry.text_content;
    date.textContent = formatDate(entry.post_date);

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
