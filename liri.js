/* Require Variables */
require("dotenv").config();
var keys = require("keys");

/* Access APIs and values */
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

/* Error Checking */
if (process.argv.length == 3 || process.argv.length == 4){
    var command = process.argv[2];
    if (process.argv.length == 3){
        switch (command) {
            case 'my-tweets' :
                console.log("My Tweets :");
                break;
            case 'do-what-it-says' :
                console.log("Do What It Says :");
                break;
            default :
                console.log("This doesn't make sense to me. Please command me with 'my-tweets', 'spotify-this-song <SONGNAME>', 'movie-this <MOVIENAME>', or 'do-what-it-says'");
        }
    }
    else {
        switch (command) {
            case 'spotify-this-song' :
                console.log("This song is : " + process.argv[3]);
                break;
            case 'movie-this' :
                console.log("This movie is : " + process.argv[3]);
                break;
            default :
                console.log("Something isn't right here. Please command me with 'my-tweets', 'spotify-this-song <SONGNAME>', 'movie-this <MOVIENAME>', or 'do-what-it-says'");
        }
    }
}
else {
    console.log("I do not understand this many commands. Please make this easier for me!");
}