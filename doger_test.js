// doger_test.js
// translate any text into doge
// andrew monks 2014

var expect = chai.expect;

describe("doger.js", function() {


	describe("Correctly respond to the current query string", function() {
		var currentQueryString = window.location.href.slice(window.location.href.indexOf('?') + 1)
		output = get_query_string();
		if( window.location.href.indexOf('?') == -1 ) {
			it("Should return null if there is no query string", function() {
				expect(output).to.be.null;
			});
		} else {			
			it("Should return a string if there is a query string", function() {
				expect(output).to.be.a('string');
			});
		};
	});


	describe("Check whether something is a url", function() {
		var fakeURLs = [ "hello", "www.example", "http://wwwcom.netmail/", "guacamole/index.html"];
		var realURLs = [ "http://google.com/", "http://jquery-howto.blogspot.com/2009/09/get-url-parameters-values-with-jquery.html?bageldonut=slash&otherstuff", "monks.co", "arduino.cc/doc" ];
		it("should return false for nonurl strings", function() {
			for (var i = fakeURLs.length - 1; i >= 0; i--) {
				expect(check_for_url( fakeURLs[i] )).to.be.false;
			};
		});
		it("should return true for urls", function() {
			for (var i = realURLs.length - 1; i >= 0; i--) {
				expect(check_for_url( realURLs[i] )).to.be.true;
			};
		});
	});


	// *** NEEDS NETWORK CONNECTION TO RUN ***
	describe("Get the keywords from a webpage.", function() {
		describe("http://monks.co", function() {
			var url = "http://monks.co";
			var correctValue = ["Dante Pilkington", "realtime video", "music video", "Andrew Monks", "responsive design", "Andrew Zarins", "Facebook", "Oblique Strategies", "Concord Carlisle Regional High School", "Belgian Man Records", "Belgian Man Records"];
			var output = keywords_from_url(url);
			
			it("Should return a populated array.", function() {
				expect(output).to.be.a('array');
				expect(output).to.have.length.above(0);
			});

			it("Should return the correct keywords.", function() {
				for (var i = correctValue.length - 1; i >= 0; i--) {
					expect(output[i]).to.equal(correctValue[i]);
				};
			});
		});

		describe("Popular Science article", function() {
			var url = "http://www.popsci.com/scitech/article/2009-09/squirt-stem-cell-gel-heals-brain-injuries";
			var output = keywords_from_url(url);
			
			it("Should return a populated array.", function() {
				expect(output).to.be.a('array');
				expect(output).to.have.length.above(0);
			});
		});

		describe("The Economist article", function() {
			var url = "http://www.economist.com/news/books-and-arts/21595883-how-re-engineer-world-measure-man-0";
			var correctValue = ["social physics", "Mr Pentland", "Alex Pentland", "United States", "The Economist"];
			var output = keywords_from_url(url);
			
			it("Should return a populated array.", function() {
				expect(output).to.be.a('array');
				expect(output).to.have.length.above(0);
			});

			it("Should return the correct keywords.", function() {
				for (var i = correctValue.length - 1; i >= 0; i--) {
					expect(output[i]).to.equal(correctValue[i]);
				};
			});
		});
	});

	describe("Get the keywords from text.", function() {
		describe("http://monks.co", function() {
			var url = "http://monks.co";
			var correctValue = ["Dante Pilkington", "realtime video", "music video", "Andrew Monks", "responsive design", "Andrew Zarins", "Facebook", "Oblique Strategies", "Concord Carlisle Regional High School", "Belgian Man Records", "Belgian Man Records"];
			var output = keywords_from_url(url);
			
			it("Should return a populated array.", function() {
				expect(output).to.be.a('array');
				expect(output).to.have.length.above(0);
			});

			it("Should return the correct keywords.", function() {
				for (var i = correctValue.length - 1; i >= 0; i--) {
					expect(output[i]).to.equal(correctValue[i]);
				};
			});
		});

		describe("Popular Science article", function() {
			var url = "http://www.popsci.com/scitech/article/2009-09/squirt-stem-cell-gel-heals-brain-injuries";
			var output = keywords_from_url(url);
			
			it("Should return a populated array.", function() {
				expect(output).to.be.a('array');
				expect(output).to.have.length.above(0);
			});
		});

		describe("The Economist article", function() {
			var url = "http://www.economist.com/news/books-and-arts/21595883-how-re-engineer-world-measure-man-0";
			var correctValue = ["social physics", "Mr Pentland", "Alex Pentland", "United States", "The Economist"];
			var output = keywords_from_url(url);
			
			it("Should return a populated array.", function() {
				expect(output).to.be.a('array');
				expect(output).to.have.length.above(0);
			});

			it("Should return the correct keywords.", function() {
				for (var i = correctValue.length - 1; i >= 0; i--) {
					expect(output[i]).to.equal(correctValue[i]);
				};
			});
		});
	});


	describe("Convert a list of keywords into an array of doge-style strings.", function() {
		var keywords = ["social physics", "Mr Pentland", "Alex Pentland", "United States", "The Economist"];
		var output = keywords_to_doge_text(keywords);

		it("Should return a populated array.", function() {
			expect(output).to.be.a('array');
			expect(output).to.have.length.above(0);
		});

		it("Should return one string per keyword, plus one.", function() {
			expect(output.length).to.equal(keywords.length + 1);
		});

		it("Should return strings that start with doge starting words.", function() {
			var dogeWords = ["such", "much", "very", "many", "so", "how"];
			for (var i = output.length - 2; i >= 0; i--) {
				expect(dogeWords).to.include.members( [ output[i].split(" ")[0] ] );
			};
		});

		it("Should return a doge ending word as the last string.", function() {
			var dogeEndWords = ["wow.", "amaze.", "excite."];
			expect(dogeEndWords).to.include.members( [ output[output.length - 1] ] );
		});

		it("Should return text in all lowercase.", function() {
			for (var i = output.length - 1; i >= 0; i--) {
				expect(output[i]).to.equal(output[i].toLowerCase());
			};
		});
	});


	describe("Pick an Image", function() {
		var output = doge_image();

		// it("Should return a url.", function() {
		// 	// absurdly overcomplicated regex to too-liberally match urls; from https://gist.github.com/gruber/8891611
		// 	regex = /\b((?:https?:(?:\/{1,3}|[a-z0-9%])|[a-z0-9.\-]+[.](?:com|net|org|edu|gov|mil|aero|asia|biz|cat|coop|info|int|jobs|mobi|museum|name|post|pro|tel|travel|xxx|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cs|cu|cv|cx|cy|cz|dd|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|Ja|sk|sl|sm|sn|so|sr|ss|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)\/)(?:[^\s()<>{}\[\]]+|\([^\s()]*?\([^\s()]+\)[^\s()]*?\)|\([^\s]+?\))+(?:\([^\s()]*?\([^\s()]+\)[^\s()]*?\)|\([^\s]+?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’])|(?:(?<!@)[a-z0-9]+(?:[.\-][a-z0-9]+)*[.](?:com|net|org|edu|gov|mil|aero|asia|biz|cat|coop|info|int|jobs|mobi|museum|name|post|pro|tel|travel|xxx|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cs|cu|cv|cx|cy|cz|dd|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|Ja|sk|sl|sm|sn|so|sr|ss|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)\b\/?(?!@))/i;
		// 	expect(output).to.match(regex);
		// });

		it("Should return an object.", function() {
			expect(output).to.be.a('object');	
		});

		it("Should include a url.", function() {
			expect(output.url).to.be.a('string');	
		});

		it("Should include a height.", function() {
			expect(output.height).to.be.a('number');	
		});

		it("Should include a width.", function() {
			expect(output.width).to.be.a('number');	
		});
	});


	describe("Overlay doge keywords onto image.", function() {
		var image = {
			url: "http://static.ddmcdn.com/en-us/apl/breedselector/images/breed-selector/dogs/breeds/shiba-inu_01_lg.jpg",
			width: 622,
			height: 352
		};
		var doge_text = [ "much test.", "very units.", "much behavioral.", "amaze."];
		var output = make_doge_image(image, doge_text);

		it("Should return an object.", function() {
			expect(output).to.be.a('object');	
		});

		it("Should contain a div classed .doger", function() {
			expect($('<div>').append(output.clone()).html()).to.have.string('<div class="doger"')
			expect($('<div>').append(output.clone()).html()).to.have.string('</div>')
		})

		it("Should contain an image within the div.", function() {
			expect(output.html()).to.have.string('<img');	
		});

		it("Should contain the input text.", function() {
			for (var i = doge_text.length - 1; i >= 0; i--) {
				expect(output.html()).to.have.string(doge_text[i]);	
			};
		});
	});

});
