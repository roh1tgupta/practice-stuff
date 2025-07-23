


var obj1 = {
    name: "pulsar",
    bike: function () {
        console.log(this.name)
    }
}

var name = "rohit";
var bike = obj1.bike;

bike(); // undefined
obj1.bike();
bike.call(this) // undefined