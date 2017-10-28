var topic = ["Bugs Bunny", "SpongeBob" ,"Samurai Jack", "Adventure Time", "Family Guy"];



function makeButtons(){
  $("#Buttons").empty();
  for(var i = 0; i < topic.length; i++){
    var newButton = $("<button>");
    newButton.attr("data-person", topic[i]);
    newButton.text(topic[i]);
    $("#Buttons").append(newButton);
  }
}
makeButtons();



$("button").on("click", function(){
  var person = $(this).attr("data-person");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=R8jsodg6D45yvefSCDRinDaa2wrX6YXu&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .done(function(response){
    console.log(response);
   

    var results = response.data;
    for(var j = 0; j < results.length; j++){
      var gifDiv = $("<div class = 'item'>");

      var rating = results[j].rating;

      var p = $("<p>").text("Rating: " + rating);

      var gifImage = $("<img>");


      gifImage.attr("src", results[j].images.fixed_height_still.url);
      gifImage.attr("data-still", results[j].images.fixed_height_still.url);
      gifImage.attr("data-animate", results[j].images.fixed_height.url);
      gifImage.attr("data-state", "still");
      gifImage.addClass("gif");

      gifDiv.prepend(p);
      gifDiv.prepend(gifImage);

      $("#Gifs").prepend(gifDiv);
    }

      $(".gif").on("click", function() {
        var state = $(this).attr("data-state");

        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }

      
      $("#add-show").on("click", function(event) {
            event.preventDefault();
            // This line grabs the input from the textbox
            var show = $("#show-input").val().trim();
            // Adding the movie from the textbox to our topic
            topic.push(person);
            
            $("#show-input").val("");
            makeButtons();
          });

      });
  
  }); 

});

