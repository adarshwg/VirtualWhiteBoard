const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = document.getElementById('color').value;
        ctx.lineWidth = 5;
        ctx.stroke();
        lastX = e.offsetX;
        lastY = e.offsetY;
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

document.getElementById('clear').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
