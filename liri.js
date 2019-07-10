require("dotenv").config();
var moment = require("moment");
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// console.log(keys)

var action = process.argv[2]
//var search = process.argv[3]

switch (action) {
    case "concert-this":
        concertThis();
        break;
    case "spotify-this-song":
        spotifyThis()
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhatItSays()
        break;

}
function concertThis() {
    var artist = process.argv.slice(3).join("+");
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + keys.spotify.id;
    console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            for (i = 0; i < response.data.length; i++) {
                console.log(response.data[i].venue.name);
                console.log(response.data[i].venue.city);
                var date = (response.data[i].venue.dateTime);
                console.log(moment(date).format("DD/MM/YY"));
            }
        })
        .catch(function (error) {
            if (error.response) {
                console.log("----Data-----")
                console.log(error.response.data);
                console.log("-----status----");
                console.log(error.response.status);
            }
        })

}

function spotifyThis() {

    var song = process.argv.slice(3).join("+");

    if (song === "") {
        console.log("No song found! Here's a classic:")
        console.log("Song Name: The Sign")
        console.log('Artist name: Ace of Base')
        console.log("Song Link: https://open.spotify.com/album/5UwIyIyFzkM7wKeGtRJPgB")
        console.log("Album name: The Sign")
        return;
    }

    spotify.search({ type: 'track', query: song, limit: 3 }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } else if (data) {
            data.tracks.items.forEach(function (item) {
                console.log("-------------------------------")
                console.log("Song Name: " + item.name);
                console.log("Artist name: " + item.album.artists[0].name)
                console.log("Song Link: " + item.album.external_urls.spotify);
                console.log("Album name: " + item.album.name)
            })
        }
    }
    )
}

function movieThis() {
    var movie = process.argv.slice(3).join("+");;
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy"
    // console.log(queryUrl)
    axios.get(queryUrl).then(
        function (response) {
            if (movie === "") {
                console.log("No movie found! Here's a classic:")
                console.log("The movie's rating is: 7.8")
                console.log('Year the movie came out is: 26 Sep 2013')
                console.log("Rotten Tomatoes Rating of the movie: 67%")
                console.log("Country where the movie was produced: Belgium, Germany, Canada, France, USA, UK")
                return;
            }
            // console.log(response, null, 2)
            // for (i = 0; i < response.data.length; i++) {
            console.log("the movie title is: " + response.data.Title)
            console.log("The movie's rating is: " + response.data.imdbRating);
            console.log("Year the movie came out is: " + response.data.Released);
            console.log("Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
            console.log("Country where the movie was produced: " + response.data.Country);
            console.log("Language of the movie: " + response.data.Language);
            console.log("Plot of the movie: " + response.data.Plot);
            console.log("Actors in the movie: " + response.data.Actors);

        }
    )
}


            // })
    //     .catch(function (error) {
    //         if (error.response) {
    //             console.log("---Data---");
    //             console.log(error.response.data);
    //             console.log("---Status---");
    //             console.log(error.response.status);
    //             console.log("---Status---");
    //             console.log(error.response.headers);
    //         } else if (error.request) {

    //             console.log(error.request);
    //         } else {

    //             console.log("Error", error.message);
    //         }
    //         console.log(error.config);
    //     })
    // )

