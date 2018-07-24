/* Require Variables */
require("dotenv").config();
var spotifyAPI = require("node-spotify-api");
var twitterAPI = require("twitter");
var keys = require("./keys");

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
        switch (command) {
            case 'my-tweets' :
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
                break;
            case 'do-what-it-says' :
                console.log("\nDo What It Says :");
                break;
            default :
                console.log("\nThis doesn't make sense to me. \nPlease command me with 'my-tweets', 'spotify-this-song <SONGNAME>', 'movie-this <MOVIENAME>', or 'do-what-it-says'");
        }
    }
    else {
        switch (command) {
            case 'spotify-this-song' :
                var songName = process.argv[3];
                spotify.search({type: 'track', query: songName, limit: 1}, function(err, data) {
                    if (!err) {
                        var songValue = data.tracks.items[0];
                        console.log("\nHere are the results from your song.\n");
                        console.log("Artist(s) : ");
                        for (var i = 0; i < songValue.artists.length; i++){
                            console.log(songValue.artists[i].name);
                        }
                        console.log("\nSong Title :");
                        console.log(songValue.name);
                        console.log("\nPreview the Song Here :");
                        console.log(songValue.preview_url);
                        console.log("\nAlbum :");
                        console.log(songValue.album.name);
                    }
                });
                break;
            case 'movie-this' :
                console.log("\nThis movie is : " + process.argv[3]);
                break;
            default :
                console.log("\nSomething isn't right here. \nPlease command me with 'my-tweets', 'spotify-this-song <SONGNAME>', 'movie-this <MOVIENAME>', or 'do-what-it-says'");
        }
    }
}
else {
    console.log("I do not understand this many commands. Please make this easier for me!");
}