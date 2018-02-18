
var person = {
	name: "Mosh",
	walk: function(){
		console.log("Walk method has been called");
		this.trigger("walking", {
			speed: 1,
			startTime: "08.00"
		});
	}

};

_.extend(person, Backbone.Events);

person.on("walking", function(e){
	console.log("Person is walking");
	console.log("Event args: ", e);
});

person.walk();
person.off("walking");
person.walk();

person.once("walking", function(e){
	console.log("Person is walking");
	console.log("Event args: ", e);
});

person.walk();
person.walk();