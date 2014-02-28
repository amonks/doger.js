// doger.js
// translate any text into doge
// andrew monks 2014

Doger = {

    // Doge generator functions

        // main function to return a completed doge meme image based on a given article url
        // accepts a container for the embed code as an optional third argument
            doger: function(container, keywords) {
                // do the stuff!
                // choose a shiba inu
                var image = Doger.doge_image();
                // generate doge phrases from the keywords
                var doge_text = Doger.keywords_to_doge_text(keywords);
                // generate a divdoge
                var output = Doger.make_doge_html(image, doge_text);
                // add it to the given container
                output.clone().appendTo(container);
                // check for optional embed code argument
                if (arguments.length >= 3) {
                    // generate an embed code
                    var embed = $('<div>').append(output.clone()).html();
                    arguments[2].text(embed);
                }
                // return the image and the doge_text (since they're unique to this doge)
                return {image: image, doge_text: doge_text};
            },

        // function to return an array of relevant doge phrases given a long string
        // see http://the-toast.net/2014/02/06/linguist-explains-grammar-doge-wow/
            keywords_to_doge_text: function(keywords) {
                // shuffle the keywords
                keywords = Doger.shuffle_array(keywords);
                // create an output array
                var output = [];
                // add keywords to it
                for (var i = 0; i <= keywords.length - 1; i++) {
                    output.push(Doger.random_from_array(Doger.doge_words) + " " + keywords[i].toLowerCase());
                };
                // add end word
                output.push(Doger.random_from_array(Doger.doge_end_words));
                return output;
            },

        // function to return a completed scalable html doge meme from a given image and array of doge phrases
        // superimpose the text over the image in rainbow comic sans <span> tags
            make_doge_html: function(image, doge_text) {
                // start with the basics, container + background image
                var div = $("<div class='doger'><img src='" + image.url + "'class='img-rounded' /></div>");
                // otherwise add css
                // div responsively preserves image aspect ratio
                // there's an a list apart article about this, for reference
                div.find('img').css({
                    "position": "absolute",
                    "top": "0",
                    "left": "0",
                    "width": "100%",
                    "height": "100%"
                });
                div.css({
                    "font-family": "'Comic Sans', 'Comic Sans MS', 'Marker Felt', cursive",
                    "font-weight": "bold",
                    "font-size": "20px",
                    "position": "relative",
                    "width": "100%",
                    "height": "0",
                    // here's where the aspect ratio magic happens
                    "padding-bottom": "" + (image.height / image.width) * 100 + "%"
                });
                // if there's no text, stop there
                if (doge_text.length <= 1) {
                    return div
                };
                // otherwise add the text
                for (var i = 0; i <= doge_text.length - 1; i++) {
                    // in spans!
                    var span = $("<span class='dogetext'>" + doge_text[i] + "</span>");
                    // at random x percentages!
                    var x = Math.random() * 100 * .75;
                    // and evenly dispersed y percentages!
                    var y = i * (100 / doge_text.length);
                    // generate text colors
                    var color = Doger.random_color();
                    var shadow = Doger.random_color();
                    // apply css
                    span.css({
                        "position": "absolute",
                        "top": "" + y + "%",
                        "left": "" + x + "%",
                        "text-shadow" : "1px 1px" + shadow,
                        "color": color
                    });
                    // add our span to the div
                    div.append(span);
                };
                return div;
            },

        // function to return a completed doge meme image from a given image and array of doge phrases
        // superimpose the text over the image in rainbow comic sans
            make_doge_image: function(image, doge_text) {
                // I ought to load the image here properly with a callback, but intsead I'm assuming that'll happen before this is called...
                // start with the image
                var imageElement = $("<img src='" + image.url + "'class='img-rounded' />").get(0);
                // then make an image-shaped canvas
                var canvas = $("<canvas width='"+ image.width +"' height='"+ image.height +"'></canvas>").get(0);
                var context = canvas.getContext("2d");
                // draw the image to it
                context.drawImage(imageElement, 0, 0);
                // and if there's no text, we're good.
                if (doge_text.length <= 1) {
                    return canvas.toDataURL("image/png");
                };
                // if there is text, add it.
                context.font = "bold 28px 'Comic Sans', 'Comic Sans MS', 'Marker Felt', cursive";
                for (var i = 0; i <= doge_text.length - 1; i++) {
                    // here we position with pixels rather than percents cuz nonresponsive :(
                    var x = Math.random() * image.width * .75;
                    var y = i * (image.height / doge_text.length) + (image.height / doge_text.length) / 2;
                    // write the shadow
                    context.fillStyle = Doger.random_color();
                    context.fillText(doge_text[i], x + 2, y + 2)
                    // then the text over it
                    context.fillStyle = Doger.random_color();
                    context.fillText(doge_text[i], x, y)
                };
                var dataURI = canvas.toDataURL("image/png");
                var blobURI = Doger.make_url_from_data(dataURI);
                return {
                    dataURI: dataURI,
                    blobURI: blobURI
                };
            },

        // function to return an object with a doge image url, a height, and a width
            doge_image: function() {
                doge_images = [
                    // {
                    //     url: "http://doge.needsyourhelp.org/images/shiba-inu_01_lg.jpg",
                    //     width: 622,
                    //     height: 352
                    // }, 
                    // {
                    //     url: "http://doge.needsyourhelp.org/images/Shiba-Inu-Main.jpg",
                    //     width: 461,
                    //     height: 400
                    // }, 
                    {
                        url: "http://doge.needsyourhelp.org/images/shiba-inu-puppies-pictures.jpg",
                        width: 922,
                        height: 922
                    }, 
                    {
                        url: "http://doge.needsyourhelp.org/images/001.jpg",
                        width: 1023,
                        height: 1024
                    }, 
                    {
                        url: "http://doge.needsyourhelp.org/images/Taisen_Shikaki_Inu.jpg",
                        width: 800,
                        height: 994
                    }, 
                    {
                        url: "http://doge.needsyourhelp.org/images/running-shiba-inu-dog-photo.jpg",
                        width: 1440,
                        height: 934
                    }, 
                    {
                        url: "http://doge.needsyourhelp.org/images/12_11_10-031.jpg",
                        width: 1600,
                        height: 1200
                    }, 
                    {
                        url: "http://doge.needsyourhelp.org/images/shiba-inu-21.jpg",
                        width: 1000,
                        height: 1000
                    }, 
                    {
                        url: "http://doge.needsyourhelp.org/images/Japanese_shiba_inu__shiba_dog__by_MogamiJ.jpg",
                        width: 1024,
                        height: 768
                    }, 
                    {
                        url: "http://doge.needsyourhelp.org/images/1024px-Taka_Shiba.jpg",
                        width: 1024,
                        height: 768
                    }, 
                    {
                        url: "http://doge.needsyourhelp.org/images/c09.jpg",
                        width: 1280,
                        height: 960
                    }, 
                    // {
                    //     url: "http://doge.needsyourhelp.org/images/shiba-inu_04_lg.jpg",
                    //     width: 622,
                    //     height: 352
                    // }
                ]
                return Doger.random_from_array(doge_images);
            },

    // keyword generator functions

        // function to return identifying keywords from a given article url
            keywords_from_url: function(url) {
                // get keywords from article
                // using yahoo content analysis api
                // see http://developer.yahoo.com/contentanalysis/
                var query = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20contentanalysis.analyze%20where%20url%3D%22" + escape(url) + "%22&diagnostics=true";
                var response = $(Doger.http_get(query)); // http_getdefined below
                // keywords are listed inside <entity><text></text></entity> within the response
                // n.b. it also provides a confidence score for each keyword
                var keywords = response.find("entity");
                var output = []
                for (var i = 0; i <= keywords.length - 1;  i++) {
                    output.push($(keywords[i]).find('text').text());
                };
                return output
            },

        // function to return identifying keywords from a given article text
            keywords_from_text: function(text) {
                // get keywords from article
                // using yahoo content analysis api
                // see http://developer.yahoo.com/contentanalysis/
                var query = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20contentanalysis.analyze%20where%20text%3D%22" + encodeURI(text.replace(/[^a-zA-Z ]+/g, '')) + "%22&diagnostics=true";
                var response = $(Doger.http_get(query)); // http_getdefined below
                // keywords are listed inside <entity><text></text></entity> within the response
                // n.b. it also provides a confidence score for each keyword
                var keywords = response.find("entity");
                var output = []
                for (var i = keywords.length - 1; i >= 0; i--) {
                    output.push($(keywords[i]).find('text').text());
                };
                // if (output.length == 0) {
                //     var allWords = text.replace(/[^a-zA-Z\d\s:]/, '' ).split(" ");
                //     output = Doger.sort_array_by_frequency(allWords).slice(0,4);
                // };
                return output;
            },

        // // function to return identifying keywords from a given twitter feed
        //     keywords_from_twitter: function(twitterUser) {
        //         var query = "http://twitter.com/" + twitterUser;
        //         var twitterFrame = $("<iframe src='" + query + "'></iframe>")
        //         twitterFrame.css({
        //             "display":"none",
        //         });
        //         var response = $(".tweet-text", window.parent.frames[0].document);
        //         var text = "";
        //         for ( var i = 0; i <= response.length - 1; i++) { 
        //             text = text + $(response[i]).text() 
        //         }
        //         text = text.split(" ");
        //         for (var i = text.length - 1; i >= 0; i--) {
        //             if ( text[i].match("http://") ) {
        //                 text.splice(i,1);
        //             } else {
        //                 console.log(text[i]);
        //             };
        //         };
        //         text = text.join(" ");
        //         console.log(text);

        //         // get keywords from twitter feed
        //         // using yahoo content analysis api
        //         // see http://developer.yahoo.com/contentanalysis/
        //         var query = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20contentanalysis.analyze%20where%20text%3D%22" + encodeURI(text.replace(/[^a-zA-Z ]+/g, '')) + "%22&diagnostics=true";
        //         var response = $(Doger.http_get(query)); // http_getdefined below
        //         // keywords are listed inside <entity><text></text></entity> within the response
        //         // n.b. it also provides a confidence score for each keyword
        //         var keywords = response.find("entity");
        //         var output = []
        //         for (var i = keywords.length - 1; i >= 0; i--) {
        //             output.push($(keywords[i]).find('text').text());
        //         };
        //         return output
        //     },

    // Utilities
        // bookmarklet function
        // the bookmarklet loads doger.js, and then calls this function. This is where its functionality lives.
            bookmarklet: function() {
                // load jquery
                // I should check and see if it's loaded first...
                Doger.load_script("http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js", function() {
                    // get selected text on page
                    var text = Doger.get_selected_text();
                    // find keywords
                    var keywords = Doger.keywords_from_text(text);
                    if (keywords.length > 0) {
                        // if there are some, do the thing
                        var url = "http://doge.needsyourhelp.org" + "?" + btoa(keywords);                    
                        window.location = url;
                    } else {
                        // otherwise complain
                        alert("no keywords found");
                    }
                });  
            },

        // function to get the currently selected text on a page
        // from stackoverflow
            get_selected_text: function() {
                var text = "";
                if (window.getSelection) {
                    text = window.getSelection().toString();
                } else if (document.selection && document.selection.type != "Control") {
                    text = document.selection.createRange().text;
                }
                return text;
            },

        // function to get the current query string (anything in the location bar after a '?'), and de-base64 it.
            get_query_string: function() {
                if (window.location.href.indexOf('?') == -1) {
                    // if there's no '?', there's no query string...
                    return null;
                };
                // otherwise get everything after it.
                var queryString = window.location.href.slice(window.location.href.indexOf('?') + 1);
                if (queryString.length <= 1) {
                    return null;
                }
                return atob(queryString);
            },

        // function to decode a base-64 encoded array of keywords in a query string
        // accept an optional backup argument to return if there are no keywords, otherwise return null
            get_keywords_from_query_string: function() {
                var query_string = Doger.get_query_string();
                if (query_string !== null) {
                    // if there's a query, use it
                    var keywords = query_string.split(',');
                    return keywords;
                } else {
                    if (arguments.length > 0){
                        // if there's a backup, use that
                        return arguments[0];
                    } else {
                        // otherwise return null
                        return null;
                    };
                };
            },

        // function to check if a string is a url
            check_for_url: function(string) {
                // only matches for "http://" which is pretty minimal.
                var pattern = new RegExp('^(https?:\\/\\/)','i'); // fragment locator
                if(!pattern.test(string)) {
                    return false;
                } else {
                    return true;
                }
            },

        // function to GET a url
        // this ALMOST NEVER works in real life
        // see http://en.wikipedia.org/wiki/Same-origin_policy
            http_get: function(theUrl) {
                if (Doger.check_for_url(theUrl) == false) {
                    return null;
                };
                var xmlHttp = null;

                xmlHttp = new XMLHttpRequest();
                xmlHttp.open("GET", theUrl, false);
                xmlHttp.send(null);
                return xmlHttp.responseText;
            },

        // function to sort an array by frequency of its elements
            sort_array_by_frequency: function(array) {
                var frequency = {};

                array.forEach(function(value) { frequency[value] = 0; });

                var uniques = array.filter(function(value) {
                    return ++frequency[value] == 1;
                });

                return uniques.sort(function(a, b) {
                    return frequency[b] - frequency[a];
                });
            },

        // function to return a random member of a given array
            random_from_array: function(array) {
                return array[Math.floor(Math.random() * array.length)];
            },

        // classic fisher-yates shuffle
        // from stackoverflow
            shuffle_array: function(array) {
                var currentIndex = array.length, temporaryValue, randomIndex;

                // While there remain elements to shuffle...
                while (0 !== currentIndex) {

                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;

                    // And swap it with the current element.
                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }

                return array;
            },

        // classic fisher-yates shuffle
        // from stackoverflow
            remove_stopwords_from_array: function(array) {
                for (var i = array.length - 1; i >= 0; i--) {
                    array[i] = array[i].toLowerCase();
                };
                var all = Doger.union_arrays(array, Doger.stopwords);
                var common = Doger.intersection_arrays(array, Doger.stopwords);

                var out = Doger.difference_arrays(array, common);

                return out;
            },

        // compute union of two arrays
        // from http://stackoverflow.com/questions/3629817/getting-a-union-of-two-arrays-in-javascript
            union_arrays: function(x, y) {
                var obj = {};
                for (var i = x.length-1; i >= 0; -- i)
                    obj[x[i]] = x[i];
                for (var i = y.length-1; i >= 0; -- i)
                    obj[y[i]] = y[i];
                var res = []
                for (var k in obj) {
                if (obj.hasOwnProperty(k))  // <-- optional
                    res.push(obj[k]);
                }
                return res;
            },

        // compute intersection of two arrays
        // from http://stackoverflow.com/questions/1885557/simplest-code-for-array-intersection-in-javascript
            intersection_arrays: function(array1, array2) {
                return array1.filter(function(n) {
                    return array2.indexOf(n) != -1;
                });
            },

        // compute difference of two arrays
        // from http://stackoverflow.com/questions/1187518/javascript-array-difference
            difference_arrays: function(array1, array2) {
                return array1.filter(function(i) {return !(array2.indexOf(i) > -1);});
            },

        // function to return a random hex color, needed by make_doge_html()
        // classic elegant solution from http://paulirish.com/2009/random-hex-color-code-snippets/
            random_color: function() {
                return '#' + Math.floor(Math.random() * 16777215).toString(16);
            },

        // function to load a script and hit a callback when done
        // from stackoverflow
            load_script: function(url, callback) {
                var head = document.getElementsByTagName("head")[0];
                var script = document.createElement("script");
                script.src = url;

                // Attach handlers for all browsers
                var done = false;
                script.onload = script.onreadystatechange = function()
                {
                    if( !done && ( !this.readyState 
                                || this.readyState == "loaded" 
                                || this.readyState == "complete") )
                    {
                        done = true;

                        // Continue your code
                        callback();

                        // Handle memory leak in IE
                        script.onload = script.onreadystatechange = null;
                        head.removeChild( script );
                    };
                };

                head.appendChild(script);
            },

        // function to load an image and hit a callback when it's done
            load_image: function(src, callback) {
                var sprite = new Image();
                sprite.onload = callback;
                sprite.src = src;
            },

        // function to force-download from a data uri as a filename
        // nb the download="filename" attribute isn't yet supported by safari
            download_data_uri: function(dataURI, fileName) {
                var tempUrl = Doger.make_url_from_data(dataURI);
                var link = $('<a href="' + tempUrl +'" id="download" download="' + fileName + '" target="_blank"> </a>' );
                $("body").append(link);
                $("#download").get(0).click();
            },

        // function to generate a temporary browser index url for a datauri
        // if a data-uri is larger than 2mb, chrome's address bar can't handle it.
        // fortunately, you can blob it and then use a temporary blob url
            make_url_from_data: function(dataURI) {
                var blob = Doger.make_blob(dataURI);
                var tempUrl = URL.createObjectURL(blob);
                return tempUrl;
            },

        // function to convert a datauri to a blob
        // I'm not totally sure what a blob is, but apparantly they can hold binary data and generate temporary urls.
            make_blob: function(dataURI) {
                // convert base64 to raw binary data held in a string
                // doesn't handle URLEncoded DataURIs
                var byteString;
                if (dataURI.split(',')[0].indexOf('base64') >= 0)
                    byteString = atob(dataURI.split(',')[1]);
                else
                    byteString = unescape(dataURI.split(',')[1]);
                // separate out the mime component
                var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

                // write the bytes of the string to an ArrayBuffer
                var ab = new ArrayBuffer(byteString.length);
                var ia = new Uint8Array(ab);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                };

                // write the ArrayBuffer to a blob, and you're done
                return new Blob([ab],{type: mimeString});
            },

    // non-function objects

        // doge 
            doge_words: ["such", "much", "very", "many", "so", "how"],
            doge_end_words: ["wow", "amaze", "excite"],
            stopwords: ["he", "she", "a", "the", "and", "if", "or", "not"],
}
