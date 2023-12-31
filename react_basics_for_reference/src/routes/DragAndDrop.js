import React from 'react';

export default function DragAndDrop() {


    const dragItem = (e) => {
        e.dataTransfer.setData('abc', e.target.id);
    }

    const dropItem = (e) => {
        e.preventDefault();
        var content = e.dataTransfer.getData('abc');
        console.log(content, '..content...')
        content && e.target.appendChild(document.getElementById(content))
    }

    const droppable = (e) => {
        e.preventDefault();
    }
    return <div>Drag and Drop
        <div style={{position: 'absolute'}}>
        <img src="https://media.geeksforgeeks.org/wp-content/uploads/20220428080551/gfglogo-200x200.png"
         height={100} width={100} 
         id="img"
         />
         </div>

         <div
            onClick={(e) => e.target.appendChild(document.getElementById('img'))}
            style={{margin: 100, border: "1px solid black", height: 200, width: 200}} id="image"
            draggable
            onDragStart={dragItem}
        >
        </div>
        <div
            
            style={{margin: 100, border: "1px solid grey", minHeight: 100, minWidth: 200}} id="drop"
            onDrop={dropItem}
            onDragOver={droppable}
        >

         </div>
    </div>;
}