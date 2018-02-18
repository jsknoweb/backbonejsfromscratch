
var Animal = Backbone.Model.extend({
	walk: function(){
		console.log("Animal walking...");
	}
});

var Dog = Animal.extend({
	walk: function(){
		Animal.prototype.walk.apply(this);
		console.log("Dog walking...");
	}
});

var dog = new Dog();

dog.walk();