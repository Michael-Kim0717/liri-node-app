# liri-node-app

![spotify-this](https://user-images.githubusercontent.com/8729300/46685326-3dc23880-cbc3-11e8-96f9-18daa72b525a.png)

LIRI is a Node based application that has a similar concept to Apple's SIRI, but takes in a constraint of user typed commands to perform certain actions.
Using Node packages to retrieve data from Spotify, Twitter, and OMBD, LIRI takes in certain commands in order to send back movie details, song details, and personal twitter tweets.

### GETTING STARTED

#### BUILT-WITH

```
    
    Languages :
    
    Node
    Javascript
    
    Node Packages :
    
    dotenv : a zero-dependency module that loads environment variables from a .env file into process.env
    node-spotify-api : a simple to use API library for the Spotify REST API
    request : the simplest way possible to make http calls
    twitter : an asynchronous client library for the Twitter REST and Streaming API's
    
```

#### INSTALLATION GUIDE

The following packages need to be installed

```
    npm install dotenv
    npm install node-spotify-api
    npm install request
    npm install twitter
```

### WEBSITE AND IMAGES

#### MY TWEETS

Using the Twitter Node Package, we will output our most recent 20 tweets.

![my-tweets](https://user-images.githubusercontent.com/8729300/46685286-1c614c80-cbc3-11e8-9556-19f4b2afd4f0.png)

#### SPOTIFY-THIS-SONG <SONG-NAME>

Using the Spotify Node Package, we will output the following details of the first song found.
    Song's artist(s)
    Song's title
    A link to the preview of the song
    Song's album
If no song name is given, it will automatically provide the details for the Backstreet Boys "I Want It That Way"

![spotify-this](https://user-images.githubusercontent.com/8729300/46685326-3dc23880-cbc3-11e8-96f9-18daa72b525a.png)

#### MOVIE-THIS <SONG-NAME>

Using the OMDB API along with the Request Node Package, we want to output the following details of the first movie found.
    Movie's name
    The year the movie was released
    IMDB's personal rating of the movie
    Rotten Tomatoes' personal rating of the movie
    Country/Countries of where the movie was produced
    Language(s) of the movie
    Movie's plot
    Movie's list of actors
If no movie title is given, it will provide the details for "Mr. Nobody" starring Jared Leto.

![movie-this](https://user-images.githubusercontent.com/8729300/46685308-2be09580-cbc3-11e8-8da9-ec5505e8568f.png)

### TO-DO / BUGS
