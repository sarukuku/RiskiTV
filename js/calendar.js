function getCalendar() {
	$.getJSON('http://www.google.com/calendar/feeds/asteriskiry@gmail.com/public/full?alt=json-in-script&max-results=4&orderby=starttime&singleevents=true&futureevents=true&sortorder=ascending&callback=?', function(data){
		parseCalendar(data);
	});
}

function parseCalendar(data) {
	var entry = data.feed.entry;
	//console.log(entry);
	for (var i = 0; i < entry.length; i++) {

		var date = formatDate(entry[i].gd$when[0].startTime);
		var time = formatTime(entry[i].gd$when[0].startTime);
		var location = entry[i].gd$where[0].valueString;
		var title = entry[i].title.$t;

		console.log(date);
		console.log(time);
		console.log(location);
		console.log(title);

		var context = {caldate: date, caltime: time, callocation: location, caltitle: title}
    	var html = template(context);
    	$(".calender").append(html).fadeIn(100);
	}
}

function formatTime(timestamp) {
  var arr = timestamp.split("T");
  var time = '';
  if (arr.length > 1) {
    time = arr[1].split(":");
    time = time[0] + ":" + time[1];
  };
  return time;
}

function formatDate(timestamp) {
  var arr = timestamp.split("T");
  var date = arr[0].split("-");
  var day = date[2];
  var month = date[1];
  var year = date[0];
  return day + "." + month + "." + year;
}

var source   = $("#cal-template").html();
var template = Handlebars.compile(source);
getCalendar();