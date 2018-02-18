var SongView = Backbone.View.extend({
	tagName: "span",
	className: "song",
	id: "1234",
	attributes: {
		"data-genre": "Jazz"
	},

	render: function(){
		this.$el.html("Hello World");
		return this;
	}
});

// 1. Assigning the $el element in the constructor
// var songView = new SongView({el: "#container"});
// songView.render();

// 2. 
//var songView = new SongView();
//songView.render();
//$("#container").html(songView.$el);

// 3.
// The two previous lines can be combined like this: (chaining calls)
// Because the return value from the render method is referencesd to the
// song view object, we can directly access its $el property.
var songView = new SongView();
$("#container").html(songView.render().$el);
