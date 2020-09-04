/*
The Adapter pattern translates one interface (an object's properties and methods)
to another. Adapters allows programming components to work together that otherwise
wouldn't because of mismatched interfaces. The Adapter pattern is also referred to
as the Wrapper Pattern.
One scenario where Adapters are commonly used is when
new components need to be integrated and work together with existing components
in the application.
Another scenario is refactoring in which parts of the program are rewritten
with an improved interface, but the old code still expects the original interface.
*/


// old interface
 
function Shipping() {
  this.request = function(zipStart, zipEnd, weight) {
      // ...
      return "$49.75";
  }
}

// new interface

function AdvancedShipping() {
  this.login = function(credentials) { /* ... */ };
  this.setStart = function(start) { /* ... */ };
  this.setDestination = function(destination) { /* ... */ };
  this.calculate = function(weight) { return "$39.50"; };
}

// adapter interface

function ShippingAdapter(credentials) {
  var shipping = new AdvancedShipping();

  shipping.login(credentials);

  return {
      request: function(zipStart, zipEnd, weight) {
          shipping.setStart(zipStart);
          shipping.setDestination(zipEnd);
          return shipping.calculate(weight);
      }
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
  var shipping = new Shipping();
  var credentials = {token: "30a8-6ee1"};
  var adapter = new ShippingAdapter(credentials);

  // original shipping object and interface

  var cost = shipping.request("78701", "10010", "2 lbs");
  log.add("Old cost: " + cost);

  // new shipping object with adapted interface

  cost = adapter.request("78701", "10010", "2 lbs");

  log.add("New cost: " + cost);
  log.show();
}

run();

// ----------------------------------------------------------------------------
// the old shopping cart constructor
function Cart() {}

Cart.prototype.calculateTotal = function(items) {
    let total;
    
    // looping through the items and calculate the total price
    // ...

    return total;
}

// the new shopping cart constructor
function NewCart(coupon) {
    this.coupon = coupon;
}

NewCart.prototype.calculateTotalAndApplyCoupon = function(items) {
    // calculate the total and apply the coupon on it 
}

/*
We have two constructors namely Cart and NewCart that represent shopping simple shopping
carts functionality. The old shopping cart constructor; Cart, calculate the total of the
items using calulateTotal. The new introduces a new functionality that allows the cart to
have a coupon applied to the total using calculateTotalAndApplyCoupon. Now let's create an
adapter that will make these two incompatible interfaces work together.
*/
function CartAdapter(coupon) {
  let cart = new NewCart(coupon);

  function calculateTotal(items) {
      //...
      cart.calculateTotalAndApplyCoupon(items);
      //...
  }

  return {
      calculateTotal: calculateTotal
  }
}

/*

CartAdapter allows us to keep the API functioning without doing any change
by adapting the old cart constructor (interface); Cart to the new cart
constructor (interface); NewCart
*/