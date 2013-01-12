function getNews() {
	$.getJSON('http://api.twitter.com/1/statuses/user_timeline.json?screen_name=asteriskiry&count=4&include_entities=1&callback=?', function(data){
		parseTweets(data);
	});
}

function parseTweets(data) {

	for (var i = 0; i < data.length; i++) {

		var title = parseTitle(data[i].text);
		var time = parseTime(data[i].created_at);

		var context = {newstime: time, newstitle: title}
    	var html = newstemplate(context);
    	$(".news").append(html).fadeIn(100);
	}

	for (var i = 0; i < data.length; i++) {
		var url = parseUrl(data[i].text);
		$(".qrcode:nth-child(" + i + ")").qrcode(url);
	};
}

function parseTitle(title) {
	var newtitle = '';
	title = title.split(" ");
	for (var i = 1; i < title.length-1; i++) {
		newtitle += title[i];
		newtitle += " ";
	};
	return newtitle;
}

function parseUrl(title) {
	title = title.split(" ");
	var url = title[title.length-1];
	return url;
}

function parseTime(time) {
	time = time.split(" ");
	var day = time[2];
	var month = time[1];
	var month_fi = ['Tammikuuta','Helmikuuta','Maaliskuuta','Huhtikuuta','Toukokuuta','Kesäkuuta','Heinäkuuta', 'Elokuuta', 'Syyskuuta', 'Lokakuuta', 'Marraskuuta', 'Joulukuuta'];
	var month_en = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	for (i=0; i<month.length; i++) {
    	month = month.replace(month_en[i], month_fi[i]);
    }
	var newtime = day + " " + month;
	return newtime;
}



var newssource   = $("#news-template").html();
var newstemplate = Handlebars.compile(newssource);
getNews();