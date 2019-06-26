$( document ).ready(function(){

    var selectionArray = [ "car", "van", "truck", "sportscar" ];

    function displaySelectionInfo() {

    var selection = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=KeXx2zMYQ70666zLJ78Zk0l2j4aPSqu7&q=" + selection + "&limit=25&offset=0&rating=G&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            
            var selectionDiv = $("<div>");
            selectionDiv.addClass("selection");

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

            $(".selection").click(function(event){
                event.preventDefault();
                $(this).find('.still').toggle();
                $(this).find('.moving').toggle();
            });
           
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