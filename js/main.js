//Problem: 1.User when clicking on image goes to a dead end, poor UX.
//         2.When user type in the search box, it should filter the results
//         and check if input equals image alt attribute.
//         3.When filtering images add extra feautures like - animations, transitions and so on 
//Solution: 1.Create an overlay with the large image, where te user
//          will be able to switch between previous and next images 
//          and videos in the gallery - Lightbox
//          2.On search box input create a "keypress" function which 
//          will check live inout by user and filter images
//          3.Use Animsition for additional effects

var $overlay = $('<div id="overlay"></div>');
var $image = $("<img>");
var $caption = $("<p></p>");
// current image index
var $selectedIndex = 0;
// Total length of the li items
var $galleryLength = $("#gallery li").length;


// adding sticky to header
$('header').sticky({
  getWidthFrom: '.container',
  responsiveWidth: true
});

// adding sticky to footer
$('footer').sticky({
  getWidthFrom: '.container',
  responsiveWidth: true,
  bottomSpacing: 0
});


// setting up animsition 
$(".animsition").animsition({
  inClass: 'fade-in-right-lg',
  outClass: 'fade-out-right-lg',
  inDuration: 1000,
  outDuration: 500
});

// Hides placeholder on focus, and returns it back on unfocus
$("#search").click(function() {
  $("#search").removeAttr("placeholder");
  $("#search").blur(function() {
    $("#search").attr("placeholder", "Search");
  });
});

// Search engine
$("#search").keyup(function(){
 
        // Retrieve the input field text and reset the count to zero
        var filter = $(this).val(), count = 0;
 
        // Loop through the comment list
        $("#gallery li img").each(function(){
 
            // If the list item does not contain the text phrase fade it out
            if ($(this).attr("alt").search(new RegExp(filter, "i")) < 0) {
                $(this).parent().parent().fadeOut();
 
            // Show the list item if the phrase matches and increase the count by 1
            } else {
                $(this).parent().parent().fadeIn();
                count++;
            }
        });
 
    });


// Append image
$overlay.append($image);
// Append caption
$overlay.append($caption);

// Adding previous, next and close buttons
$overlay.append("<button id='btn-prev'></button>");
$overlay.append("<button id='btn-next'></button>");
$overlay.append("<button id='close'></button>");

//2. Add overlay
$("body").append($overlay);

// Function variable holding the current image
var selectedImage = function(imageLocation, imageCaption){

  // Location of the image
  $image.attr("src", imageLocation);

  // Caption of the image
  $caption.text(imageCaption);
}


// Overlay 
$("#gallery a").click(function(event){
  event.preventDefault();
  var imageLocation = $(this).attr("href");
  var imageCaption = $(this).children("img").attr("alt");

  // update index to current selected image
  $selectedIndex = $(this).parent().index(); 

  // this is calling that new Update overlay function above
  selectedImage(imageLocation, imageCaption);

  // Show the overlay
  $overlay.fadeIn(imageLocation);

});

var prevOrNext = function(prev) {
  //set prev to true to move backwards in the index
  prev = true;  
  //if flag set move backwards, if not move forwards
  if (!prev ) { 
    
    $selectedIndex++;
    
  }
  else { 
    $selectedIndex--; 
  }

  //if out of index reset
  if ($selectedIndex < 0) { 
    $selectedIndex = $galleryLength - 1 ;
  }
  if ($selectedIndex > 11) { 
    $selectedIndex = 0; 
  }

 // Getting the link of the selectedIndex
  var newImgSelected = $("#gallery li").get($selectedIndex).getElementsByTagName("a");
  
  // setting the newImgSelected link 
  var imageLocation = $(newImgSelected).attr("href");
  // setting the newImgSelected caption
  var imageCaption =  $(newImgSelected).children("img").attr("alt");

  //Update Overlay
  selectedImage(imageLocation, imageCaption);

}



// Prev and Next Button events

$("#btn-prev").click(function(event){
  $("#overlay img").fadeOut("fast");
  $("#overlay p").fadeOut("fast");
  prevOrNext(true);
  $("#overlay img").fadeIn("fast");
  $("#overlay p").fadeIn("fast");

});

$("#btn-next").click(function(event){
  $("#overlay img").fadeOut("fast");
  $("#overlay p").fadeOut("fast");
  prevOrNext(false);
  $("#overlay img").fadeIn("fast");
  $("#overlay p").fadeIn("fast");
});

// When "X" clicked close lightbox
$("#close").click(function(event){
    // fadeout overlay     
    $overlay.fadeOut();
});

// listens for any navigation keypress activity
  $(document).keydown(function(e)
  {
    switch(e.which)
    {
      // user press key left
      case 37: 
              $("#overlay img").fadeOut("fast");
              $("#overlay p").fadeOut("fast");
              prevOrNext(true);
              $("#overlay img").fadeIn("fast");
              $("#overlay p").fadeIn("fast");
            break;  
            
      // user presses key right
      case 39: 
              $("#overlay img").fadeOut("fast");
              $("#overlay p").fadeOut("fast");
              prevOrNext(false);
              $("#overlay img").fadeIn("fast");
              $("#overlay p").fadeIn("fast");
            break;
            
      // user presses key escape
      case 27: $overlay.fadeOut();
            break;
    }
  });



























