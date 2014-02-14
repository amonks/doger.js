#	doger.js

##	convert any article into a doge image

doger.js is a javascript thingy to convert online articles into doge meme images.

given an article url, it should find keywords in the article to use in doge-phrases, and then superimpose those doge-phrases over the main article image in rainbow comic sans.

## tests

[Run the tests!](http://amonks.github.io/doger.js/test.html)

## props

Thanks to linguist Gretchen McCulloch for [explaining](http://the-toast.net/2014/02/06/linguist-explains-grammar-doge-wow/) doge grammar

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