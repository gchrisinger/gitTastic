// Initial array of nfl players
 var nflPlayers = ["Russell Wilson", "Doug Baldwin", "Pete Carroll", "Marshawn Lynch", "Richard Sherman"];

 // displayNflPlayerInfo function re-renders the HTML to display the appropriate content
 function displayNflPlayerInfo() {

   var nfl = $(this).attr("data-name");
   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    nfl + "&api_key=XwIc7lS2ENJSqxeTPzFYYEKPnYGpaBld&limit=10";
    
   // Creating an AJAX call for the specific nfl player gif button being clicked
   $.ajax({
     url: queryURL,
     method: "GET"
   }).then(function(response) {

// storing the data from the AJAX request in the results variable
      var results = response.data;
      
      // Looping through each result item
      for (var i = 0; i < results.length; i++) {
        
        // Creating and storing a div tag
        var nflDiv = $("<div>");
          
          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);
            
            // Creating and storing an image tag
            var nflImage = $("<img class='gif'>");
            // Setting the src attribute of the image to a property pulled off the result item
            nflImage.attr("src", results[i].images.fixed_height_still.url);
            
            // Appending the paragraph and image tag to the gifDiv
            nflDiv.append(p);
            nflDiv.append(nflImage);
            
            // Prependng the gifDiv to the HTML page in the "#gifs-view" div
            $(".gifs-view").prepend(nflDiv);
          }
   });

 }

 // Function for displaying nfl player data
 function renderButtons() {

   // Deleting the nfl players prior to adding new nfl players
   // (this is necessary otherwise you will have repeat buttons)
   $("#buttons-view").empty();

   // Looping through the array of nfl players
   for (var i = 0; i < nflPlayers.length; i++) {

     // Then dynamicaly generating buttons for each nfl player in the array
     // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
     var a = $("<button>");
     // Adding a class of gif-btn to our button
     a.addClass("gif-btn");
     // Adding a data-attribute
     a.attr("data-name", nflPlayers[i]);
     // Providing the initial button text
     a.text(nflPlayers[i]);
     // Adding the button to the buttons-view div
     $("#buttons-view").append(a);
   }
 }

 // This function handles events where a nfl player gif button is clicked
 $("#add-gif").on("click", function(event) {
   event.preventDefault();
   // This line grabs the input from the textbox
   var gif = $("#gif-input").val().trim();

   // Adding nfl player from the textbox to our array
   nflPlayers.push(gif);

   // Calling renderButtons which handles the processing of our nfl players array
   renderButtons();
 });

 // Adding a click event listener to all elements with a class of "gif-btn"
 $(document).on("click", ".gif-btn", displayNflPlayerInfo);

 // Calling the renderButtons function to display the intial buttons
 renderButtons();

 $(".gifs-view").on("click", '.gif', function() {
    var src = $(this).attr("src");
    if($(this).hasClass('playing')){
       //stop
       $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
       $(this).removeClass('playing');
    } else {
      //play
      $(this).addClass('playing');
      $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
    }
  });