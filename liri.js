/* Require Variables */
require("dotenv").config();
var spotifyAPI = require("node-spotify-api");
var twitterAPI = require("twitter");
var request = require("request");
var keys = require("./keys");
var fs = require("fs");

/* Access APIs and values */
var spotify = new spotifyAPI({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});
var twitter = new twitterAPI({
    consumer_key: keys.twitter.consumer_key,
    consumer_secret: keys.twitter.consumer_secret,
    access_token_key: keys.twitter.access_token_key,
    access_token_secret: keys.twitter.access_token_secret
});

/* Error Checking */
if (process.argv.length == 3 || process.argv.length == 4){
    var command = process.argv[2];
    if (process.argv.length == 3){
        if (command == 'do-what-it-says'){
            fs.readFile("random.txt", "utf8" ,(err, data) => {
                if (!err) {
                    var lines = data.split("\n");
                    var randomCommand = lines[Math.floor(Math.random() * lines.length)];
                    console.log("\nWell, today I feel like doing the following command : '" + randomCommand + "'");
                    if (randomCommand.indexOf(",") != -1) {
                        var command = randomCommand.substring(0, randomCommand.indexOf(","));
                        var argument = randomCommand.substring(randomCommand.indexOf(",") + 2, randomCommand.length-1);
                        four_arguments(command, argument);
                    }
                    else {
                        three_arguments(randomCommand);
                    }
                }
            });
        }
        else {
            three_arguments(command);
        }
    }
    else {
        four_arguments(command, process.argv[3]);
    }
}
else {
    console.log("I do not understand this many commands. Please make this easier for me!");
}

function my_tweets(){
    console.log("\nHere are some of your recent tweets: ");
    var params = {screen_name: 'i_am_loaf_cat'};
    twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            var length = 20;
            if (tweets.length < 20){
                length = tweets.length;
            }
            for (var i = 0; i < length; i ++){
                console.log("\n" + (i+1) + ". Tweet: " + tweets[i].text);
                console.log("Created at: " + tweets[i].created_at.substring(0, 19));
            }
        }
    });
}

function spotify_this(song_name) {
    spotify.search({type: 'track', query: song_name, limit: 1}, function(err, data) {
        if (!err) {
            var songValue = data.tracks.items[0];
            console.log("Artist(s) : ");
            for (var i = 0; i < songValue.artists.length; i++){
                console.log(songValue.artists[i].name);
            }
            console.log("\nSong Title : \n" + songValue.name
            + "\n\nPreview the Song Here : \n" + songValue.preview_url
            + "\n\nAlbum : \n" + songValue.album.name);
        }
    });
}

function movie_this(queryURL) {
    request(queryURL, function (error, response, body) {
        if (!error){
            var movieDetails = JSON.parse(body);
            console.log("Movie Name : \n" + movieDetails.Title
            + "\n\nYear : \n" + movieDetails.Year);
            for (var i = 0; i < movieDetails.Ratings.length; i++){
                if (movieDetails.Ratings[i].Source == "Internet Movie Database"){
                    console.log("\nIMDB Rating : \n" + movieDetails.Ratings[i].Value);
                }
                else if (movieDetails.Ratings[i].Source == "Rotten Tomatoes"){
                    console.log("\nRotten Tomatoes Rating : \n" + movieDetails.Ratings[i].Value);
                }
            }
            console.log("\nCountry where the movie was produced :\n" + movieDetails.Country
            + "\n\nLanguage of the Movie : \n" + movieDetails.Language
            + "\n\nPlot : \n" + movieDetails.Plot
            + "\n\nActors : \n" + movieDetails.Actors);
        }
    });
}

function three_arguments(command){
    switch (command) {
        case 'my-tweets' :
            my_tweets();
            break;
        case 'spotify-this-song' :
            console.log("\nSorry, you didn't really specify anything, but take a look at this song!\n");
            spotify_this("I Want it That Way");
            break;
        case 'movie-this' :
            var movieName = "Mr. Nobody";
            var queryURL = "https://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
            console.log("\nOops, it looks like you didn't request anything. Check out this movie though, it's on Netflix!\n");
            movie_this(queryURL);
            break;
        default :
            console.log("\nThis doesn't make sense to me. \nPlease command me with 'my-tweets', 'spotify-this-song <SONGNAME>', 'movie-this <MOVIENAME>', or 'do-what-it-says'");
    }
}

function four_arguments(command, argument) {
    switch (command) {
        case 'spotify-this-song' :
            console.log("\nHere are the results from your song.\n");
            spotify_this(argument);
            break;
        case 'movie-this' :
            var queryURL = "https://www.omdbapi.com/?t=" + argument + "&y=&plot=short&apikey=trilogy";
            console.log("\nHere are some details about your movie!\n")
            movie_this(queryURL);
            break;
        default :
            console.log("\nSomething isn't right here. \nPlease command me with 'my-tweets', 'spotify-this-song <SONGNAME>', 'movie-this <MOVIENAME>', or 'do-what-it-says'");
    }
}