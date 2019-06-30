$( document ).ready(function(){
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, Content-Type, Authorization, X-Auth-Token');
    header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');

    var selectionArray = [ "squirrel", "cat", "dog", "bird", "giraffe", "elephant" ];

    $("button").on("click", function() {
      var animal = $(this).attr("data-animal");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

        console.log(response);

       
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
  
          var animalDiv = $("<div>");
      
          var p = $("<p>");
          p.text("Rating: " + results[i].rating);
          var animalImage = $("<img>");
          animalImage.attr("src", results[i].images.fixed_height.url);
          
          animalDiv.append(animalImage, p);
     
          $("#gifs-appear-here").prepend(animalDiv);
        
        }
      });
    });
});
