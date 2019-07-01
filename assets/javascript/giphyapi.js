$( document ).ready(function(){
    // array of pre-defined cartoons
    var selectionArray = [ "Scooby Doo", "Teenage Mutant Ninja Turtles", "Smurfs", "Sponge Bob", "Tom and Jerry" ];
    // function defined to render gifs and info on page
    function displaySelectionInfo() {
        // declare variable "selection" and add "data-name" attribute to each button
        var selection = $(this).attr("data-name");
        // declare variable "queryURL" and set equal to api url
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=KeXx2zMYQ70666zLJ78Zk0l2j4aPSqu7&q=" + selection + "&limit=10&rating=G&lang=en";
        // ajax call
        $.ajax({
            // url is set to "queryURL" variable
            url: queryURL,
            // methis is "GET" to pull data from api
            method: "GET"
            // promise
            }).then(function(response) {
                // declare variable "results" and set equal to object "response.data"
                var results = response.data;
                // iterate through array
                for (var i = 0; i < results.length; i++) {
                
                    // create div for selection view area
                    var selectionDiv = $("<div>");
                    // add class called selection and col-sm-12 and col-md-4
                    selectionDiv.addClass("selection");
                    selectionDiv.addClass("col-sm-12");
                    selectionDiv.addClass("col-md-4");
                    // declare variable "selectionGig" for each gif image
                    var selectionGif = $("<img>");
                    // add class "gif"
                    selectionGif.addClass("gif");
                    // point src tag to url of still gif image in response object
                    selectionGif.attr("src", results[i].images.fixed_height_still.url);
                    // data-still attribute set to still gif image in response object
                    selectionGif.attr("data-still", results[i].images.fixed_height_still.url);
                    // data-animate attribute set to animated gif in response object
                    selectionGif.attr("data-animate", results[i].images.fixed_height.url);
                    // data-state attribute set to still
                    selectionGif.attr("data-state", "still" );
                    // append gif image and title and rating to div
                    var p = $("<p>");
                    p.text("Rating: " + results[i].rating);
                    var title = $("<p>");
                    title.text("Title: " + results[i].title);
                    selectionDiv.append(selectionGif, title, p);


                    // add selection to #selection view div at beginning
                    $("#selection-view").prepend(selectionDiv);

                    // // onclick function to animate and freeze gif
                    $(".gif").on("click", function(event) {
                        
                        event.preventDefault();
                        
                        var state = $(this).attr("data-state");
                        console.log(state);

                        if (state === 'still') {
                            $(this).attr("src", $(this).attr('data-animate'));
                            $(this).attr('data-state', 'animate');
                        } else {
                            $(this).attr("src", $(this).attr('data-still'));
                            $(this).attr('data-state', 'still');
                        }
                        return false;
                        
                    });

                }
            });
        }
        // function defined to render buttons on page
        function renderButtons() {

            $("#buttons-view").empty();

            for (var i = 0; i < selectionArray.length; i++) {

                var newButton = $("<button>");
                newButton.addClass("button");
                newButton.attr("data-name", selectionArray[i]);
                newButton.text(selectionArray[i]);
                $("#buttons-view").append(newButton);
            }
        }
        // onclick function to add user input as button to button array and alert if empty submission from user
        $("#add-selection").on("click", function(event) {
            
            event.preventDefault();
            var selection = $("#selection-input").val().trim();
            if (selection === '') {
                alert("Please enter a Cartoon Title!");
            } else {
                selectionArray.push(selection);
                renderButtons();
                $("#selection-input").val('');
            }
            
        });
        // onclick function for "button" class to display gifs and info under form
        $(document).on("click", ".button", displaySelectionInfo);
        // function called to render buttons on page
        renderButtons();

});