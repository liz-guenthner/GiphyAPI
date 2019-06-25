$( document ).ready(function(){
    var selectionArray = ["cat", "dog", "worm", "bug"];

    function displaySelectionInfo() {

    var selection = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=KeXx2zMYQ70666zLJ78Zk0l2j4aPSqu7&q=" + selection + "&limit=25&offset=0&rating=G&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            
            var selectionDiv = $("<div>");

            var selectionImage = $("<img>");
            selectionImage.addClass("still");
            selectionImage.attr("src", response.data[0].images.fixed_height_still.url);
            selectionDiv.append(selectionImage);

            var selectionGif = $("<img>");
            selectionGif.addClass("moving");
            selectionGif.attr("src", response.data[0].images.fixed_height.url);
            selectionDiv.append(selectionGif);
            selectionGif.hide(); // hide the still image

            $("#selection-view").prepend(selectionDiv);

            $("#selection-view").click(function() {
                selectionImage.toggle();
                selectionGif.toggle();
            });
           
        });
    }

    function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < selectionArray.length; i++) {

            var newButton = $("<button>");
            newButton.addClass("selection");
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
    });

    $(document).on("click", ".selection", displaySelectionInfo);

    renderButtons();

    // $("#selection-view").click(function() {
    //     selectionGif.hide(); // hide the still image
    //     selectionDiv.append(selectionGif);
    // });
});