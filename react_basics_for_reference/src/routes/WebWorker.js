import React from 'react';
// import timedCount from './demo_worker';

function WebWorker() {
    const [timeCount, setTimeCount] = React.useState(0);
    React.useEffect(() => {
        let worker;
        if (typeof(Worker) !== "undefined") {
            worker  = new Worker("./demo_worker.js");
            console.log(worker)
            worker.onmessage = (event) => {
                console.log(event, '....eve,t,,,,')
                setTimeCount(event.data.i)
            }
            worker.onerror = function(event) {
                console.error('Error in Web Worker:', event.message);
              };
            // console.log(worker)
            worker.postMessage('Hello from the main thread!');
          } else {
            // Sorry! No Web Worker support..
          }
        
        return () => {
            worker &&  worker.terminate();
            worker = undefined;
        }
    }, [])

    return <div>web worker, time count: {timeCount} </div>
}


function WebWorker1() {
    const ref = React.useRef();
    React.useEffect(() => {
        let worker;
        if (typeof(Worker) !== "undefined") {
            worker  = new Worker("./demo_worker1.js");
            ref.current =  worker;
            worker.onmessage = (event) => {
                console.log("logginh from 2nd comp", event.data)
            }
            worker.postMessage('Hello from the 2nd  web worker componenet thread!');
          } else {
            // Sorry! No Web Worker support..
          }
        
        return () => {
            worker &&  worker.terminate();
            worker = undefined;
        }
    }, [])

    return <div>
        <button
            onClick={() => ref.current.postMessage("Hello from the 2nd  web worker componenet thread")}
        >post message fron 2nd comp
        </button>
        </div>
}

function WebWorker2() {
    const ref = React.useRef();
    React.useEffect(() => {
        let worker;
        if (typeof(Worker) !== "undefined") {
            worker  = new Worker("./demo_worker1.js");
            ref.current =  worker;
            worker.onmessage = (event) => {
                console.log("logging from first compo", event.data)
            }
            worker.postMessage('Hello from the first  web worker componenet thread!');
          } else {
            // Sorry! No Web Worker support..
          }
        
        return () => {
            worker &&  worker.terminate();
            worker = undefined;
        }
    }, [])

    return <div><button onClick={() => ref.current.postMessage("Hello from the first  web worker componenet thread")}>post message fron first comp</button> </div>
}


export default function () {
    return <React.Fragment>
        <WebWorker/>
        <WebWorker1/>
        <WebWorker2 />
    </React.Fragment>
}