$(function () {

    // route to save article  
    $(".save-article").on("click", function (event) {
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
            .then(function (data) {
                // Log the response
                console.log(data);
            });

    });


    // route to save note  
    $(".add-note").on("click", function (event) {
        event.preventDefault();
        console.log("I'm an add note log bitch");
        var thisId = $(this).data("id");

        console.log("this is good", thisId)
        // Get the modal
        var modal = document.getElementById("myModal");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // Display the modal
        modal.style.display = "block";
        $.ajax({
            method: "GET",
            url: "/notes/" + thisId,
        })
            .then(function (data) {

                console.log("are we here?", data);
                for (let i = 0; i < data.length; i++) {
                    // Display the information on the page
                    $(".saved-notes").append('<p>' + data[i].body + "<button class='delete-note' data-id='" + data[i]._id + "'>x</button></p>");
                }
                //space
            })

        $(document).on("click", ".delete-note", function (event) {
            event.preventDefault();
            let delId = $(this).data("id");
            console.log("this is", delId);
            $.ajax("/notes/" + delId, {
                type: "DELETE"
            }).then(function () {
                console.log("deleted successfully");
                $.ajax({
                    method: "GET",
                    url: "/notes/" + thisId,
                })
                    .then(function (data) {
                        console.log(data)
                        $(".saved-notes").empty();
                        for (let i = 0; i < data.length; i++) {
                            // Display the information on the page
                            $(".saved-notes").append('<p>' + data[i].body + "<button class='delete-note' data-id='" + data[i]._id + "'>x</button></p>");
                        }
                    })

            })
        });
div.puppies                             
        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
            $(".saved-notes").empty();
            location.reload();

        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
                $(".saved-notes").empty();
                location.reload();

            }
        }



        $(".save-note").on("click", function (event) {
            console.log("let's save this note bitch");
            var newNote = $(".modal-text").val().trim();
            console.log(newNote);
            $(".modal-text").val("");


            // Now make an ajax call to save the note
            $.ajax({
                method: "POST",
                url: "/notes/" + thisId,
                data: {
                    body: newNote,
                    article: thisId
                }
            })
                .then(function (data) {
                    // Log the response
                    console.log("line 123", data);
                    $.ajax({
                        method: "GET",
                        url: "/notes/" + thisId,
                    })
                        .then(function (data) {
                            console.log(data)
                            $(".saved-notes").empty();
                            for (let i = 0; i < data.length; i++) {
                                // Display the information on the page
                                $(".saved-notes").append('<p>' + data[i].body + "<button class='delete-note' data-id='" + data[i]._id + "'>x</button></p>");
                            }
                        })
                    //console.log("does this even?", data);
                })
        });
    });

})

