
//Purpose: Creates a square CSS grid based on variable num,
//then creates a div element for each square in the grid. 
function createGrid() 
{ 
  
    let totalNum=num*num; 
    container.style.gridTemplateColumns=`repeat(${num},auto)`;
    container.style.gridTemplateRows=`repeat(${num},auto)`;

    for(let i=0;i<totalNum;i++)
    {

        let square = document.createElement('div');
        container.appendChild(square);
        square.id=`square${i}`;
        square.style.backgroundColor="rgba(0,0,0,0.1)";
        square.className="gridClass";

        //changes onmouseover event based on what the user inputs or the default value
        if(penChoice=="soft")
        {
            square.onmouseover=function(){
                square.style.backgroundColor=increaseOpacity(square.style.backgroundColor)
            };

        }
        else if(penChoice=="black")
            square.onmouseover=function(){
                square.style.backgroundColor="black";
            };
        else
            square.onmouseover=function(){
            square.style.backgroundColor=getRandomColor();
            }; 
    }
    
}

//Purpose: change the size of the grid to the user input or the default value
function resizeGrid()
{
    do{
        num=parseInt(prompt("How many squares per side would you like your grid to be?"
        + '\n' + "Please choose a value between 10-100."));

        if(num>100 || num<10 || typeof num !== 'number')
            alert("Invalid input. Please choose a value between 1-100.");
        else if(isNaN(num))
        {
            
            return;
        }
        else
        {
            resetGrid();
        }
    }
    while(num>100 || num <10 || typeof num !== 'number');
}

//Purpose: Clear the grid
function resetGrid()
{
    if(!confirm("WARNING: Resetting will erase all of your work."))
        return;

    container.innerHTML = "";
    createGrid();
    
}

//Purpose: Retrieve a random color 
function getRandomColor() {
    
    let letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//Purpose: Takes in element ID and increases opacity by 0.1 
//every time the element is hovered over
function increaseOpacity(color)
{
    //let square=document.getElementById(id);
    //let brightStr=square.style.backgroundColor;

    //grabs numeric values from rgba string and stores them in an array
    let brightNumArr = color.match(/\d+/g);
    return `rgba(${brightNumArr[1]},${brightNumArr[2]},
    ${brightNumArr[3]},${(parseInt(brightNumArr[4])+1)/10})`;
    
}

let num=16; //default grid size
let penChoice="black"; //default pen style

const container = document.getElementById("gridBox");

createGrid();

//event listeners for clicking buttons
const resizeBtn=document.getElementById("resizeBtn");
resizeBtn.addEventListener("click",resizeGrid);

const resetBtn=document.getElementById("resetBtn");
resetBtn.addEventListener("click",resetGrid);

const blackPen=document.getElementById("blackBtn");
blackPen.addEventListener("click",function(){
    penChoice="black";
    blackPen.disabled=true;
    colorPen.disabled=false;
    softPen.disabled=false;
    resetGrid();
});

const colorPen= document.getElementById("colorBtn");

colorPen.addEventListener("click",function(){
    penChoice="color";
    colorPen.disabled=true;
    blackPen.disabled=false;
    softPen.disabled=false;
    resetGrid();
});

const softPen=document.getElementById("softBtn");
softPen.addEventListener("click", function(){
    penChoice="soft"
    softPen.disabled=true;
    colorPen.disabled=false;
    blackPen.disabled=false;
    resetGrid();
});

