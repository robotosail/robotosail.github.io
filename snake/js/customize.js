import { canvas } from "./index.js";

const controlsbtn = document.getElementById("controls");
const controlsPanel = document.getElementById("customize-panel");
const canvasColorbtn = document.getElementById("canvasColorbtn")
const canvas_size = document.getElementById("canvas_size");
const vh = document.getElementById("vh");
const px = document.getElementById("px");
const percent = document.getElementById("percent");
const equation = document.getElementById("equation");
let value;

function changeCanvasColor(color) {
    canvas.style.backgroundColor = color.target.value;
}
canvasColorbtn.addEventListener("input", changeCanvasColor);

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
    }
    else{
        canvas.style.width = e.target.value + "%";
        canvas.style.height = e.target.value + "%";
    }
}

function changeCalculations(e){
    value = e.target.value;
}

controlsbtn.addEventListener("click", show_hidePanel);
canvas_size.addEventListener("input", changeCanvasSize);
equation.addEventListener("input", changeCalculations);

export{
    controlsbtn,
    controlsPanel
}