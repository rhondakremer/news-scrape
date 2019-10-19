$(function() {

// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
  });


// route to save article  
  $(".save-article").on("click", function(event) {
    event.preventDefault();
    console.log("hey bitches");

    // Save the id from the p tag
    var thisId = $(this).data("id");
    console.log(thisId)
  
    // // Now make an ajax call to save the article
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


    // route to save note  
    $(".add-note").on("click", function (event) {
        event.preventDefault();
        console.log("I'm an add note log bitch");

        // Save the id from the p tag
        var thisId = $(this).data("id");
        console.log(thisId)
        // Get the modal
        var modal = document.getElementById("myModal");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];


        $.ajax({
            method: "GET",
            url: "/notes/" + thisId,
        })
        .then(function(data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                // Display the apropos information on the page
                $(".saved-notes").append("<p>" + data[i].body + "</p>");
              }
            
        })

        // Display the modal
        modal.style.display = "block";

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        $(".save-note").on("click", function (event) {
            console.log("let's save this note bitch");
            var newNote = $(".modal-text").val().trim();
            console.log(newNote);
            modal.style.display = "none";
        

        // Now make an ajax call to save the note
        $.ajax({
            method: "POST",
            url: "/notes/" + thisId,
            data: {
                body: newNote,
                article: thisId
            }
        })
            // With that done
            .then(function (data) {
                // Log the response
                console.log(data);
            });

    });
});

});
