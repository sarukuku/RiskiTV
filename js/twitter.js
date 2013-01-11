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

		console.log(user);
		console.log(text);
	};
}

getTwitterFeed("turku");