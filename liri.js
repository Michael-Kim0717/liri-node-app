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

/* Get current date and time from doing certain commands */
var currentdate = new Date(); 
var datetime = "performed: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

var commandString = "";
for (var i = 2; i < process.argv.length; i++){
    commandString += process.argv[i] + " ";
}
commandString += datetime;
fs.appendFile("./log.txt", commandString + "\n", function(){});

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
    console.log("\n============================================================================");
    fs.appendFile("./log.txt", "\n============================================================================", function(){});
    console.log("I do not understand this many commands. Please make this easier for me!");
    fs.appendFile("./log.txt", "\nI do not understand this many commands. Please make this easier for me!\n", function(){});
    console.log("============================================================================");
    fs.appendFile("./log.txt", "============================================================================\n\n", function(){});
}

function my_tweets(){
    console.log("\n============================================================================");
    fs.appendFile("./log.txt", "\n============================================================================\n", function(){});
    console.log("Here are some of your recent tweets for user 'i_am_loaf_cat': ");
    fs.appendFile("./log.txt", "Here are some of your recent tweets for user 'i_am_loaf_cat': ", function(){});
    var params = {screen_name: 'i_am_loaf_cat'};
    twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            var length = 20;
            if (tweets.length < 20){
                length = tweets.length;
            }
            for (var i = 0; i < length; i ++){
                console.log("\n" + (i+1) + ". Tweet: " + tweets[i].text);
                fs.appendFile("./log.txt", "\n" + (i + 1) + ". Tweet: " + tweets[i].text + "\n", function(){});
                console.log("Created at: " + tweets[i].created_at.substring(0, 19));
                fs.appendFile("./log.txt", "Created at: " + tweets[i].created_at.substring(0, 19) + "\n", function(){});
            }
        }
        console.log("============================================================================");
        fs.appendFile("./log.txt", "============================================================================\n\n", function(){});
    });
}

function spotify_this(song_name) {
    spotify.search({type: 'track', query: song_name, limit: 1}, function(err, data) {
        if (!err) {
            var songValue = data.tracks.items[0];
            console.log("Artist(s) : ");
            fs.appendFile("./log.txt", "\nArtist(s) : \n", function(){}); 
            for (var i = 0; i < songValue.artists.length; i++){
                console.log(songValue.artists[i].name);
                fs.appendFile("./log.txt", songValue.artists[i].name + "\n", function(){}); 
            }
            console.log("\nSong Title : \n" + songValue.name
            + "\n\nPreview the Song Here : \n" + songValue.preview_url
            + "\n\nAlbum : \n" + songValue.album.name);
            fs.appendFile("./log.txt", "\nSong Title : \n" + songValue.name
            + "\n\nPreview the Song Here : \n" + songValue.preview_url
            + "\n\nAlbum : \n" + songValue.album.name, function(){}); 
        }
        console.log("============================================================================");
        fs.appendFile("./log.txt", "\n============================================================================\n\n", function(){}); 
    });
}

function movie_this(queryURL) {
    request(queryURL, function (error, response, body) {
        if (!error){
            var movieDetails = JSON.parse(body);
            console.log("Movie Name : \n" + movieDetails.Title
            + "\n\nYear : \n" + movieDetails.Year);
            fs.appendFile("./log.txt", "\nMovie Name : \n" + movieDetails.Title + "\n\nYear : \n" + movieDetails.Year + "\n", function(){});
            for (var i = 0; i < movieDetails.Ratings.length; i++){
                if (movieDetails.Ratings[i].Source == "Internet Movie Database"){
                    console.log("\nIMDB Rating : \n" + movieDetails.Ratings[i].Value);
                    fs.appendFile("./log.txt", "\nIMDB Rating : \n" + movieDetails.Ratings[i].Value + "\n", function(){});
                }
                else if (movieDetails.Ratings[i].Source == "Rotten Tomatoes"){
                    console.log("\nRotten Tomatoes Rating : \n" + movieDetails.Ratings[i].Value);
                    fs.appendFile("./log.txt", "\nRotten Tomatoes Rating : \n" + movieDetails.Ratings[i].Value + "\n", function(){});
                }
            }
            console.log("\nCountry where the movie was produced :\n" + movieDetails.Country
            + "\n\nLanguage of the Movie : \n" + movieDetails.Language
            + "\n\nPlot : \n" + movieDetails.Plot
            + "\n\nActors : \n" + movieDetails.Actors);
            fs.appendFile("./log.txt", "\nCountry where the movie was produced :\n" + movieDetails.Country
            + "\n\nLanguage of the Movie : \n" + movieDetails.Language
            + "\n\nPlot : \n" + movieDetails.Plot
            + "\n\nActors : \n" + movieDetails.Actors + "\n", function(){});
        }
        console.log("============================================================================");
        fs.appendFile("./log.txt", "============================================================================\n\n", function(){});
    });
}

