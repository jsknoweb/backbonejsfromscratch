
var Vehicle = Backbone.Model.extend({
	idAttribute: "registrationNumber",
	urlRoot: "/api/vehicles",
	validate: function(attrs){
		if(!attrs.registrationNumber) {
			return "Vehicle is not valid";
		}
	},
	start: function(){
		console.log("Vehicle started");
	}
});

var Vehicles = Backbone.Collection.extend({
	Model: Vehicle
});

var Car = Vehicle.extend({
	start: function(){
		console.log("Car with registration number " + this.get("registrationNumber") + " started");
	}
});

var VehicleView = Backbone.View.extend({
	tagName: "li",
	className: "vehicle",
	//attributes: {
	//	"data-color": "White"
	//},
	events: {
		"click .deleteVehicle": "onDeleteVehicle"
	},
	onDeleteVehicle: function(e){
		console.log(e);
		this.remove();
	},
	render: function(){
		//this.$el.html(this.model.get("registrationNumber") + " <button class='deleteVehicle'>Delete</button>");
		var source = $("#vehiclesTemplate").html();
		var template = _.template(source);

		this.$el.html(template(this.model.toJSON()));
		this.$el.attr("data-color", this.model.get("color"));

		return this;
	}
});

var VehiclesView = Backbone.View.extend({
	tagName: "ul",
	render: function(){
		/*
		var self = this;
		this.model.collection(function(vehicle){
			var vehicleView = new VehicleView({model: vehicle});
			self.$el.append(vehicleView.render().$el);
		});
		*/
		this.collection.each(function(vehicle){
			var vehicleView = new VehicleView({model: vehicle});
			this.$el.append(vehicleView.render().$el);
		}, this); // note the reference to this here. When you set
		// the "this" pointer here (as the second argument to the 
	    // each method, you'll be able to access "this" inside the 
	    // callback function in the each method:
	    //
	    // this.$el.append(...)

		return this; 
	}
});

var vehicles = new Vehicles([
	new Car({ registrationNumber: "XLI887", color: "Blue" }),
	new Car({ registrationNumber: "ZNP123", color: "Blue" }),
	new Car({ registrationNumber: "XUV456", color: "Gray" })
]);

// 1. One option
var vehiclesView = new VehiclesView({el: "#vehicles", collection: vehicles});
vehiclesView.render();

// 2. Another option
/*
var vehiclesView = new VehiclesView({ collection: vehicles });
$("#container").html(vehiclesView.render().$el);
*/