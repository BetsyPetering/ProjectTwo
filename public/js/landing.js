$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $(".carousel.carousel-slider").carousel({
    fullWidth: true
  });
  instance.next();
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });
});
