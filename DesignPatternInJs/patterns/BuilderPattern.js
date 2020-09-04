// The Builder pattern allows a client to construct a complex object by specifying the
// type and content only. Construction details are hidden from the client entirely.
// The most common motivation for using Builder is to simplify client code that creates
// complex objects. The client can still direct the steps taken by the Builder without
// knowing how the actual work is accomplished. Builders frequently encapsulate construction
// of Composite objects (another GoF design pattern) because the procedures involved are
// often repetitive and complex. Usually it is the last step that returns the newly created
// object which makes it easy for a Builder to participate in fluent interfaces in which
// multiple method calls, separated by dot operators, are chained together (note: fluent
// interfaces are implementation of the Chaining Pattern as presented in the Modern
// patterns section).   /*https://www.dofactory.com/javascript/builder-design-pattern*/

function Shop() {
  this.construct = function(builder) {
      builder.step1();
      builder.step2();
      return builder.get();
  }
}

function CarBuilder() {
  this.car = null;

  this.step1 = function() {
      this.car = new Car();
  };

  this.step2 = function() {
      this.car.addParts();
  };

  this.get = function() {
      return this.car;
  };
}

function TruckBuilder() {
  this.truck = null;

  this.step1 = function() {
      this.truck = new Truck();
  };

  this.step2 = function() {
      this.truck.addParts();
  };

  this.get = function() {
      return this.truck;
  };
}

function Car() {
  this.doors = 0;

  this.addParts = function() {
      this.doors = 4;
  };

  this.say = function() {
      log.add("I am a " + this.doors + "-door car");
  };
}

function Truck() {
  this.doors = 0;

  this.addParts = function() {
      this.doors = 2;
  };

  this.say = function() {
      log.add("I am a " + this.doors + "-door truck");
  };
}

// log helper
var log = (function () {
  var log = "";
  return {
      add: function (msg) { log += msg + "\n"; },
      show: function () { console.log(log); log = ""; }
  }
})();

function run() {
  var shop = new Shop();
  var carBuilder = new CarBuilder();
  var truckBuilder = new TruckBuilder();
  var car = shop.construct(carBuilder);
  var truck = shop.construct(truckBuilder);

  car.say();
  truck.say();

  log.show();
}

run();


// -------------------------------------------------------
// Builder design pattern, a pattern used to help construct complex objects.
// It helps separate object construction from its representation, which will
// help us reuse this to create different representations.
// https://medium.com/better-programming/the-builder-pattern-in-javascript-6f3d85c3ae4a


class Frog {
  constructor(name, weight, height, gender) {
    this.name = name
    this.weight = weight // in lbs
    this.height = height // in inches
    this.gender = gender
  }
  eat(target) {
    console.log(`Eating target: ${target.name}`)
  }
}

class FrogBuilder {
  constructor(name, gender) {
    this.name = name
    this.gender = gender
  }
  setWeight(weight) {
    this.weight = weight
    return this
  }
  setHeight(height) {
    this.height = height
    return this
  }
  build() {
    if (!('weight' in this)) {
      throw new Error('Weight is missing')
    }
    if (!('height' in this)) {
      throw new Error('Height is missing')
    }
    return new Frog(this.name, this.weight, this.height, this.gender)
  }
}

const leon = new FrogBuilder('Leon', 'male')
  .setWeight(14)
  .setHeight(3.7)
  .build();

leon.eat({name: 'mosquito'});