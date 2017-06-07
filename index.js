const express = require('express');
const app = express();

const SpotifyWebApi = require('spotify-web-api-node');

const clientId = '9439aa5f970441a7b1cd191978b6f521';
const clientSecret = 'e00e65589eb34fdb9eb90b85be0e2fab';

const spotifyApi = new SpotifyWebApi({
	clientId: clientId,
	clientSecret: clientSecret
});

app.use(express.static('public'));

app.get('/', (req, res) => {
});

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
			data.body.tracks.items.forEach((track) => {
				trackArray.push(track.name);
			});

			res.send(trackArray);

			data.body.tracks.items.forEach((track) => {
				const trackUri = track.uri.slice(14);
				array.push(trackUri);
			});

		  spotifyApi.getAudioFeaturesForTracks(array)
 			 .then(function(data) {
			  	console.log(data.body.audio_features);
//				res.obj(jsonObj);
		  });

 	 }).catch(function(err) {
    console.log('Unfortunately, something has gone wrong.', err.message);
  });
});

const server = app.listen(8081, () => {
	const host = server.address().address;
	const port = server.address().port;

	console.log(port);
});
