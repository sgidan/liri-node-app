# liri-node-app

LIRI is like iPhone's SIRI.
However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data. As this is a CLI App, it cannot be deployed to GitHub pages or Heroku.

LIRI works with Bands In Town API to pull concerts that happening now.
 To run this command in the command line simply type: node liri.js concert-this <artist/band name here>

LIRI can also pull songs from Spotify
    To run this command in the command line, simply type: node liri.js spotify-this-song '<song name here>

LIRI works with IMDB to pull information about a movie you request.
    To run this command simply type: node liri.js movie-this '<movie name here>'
  
LIRI will also take the text inside of random.txt and then use it to call one of LIRI's commands.It will pull infromation from about songs, movies and concerts. 
  To run this command simply type: node liri.js do-what-it-says.
  
