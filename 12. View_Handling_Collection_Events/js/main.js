
var Song = Backbone.Model.extend({
});

var Songs = Backbone.Collection.extend({
	model: Song
});

var SongView = Backbone.View.extend({
	tagName: "li",
	events: {
		"click .removeSong": "onSongRemovedButton"
	},
	onSongRemovedButton: function(e){
		console.log("Remove song");
		this.remove();
		// We still have to remove the selected song from the songs collections
		// Here we only remove the li DOM element, but we still have the same songs array.
		// However the remove song events from SongsView work fine
		// If modify the collection we won't have to remove the li element in here. It's done in the collection view.
	},
	render: function(){
		this.$el.html("The song title is " + this.model.get("title") + " <button class='removeSong'>Remove</button>");
		this.$el.attr("id", this.model.id);
		return this;
	},
});

var SongsView = Backbone.View.extend({
	tagName: "ul",
	initialize : function(){
		this.model.on("add", this.onSongAdded, this);
		this.model.on("remove", this.onSongRemoved, this);
	},
	onSongAdded: function(song){
		console.log("Song added");
		var songView = new SongView({model: song});
		this.$el.append(songView.render().$el);

	},
	onSongRemoved: function(song){
		console.log("Song removed");
		//this.$el.find("#li" + song.id).remove();
		this.$("li#" + song.id).remove();

	},
	render: function(){
		var self = this;
		this.model.each(function(song){
			var songView = new SongView({model: song});
			self.$el.append(songView.render().$el);
		});
	}
});

var songs = new Songs([
	new Song({id: 1, title: "First song"}),
	new Song({id: 2, title: "Second song"}),
	new Song({id: 3, title: "Third song"})
]);

var songsView = new SongsView({el: "#songs", model: songs});
songsView.render();
