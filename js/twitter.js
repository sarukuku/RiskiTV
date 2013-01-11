function getTwitterFeed(hash) {
	$.getJSON('http://search.twitter.com/search.json?q=%23' + hash + '&src=hash&callback=?', function(data){
		parseTwitterFeed(data);
	});
}

function parseTwitterFeed(data) {
	var results = data.results;
	for (var i = 0; i < results.length; i++) {

		var user = results[i].from_user;
		var text = results[i].text;
		var imgUrl = results[i].profile_image_url;

		var context = {imgUrl: imgUrl, tweetUser: user, tweetText: text}
    	var html = twittertemplate(context);
    	$(".feed-twitter-container").append(html);
	};
}

var twittersource   = $("#tweet-template").html();
var twittertemplate = Handlebars.compile(twittersource);
getTwitterFeed("turku");