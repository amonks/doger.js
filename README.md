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