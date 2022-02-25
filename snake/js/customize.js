import { canvas, color_random } from "./index.js";

const controlsbtn = document.getElementById("controls");
const controlsPanel = document.getElementById("customize-panel");
const canvasColorbtn = document.getElementById("canvasColorbtn")
const canvas_size = document.getElementById("canvas_size");
const equation = document.getElementById("equation");
const snake_color = document.getElementById("snake-color")
const size = document.getElementById("size");
const backbtn = document.getElementById("backbtn");
let value;

function changeCanvasColor(color) {
    canvas.style.backgroundColor = color.target.value;
}
canvasColorbtn.addEventListener("input", changeCanvasColor);

function changeSnakeColor(color) {
    color_random.value = color.target.value;
}
snake_color.addEventListener("input", changeSnakeColor);

function show_hidePanel() {
    if(controlsPanel.style.display === "block"){
        controlsPanel.style.display = "none";
    }
    else{
        controlsPanel.style.display = "block";
    }
}

function changeCanvasSize(e) {
    if(value){
        canvas.style.width = e.target.value + value;
        canvas.style.height = e.target.value + value;
        size.value = e.target.value;
    }
    else{
        canvas.style.width = e.target.value + "%";
        canvas.style.height = e.target.value + "%";
        size.value = e.target.value;
    }
}

function changeCalculations(e){
    value = e.target.value;
}

function changeSize(e){
    if(value){
        canvas.style.width = e.target.value + value;
        canvas.style.height = e.target.value + value;
        canvas_size.value = e.target.value;
    }
    else{
        canvas.style.width = e.target.value + "%";
        canvas.style.height = e.target.value + "%";
        canvas_size.value = e.target.value;
    }
}

controlsbtn.addEventListener("click", show_hidePanel);
canvas_size.addEventListener("input", changeCanvasSize);
equation.addEventListener("input", changeCalculations);
size.addEventListener("input", changeSize);
backbtn.addEventListener("click", function goback() {
    window.location.href = "../";
});


export{
    controlsbtn,
    controlsPanel
}