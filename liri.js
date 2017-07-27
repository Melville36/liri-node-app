//Get the twitter package (npm install twitter)
var tweetRequest = require("./keys.js");

//Get the spotify package (npm spotify install)
var spotifyRequest = require("node-spotify-api");

//Spotify authentication
var spotify = new spotifyRequest({
  id: "f2c9f9a332c1403684ce09ea189be443",
  secret: "34507a56bb364d379b664cbb37c3577a"
});

//Get the OMDB movie package (npm request install)
var movieRequest = require("request");

// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + liriCommand + "&y=&plot=short&apikey=40e9cece";

//Get the FS package (npm fs install)
var fs = require("fs");

//Get the liri request type
var liriRequest = process.argv[2];

//Get the liri search command if necessary
var liriCommand = process.argv[3];



if(liriRequest === "my-tweets"){
	var params = {q: '@TOTHHomes'};
	tweetRequest.stream('search/tweets ', params, function(error, tweets, response) {
	  if (!error) {
	    console.log(tweets);
	  }
	});
}


if(liriRequest === "spotify-this-song"){
	spotify.search({ type: 'track', query: liriCommand})
		  .then(function(response) {
		    console.log(response);
		  })
		  .catch(function(err) {
		    console.log(err);
		  });
}

if(liriRequest === "movie-this"){
	movieRequest(queryUrl, function(error, response, body) {

	  // If the request is successful
	  if (!error && response.statusCode === 200) {

	    // Parse the body of the site and recover just the imdbRating
	    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
	    console.log("Title: " + JSON.parse(body).Title);
	    console.log("Release Year: " + JSON.parse(body).Year);
	    //console.log("IMDB Rating: " + JSON.parse(body).imdb.rating);
	    //console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
	    console.log("Country: " + JSON.parse(body).Country);
	    console.log("Language: " + JSON.parse(body).Language);
	    console.log("Plot: " + JSON.parse(body).Plot);
	    console.log("Actors: " + JSON.parse(body).Actors);
	     
	  }
	});
}

if(liriRequest === "do-what-it-says"){
	fs.readFile("random.txt", "utf8", function(error, data){
		if(error){
			console.log(error);
		}else{
			var dataArray = data.split(",");
			liriRequest = dataArray[0];
			liriCommand = dataArray[1];
			if(liriRequest === "spotify-this-song"){
					spotify.search({ type: 'track', query: liriCommand})
						  .then(function(response) {
						    console.log(response);
						  })
						  .catch(function(err) {
						    console.log(err);
						  });
			}
		}
	});
}