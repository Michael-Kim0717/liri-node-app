## liri-node-app

### Summary
LIRI is a Node based application that has a similar concept to Apple's SIRI, but takes in a constraint of user typed commands to perform certain actions.
Using Node packages to retrieve data from Spotify, Twitter, and OMBD, LIRI takes in certain commands in order to send back movie details, song details, and personal twitter tweets.

### Documentation
Any command performed will be written with its results into log.txt

node liri.js my-tweets :
    Using the Twitter Node Package, we will output our most recent 20 tweets.

node liri.js spotify-this-song <SONGNAME> :
    Using the Spotify Node Package, we will output the following details of the first song found.
        Song's artist(s)
        Song's title
        A link to the preview of the song
        Song's album
    If no song name is given, it will automatically provide the details for the Backstreet Boys "I Want It That Way"

node liri.js movie-this <SONGNAME> :
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

node liri.js do-what-it-says :
    The 'random.txt' file within the same folder contains a bunch of random commands separated by line breaks.
    This command will take a random line from the file and perform that specific command.
    These commands include but are not limited to :
        my-tweets
        spotify-this-song "Never Gonna Give You Up"
        movie-this "Spiderman"