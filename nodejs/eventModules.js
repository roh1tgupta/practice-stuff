var event=require("events");
var eventEmitter=new event.EventEmitter();

var eventHandler=function(){
console.log("a scream is heard");
};

// eventEmitter.on return the EventEmitter instance itself,
eventEmitter.on("scream",eventHandler).on("scream", () => {
  console.log("called.....from 2nd listerner")
});

eventEmitter.once('event', () => {
  console.log('This will only be triggered once.');
});

// eventEmitter.removeListener('scream', eventHandler)
// eventEmitter.off('scream', eventHandler)

// eventEmitter.removeAllListeners('scream');

console.log(eventEmitter.listeners("scream"))
console.log(eventEmitter.eventNames())
console.log(eventEmitter.listenerCount('scream'))
eventEmitter.emit("scream");
eventEmitter.emit("scream");
eventEmitter.emit("event");
eventEmitter.emit("event");
