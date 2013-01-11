function getFoursquare() {
	$.getJSON('https://api.foursquare.com/v2/venues/4c18be3f4b8bd13ae37e4c83?oauth_token=44LWUE4CQIXQOG21DHKXLJQBVNZD4T3AC0HNWWKOJHVWRD0A&v=20130111', function(data){
		parseStats(data);
	});
}

function parseStats(data) {
	var totalCheckins = data.response.venue.stats.checkinsCount;
	var totalVisitors = data.response.venue.stats.usersCount;
	var hereNow = data.response.venue.hereNow.count;

	console.log(totalCheckins);
	console.log(totalVisitors);
	console.log(hereNow);

	var context = {totalCheckins: totalCheckins, totalVisitors: totalVisitors, hereNow: hereNow}
    var html = template(context);
    $(".feed-foursquare-container").append(html);
}


var source   = $("#fsqr-template").html();
var template = Handlebars.compile(source);
getFoursquare();