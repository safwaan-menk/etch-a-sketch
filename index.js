/* constants */

const STARTING_SIZE = 16;
const STARTING_COLOR = 'BLACK';

/* on page load */

window.onload = function() {
    etchASketch(STARTING_SIZE, STARTING_COLOR);
};

var sketchpad = document.querySelector('.sketchpad');
var gridIndex;
var holdOldColor = STARTING_COLOR;
var size = STARTING_SIZE;


function etchASketch(size, color) {
    if(!validateSize(size)) {
        alert('Enter a size between 2 and 100');
        return;
    };
    this.size = size;
    var sketchpad = createSketchpad(size, color);
    colorGridIndex(sketchpad);

}

/* button controls */

/* set grid size */ 
var submitSizeButton = document.getElementById('submitSizeButton');
submitSizeButton.onclick = function chooseSketchpadSize() {
    var submitSizeInput  = document.querySelector('.submitSizeInput').value;
    etchASketch(submitSizeInput);
};    

/* reset board */

var clearBoardButton = document.getElementById('clearBoardButton');
clearBoardButton.onclick = () => {
    etchASketch(STARTING_SIZE);
}

var toggleColorButton = document.getElementById('toggleColorButton');
toggleColorButton.onclick = () => {
    var currentColor = toggleColorButton.innerHTML;
    if(currentColor != 'RGB') {
        holdOldColor = currentColor;
        toggleColorButton.innerHTML = 'RGB';
    }
    else
        toggleColorButton.innerHTML = holdOldColor;    
}

/* helper functions */


function validateSize(size) {
    return (size < 101) && (size > 1);
}

function createSketchpad(size) {
    const currentBoard = sketchpad.querySelectorAll('div');
    currentBoard.forEach(element => {
        element.remove()
    });
    sketchpad.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    sketchpad.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for(var i = 0; i < Math.pow(size,2); i ++) {
        var gridIndex = document.createElement('div');
        gridIndex.style.backgroundColor = 'blue';
        gridIndex.style.border='1px solid black';
        sketchpad.insertAdjacentElement('beforeend', gridIndex);
    }
    return sketchpad;
};

function colorGridIndex(sketchpad) {
    let mouseDown = false;
    document.body.onmousedown = () => { mouseDown = true };
    document.body.onmouseup = () => { mouseDown = false };
    grid = sketchpad.querySelectorAll('div');
    grid.forEach(gridIndex => {
        gridIndex.onmouseover = () => { 
            if(mouseDown){
                var currentColor = toggleColorButton.innerHTML;
                if(currentColor === 'RGB')
                    gridIndex.style.backgroundColor='rgba(' + Math.round(Math.random()*255)+ ', ' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ')';
                else
                    gridIndex.style.backgroundColor='black';   
            } 
        };
        
    });
}




