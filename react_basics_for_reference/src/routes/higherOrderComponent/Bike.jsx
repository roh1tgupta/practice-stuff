import React from 'react';

export default function Car(props) {
    console.log('........', JSON.stringify(props));
    return (
        Object.keys(props).map(key => <li>{key}: &nbsp;&nbsp;&nbsp;&nbsp;{props[key]}</li>)
    );
}