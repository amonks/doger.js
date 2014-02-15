// doger.js
// translate any text into doge
// andrew monks 2014

Doger = {

    // Doge generator functions

        // main function to return a completed doge meme image based on a given article url
            doger: function(container, keywords, embedcontainer) {
                // do the stuff!
                var image = Doger.doge_image();
                var doge_text = Doger.keywords_to_doge_text(keywords);
                var output = Doger.make_doge_image(image, doge_text);
                output.clone().appendTo(container);
                var embed = $('<div>').append(output.clone()).html()
                if (embedcontainer) {
                    embedcontainer.text(embed);
                };
                return {image: image, doge_text: doge_text};
            },

        // function to return an array of relevant doge phrases given a long string
            keywords_to_doge_text: function(keywords) {
                keywords = Doger.shuffle_array(keywords);
                // see http://the-toast.net/2014/02/06/linguist-explains-grammar-doge-wow/
                var dogeWords = ["such", "much", "very", "many", "so", "how"];
                var dogeEndWords = ["wow", "amaze", "excite"];
                var output = [];
                // add keywords
                for (var i = 0; i <= keywords.length - 1; i++) {
                    output.push(Doger.random_from_array(dogeWords) + " " + keywords[i].toLowerCase());
                };
                // add end word
                output.push(Doger.random_from_array(dogeEndWords));
                return output;
            },

        // function to return a completed doge meme image from a given image and array of doge phrases
            make_doge_image: function(image, doge_text) {
                // superimpose the text over the image in rainbow comic sans
                var div = $("<div class='doger'><img src='" + image.url + "'class='img-rounded' /></div>");
                if (doge_text.length <= 1) {
                    return div
                };
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
                    "padding-bottom": "" + (image.height / image.width) * 100 + "%"
                });
                for (var i = 0; i <= doge_text.length - 1; i++) {
                    var span = $("<span class='dogetext'>" + doge_text[i] + "</span>");
                    var x = Math.random() * 100 * .75;
                    var y = i * (100 / doge_text.length);
                    var color = Doger.random_color();
                    var shadow = Doger.random_color();
                    span.css({
                        "position": "absolute",
                        "top": "" + y + "%",
                        "left": "" + x + "%",
                        "text-shadow" : "1px 1px" + shadow,
                        "color": color
                    });
                    div.append(span);
                };
                return div;
            },

        // function to return a completed doge meme image from a given image and array of doge phrases
            make_doge_canvas: function(image, doge_text) {
                // superimpose the text over the image in rainbow comic sans
                var imageElement = $("<img src='" + image.url + "'class='img-rounded' />").get(0);
                var canvas = $("<canvas width='"+ image.width +"' height='"+ image.height +"'></canvas>").get(0);
                var context = canvas.getContext("2d");
                context.drawImage(imageElement, 0, 0);
                if (doge_text.length <= 1) {
                    return canvas.toDataUrl("image/png");
                };
                context.font = "bold 28px 'Comic Sans', 'Comic Sans MS', 'Marker Felt', cursive";
                for (var i = 0; i <= doge_text.length - 1; i++) {
                    var x = Math.random() * image.width * .6;
                    var y = i * (image.height / doge_text.length) + (image.height / doge_text.length) / 2;
                    context.fillStyle = Doger.random_color();
                    context.fillText(doge_text[i], x + 2, y + 2)
                    context.fillStyle = Doger.random_color();
                    context.fillText(doge_text[i], x, y)
                };
                return canvas.toDataURL("image/png");
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
                var response = $(Doger.httpGet(query)); // httpGetdefined below
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
                var response = $(Doger.httpGet(query)); // httpGetdefined below
                // keywords are listed inside <entity><text></text></entity> within the response
                // n.b. it also provides a confidence score for each keyword
                var keywords = response.find("entity");
                var output = []
                for (var i = keywords.length - 1; i >= 0; i--) {
                    output.push($(keywords[i]).find('text').text());
                };
                return output
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
        //         var response = $(Doger.httpGet(query)); // httpGetdefined below
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
            bookmarklet: function() {
                Doger.loadScript("http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js", function() {
                    var text = Doger.get_selected_text();
                    var keywords = Doger.keywords_from_text(text);
                    if (keywords.length > 0) {
                        var url = "http://doge.needsyourhelp.org" + "?" + btoa(keywords);                    
                        window.location = url;
                    } else {
                        alert("no keywords found");
                    }
                });  
            },

        // function to get the currently selected text on a page
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
                    return null;
                } else {
                    var queryString = window.location.href.slice(window.location.href.indexOf('?') + 1);
                    return atob(queryString);
                };
            },

        // function to check if a string is a url
            check_for_url: function(string) {
                var pattern = new RegExp('^(https?:\\/\\/)','i'); // fragment locator
                if(!pattern.test(string)) {
                    return false;
                } else {
                    return true;
                }
            },

        // function to convert a datauri to a blob
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

        // function to GET a url, needed by keywords_from_url()
            httpGet: function(theUrl) {
                if (Doger.check_for_url(theUrl) == false) {
                    return null;
                };
                var xmlHttp = null;

                xmlHttp = new XMLHttpRequest();
                xmlHttp.open("GET", theUrl, false);
                xmlHttp.send(null);
                return xmlHttp.responseText;
            },

        // function to return a random member of a given array, needed by keywords_to_doge_text()
            random_from_array: function(array) {
                return array[Math.floor(Math.random() * array.length)];
            },

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

        // function to return a random hex color, needed by make_doge_image()
            random_color: function() {
                return '#' + Math.floor(Math.random() * 16777215).toString(16);
            },

        // function to load a script
            loadScript: function(url, callback) {
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

    // other stuff

        // doge 
            dogeWords: ["such", "much", "very", "many", "so", "how"],
            dogeEndWords: ["wow", "amaze", "excite"],
}
