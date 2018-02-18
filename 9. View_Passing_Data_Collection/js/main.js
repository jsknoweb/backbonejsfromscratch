
var Song = Backbone.Model.extend();

var Songs = Backbone.Collection.extend({
	model: Song
});

var SongView = Backbone.View.extend({
	tagName: "li",
	render: function(){
		this.$el.html("Hello World. " + this.model.get("title"));
		return this;
	}
});

var SongsView = Backbone.View.extend({
	render: function(){
		var self = this;
		this.model.each(function(song){
			var songView = new SongView({model: song});
			self.$el.append(songView.render().$el);
		});
	}
});

var song = new Song({title: "Blue in Green"});
var songs = new Songs([
	new Song({title: "Matrix"}),
	new Song({title: "Right there"})
]);
songs.add(song);

var songsView = new SongsView({el: "#songs", model: songs});
songsView.render();