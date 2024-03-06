import React from 'react';

export default function EventPropagations () {

    // React.useEffect(() => {
    //     document.getElementById("button").addEventListener("click", (e) => {
    //         console.log("button called");
    //         e.stopPropagation()
    //     }, true)

    //     document.getElementById("button2").addEventListener("click", () => console.log("button2 called"))
    //     document.getElementById("button3").addEventListener("click", () => console.log("button3 called"))
    //     document.getElementById("button4").addEventListener("click", () => console.log("button 4 called"), true)
    //     document.getElementById("button5").addEventListener("click", () => console.log("button 5 called"))

    //     document.getElementById("div1").addEventListener("click", () => console.log("div1 called"), true)
    // })
    

    return (
        <div style={{margin: "20px", padding: "20px", backgroundColor: "lightblue"}}>
            root Comp
            {/* <button  id="button" style={{padding: "20px"}}>
                <button id="button2" style={{padding: "20px"}}>
                    <button id="button3" style={{padding: "20px", backgroundColor:"lightblue"}}>
                        <button id="button4" style={{padding: "20px"}}>
                            <button id="button5" style={{padding: "20px"}}>
                                <div id="div1" style={{padding: "20px", backgroundColor:"lightblue"}}>

                                </div> 
                            </button>
                        </button>
                    </button>
                </button>
            </button> */}
            <Parent />
        </div>
    )
}

function log(name) {
 console.log("event called from ", name);
}

function Parent() {
    React.useEffect(() => {

        let abc = document.getElementById("parent")
        abc.addEventListener("click", () => console.log("parent called"))


            // window.addEventListener("click", () => console.log("parent called"))
    
    }, [])

    return <div id="parent" style={{margin: "20px", padding: "20px", backgroundColor: "lightpink"}}>
        hello Parent
        <Parent1 />
    </div>
}

function Parent1() {
    React.useEffect(() => {
        let abc = document.getElementById("parent1")

        abc.addEventListener("click", (e) => {
            console.log("parent1 called");
            // e.stopPropagation();
        }, true)
    }, [])

    return <div id="parent1" style={{margin: "20px", padding: "20px", backgroundColor: "lightgrey"}}>
        hello Parent 1
        <Parent2 />
    </div>
}

function Parent2() {

    React.useEffect(() => {
        let abc = document.getElementById("parent2")
        abc.addEventListener("click", (e) => {
            console.log("parent2 called");
            e.stopImmediatePropagation();
        })
        abc.addEventListener("click", (e) => {
            console.log("parent2 called 2nd time");
        })
    }, [])

    return <div id="parent2" style={{margin: "20px", padding: "20px", backgroundColor: "lightyellow"}}>
        hello Parent 2
        <Parent3 />
    </div>
}
function Parent3() {
    React.useEffect(() => {

        let abc = document.getElementById("parent3")
        abc.addEventListener("click", (e) => { console.log("parent3 called");}, true)
    }, [])
    return <div id="parent3" style={{margin: "20px", padding: "20px", backgroundColor: "lightcyan"}}>
        hello Parent 3
    </div>
}