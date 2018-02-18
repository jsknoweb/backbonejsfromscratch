
var Song = Backbone.Model.extend({
	defaults: {
		listeners: 0
	}
});

var SongView = Backbone.View.extend({
	initialize: function(){
		// event -> change, callback -> this.render, context -> this
		this.model.on("change", this.render, this);
		this.model.on("change", this.onModelChange, this);
	},
	onModelChange: function(){
		this.$el.addClass("someClass");
		console.log("Class added");
	},
	render: function(){
		this.$el.html(this.model.get("title") + " - Listeners: " + this.model.get("listeners"));
		return this;
	}
});

var song = new Song({title: 'Blue in Green'});

var songView = new SongView({el: "#container", model: song});
songView.render();