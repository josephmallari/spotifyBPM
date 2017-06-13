const express = require('express');
const app = express();

const SpotifyWebApi = require('spotify-web-api-node');

const clientId = '9439aa5f970441a7b1cd191978b6f521';
const clientSecret = 'e00e65589eb34fdb9eb90b85be0e2fab';

const spotifyApi = new SpotifyWebApi({
	clientId: clientId,
	clientSecret: clientSecret
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'));

app.get('/', (req, res) => {} );

app.get('/process_get', (req, res) => {

	response = {
		search: req.query.search
	}

	responseValue = response.search;
	array = [];

	// Retrieve an access token
	spotifyApi.clientCredentialsGrant()
 	 .then(function(data) {

    // Set the access token on the API object so that it's used in all future requests
    spotifyApi.setAccessToken(data.body['access_token']);

		return spotifyApi.searchTracks(responseValue);
 	 }).then(function(data) {
			trackArray = [];
			featuresArray = [];

			trackArray.push(data.body.tracks);

			data.body.tracks.items.forEach((track) => {
				const trackUri = track.uri.slice(14);
				array.push(trackUri);
			});

		  spotifyApi.getAudioFeaturesForTracks(array)
 			 .then(function(data) {
					featuresArray.push(data.body.audio_features);
					newArray = trackArray.concat(featuresArray);
					res.json(newArray);
		  });
		
 	 }).catch(function(err) {
    console.log('Unfortunately, something has gone wrong.', err.message);
  });
});

app.listen(process.env.PORT || 8081, () => {
	console.log('listening on 8081');
});
