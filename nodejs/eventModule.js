var event=require("events");
var eventEmitter=new event.EventEmitter();

var eventHandler=function(){
console.log("a scream is heard");
};

eventEmitter.on("scream",eventHandler);

eventEmitter.emit("scream");
