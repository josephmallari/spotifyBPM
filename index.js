const express = require('express');
const app = express();

const SpotifyWebApi = require('spotify-web-api-node');

const clientId = '9439aa5f970441a7b1cd191978b6f521';
const clientSecret = 'e00e65589eb34fdb9eb90b85be0e2fab';

const spotifyApi = new SpotifyWebApi({
	clientId: clientId,
	clientSecret: clientSecret
});

app.get('/', (req, res) => {
	console.log('yoyo');
});

app.use(express.static('public'));

// Retrieve an access token
spotifyApi.clientCredentialsGrant()
  .then(function(data) {

    // Set the access token on the API object so that it's used in all future requests
    spotifyApi.setAccessToken(data.body['access_token']);

    // return spotifyApi.getAudioAnalysisForTrack('3Qm86XLflmIXVm1wcwkgDK');
		return spotifyApi.searchTracks('Love');
  }).then(function(data) {
		console.log(data.body.tracks.items);
//		data.body.tracks.items.forEach((x) => {
//			console.log(x.album.name);
//		});
		//console.log(data.body.track.tempo);

  }).catch(function(err) {
    console.log('Unfortunately, something has gone wrong.', err.message);
  });

const server = app.listen(8081, () => {
	const host = server.address().address;
	const port = server.address().port;
});
