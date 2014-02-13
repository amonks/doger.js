// doger.js
// translate any text into doge
// andrew monks 2014

// main function to return a completed doge meme image based on a given article url
function doger(string) {
	// if the argument isn't a url, try to get a url from the query string
	var url = string;
	if ( check_for_url(string) == false ) {
		// if the query string isn't a url, use a default one
		if ( check_for_url(get_query_string()) == false ) {
			var url = 'http://monks.co';
		} else {
			var url = get_query_string();
		};
	};
	// var image = image_from(url);
	// var keywords = keywords_from(url);
	// var doge_text = keywords_to_doge_text(keywords);
	// var output = make_doge_image(image, doge_text);
	return url;
};

// function to return a completed doge meme image from a given image and array of doge phrases
// thought: perhaps it'd be easier to generate a unique hash url to a page with the text overlayed using css? but then people can't tumbl...
function make_doge_image(image, doge_text) {
	// superimpose the text over the image in rainbow comic sans
	// dummy output until this function is real
	return $("<div class='doger'><img src='" + image + "' /></div>");
};

// function to return an array of relevant doge phrases given a long string
function keywords_to_doge_text(keywords) {
	// see http://the-toast.net/2014/02/06/linguist-explains-grammar-doge-wow/
	var dogeWords = ["such", "much", "very", "many", "so", "how"];
	var dogeEndWords = ["wow", "amaze", "excite"];
	var output = [];
	// add keywords
	for (var i = keywords.length - 1; i >= 0; i--) {
		output.push( random_from_array(dogeWords) + " " + keywords[i].toLowerCase() + "." );
	};
	// add end word
	output.push( random_from_array(dogeEndWords) + ".");
	return output;
};

// function to return identifying keywords from a given article url
function keywords_from(url) {
	// get keywords from article
	// using yahoo content analysis api
	// see http://developer.yahoo.com/contentanalysis/
	var query = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20contentanalysis.analyze%20where%20url=%27" + escape(url) + "%27";
	var response = $(httpGet(query)); // httpGetdefined below
	// keywords are listed inside <entity><text></text></entity> within the response
	// n.b. it also provides a confidence score for each keyword
	var keywords = response.find("entity");
	var output = []
	for (var i = keywords.length - 1; i >= 0; i--) {
		output.push($(keywords[i]).find('text').text());
	};
	return output
};

// function to get the current query string (anything in the location bar after a '?')
function get_query_string() {
	if (window.location.href.indexOf('?') == -1) {
		return null;
	} else {
		var queryString = window.location.href.slice(window.location.href.indexOf('?') + 1);
		return queryString;
	};
}

// function to check if a string is a url
function check_for_url(string) {
	return true;
}

// function to return the largest image from a given article url
// thought: it seems like this is actually hard. maybe I should use actual doge photos instead?
function image_from(url) {
	// dummy output
	return "http://static.ddmcdn.com/en-us/apl/breedselector/images/breed-selector/dogs/breeds/shiba-inu_01_lg.jpg";
};

// function to GET a url, needed by keywords_from()
function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
};

// function to return a random member of a given array, needed by keywords_to_doge_text()
function random_from_array(array) {
	return array[Math.floor(Math.random()*array.length)];
};