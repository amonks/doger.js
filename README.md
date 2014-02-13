#	doger.js

##	convert any article into a doge image

doger.js is a javascript thingy to convert online articles into doge meme images.

given an article url, it should find keywords in the article to use in doge-phrases, and then superimpose those doge-phrases over the main article image in rainbow comic sans.

## tests

[Run the tests!](http://amonks.github.io/doger.js)

## ideas

### don't try to find an image on the page, use a generic doge photo

*	not every article has an image

*	if it does it's often not large enough

*	it's hard to find the most important one without making a bunch of requests

*	does it even make sense to use an article image as the background for a doge meme

*	easy preset text locations to not block key parts of image

### don't generate an image, overlay text using css

*	generating images on the client side seems like it might be hard(??)

### make server/api 

*	doger.co/[articleurl] should return a page with the finished doge meme

*	maybe allow text input too at doger.co/text/[string]

## props

Thanks to linguist Gretchen McCulloch for [explaining](http://the-toast.net/2014/02/06/linguist-explains-grammar-doge-wow/) doge grammar

## original pseudocode

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