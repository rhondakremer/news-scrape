$(function() {

// Grab the articles as a json
alert("chode")

$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
  });

  // Whenever someone clicks a p tag

  
  $(".save-article").on("click", function(event) {
    event.preventDefault();
    console.log("hey bitches");

    // Save the id from the p tag
    var thisId = $(this).data("id");
    console.log(thisId)
  
    // // Now make an ajax call for the Article
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
          isSaved: true
        }
      })
        // With that done
        .then(function(data) {
          // Log the response
          console.log(data);
        });

    });
        // The title of the article
        // $("#notes").append("<h2>" + data.title + "</h2>");
        // // An input to enter a new title
        // $("#notes").append("<input id='titleinput' name='title' >");
        // // A textarea to add a new note body
        // $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // // A button to submit a new note, with the id of the article saved to it
        // $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        // // If there's a note in the article
        // if (data.note) {
        //   // Place the title of the note in the title input
        //   $("#titleinput").val(data.note.title);
        //   // Place the body of the note in the body textarea
        //   $("#bodyinput").val(data.note.body);
        // }
      });
