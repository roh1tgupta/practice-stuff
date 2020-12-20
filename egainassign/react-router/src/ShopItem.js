import { useParams } from "react-router-dom";

export default function Shopitem (props) {
  // console.log(props);
  let { name } = useParams();
  // console.log(name);

  const clickHandler = () => {
    props.history.goBack();
  };

  return (<div>
    {props.match && props.match.params && (<div>
      hello {props.match.params.name}
      </div>)}
      <button onClick={() => clickHandler()}>back</button>
  </div>);
}