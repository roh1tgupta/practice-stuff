import React from "react";

export default function () {
    const [data, setData] = React.useState();

    React.useEffect(() => {
        var query = `query RollDice($dice: Int!, $sides: Int) {
            rollDice(numDice: $dice, numSides: $sides)
          }`;
        var dice = 3;
        var sides = 6;
        fetch("http://localhost:6001/graphql", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            // body: JSON.stringify({query: "{ hello, olleh,  }"})
            body: JSON.stringify({
                query: query,
                variables: { dice, sides },
            })

        }).then(data => data.json()).then(data => console.log(data.data, "rohit")).catch(err => console.log(err))
    }, []);

    const clickHandler = (e) => {
        
        let query = {};
        if (e.target.name === "hello") {
            let query1 = `{ hello }`;
            query = {query: query1}
        } else if (e.target.name === "olleh") {
            let query1 = `{ olleh }`
            query = {query: query1};
        } else if (e.target.name === "rolldice") {
            let query1 = `query RollDice($dice: Int!, $sides: Int) {
                rollDice(numDice: $dice, numSides: $sides)
              }`;
            let dice = 3;
            let sides = 6;
            query = {
                query: query1,
                variables: {dice, sides}
            }
        }
        fetch("http://localhost:6001/graphql", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            // body: JSON.stringify({query: "{ hello, olleh,  }"})
            body: JSON.stringify(query)

        }).then(data => data.json()).then(data => console.log(data.data, "rohit")).catch(err => console.log(err))
    }; 

    return <div>
        <button name="hello" onClick={clickHandler}> query hello
            </button>
        <button name="olleh" onClick={clickHandler}>
            query olleh
        </button>
        <button name="rolldice" onClick={clickHandler}>
            query rolldice
        </button> </div>
}