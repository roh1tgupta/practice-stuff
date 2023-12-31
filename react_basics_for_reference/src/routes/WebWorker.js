import React from 'react';
// import timedCount from './demo_worker';

export default function WebWorker() {
    const [timeCount, setTimeCount] = React.useState(0);

    React.useEffect(() => {
        let worker;
        if (typeof(Worker) !== "undefined") {
            console.log('reacher here....')

            // const code = timedCount.toString();
            // console.log(code);
            // const blob = new Blob(['('+code+')()']);
            // console.log(blob, "..blob");
            // worker = new Worker(URL.createObjectURL(blob));
            worker  = new Worker('http://localhost:3000/demo_worker.js');
            console.log(worker)
            worker.onmessage = (event) => {
                console.log(event, '....eve,t,,,,')
                setTimeCount(event.data)
            }
            console.log(worker)
            // Yes! Web worker support!
            // Some code.....
          } else {
            // Sorry! No Web Worker support..
          }
        
        return () => {
            worker &&  worker.terminate();
            worker = undefined;
        }
    }, [])

    return <div>web worker, time count: {timeCount}</div>
}