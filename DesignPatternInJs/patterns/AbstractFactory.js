// The Abstract Factory Pattern provides an interface
// for creating families of related or dependent objects
// without specifying their concrete classes


// Polyfill for ie
if (!Object.create) {
  Object.create = (o) => {
    if (arguments.length > 1) {
      throw new Error('Object.create implementation only accepts the first parameter.');
    }
    function F() {}
    F.prototype = o;
    return new F();
  };
}

const fromPrototype = (prototype, object) => {
  const newObject = Object.create(prototype);
  for (const prop in object) {
    if (object.hasOwnProperty(prop)) {
      newObject[prop] = object[prop];
    }
  }
  return newObject;
};


// factory method
// Define the Pizza product
const Pizza = {
  description: 'Plain Generic Pizza',
};

// And the basic PizzaStore
const PizzaStore = {
  createPizza: (type) => {
    if (type === 'cheese') {
      return fromPrototype(Pizza, {
        description: 'Cheesy, Generic Pizza',
      });
    } if (type === 'veggie') {
      return fromPrototype(Pizza, {
        description: 'Veggie, Generic Pizza',
      });
    }
  },
};

const firstPizzaStore = Object.create(PizzaStore);
firstPizzaStore.createPizza(); // returns 'Generic pizza created'

const ChicagoPizzaStore = fromPrototype(PizzaStore, {
  createPizza: (type) => {
    if (type === 'cheese') {
      return fromPrototype(Pizza, {
        description: 'Cheesy, Deep-dish Chicago Pizza',
      });
    } if (type === 'veggie') {
      return fromPrototype(Pizza, {
        description: 'Veggie, Deep-dish Chicago Pizza',
      });
    }
  },
});

const CaliforniaPizzaStore = fromPrototype(PizzaStore, {
  createPizza: (type) => {
    if (type === 'cheese') {
      return fromPrototype(Pizza, {
        description: 'Cheesy, Tasty California Pizza',
      });
    } if (type === 'veggie') {
      return fromPrototype(Pizza, {
        description: 'Veggie, Tasty California Pizza',
      });
    }
  },
});

// Elsewhere in our app...
const chicagoStore = Object.create(ChicagoPizzaStore);
const pizza = chicagoStore.createPizza('veggie');
console.log(pizza.description); // returns 'Veggie, Deep-dish Chicago Pizza'


// abstractFactory
const Ingredients = {
  createDough() {
    return 'generic dough';
  },
  createSauce() {
    return 'generic sauce';
  },
  createCrust() {
    return 'generic crust';
  },
};

Ingredients.createChicagoStyle = () => {
  return fromPrototype(Ingredients, {
    createDough() {
      return 'thick, heavy dough';
    },
    createSauce() {
      return 'rich marinara';
    },
    createCrust() {
      return 'deep-dish';
    },
  });
};

Ingredients.createCaliforniaStyle = () => {
  return fromPrototype(Ingredients, {
    createDough() {
      return 'light, fluffy dough';
    },
    createSauce() {
      return 'tangy red sauce';
    },
    createCrust() {
      return 'thin and crispy';
    },
  });
};

// In the above example Ingredients is our Abstract Factory. We know that for every
// different kind of pizza we'll need different ingredients and
// therefore a new Factory Method. We also know that we have different
// styles of pizza so we'll need Chicago style ingredients and California
// style ingredients. When a client wishes to grab some ingredients for a
// particular kind of pizza they just say:


const californiaIngredients = Ingredients.createCaliforniaStyle();
console.log(californiaIngredients.createCrust()); // returns 'thin and crispy';

/* The object that is returned by the call createCaliforniaStyle
  is the concrete implementation of our Abstract Ingredients object.
  In other words, if Ingredients is the Abstract Factory, then the object
  returned by createCaliforniaStyle could also be thought of as a
  CaliforniaIngredients object. It is a subclass of Ingredients if
  you want to think of it that way. The returned object extends Ingredients
  and overrides its Factory Methods with its own methods. In so doing we provide a
  lot of additional flexibility to our app. If we want to add a Hawaiian
  style ingredients we just add a createHawaiianStyle method.
*/
