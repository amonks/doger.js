// doger.js
// translate any text into doge
// andrew monks 2014

// function to return a completed doge meme image based on a given article url
function doger(url) {
	var image = image_from(url);
	var keywords = keywords_from(url);
	var doge_text = keywords_to_doge_text(keywords);
	var output = make_doge_image(image, doge_text);
	return output
};

// function to return a completed doge meme image from a given image and array of doge phrases
// thought: perhaps it'd be easier to generate a unique hash url to a page with the text overlayed using css? but then people can't tumbl...
function make_doge_image(image, doge_text) {
	// superimpose the text over the image in rainbow comic sans

	// dummy output until this function is real
	return {
		image: image,
		doge_text: doge_text
	};
};

// function to return an array of relevant doge phrases given a long string
function keywords_to_doge_text(keywords) {
	var dogeWords = ["such", "much", "very", "many", "so", "how"];
	var dogeEndWords = ["wow", "amaze", "excite"];
	var output = [];
	for (var i = keywords.length - 1; i >= 0; i--) {
		output.push( random_from_array(dogeWords) + " " + keywords[i].toLowerCase() + ". " );
	};
	output.push( random_from_array(dogeEndWords) + ". ");
	return output;
};

// function to return identifying keywords from a given article url
function keywords_from(url) {
	// get keywords from article
	var query = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20contentanalysis.analyze%20where%20url=%27" + escape(url) + "%27";
	var response = httpGet(query);
	var jresponse = $(response);
	var keywords = jresponse.find("entity");
	var output = []
	for (var i = keywords.length - 1; i >= 0; i--) {
		output.push($(keywords[i]).find('text').text());
	};
	return output
};

// function to return the largest image from a given article url
// thought: it seems like this is actually hard. maybe I should use actual doge photos instead?
function image_from(url) {
	// test output
	return "http://monks.co/images/andrew-monks.png";
};

// function to GET a url
function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
};

// function to return a random member of a given array
function random_from_array(array) {
	return array[Math.floor(Math.random()*array.length)];
};