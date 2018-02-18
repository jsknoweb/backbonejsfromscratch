
var Song = Backbone.Model.extend({
	validate: function(attrs) {
		if(!attrs.genre) {
			return "Genre is required";
		}
	},
	defaults: {
		hit: true
	},
	initialize: function() {
		console.log("A new song has been created.")	
	}
});

//debugger;
var invalidSong = new Song();

var song = new Song({
	duration: "4:58",
	genre: "jazz"
});
song.set("title", "Blue in Green");
song.set({
	artist: "Miles Davis",
	publishYear: 1959
});
console.log(song);

var title = song.get("title");
var hasTitle = song.has("title");
song.unset("title");

console.log(song);

var person = {};
person.name = "Mosh";
console.log(person.name);

console.log("Song is valid: " + song.isValid());
console.log("Song validation error: " + song.validationError);

console.log("InvalidSong is valid: " + invalidSong.isValid());
console.log("InvalidSong validation error: " + invalidSong.validationError);

song.clear();
console.log(song);

console.log("Song is valid: " + song.isValid());
console.log("Song validation error: " + song.validationError);