function three_arguments(command){
    switch (command) {
        case 'my-tweets' :
            my_tweets();
            break;
        case 'spotify-this-song' :
            console.log("\n============================================================================");
            fs.appendFile("./log.txt", "\n============================================================================\n", function(){}); 
            console.log("Sorry, you didn't really specify anything, but take a look at this song!\n");
            fs.appendFile("./log.txt", "Sorry, you didn't really specify anything, but take a look at this song!\n", function(){}); 
            spotify_this("I Want it That Way");
            break;
        case 'movie-this' :
            console.log("\n============================================================================");
            fs.appendFile("./log.txt", "\n============================================================================", function(){});
            var movieName = "Mr. Nobody";
            var queryURL = "https://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
            console.log("Oops, it looks like you didn't request anything. Check out this movie though, it's on Netflix!\n");
            fs.appendFile("./log.txt", "\nOops, it looks like you didn't request anything. Check out this movie though, it's on Netflix!\n", function(){});
            movie_this(queryURL);
            break;
        default :
            console.log("\n============================================================================");
            fs.appendFile("./log.txt", "\n============================================================================", function(){});
            console.log("This doesn't make sense to me. \nPlease command me with 'my-tweets', 'spotify-this-song <SONGNAME>', 'movie-this <MOVIENAME>', or 'do-what-it-says'");
            fs.appendFile("./log.txt", "\nThis doesn't make sense to me. \nPlease command me with 'my-tweets', 'spotify-this-song <SONGNAME>, 'movie-this <MOVIENAME>', or 'do-what-it-says'\n", function(){});
            console.log("============================================================================");
            fs.appendFile("./log.txt", "============================================================================\n\n", function(){});
    }
}

function four_arguments(command, argument) {
    switch (command) {
        case 'spotify-this-song' :
            console.log("\n============================================================================");
            fs.appendFile("./log.txt", "\n============================================================================", function(){});
            console.log("Here are the results from your song.\n");
            fs.appendFile("./log.txt", "\nHere are the results from your song.\n", function(){});
            spotify_this(argument);
            break;
        case 'movie-this' :
            console.log("\n============================================================================");
            fs.appendFile("./log.txt", "\n============================================================================", function(){});
            var queryURL = "https://www.omdbapi.com/?t=" + argument + "&y=&plot=short&apikey=trilogy";
            console.log("Here are some details about your movie!\n");
            fs.appendFile("./log.txt", "\nHere are some details about your movie!\n", function(){});
            movie_this(queryURL);
            break;
        default :
            console.log("\n============================================================================");
            fs.appendFile("./log.txt", "\n============================================================================", function(){});
            console.log("Something isn't right here. \nPlease command me with 'my-tweets', 'spotify-this-song <SONGNAME>', 'movie-this <MOVIENAME>', or 'do-what-it-says'");
            fs.appendFile("./log.txt", "\nSomething isn't right here. \nPlease command me with 'my-tweets', 'spotify-this-song <SONGNAME>, 'movie-this <MOVIENAME>', or 'do-what-it-says'\n", function(){});
            console.log("============================================================================");
            fs.appendFile("./log.txt", "============================================================================\n\n", function(){});
    }
}