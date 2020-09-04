// The Bridge design pattern, also known as the double Adapter pattern,
// is a structural design pattern that decouples an abstraction from its
// implementation so that the two can vary independently. It facilitates
// very loose coupling of objects and allows two components to work together
// with each component having its own interface.

// Bridge pattern is about preferring composition over inheritance. Implementation
// details are pushed from a hierarchy to another object with a separate hierarchy.
// defn from https://anasshekhamis.com/2017/11/02/bridge-design-pattern-in-javascript/

// more ref https://refactoring.guru/design-patterns/bridge

// below code from dofactory

// input devices
 
var Gestures = function (output) {
  this.output = output;

  this.tap = function () { this.output.click(); }
  this.swipe = function () { this.output.move(); }
  this.pan = function () { this.output.drag(); }
  this.pinch = function () { this.output.zoom(); }
};

var Mouse = function (output) {
  this.output = output;

  this.click = function () { this.output.click(); }
  this.move = function () { this.output.move(); }
  this.down = function () { this.output.drag(); }
  this.wheel = function () { this.output.zoom(); }
};

// output devices

var Screen = function () {
  this.click = function () { log.add("Screen select"); }
  this.move = function () { log.add("Screen move"); }
  this.drag = function () { log.add("Screen drag"); }
  this.zoom = function () { log.add("Screen zoom in"); }
};

var Audio = function () {
  this.click = function () { log.add("Sound oink"); }
  this.move = function () { log.add("Sound waves"); }
  this.drag = function () { log.add("Sound screetch"); }
  this.zoom = function () { log.add("Sound volume up"); }
};

// logging helper

var log = (function () {
  var log = "";

  return {
      add: function (msg) { log += msg + "\n"; },
      show: function () { console.log(log); log = ""; }
  }
})();

function run() {

  var screen = new Screen();
  var audio = new Audio();

  var hand = new Gestures(screen);
  var mouse = new Mouse(audio);

  hand.tap();
  hand.swipe();
  hand.pinch();

  mouse.click();
  mouse.move();
  mouse.wheel();

  log.show();
}

run();
/*
The objective of the example is to show that with the Bridge pattern input
and output devices can vary independently (without changes to the code); the devices are loosely
coupled by two levels of abstraction.

JavaScript does not support abstract classes therefore
Abstraction and Implementor are not included. However, their interfaces (properties and methods)
are consistently implemented in RefinedAbstraction and ConcreteImplementor. In our example
code the Abstraction represents Input devices and the Implementor represents Output devices.

Gestures (finger movements) and the Mouse are very different input devices, but their
actions map to a common set of output instructions: click, move, drag, etc. Screen and Audio
are very different output devices, but they respond to the same set of instructions. Of course,
the effects are totally different, that is, video updates vs. sound effects. The Bridge pattern
allows any input device to work with any output device. 
The log function is a helper which collects and displays results.
*/

function Circle(color) {
  this.color = color;

  this.toString = function () {
      return `${this.color.getColorName()} Circle`;
  };
}

function Rectangle(color) {
  this.color = color;

  this.toString = function () {
      return `${this.color.getColorName()} Rectangle`;
  };
}

function Triangle(color) {
  this.color = color;

  this.toString = function () {
      return `${this.color.getColorName()} Triangle`;
  };
}

function Red() {
  this.getColorName = function () {
      return 'Red';
  }
}

function Blue() {
  this.getColorName = function () {
      return 'Blue';
  }
}

function Green() {
  this.getColorName = function () {
      return 'Green';
  }
}

const redColor = new Red();
const blueColor = new Blue();
const greenColor = new Green();

const redCircle = new Circle(redColor);
const blueCircle = new Circle(blueColor);
const greenRectangle = new Rectangle(greenColor);

console.log(redCircle.toString());
console.log(blueCircle.toString());
console.log(greenRectangle.toString());