import { Player, Fist1, Fist2, player, fist } from "./index.js";

/////// CLASSES
class Resize{
    constructor( canvas, { width = 200, height = 200, update = false, color}) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.update = update;
        this.color = color;
        // calling the draw function first
        this.draw(this.canvas, this.width, this.height);
        if (color) {
            this.Color(this.color, this.canvas);
        }
    }
    // function that resizes the canvas
    draw(canvas, width, height) {
        const self = this
        if (!canvas) {
            alert("Canvas is element is not specified, Please contact creator to fix this bug");
            return;
        }
        else {
            canvas.width = width;
            canvas.height = height;
        }
        // check if we should updated the canvas
        if (this.update = true) {
            addEventListener("resize", function () {
                canvas.width = width;
                canvas.height = height;
                self.Color(self.color, self.canvas);
            });
        }
    }
    // given the canvas some color
    Color(color, canvas) {
        this.c = canvas.getContext("2d");
        this.c.fillStyle = color;
        this.c.fillRect(0, 0, this.width, this.height);
        this.c.fill();
    }
}

class Circle{
    constructor(c,{ x, y, radius = 50, color = "green", update = false, outline = false, stokeColor, lineWidth = 5}) {
        this.c = c;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.update = update;
        this.outline = outline;
        this.stokeColor = stokeColor;
        this.lineWidth = lineWidth;
        if (this.update == true) {
            this.Update();
        }
        else {
            this.draw(this.c, this.x, this.y, this.radius);
        }
        
    }
    draw() {
        this.c.beginPath();
        this.c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        if (this.color) {
            this.c.fillStyle = this.color;
        }
        else {
            this.c.fillStyle = this.color;
        }
        if (this.outline === true) {
            this.c.strokeStyle = this.stokeColor;
            this.c.lineWidth = this.lineWidth;
            this.c.stroke();
        }
        this.c.fill();
        this.c.closePath();
    }
    Update() {
        requestAnimationFrame(this.Update.bind(this));
        this.draw(this.c, this.x, this.y, this.radius);
    }
}

class Square{
    constructor(c, { x, y, width, height, color, update = false, outline, outlineColor }) {
        this.c = c;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.outline = outline;
        this.outlineColor = outlineColor;
        this.update = update;


        if (this.update === true) {
            this.animate();
        }
        else {
            this.draw();
        }
    }
    draw() {
        if (this.color) {
            this.c.fillStyle = this.color;
        }
        if (this.outline) {
            this.c.strokeStyle = this.outlineColor
            this.c.strokeRect(this.x, this.y, this.width, this.height);
        }
        this.c.fillRect(this.x, this.y, this.width, this.height);

    }
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        // this.draw(c, x, y, width, height);
        this.draw();
    }
}

class Map{ //extending the resize to the map
    constructor(c, {size = 10, amount = 10 }) {
        this.c = c;
        this.size = size;
        this.amount = amount;
        
        this.draw( this.c, this.amount,this.size);
    }
   
    draw( c, amount, size) {
        for (let i = 0; i < amount; i++){ // for the y axis
            for (let j = 0; j < amount; j++){ // for the x axis
                c.save()
                c.fillStyle = "green";
                // translating so that the boxes move to a different position each time
                c.translate(j * size, i * size); //spacing of the boxes
                c.fillRect(0, 0, size, size);
                c.strokeRect(0, 0, size, size);
                c.restore();
            }
        }
    }
}

class Collision{
    constructor(obj1, obj2) {
        this.obj1 = obj1;
        this.obj2 = obj2;
    }
    checkCircle() {
        const dist = Math.hypot(this.obj1.x - this.obj2.x, this.obj1.y - this.obj2.y)
        if (dist - this.obj2.radius - this.obj1.radius < 1) {
            return true;
        }
        return false;
    }
    checkCircleandRect(c, {arms = true, player}) { //obj1 being the rectangle and obj2 being the circle
        // let distx = Math.round(Math.abs(this.obj2.x - this.obj1.x) / 2);//add / 2 to the end detect center of objects
        // let disty = Math.round(Math.abs(this.obj2.y - this.obj1.y) / 2);//add / 2 to the end to detect center of objects
        let distx, disty;
        if (arms == true) {
            distx = Math.round(Math.abs((player.x - this.obj2.x)  - this.obj1.x)/2);//add / 2 to the end detect center of objects
            disty = Math.round(Math.abs((player.y - this.obj2.y) - this.obj1.y)/2);//add / 2 to the end to detect center of objects
        }
        else if(arms == false) {
            distx = Math.round((this.obj2.x - this.obj1.x) / 2);//add / 2 to the end detect center of objects
            disty = Math.round((this.obj2.y - this.obj1.y) / 2);//add / 2 to the end to detect center of objects
        }
        
        ///// for Debugging and understanding the math
        // console.log(this.obj1.width / 2 + this.obj2.radius);
        // console.log(Math.round(Math.abs(this.obj2.x / 2 - this.obj1.x / 2)));
        // console.log(this.obj2.y / 2 - this.obj1.y/ 2);
        // console.log(disty);
        // console.log((this.obj1.height / 2 - this.obj2.radius /2));
        // console.log(Math.abs(this.obj2.x - this.obj1.x) / 2);
        /////

        // checks if the x is greater than the width and radius
        if (distx >= (this.obj1.width - this.obj2.radius)) { return false }; 
        // check if the x is less than 0 then set it to false
        if (distx <= -20) { return false }; // the max distance before the collision happens
        
        if (disty >= (this.obj1.height - this.obj2.radius)) { return false };
        // check if the y is less than 0 then set it to false
        if (disty <= -20) { return false }; // the max distance before the collision happens
        
        // checks if the center of both objects are closer to each other
        if (distx < (this.obj1.width)) { return true; }//add / 2 so the detection happens exactly
        if (disty < (this.obj1.height)) { return true; }//add / 2 so the detection happens exactly

        // let dx = distx - this.obj1.width /2;//add / 2 to detect center of objects
        // let dy = disty - this.obj1.height /2;//add / 2 to detect center of objects
        // // return (dx * dx + dy * dy <= (this.obj2.r * this.obj2.r));
    }
}

class Rotate {
    constructor(c,{ x = 100, y = 100, velocity = { x: canvas.width / 2, y: canvas.height / 2 } }) {
        this.c = c
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.angle = 0;
        this.toAngle = this.angle;
        this.binding();
    }
    binding() {
        const self = this;
        addEventListener("mousemove", function (e) {
            self.update(e.clientX, e.clientY);
        });
    }
    // make the gun rotate to the player
    update(nx, ny) {
        this.toAngle = Math.atan2(ny - this.y, nx - this.x)
    }
    render() {
        // c.clearRect(0, 0, canvas.width, canvas.height);
        this.c.save();
        //translating to the position of the mouse
        // c.translate(-offset.x, -offset.y);
        this.c.translate(Player.x, Player.y);
        //adding the map
        if (this.toAngle !== this.angle) {
            this.c.rotate(this.toAngle - this.angle);
        }
        this.c.rotate(187)
        Fist1.draw();
        Fist2.draw()
        this.c.restore();
    }
}
///////

/////// EXPORTS
export {
    Resize,
    Circle,
    Square,
    Map,
    Rotate,
    Collision
}
///////