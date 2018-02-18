
// In the first few sections, we do all the coding here.
// Later, you'll see how to organize your code into separate
// files and modules.

var Song = Backbone.Model.extend();

var Songs = Backbone.Collection.extend({
	model: Song,
	url: "/api/songs"
});

var songs = new Songs();

songs.add(new Song({title: "Song 1", genre: "Jazz", downloads: 110}), {at: 0});
songs.push(new Song({title: "Song 2", genre: "Jazz", downloads: 90}));

var lastSong = songs.pop();
console.log("Last Song: " + lastSong);

var jazzSongs = songs.where({genre: "Jazz"});
var firstJazzSong = songs.findWhere({genre: "Jazz"});

console.log("Jazz Songs:", jazzSongs);
console.log("First Jazz Song:", firstJazzSong);

var filteredSongs = songs.where({genre: "Jazz", title: 'Song 2'});
console.log("Filtered Songs:", filteredSongs);

var topDownloads = songs.filter(function(song){
	return song.get("downloads") > 100;
});
console.log("Top Downloads:", topDownloads);

songs.each(function(song){
	console.log(song);
});

var songsFromServer = new Songs();
songsFromServer.fetch();

var songsFromServerWithArgs = new Songs();
songsFromServerWithArgs.fetch({
	data: {
		page: 2
	},
	success: function(){},
	error: function(){}
});