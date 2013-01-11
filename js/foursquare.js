function getFoursquare() {
	$.getJSON('https://api.foursquare.com/v2/venues/4c18be3f4b8bd13ae37e4c83?oauth_token=44LWUE4CQIXQOG21DHKXLJQBVNZD4T3AC0HNWWKOJHVWRD0A&v=20130111', function(data){
		parseStats(data);
	});
}

function parseStats(data) {
	var totalCheckins = data.response.venue.stats.checkinsCount;
	var totalVisitors = data.response.venue.stats.usersCount;
	var hereNow = data.response.venue.hereNow.count;

	var context = {totalCheckins: totalCheckins, totalVisitors: totalVisitors, hereNow: hereNow}
    var html = fsqrtemplate(context);
    $(".foursquares").append(html).fadeIn(100);
}


var fsqrsource   = $("#fsqr-template").html();
var fsqrtemplate = Handlebars.compile(fsqrsource);
getFoursquare();