/*
 * jGFeed 1.0 - Google Feed API abstraction plugin for jQuery
 *
 * Copyright (c) 2009 jQuery HowTo
 *
 * Licensed under the GPL license:
 *   http://www.gnu.org/licenses/gpl.html
 *
 * URL:
 *   http://jquery-howto.blogspot.com
 *
 * Author URL:
 *   http://me.boo.uz
 *
 */
(function($){$.extend({jGFeed:function(url,fnk,num,key){if(url==null){return false;}var gurl="http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q="+url;if(num!=null){gurl+="&num="+num;}if(key!=null){gurl+="&key="+key;}$.getJSON(gurl,function(data){if(typeof fnk=="function"){fnk.call(this,data.responseData.feed);}else{return false;}});}});})(jQuery);

(function($) {
	if ($('ul#ajat').length != 0) {
		$.jGFeed('https://www.google.com/calendar/feeds/asteriskiry%40gmail.com/public/full-noattendees?futureevents=true&singleevents=true&orderby=starttime&sortorder=ascending', function(feeds){
	  		// Check for errors
	  		if(!feeds){
	    		// there was an error
	    		return false;
	  		}
	  		// do whatever you want with feeds here
	  		console.log(feeds);
		}, 5);
	}
	function kaunistaAika(aikaleima) {
		var days = ['Su','Ma','Ti','Ke','To','Pe','La'];
		var myDate = new Date(aikaleima);
		var dayOfWeek = days[myDate.getDay()]; // dayOfWeek == 'Tuesday'
		var apu = aikaleima.split('-');
		return dayOfWeek + ' ' + apu[2] + '.' + apu[1] + '.' + apu[0];
	}
})(jQuery);