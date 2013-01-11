// Class variables
var currenView = 0;
var views = $('.view');
var numViews = views.length;
var changeSpeed = 2000;
var backToStartSpeed = 500;
var fullScreenState = 0;

$(document).ready(function() {
    
    /*
scrollToNext();
    scrollToNext();
*/
    
    // Set interval for scrollToNext
    var scrollInterval = setInterval(scrollToNext, changeSpeed);
 
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

function debug() {
	console.log("Current view: " + currenView + " Views: " + views + " numViews: " + numViews + " changeSpeed: " + changeSpeed + " backToStartSpeed: " + backToStartSpeed);
}
