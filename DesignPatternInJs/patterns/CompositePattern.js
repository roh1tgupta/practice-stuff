// Compose objects into tree structures to represent part-whole hierarchies.
// Composite lets clients treat individual objects and compositions of objects uniformly.

// part-whole:- Well, it's pretty straightforward - any object in a collection is a
// part of the whole composition and composition as a whole is a collection of parts.

/*
The Composite pattern allows the creation of objects with properties that are primitive items or
a collection of objects. Each item in the collection can hold other collections themselves,
creating deeply nested structures.

A tree control is a perfect example of a Composite pattern. The nodes of the tree either
contain an individual object (leaf node) or a group of objects (a subtree of nodes).

All nodes in the Composite pattern share a common set of properties and methods which supports
individual objects as well as object collections. This common interface greatly facilitates the
design and construction of recursive algorithms that iterate over each object in the Composite
collection.
*/

var Node = function (name) {
  this.children = [];
  this.name = name;
}

Node.prototype = {
  add: function (child) {
      this.children.push(child);
  },

  remove: function (child) {
      var length = this.children.length;
      for (var i = 0; i < length; i++) {
          if (this.children[i] === child) {
              this.children.splice(i, 1);
              return;
          }
      }
  },

  getChild: function (i) {
      return this.children[i];
  },

  hasChildren: function () {
      return this.children.length > 0;
  }
}

// recursively traverse a (sub)tree

function traverse(indent, node) {
  log.add(Array(indent++).join("--") + node.name);

  for (var i = 0, len = node.children.length; i < len; i++) {
      traverse(indent, node.getChild(i));
  }
}

// logging helper

var log = (function () {
  var log = "";

  return {
      add: function (msg) { log += msg + "\n"; },
      show: function () { console.log(log); log = ""; }
  }
})();

function run() {
  var tree = new Node("root");
  var left = new Node("left")
  var right = new Node("right");
  var leftleft = new Node("leftleft");
  var leftright = new Node("leftright");
  var rightleft = new Node("rightleft");
  var rightright = new Node("rightright");

  tree.add(left);
  tree.add(right);
  tree.remove(right);  // note: remove
  tree.add(right);

  left.add(leftleft);
  left.add(leftright);

  right.add(rightleft);
  right.add(rightright);

  traverse(1, tree);

  log.show();
}

run();


// ----------------------------------------------------------------------------------------
function File(name) {
  this.name = name;
}

File.prototype.display = function () {
  console.log(this.name);
}

function Directory(name) {
  this.name = name;
  this.files = [];
}

Directory.prototype.add = function (file) {
  this.files.push(file);
}

Directory.prototype.remove = function (file) {
  for (let i = 0, length = this.files.length; i < length; i++) {
      if (this.files[i] === file) {
          this.files.splice(i, 1);
          return true;
      }
  }
  
  return false;
}

Directory.prototype.getFileName = function (index) {
  return this.files[index].name;
}

Directory.prototype.display = function() {
  console.log(this.name);
  for (let i = 0, length = this.files.length; i < length; i++) {
      console.log("   ", this.getFileName(i));
  }
}

directoryOne = new Directory('Directory One');
directoryTwo = new Directory('Directory Two');
directoryThree = new Directory('Directory Three');

fileOne = new File('File One');
fileTwo = new File('File Two');
fileThree = new File('File Three');

directoryOne.add(fileOne);
directoryOne.add(fileTwo);

directoryTwo.add(fileOne);

directoryThree.add(fileOne);
directoryThree.add(fileTwo);
directoryThree.add(fileThree);

directoryOne.display();
directoryTwo.display();
directoryThree.display();

directoryThree.add(directoryTwo);
directoryThree.display();

// ref https://anasshekhamis.com/2017/10/12/the-composite-design-pattern-in-javascript/