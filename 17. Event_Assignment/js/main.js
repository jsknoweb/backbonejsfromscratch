var Vehicle = Backbone.Model.extend({
	idAttribute: "registrationNumber",
	urlRoot: "/api/vehicles",
	validate: function(attrs){
		if(!attrs.registrationNumber) {
			return "Invalid vehicle";
		}
	},
	start: function(){
		console.log("Vehicle started");
	}
});

var Vehicles = Backbone.Collection.extend({
	model: Vehicles
});

var Car = Vehicle.extend({
	start: function(){
		console.log("Car with registration number " + this.get("registrationNumber") + " started");
	}
});

var VehicleView = Backbone.View.extend({
	tagName: "li",
	className: "vehicle",
	events: {
		"click .deleteVehicle": "onDeleteVehicle"
	},
	onDeleteVehicle: function(e){

	},
	render: function(){
		var source = $("#vehicleTemplate").html();
		var template = _.template(source);

		this.$el.html(template(this.model.toJSON()));
		this.$el.attr("data-color", this.model.get("color"));

		return this;
	}
});

var VehiclesView = Backbone.View.extend({
	id: "vehicles",
	tagName: "ul",
	initialize: function(options){
		// We pass "this" as the third argument so inside
		// onVehicleAdded method, we can access it. If 
		// you don't set the "this" here, and you access
		// "this" inside onVehicleAdded, it won't be pointing
		// to the view itself. This is how Javascript works.
		bus.on("vehicleAdded", this.onVehicleAdded, this);
	},
	onVehicleAdded: function(registrationNumber){
		var car = new Car({ registrationNumber: registrationNumber });
		var vehicleView = new VehicleView({ model: car });
		this.$el.prepend(vehicleView.render().$el);
	},
	render: function(){
		this.collection.each(function(vehicle){
			var vehicleView = new VehicleView({model: vehicle});
			this.$el.append(vehicleView.render().$el);
		}, this);

		return this; 
	}
});

var NewVehicleView = Backbone.View.extend({
	events: {
		"click .addVehicle": "onAddVehicle"
	},
	onAddVehicle: function(){
		var input = this.$el.find(".registration-number");

		var registrationNumber = input.val();
		bus.trigger("vehicleAdded", registrationNumber);

		// It's the responsibility of this view to clear its text box
		input.val("");
	},
	render: function(){
		var source = $("#newVehicleTemplate").html();
		var template = _.template(source);

		this.$el.html(template());
		return this;
	}
});

var bus = _.extend({}, Backbone.Events);

var vehicles = new Vehicles([
	new Car({ registrationNumber: "XLI887", color: "Blue" }),
	new Car({ registrationNumber: "ZNP123", color: "Blue" }),
	new Car({ registrationNumber: "XUV456", color: "Gray" })
]);

$("#container")
	.append(new NewVehicleView().render().$el)
	.append(new VehiclesView({ collection: vehicles }).render().$el);

/*
var vehiclesView = new VehiclesView({el: "#vehicles", collection: vehicles, bus : bus});
vehiclesView.render();

var newVehicleView = new NewVehicleView({bus: bus});
newVehicleView.render();
*/