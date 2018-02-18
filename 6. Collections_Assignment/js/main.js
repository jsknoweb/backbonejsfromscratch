
// In the first few sections, we do all the coding here.
// Later, you'll see how to organize your code into separate
// files and modules.

var Vehicle = Backbone.Model.extend({
	idAttribute: "registrationNumber",
	urlRoot: "/api/vehicles",
	validate: function(attrs){
		if(!attrs.registrationNumber){
			return "The registration number is needed.";
		}
	},
	start: function(){
	 	console.log("Vehicle started");
	 }
});

var Car = Vehicle.extend({
	start: function(){
		console.log("Car with registration number " + this.get("registrationNumber") + " started");
	}
});

var Vehicles = Backbone.Collection.extend({
	Model: Vehicle,
	url: "/api/vehicles"
});

var vehicles = new Vehicles([
	new Car({ registrationNumber: "XLI887", color: "Blue" }),
	new Car({ registrationNumber: "ZNP123", color: "Blue" })
]);
vehicles.add(new Car({registrationNumber: "XUV456", colour: "Gray" }));

var blueCars = vehicles.where({color: "Blue"});
console.log(blueCars);

var theCar = vehicles.findWhere({registrationNumber: "XLI887"})
console.log(theCar);

vehicles.remove(theCar);

console.log(vehicles.toJSON());

vehicles.each(function(vehicle) {
	console.log(vehicle);
});


