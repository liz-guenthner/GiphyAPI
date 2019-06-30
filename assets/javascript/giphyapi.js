$( document ).ready(function(){
    // header('Access-Control-Allow-Origin: *');
    // header('Access-Control-Allow-Headers: Origin, Content-Type, Authorization, X-Auth-Token');
    // header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');

    var selectionArray = [ "scooby doo", "transformers", "smurfs", "sponge bob", "dungeons and dragons" ];

    function displaySelectionInfo() {
        // add data-name to each button
        var selection = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=KeXx2zMYQ70666zLJ78Zk0l2j4aPSqu7&q=" + selection + "&limit=10&rating=G&lang=en";

        $.ajax({

            url: queryURL,
            method: "GET"
            }).then(function(response) {

                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                
                    // create div for selection view area
                    var selectionDiv = $("<div>");
                    // add class called selection
                    selectionDiv.addClass("selection");
                    // declare variable for each gif image
                    var selectionGif = $("<img>");
                    // add class called gif
                    selectionGif.addClass("gif");
                    // point src tag to url of still gif image in response object
                    selectionGif.attr("src", results[i].images.original_still.url);
                    // data-still attribute set to still gif image in response object
                    selectionGif.attr("data-still", results[i].images.original_still.url);
                    // data-animate attribute set to animated gif in response object
                    selectionGif.attr("data-animate", results[i].images.original.url);
                    // data-state attribute set to still
                    selectionGif.attr("data-state", "still" );
                    // append gif image to div
                    selectionDiv.append(selectionGif);


                    // add selection to #selection view div at beginning
                    $("#selection-view").prepend(selectionDiv);

                    // onclick function to animate and freeze gif
                    $(".gif").on("click", function() {
                    
                        var state = $(this).attr("data-state");

                        if (state === 'still') {
                            $(this).attr("src", $(this).attr('data-animate'));
                            $(this).attr('data-state', 'animate');
                        } else {
                            $(this).attr("src", $(this).attr('data-still'));
                            $(this).attr('data-state', 'still');
                        }
                    });
                }
            });
        }


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

        $("#add-selection").on("click", function(event) {
            event.preventDefault();
            var selection = $("#selection-input").val().trim();
            selectionArray.push(selection);
            renderButtons();
            $("#selection-input").val('');
        });

        $(document).on("click", ".button", displaySelectionInfo);

        renderButtons();
});