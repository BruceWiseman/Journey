$(document).ready(function() {
  $("#profileButton").attr("href", "/profile?username=<%= user.login.username %>");
});
