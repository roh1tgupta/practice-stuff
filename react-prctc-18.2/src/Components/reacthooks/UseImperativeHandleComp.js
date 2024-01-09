import { forwardRef, useImperativeHandle, useRef } from 'react';

export default function UseImperativeHandleComp() {
    const ref = useRef();
    const ref2 = useRef();

    const handleClick = () => { 
        ref.current.focus();
        ref.current.style.opacity = 0.3;
    }

    const handleClick2 = () => {
        // ref2.current.focus();
        // ref2.current.style.opacity = 0.3;
        ref2.current.focusMe();
    }
    return <div style={{margin: 10}}>
        <strong>useImperativeHandle :</strong>suppose you don’t want to expose the entire input DOM node, but you want to expose one of its method: focus. To do this, keep the real browser DOM in a separate ref. Then use useImperativeHandle to expose a handle with only the methods that you want the parent component to call:
        <div>
        <Myinput ref={ref}/>

<button onClick={handleClick}>click me ref1</button>
        </div>
        

<div>
<Myinput2 ref={ref2}/>

<button onClick={handleClick2}>click me ref2</button>
</div>
        
    </div>
}

const Myinput = forwardRef(function (prop, ref) {
    return <input ref={ref}/>
})

const Myinput2 = forwardRef(function (prop, ref) {
    const localRef = useRef();
    useImperativeHandle(ref, () => {
        return {
            focusMe: () => localRef.current.focus()
        };
    })
    return <input ref={localRef}/>
})