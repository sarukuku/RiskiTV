// Class variables
var currenView = 0;
var views = $('.view');
var numViews = views.length;
var changeSpeed = 8000;
var backToStartSpeed = 500;
var updateSpeed = 30000;
var hashtag = 'turku';
var fullScreenState = 0;

$(document).ready(function() {

    //scrollToNext();
    scrollToNext();

  
    // Set interval for scrollToNext
    //var scrollInterval = setInterval(scrollToNext, changeSpeed);
    // Set interval for updating all the info
    var updateInterval = setInterval(updateAllStreams, updateSpeed);
 
    // If window is resized
    $(window).resize(function () { 
        // Call the resizePanel function
        resizePanel();
    });   
     
});


// Scrolls to next view. If the view is the last in row scrolls back to start.
function scrollToNext() {
	if (currenView >= numViews-1) {
		$('.wrapper').scrollTo(views.eq(0), backToStartSpeed);
		currenView = 0;
	} else {
		$('.wrapper').scrollTo(views.eq(currenView+1), backToStartSpeed);
		currenView += 1;
	}
}

function resizePanel() {
 
    //get the browser width and height
    width = $(window).width();
    height = $(window).height();
 
    //get the mask width: width * total of items
    mask_width = width * $('.view').length;
         
    //set the dimension 
    $('.wrapper, .view').css({width: width, height: height});
    $('.mask').css({width: mask_width, height: height});
     
    //if the item is displayed incorrectly, set it to the corrent pos
    $('.wrapper').scrollTo($('a.selected').attr('href'), 0);
         
}

function launchFullScreen(element) {
  if(element.requestFullScreen) {
    element.requestFullScreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  }
}

function cancelFullscreen() {
  if(document.cancelFullScreen) {
    document.cancelFullScreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
  }
}

function toggleFullScreen() {
	if (fullScreenState == 1) {
		cancelFullscreen();
		fullScreenState = 0;
	} else {
		launchFullScreen(document.documentElement);
		fullScreenState = 1;
	}
}

function updateAllStreams() {
  
  if (currenView != 0) {
    $(".calender").fadeOut(100, function(){
      $(".calender").empty();
    });
    getCalendar();
    console.log("Updated calendar");
  };
  
  if (currenView != 1) {
    $(".news").fadeOut(100, function(){
      $(".news").empty();
    });
    getNews();
    console.log("Updated news");
  };

  if (currenView != 2) {
    $(".tweets").fadeOut(100, function(){
      $(".tweets").empty();
    });
    getTwitterFeed(hashtag);
    console.log("Updated twitterfeed");

    $(".foursquares").fadeOut(100, function(){
      $(".foursquares").empty();
    });
  	getFoursquare();
    console.log("Updated foursquarefeed");
  };
	
	// TODO: Calendar feed
}
