#	doger.js

<a href="http://doge.needsyourhelp.org">![ much doge ](http://doge.needsyourhelp.org/images/logo.png "much doge")</a>

## Description

`http://doge.needsyourhelp.org/js/doger.min.js`

[doger.js](http://doge.needsyourhelp.org/) is a "doge" meme generator. It generates scalable, css-based graphics. Given a block of text or a website url, it uses term extraction to pull out important keywords. Then, it uses the linguistic conventions of the popular "doge" meme to generate phrases based on those keywords.

doger.js is implemented as a javascript library. It's intended to run in the browser, which makes it very portable. doger.js requires jQuery.

## Credits

Thanks to linguist Gretchen McCulloch for [explaining](http://the-toast.net/2014/02/06/linguist-explains-grammar-doge-wow/) doge grammar

Code by [Andrew Monks](http://monks.co)

Released under the [MIT License](http://github.com/amonks/doger.js/blob/gh-pages/LICENSE)

## Tests

[Run the tests!](http://doge.needsyourhelp.org/test.html)

## API

### encoding

The [http://doge.needsyourhelp.org/](website/api) looks at the query string for a base64 encoded array of keywords to generate an image from. Generate a proper query string using `btoa('["keyword1", "keyword2", "keyword3"]');`

### endpoints

There are three endpoints available:

*	`http://doge.needsyourhelp.org/?`: standard generator page with info

*	`http://doge.needsyourhelp.org/image.html?`: redirects to generated png image

*	`http://doge.needsyourhelp.org/embed.html?`: full-width scalable embed

### example

	var keywords = ["API", "endpoints", "query", "base64", "javascript"];
	var encoded = btoa(keywords);

[`'http://doge.needsyourhelp.org/?' + encoded`](http://doge.needsyourhelp.org/?QVBJLGVuZHBvaW50cyxxdWVyeSxiYXNlNjQsamF2YXNjcmlwdA==)

[`'http://doge.needsyourhelp.org/image.html?' + encoded`](http://doge.needsyourhelp.org/image.html?QVBJLGVuZHBvaW50cyxxdWVyeSxiYXNlNjQsamF2YXNjcmlwdA==)

[`'http://doge.needsyourhelp.org/embed.html?' + encoded`](http://doge.needsyourhelp.org/embed.html?QVBJLGVuZHBvaW50cyxxdWVyeSxiYXNlNjQsamF2YXNjcmlwdA==)

## Example

	<div id="dogebox"></div>
	
	<textarea id="embedcode"></textarea>

	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<script src="http://doge.needsyourhelp.org/js/doger.min.js"></script>

	<script>
		var url = "http://cnn.com"
		var keywords = Doger.keywords_from_url(url);
		Doger.doger( $("#dogebox"), keywords, $("#embedcode") )
	</script>

## Functions

doger.js provides a number of functions. The main one for doge-generation is `Doger.doger()`, which you'll need to supply a list of keywords. Doger.js also provides some keyword extraction functions for generating these lists of keywords.

### doge generator functions

#### `doger(container, keywords, embedcontainer)`

This is the main wrapper function, and the only one you'll need to generate doge images. It takes as input a `$('<div>')` to put the doge into, an array of keywords, and an optional `$('<div>')` to put a properly escaped embed code into. It returns html.

#### `keywords_to_doge_text(keywords)`

This function takes an array of keywords (`['Term extraction', 'Memetics', 'JavaScript']`), and returns an array of doge text (`['much term extraction.', 'very memetics.', 'how javascript.', 'wow.']`)

#### `make_doge_html(image, doge_text)`

This function takes an image object (`{ url: "http://doge.needsyourhelp.org/images/shiba_inu.jpg", width: 460, height: 315 }`) and an array of doge text (`['much term extraction.', 'very memetics.', 'how javascript.', 'wow.']`) and it returns a `$('<div>')` with a scalable css-based doger meme image in it.

#### `make_doge_image(image, doge_text)`

This function takes an image object (`{ url: "http://doge.needsyourhelp.org/images/shiba_inu.jpg", width: 460, height: 315 }`) and an array of doge text (`['much term extraction.', 'very memetics.', 'how javascript.', 'wow.']`) and it returns an object with a `dataURI` and a `blobURI` for a PNG image.

#### `doge_image()`

This function chooses one of a pre-populated array of Shiba Inu image objects (`{ url: "http://doge.needsyourhelp.org/images/shiba_inu.jpg", width: 460, height: 315 }`)

#### `get_keywords_from_query_string( [optional, backup, array] )`

This function decodes a base-64 encoded array of keywords in the current query string (everything after a `?` in the URL bar)

It accepts an optional backup argument to return if there are no keywords, otherwise it returns `null`

### keyword extractors

These functions return arrays of keywords (`['Term extraction', 'Memetics', 'JavaScript']`), sorted with the highest-confidence keywords first.

#### `keywords_from_url(url)`

This function finds keywords on a webpage based on a url string.

#### `keywords_from_text(text)`

This function finds keywords in a text string.

### bookmarklet

#### `bookmarklet()`

This is the function called by the bookmarklet. It does a few things:

1. loads jquery

2. gets the selected text on a page

3. extracts the keywords from that text

if there are keywords, it redirects to the api url for those keywords (`"http://doge.needsyourhelp.org" + "?" + btoa(keywords)`).

If there are no keywords, it pops an alert.

### Utility functions

#### `get_selected_text()`

This function returns whatever text is selected in the browser.

#### `get_query_string()`

This function returns the current query string (anything after a `?` in the url bar) or null if there is none.

#### `check_for_url(string)`

This function returns true if a given string looks like a URL, or false if it doesn't.

#### `random_from_array(array)`

This function returns a random item from a passed array.

#### `shuffle_array(array)`

This function shuffles the order of items in a passed array.

#### `random_color()`

This function returns a randomly-selected hex color (eg `"#0ab94f"`).

#### `http_get(url)`

This function sends a `GET` request to the passed URL and returns the results. Note that very few servers are configured to accept these requests, see [wikipedia](http://en.wikipedia.org/wiki/Same-origin_policy).

#### `download_data_uri(dataUri)`

This function takes a dataURI, and forces it to donwload. It gets around Chrome's uri-length-limit by generating a blob.

#### `load_image(imageURI, callback())`

This function loads an image, and hits a callback once the script has loaded.

#### `load_script(scriptURI, callback())`

This function loads an image, and hits a callback once the script has loaded.

#### `make_blob(dataURI)`

This function takes a dataURI, converts it to a blob and returns that blob.

## original pseudocode #nostalgia

	// pseudocode ahead...

	function doger(url)
		content = url.get_article_content
		doge_text = text_to_doge_text(content.body)
		output = make_doge_image(content.image, doge_text)

	function make_doge_image(image, doge_text)
		// superimpose the text over the image in rainbow comic sans

	function text_to_doge_text(text)
		dogeWords = ["such", "much", "very", "many", "so"]
		dogeEndWords = ["wow", "amaze", "excite"]
		text.words.each do |word|
			word = word.stem
			if word.part_of_speech == "noun" or "verb"
				word_rarity[word] = word.rarity
		word_rarity.sort_by_value
		word_rarity.first(8) do |word|
			output.push( dogeEndWords[random] + word )
		return output



	function URL.get_article_content
		// readability or instapaper api or something
		// should return an image url and a string with the article body

	function String.stem
		// porter stemmer

	function String.part_of_peech
		// wordnet lookup probably

	function String.rarity
		// there has to be an api for this...