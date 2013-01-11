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

/**
 * Creates an unordered list of events in a human-readable form
 *
 * @param {json} root is the root JSON-formatted content from GData
 * @param {string} divId is the div in which the events are added
 */

 // creating calendar template
var source   = $("#cal-template").html();
var template = Handlebars.compile(source);

function listEvents(root, divId) {
  var feed = root.feed;

  // get information from the feed
  for (var i = 0; i < feed.entry.length; i++) {
    var entry = feed.entry[i];
    var title = entry.title.$t;
    var start = entry['gd$when'][0].startTime;
    var location = entry['gd$where'][0].valueString;

    // convert timestamps
    var starttime = formatTime(start);
    var startdate = formatDate(start);

    console.log("Tapahtuma: " + title);
    console.log("Päivämäärä: " + startdate);
    console.log("Alkaa: " + starttime);
    console.log("Paikka: " + location);

    var context = {caldate: startdate, caltime: starttime, callocation: location, caltitle: title}
    var html = template(context);
    $(".calender").append(html);

  }

}

/**
 * Callback function for the GData json-in-script call
 * Inserts the supplied list of events into a div of a pre-defined name
 * 
 * @param {json} root is the JSON-formatted content from GData
 */ 
function insertAgenda(root) {
  listEvents(root, 'agenda');
}
//-->