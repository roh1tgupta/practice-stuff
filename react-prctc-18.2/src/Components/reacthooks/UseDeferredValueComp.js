import React, { useState, useMemo, useDeferredValue, memo } from 'react';

export default function Ab() {
    const [value, setValue] = useState();
    const val = useDeferredValue(value)

    const [text, setText] = useState('');
    const deferredText = useDeferredValue(text);


    const list = useMemo(() => {
        let COUNT = 10000;
        let arr = [];
        console.log(val)
        for(let i = 0; i < COUNT; i++) {
            arr.push(val);
        }
        return arr;
    }, [val])
    return (<div>
        <input value={value} onChange={(e) => setValue(e.target.value)}/>
        
        <div>
            During the initial render, the returned deferred value will be the same as the value you provided. During updates, React will first attempt a re-render with the old value (so it will return the old value), and then try another re-render in background with the new value (so it will return the updated value)
        </div>
        <a href="https://medium.com/@ahsan-ali-mansoor/usedeferredvalue-hook-explained-bcff03ef7b0c" target='_blank' rel="noreferrer"> ref for useDeferredValue </a>
         {list.map(i => <div>{i}</div>)}
    
        <div>example from react's docs</div>
        <input value={text} onChange={e => setText(e.target.value)} />
        <SlowList text={deferredText} />
    </div>)
}


const SlowList = memo(function SlowList({ text }) {
    // Log once. The actual slowdown is inside SlowItem.
    console.log('[ARTIFICIALLY SLOW] Rendering <SlowItem />', text);
  
    let items = [];
    for (let i = 0; i < 5; i++) {
        let k = 0;
        while(k++ < 100000000);
        items.push(<SlowItem key={i} text={text} />);
    }
    return ( 
      <ul className="items">
        {items}
      </ul>
    );
  });
  
  function SlowItem({ text }) {
    let startTime = performance.now();
    while (performance.now() - startTime < 1) {
      // Do nothing for 1 ms per item to emulate extremely slow code
    }
  
    return (
      <li className="item">
        Text: {text}
      </li>
    )
  }
  