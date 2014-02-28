// doger_test.js
// translate any text into doge
// andrew monks 2014

var expect = chai.expect;

describe("doger.js", function() {

	describe("Doge Generator Functions", function() {

		describe("Convert a list of keywords into an array of doge-style strings", function() {
			var keywords = ["social physics", "Mr Pentland", "Alex Pentland", "United States", "The Economist"];
			var output = Doger.keywords_to_doge_text(keywords);

			it("should return a populated array", function() {
				expect(output).to.be.a('array');
				expect(output).to.have.length.above(0);
			});

			it("should return one string per keyword, plus one", function() {
				expect(output.length).to.equal(keywords.length + 1);
			});

			it("should return strings that start with doge starting words", function() {
				var dogeWords = ["such", "much", "very", "many", "so", "how"];
				for (var i = output.length - 2; i >= 0; i--) {
					expect(dogeWords).to.include.members( [ output[i].split(" ")[0] ] );
				};
			});

			it("should return a doge ending word as the last string", function() {
				var dogeEndWords = ["wow", "amaze", "excite"];
				expect(dogeEndWords).to.include.members( [ output[output.length - 1] ] );
			});

			it("should return text in all lowercase", function() {
				for (var i = output.length - 1; i >= 0; i--) {
					expect(output[i]).to.equal(output[i].toLowerCase());
				};
			});
		});

		describe("Overlay doge keywords onto image, generating html", function() {
			var image = {
				url: "http://static.ddmcdn.com/en-us/apl/breedselector/images/breed-selector/dogs/breeds/shiba-inu_01_lg.jpg",
				width: 622,
				height: 352
			};
			var doge_text = [ "much test", "very units", "much behavioral", "amaze"];
			var output = Doger.make_doge_html(image, doge_text);

			it("should return an object", function() {
				expect(output).to.be.a('object');	
			});

			it("should contain a div classed .doger", function() {
				expect($('<div>').append(output.clone()).html()).to.have.string('<div class="doger"')
				expect($('<div>').append(output.clone()).html()).to.have.string('</div>')
			})

			it("should contain an image within the div", function() {
				expect(output.html()).to.have.string('<img');	
			});

			it("should contain the input text", function() {
				for (var i = doge_text.length - 1; i >= 0; i--) {
					expect(output.html()).to.have.string(doge_text[i]);	
				};
			});
		});

		describe("Overlay doge keywords onto image, generating a .png", function() {
			var image = {
				url: "http://static.ddmcdn.com/en-us/apl/breedselector/images/breed-selector/dogs/breeds/shiba-inu_01_lg.jpg",
				width: 622,
				height: 352
			};
			var doge_text = [ "much test", "very units", "much behavioral", "amaze"];
			var output = Doger.make_doge_image(image, doge_text);

			it("should return an object", function() {
				expect(output).to.be.a('object');	
			});
			it("should contain a dataURI", function() {
				expect(output.dataURI).to.contain("data:image/png;base64,");
			});
			it("should contain a blobURI", function() {
				expect(output.blobURI).to.contain("blob:");
			});
		});


		describe("Select a Shiba Inu", function() {
			var output = Doger.doge_image();

			// it("should return a url", function() {
			// 	// absurdly overcomplicated regex to too-liberally match urls; from https://gist.github.com/gruber/8891611
			// 	regex = /\b((?:https?:(?:\/{1,3}|[a-z0-9%])|[a-z0-9.\-]+[.](?:com|net|org|edu|gov|mil|aero|asia|biz|cat|coop|info|int|jobs|mobi|museum|name|post|pro|tel|travel|xxx|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cs|cu|cv|cx|cy|cz|dd|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|Ja|sk|sl|sm|sn|so|sr|ss|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)\/)(?:[^\s()<>{}\[\]]+|\([^\s()]*?\([^\s()]+\)[^\s()]*?\)|\([^\s]+?\))+(?:\([^\s()]*?\([^\s()]+\)[^\s()]*?\)|\([^\s]+?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’])|(?:(?<!@)[a-z0-9]+(?:[.\-][a-z0-9]+)*[.](?:com|net|org|edu|gov|mil|aero|asia|biz|cat|coop|info|int|jobs|mobi|museum|name|post|pro|tel|travel|xxx|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cs|cu|cv|cx|cy|cz|dd|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|Ja|sk|sl|sm|sn|so|sr|ss|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)\b\/?(?!@))/i;
			// 	expect(output).to.match(regex);
			// });

			it("should return an object", function() {
				expect(output).to.be.a('object');	
			});

			it("should include a url", function() {
				expect(output.url).to.be.a('string');	
			});

			it("should include a height", function() {
				expect(output.height).to.be.a('number');	
			});

			it("should include a width", function() {
				expect(output.width).to.be.a('number');	
			});
		});
	});

	describe("Keyword Extractors", function() {
		// *** NEEDS NETWORK CONNECTION TO RUN ***

		describe("Get the keywords from a webpage", function() {
			describe("http://monks.co", function() {
				var url = "http://monks.co";
				var correctValue = ["Belgian Man Records", "Belgian Man Records", "Concord Carlisle Regional High School", "Oblique Strategies", "Facebook", "Facebook", "responsive design", "Andrew Monks", "music video", "realtime video"];
				var output = Doger.keywords_from_url(url);
				
				it("should return a populated array", function() {
					expect(output).to.be.a('array');
					expect(output).to.have.length.above(0);
				});

				it("should return the correct keywords", function() {
					for (var i = correctValue.length - 1; i >= 0; i--) {
						expect(output[i]).to.equal(correctValue[i]);
					};
				});
			});

			describe("Popular Science article (fails because the extractor is bad)", function() {
				var url = "http://www.popsci.com/scitech/article/2009-09/squirt-stem-cell-gel-heals-brain-injuries";
				var output = Doger.keywords_from_url(url);
				
				it("should return a populated array", function() {
					expect(output).to.be.a('array');
					expect(output).to.have.length.above(0);
				});
			});

			describe("The Economist article", function() {
				var url = "http://www.economist.com/news/books-and-arts/21595883-how-re-engineer-world-measure-man-0";
				var correctValue = ["Alex Pentland", "The Economist", "The Economist", "Mr Pentland", "social physics", "Social Physics"];
				var output = Doger.keywords_from_url(url);
				
				it("should return a populated array", function() {
					expect(output).to.be.a('array');
					expect(output).to.have.length.above(0);
				});

				// it("should return the correct keywords", function() {
				// 	for (var i = correctValue.length - 1; i >= 0; i--) {
				// 		expect(output[i]).to.equal(correctValue[i]);
				// 	};
				// });
			});
		});

		describe("Get the keywords from text", function() {
			describe("Reptillian blurb", function() {
				var text = "According to British writer David Icke, 5- to 12-foot (1.5–3.7 m) tall, blood-drinking, shape-shifting reptilian humanoids from the Alpha Draconis star system, now hiding in underground bases, are the force behind a worldwide conspiracy against humanity.[7] He contends that most of the world's leaders are related to these reptilians, including George W. Bush of the United States, and Queen Elizabeth II of the United Kingdom.[8] Icke's conspiracy theories now have supporters in 47 countries and he has given lectures to crowds of up to 6,000.[9][10] American writer Vicki Santillano included it in her list of the 10 most popular conspiracy theories, describing it as the 'wackiest theory' she had encountered.[11] A poll of Americans in 2013 by Public Policy Polling showed that 4% of registered voters believed in David Icke's ideas.[12]";
				var correctValue = ["Vicki Santillano", "reptilian humanoids", "British writer David Icke", "underground bases", "Alpha Draconis star system", "David Ickes", "worldwide conspiracy", "George W Bush", "conspiracy theories", "Queen Elizabeth II of the United Kingdom Ickes"];
				var output = Doger.keywords_from_text(text);
				
				it("should return a populated array", function() {
					expect(output).to.be.a('array');
					expect(output).to.have.length.above(0);
				});

				it("should return the correct keywords", function() {
					for (var i = correctValue.length - 1; i >= 0; i--) {
						expect(output[i]).to.equal(correctValue[i]);
					};
				});
			});
		});
	});

	describe("Utilities", function() {

		describe("Correctly respond to the current query string", function() {
			var currentQueryString = window.location.href.slice(window.location.href.indexOf('?') + 1)
			output = Doger.get_query_string();
			if( window.location.href.indexOf('?') == -1 ) {
				it("should return null if there is no query string", function() {
					expect(output).to.be.null;
				});
			} else {			
				it("should return a string if there is a query string", function() {
					expect(output).to.be.a('string');
				});
			};
		});


		describe("Check whether something is a url", function() {
			var fakeURLs = [ "hello.com", "breadcam/five.com", "guacamole/index.html"];
			var realURLs = [ "http://google.com/", "http://jquery-howto.blogspot.com/2009/09/get-url-parameters-values-with-jquery.html?bageldonut=slash&otherstuff", "http://monks.co", "http://arduino.cc/doc" ];
			it("should return false for nonurl strings", function() {
				for (var i = fakeURLs.length - 1; i >= 0; i--) {
					expect(Doger.check_for_url( fakeURLs[i] )).to.be.false;
				};
			});
			it("should return true for urls", function() {
				for (var i = realURLs.length - 1; i >= 0; i--) {
					expect(Doger.check_for_url( realURLs[i] )).to.be.true;
				};
			});
		});


		describe("Make a GET request", function() {
			it("should successfully GET a YQL request", function() {
				var query = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20contentanalysis.analyze%20where%20url%3D%22http%3A//monks.co%22&diagnostics=true";
				var out = Doger.http_get(query);
				expect(out).to.be.a("string");
			});
			it("should return null for a non-url", function() {
				var query = "bogusString";
				var out = Doger.http_get(query);
				expect(out).to.be.null;
			});
		});


		describe("Sort an array by the frequency of its contents", function() {
			it("should return the sorted array", function() {
				var array = [1,2,2,2,3,3,3,3,3,4,4,4,4,5,5];
				var expectedOut = [3,4,2,5,1];
				var out = Doger.sort_array_by_frequency(array);
				expect(out).to.be.a("array");
				expect(out.length).to.equal(5);
				for (var i = out.length - 1; i >= 0; i--) {
					expect(out[i]).to.equal(expectedOut[i]);
				};
			});
		});


		describe("Find the union of two arrays", function() {
			it("should return the union", function() {
				var arrayOne = [34, 35, 45, 48, 49];
				var arrayTwo = [48, 55];
				var expectedOut = [34, 35, 45, 48, 49, 55];
				var out = Doger.sort_array_by_frequency(array);
				expect(out).to.be.a("array");
				expect(out.length).to.equal(6);
				// for (var i = out.length - 1; i >= 0; i--) {
				// 	expect(out[i]).to.equal(expectedOut[i]);
				// };
			});
		});



		describe("Choose a random thing from an array", function() {
			it("should return a thing from the array", function() {
				var array = [6,7,8,9,10];
				var out = Doger.random_from_array(array);
				expect(out).to.be.a("number");
				expect(out).to.be.within(6,10);
			});
		});


		describe("Shuffle an array", function() {
			var array = [6,7,8,9,10];
			var out = Doger.shuffle_array(array);
			// function to compare two arrays
			// attach the .compare method to Array's prototype to call it on any array
			Array.prototype.compare = function (array) {
			    // if the other array is a falsy value, return
			    if (!array)
			        return false;

			    // compare lengths - can save a lot of time
			    if (this.length != array.length)
			        return false;

			    for (var i = 0, l=this.length; i < l; i++) {
			        // Check if we have nested arrays
			        if (this[i] instanceof Array && array[i] instanceof Array) {
			            // recurse into the nested arrays
			            if (!this[i].compare(array[i]))
			                return false;
			        }
			        else if (this[i] != array[i]) {
			            // Warning - two different object instances will never be equal: {x:20} != {x:20}
			            return false;
			        }
			    }
			    return true;
			}
			it("should return an array of the same length", function() {
				expect(out.length).to.equal(5);
			});
			it("should contain all of the original items", function() {
				expect(out.length).to.equal(5);
			});
			it("should not return the original array", function() {
				expect(out.compare([6,7,8,9,10])).to.be.false;
			});
		});



		describe("Filter stopwords from an array of words", function() {
			it("should return the same array but with stopwords removed.", function() {
				var array = ["He", "pushed", "me", "and", "I", "fell"];
				var expectedOut = ["pushed", "fell"];
				var out = Doger.remove_stopwords_from_array(array);
				expect(out).to.be.a("array");
				expect(out.length).to.equal(2);
				for (var i = out.length - 1; i >= 0; i--) {
					expect(out[i]).to.equal(expectedOut[i]);
				};
			});
		});


		describe("Find the union of two arrays", function() {
			it("should return the union of two arrays", function() {
				var array1 = [1, 2, 3];
				var array2 = [101, 2, 1, 10];
				var expectedOut = [1, 2, 3, 101, 10];
				var out = Doger.union_arrays(array1, array2);
				expect(out.length).to.equal(5);
				for (var i = expectedOut.length - 1; i >= 0; i--) {
					expect(out.indexOf(expectedOut[i])).to.be.above(-1);
				};
			});
		});


		describe("Find the intersection of two arrays", function() {
				it("should return the intersection of two arrays", function() {
				var array1 = [1, 2, 3];
				var array2 = [101, 2, 1, 10];
				var expectedOut = [1, 2];
				var out = Doger.intersection_arrays(array1, array2);
				expect(out.length).to.equal(expectedOut.length);
				for (var i = expectedOut.length - 1; i >= 0; i--) {
					expect(out.indexOf(expectedOut[i])).to.be.above(-1);
				};
			});
		});


		describe("Find the difference of two arrays", function() {
			it("should return the difference of two arrays", function() {
				var array1 = [1, 2, 3, 4, 5];
				var array2 = [5, 2, 10];
				var expectedOut = [1, 3, 4];
				var out = Doger.difference_arrays(array1, array2);
				expect(out.length).to.equal(expectedOut.length);
				for (var i = expectedOut.length - 1; i >= 0; i--) {
					expect(out.indexOf(expectedOut[i])).to.be.above(-1);
				};
			});
		});


		describe("Generate a random color", function() {
			var out = Doger.random_color();
			it("should return a 7 character string starting with '#'", function() {
				expect(out).to.be.a("string");
				expect(out).to.have.length(7);
				expect(out).to.match(/^\#/);
			});
			it("should return a valid hex color", function() {
				var hex = out.substring(1);
				var integer = parseInt(hex,16)
				expect(integer).to.be.a("number");
				expect(integer).to.be.at.most(16777215);
			});
		});


		// describe("Turn a datauri into a temporary bloburi", function() {
		// 	var image = {
		// 		url: "http://static.ddmcdn.com/en-us/apl/breedselector/images/breed-selector/dogs/breeds/shiba-inu_01_lg.jpg",
		// 		width: 622,
		// 		height: 352
		// 	};
		// 	var doge_text = [ "much test", "very units", "much behavioral", "amaze"];
		// 	Doger.load_image(image.url, function() {
		// 		var dataURI = Doger.make_doge_image(image, doge_text).dataURI;
		// 		var out = Doger.make_blob(dataURI);
		// 		it("should return a blobURI", function() {
		// 			expect(out).to.contain("blob:");
		// 		});
		// 	});
		// });




	});

});
