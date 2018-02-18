
var Song = Backbone.Model.extend();

var SongView = Backbone.View.extend({
	render: function(){
		//this.$el.html(this.model.get("title") + " <button>Listen</button>");
		var template = _.template($("#songTemplate").html());
		var html = template(this.model.toJSON());
		this.$el.html(html);
		return this;
	}
});

var song = new Song({title: "Blue in the sky", plays: 1100});

var songView = new SongView({el: "#song", model: song});
songView.render();