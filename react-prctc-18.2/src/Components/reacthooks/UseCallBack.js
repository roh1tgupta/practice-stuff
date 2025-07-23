import { useCallback, useState, memo } from "react";
export default function HookUseCallback() {
  const [counter, setCoutner] = useState(0);
  const [count1, setCount1] = useState(0);
  const onClickFn = () => {
    console.log('hello wolrd')
    setCount1(count1 + 1)
  };
  const handleSubmit = useCallback(onClickFn, [count1]); 

  return (
    <div>
      <button onClick={() => setCoutner(counter + 1)}>click me</button>
      <div></div>you have clicked {counter} times
      <div></div>
      {/* <ABC onClick={handleSubmit}/> */}
      <ABC onClick={onClickFn}/>
    </div>
  );
}


const ABC = memo(({onClick}) => {
  console.log("rendered fro line 21")
  return <button onClick={onClick}>hello </button>
})