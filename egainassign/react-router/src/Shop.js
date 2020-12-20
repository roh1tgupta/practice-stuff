import './App.css';
import React, {useState, useEffect} from 'react';
import { Link, Route, useRouteMatch } from 'react-router-dom';
import Shopitem from './ShopItem';

function Shop() {
    let { path, url, ...rest} = useRouteMatch();
    console.log(path, url, rest);
    useEffect(() => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const data = await fetch(
        'https://jsonplaceholder.typicode.com/photos'
    )
    
        const items = await data.json();
        // console.log(items);
        setItems(items);
    }
    return (
        <div>
            <Route exact path={`${path}/item/:name`} component={Shopitem}/>

            {items.map((item, index) => (
            <h1 key={item.id}>
                <Link to={`${url}/item/${item.title}`}> {item.title} index: {index} </Link>
            </h1>
            ))}

        </div>
    )
}

export default Shop;