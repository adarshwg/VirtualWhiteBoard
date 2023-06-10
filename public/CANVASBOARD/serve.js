const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = true;
let lastX = 0;
let lastY = 0;
let isErasing=false;    
let buttonDown=false;
ctx.imageSmoothingEnabled=true;
canvas.addEventListener('mousedown', (e) => {
    buttonDown=true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing&&buttonDown) {
        document.getElementById('pen').style.setProperty('background-color','orange');
        document.getElementById('eraser').style.setProperty('background-color','white');
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = document.getElementById('color').value;
        ctx.lineWidth = getPencilWidth(sizeArr);
        ctx.lineCap='round';
        ctx.stroke();
        lastX = e.offsetX;
        lastY = e.offsetY;
    }
    else if(isErasing&&buttonDown){
        document.getElementById('pen').style.setProperty('background-color','white');
        document.getElementById('eraser').style.setProperty('background-color','orange');
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        let colorCanvas= getComputedStyle(canvas).getPropertyValue("background-color");
        ctx.strokeStyle =colorCanvas;
        ctx.lineWidth = getEraserWidth(sizeArr);
        ctx.lineCap='round';
        ctx.stroke();
        lastX = e.offsetX;
        lastY = e.offsetY;
    }
});

document.addEventListener('mouseup', () => {
    buttonDown=false;
});

document.getElementById('fill').addEventListener('click',()=>{

    let desiredColor=document.getElementById('color').value ;
    document.getElementById('pen').style.setProperty('background-color','white');
    document.getElementById('eraser').style.setProperty('background-color','white');
    document.getElementById('clear').style.setProperty('background-color','white');
    document.getElementById('fill').style.setProperty('background-color','orange');
    canvas.style.setProperty('background-color',desiredColor);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('clear').addEventListener('click', () => {
    document.getElementById('pen').style.setProperty('background-color','white');
    document.getElementById('eraser').style.setProperty('background-color','white');
    document.getElementById('clear').style.setProperty('background-color','orange');
    document.getElementById('fill').style.setProperty('background-color','white');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
document.getElementById('eraser').addEventListener('click',() => {
    document.getElementById('pen').style.setProperty('background-color','white');
    document.getElementById('eraser').style.setProperty('background-color','orange');
    document.getElementById('clear').style.setProperty('background-color','white');
    document.getElementById('fill').style.setProperty('background-color','white');
    buttonDown=false;
    isDrawing=false;
    isErasing=true;
});
document.getElementById('pen').addEventListener('click',() => {
    document.getElementById('pen').style.setProperty('background-color','orange');
    document.getElementById('eraser').style.setProperty('background-color','white');
    document.getElementById('clear').style.setProperty('background-color','white');
    document.getElementById('fill').style.setProperty('background-color','white');
    buttonDown=false;
    isDrawing=true;
    isErasing=false;
});
let sizeArr=[false,false,false,false];
document.getElementById('circle1').addEventListener('click',() => {
    document.getElementById('circle1').style.setProperty('background-color','orange');
    document.getElementById('circle2').style.setProperty('background-color','white');
    document.getElementById('circle3').style.setProperty('background-color','white');
    document.getElementById('circle4').style.setProperty('background-color','white');
    sizeArr[0]=true; sizeArr[1]=false; sizeArr[2]=false; sizeArr[3]=false;
});
document.getElementById('circle2').addEventListener('click',() => {
    document.getElementById('circle1').style.setProperty('background-color','white');
    document.getElementById('circle2').style.setProperty('background-color','orange');
    document.getElementById('circle3').style.setProperty('background-color','white');
    document.getElementById('circle4').style.setProperty('background-color','white');
    sizeArr[0]=false; sizeArr[1]=true; sizeArr[2]=false; sizeArr[3]=false;
});

document.getElementById('circle3').addEventListener('click',() => {
    document.getElementById('circle1').style.setProperty('background-color','white');
    document.getElementById('circle2').style.setProperty('background-color','white');
    document.getElementById('circle3').style.setProperty('background-color','orange');
    document.getElementById('circle4').style.setProperty('background-color','white');
    sizeArr[0]=false; sizeArr[1]=false; sizeArr[2]=true; sizeArr[3]=false;
});

document.getElementById('circle4').addEventListener('click',() => {
    document.getElementById('circle1').style.setProperty('background-color','white');
    document.getElementById('circle2').style.setProperty('background-color','white');
    document.getElementById('circle3').style.setProperty('background-color','white');
    document.getElementById('circle4').style.setProperty('background-color','orange');
    sizeArr[0]=false; sizeArr[1]=false; sizeArr[2]=false; sizeArr[3]=true;
});

function getPencilWidth(sizeArr){
    let index=-1;
    for(let i=0;i<sizeArr.length;i++){
        if(sizeArr[i]==true) index=i;
    }
    switch(index){
        case 0: return 2;
        case 1: return 7;
        case 2: return 15;
        case 3: return 35;
    }
    return 5;
}
function getEraserWidth(sizeArr){
    let index=-1;
    for(let i=0;i<sizeArr.length;i++){
        if(sizeArr[i]==true) index=i;
    }
    switch(index){
        case 0: return 5;
        case 1: return 15;
        case 2: return 25;
        case 3: return 35;
    }
    return 15;
}



