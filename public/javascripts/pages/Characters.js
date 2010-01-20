Jelly.Pages.add("Characters", {
  all: function() {
    $('span.all').text("I am displayed on every action in this controller.");
  },
  index: function() {
    $('h1').text("Welcome to the index page.");
  }

});
