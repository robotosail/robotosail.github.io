import { Player, Fist1, Fist2, update, gun1 } from "./index.js";

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
    // collide(obj2) {
    //     if (this.x < obj2.x + obj2.width &&
    //         this.x + this.width > obj2.x &&
    //         this.y < obj2.y + obj2.height &&
    //         this.height + this.y > obj2.y) {
    //         // this.otherArray.push(this.obj1, this.obj2);
    //         console.log("true");
    //         return true;
    //     }
    // }
}

class Map{ //extending the resize to the map
    constructor(c, {x = -2, y= -2, size = 10, amount = 10 }) {
        this.c = c;
        this.x = x;
        this.y = y;
        this.size = size;
        this.amount = amount;
        
        this.draw( this.c, this.x, this.y, this.amount,this.size);
    }
   
    draw( c, x, y, amount, size) {
        for (let i = y; i < amount; i++){ // for the y axis
            for (let j = x; j < amount; j++){ // for the x axis
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
    constructor({ obj1, obj2}) {
        // this.stop = stop;
        // if(this.stop === false) {
            this.obj1 = obj1;
            this.obj2 = obj2;
            this.collision = false;
        // }
        // else if(this.stop === true){
        //     this.obj1 = null;
        //     this.obj2 = null;
        //     this.collision = false;
        // }
    }
    
    checkCircle() {
        if (this.obj1 && this.obj2) {
            
        const dist = Math.hypot(this.obj1.x - this.obj2.x, this.obj1.y - this.obj2.y)
        if (dist - this.obj2.radius - this.obj1.radius < 1) {
            return true;
        }
            return false;
        }
        else {
            returnl
        }
    }
    checkCircleandRect({ arms = true, player }) { //obj1 being the rectangle and obj2 being the circle
        if (this.obj1 && this.obj2) {
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
        if (distx <= -15) { return false }; // the max distance before the collision happens
        
        if (disty >= (this.obj1.height - this.obj2.radius)) { return false };
        // check if the y is less than 0 then set it to false
        if (disty <= -15) { return false }; // the max distance before the collision happens
        
        // checks if the center of both objects are closer to each other
        if (distx < (this.obj1.width)) { return true; }//add / 2 so the detection happens exactly
        if (disty < (this.obj1.height)) { return true; }//add / 2 so the detection happens exactly

        // let dx = distx - this.obj1.width /2;//add / 2 to detect center of objects
        // let dy = disty - this.obj1.height /2;//add / 2 to detect center of objects
        // // return (dx * dx + dy * dy <= (this.obj2.r * this.obj2.r));
        }
        else {
            return;
        }
    }
    checkRect() {
        if (this.obj1 && this.obj2) {
            
        // if (this.isArry === true) {
            // for (let i = 0; i < this.arry.length; i++) {
            //     this.obj1 = this.arry[i];
            //     i+= 1;
            //     this.obj2 = this.arry[i];
                // console.log(this.obj2.x);
                // subtracting the objects 
            if (this.obj1.x < this.obj2.x + this.obj2.width &&
                this.obj1.x + this.obj1.width > this.obj2.x &&
                this.obj1.y < this.obj2.y + this.obj2.height &&
                this.obj1.height + this.obj1.y > this.obj2.y) {
                // this.otherArray.push(this.obj1, this.obj2);
                return true;
        }
            return false;
        }
        else {
            return;
        }
    }
    checkCircleRect() {//obj1 being the rectangle and obj2 being the circle
            if (this.obj1 && this.obj2) {
                // let distx = Math.round(Math.abs(this.obj2.x - this.obj1.x) / 2);//add / 2 to the end detect center of objects
                // let disty = Math.round(Math.abs(this.obj2.y - this.obj1.y) / 2);//add / 2 to the end to detect center of objects
                let distx, disty;
                    distx = Math.round((this.obj2.x - this.obj1.x) / 2);//add / 2 to the end detect center of objects
                    disty = Math.round((this.obj2.y - this.obj1.y) / 2);//add / 2 to the end to detect center of objects
                
                ///// for Debugging and understanding the math
                // console.log(this.obj1.width / 2 + this.obj2.radius);
                // console.log(Math.round(Math.abs(this.obj2.x / 2 - this.obj1.x / 2)));
                // console.log(this.obj2.y / 2 - this.obj1.y/ 2);
                // console.log(disty);
                // console.log((this.obj1.height / 2 - this.obj2.radius /2));
                // console.log(Math.abs(this.obj2.x - this.obj1.x) / 2);
                /////
                // checks if the x is greater than the width and radius
                if (distx >= (this.obj1.width / 2 + 10)) { return false };
                // check if the x is less than 0 then set it to false
                if (distx <= -15) { return false }; // the max distance before the collision happens

                if (disty >= (this.obj1.height)) { return false };
                // check if the y is less than 0 then set it to false
                if (disty <= -15) { return false }; // the max distance before the collision happens

                // checks if the center of both objects are closer to each other
                if (distx < (this.obj1.width)) { return true; }//add / 2 so the detection happens exactly
                if (disty < (this.obj1.height)) { return true; }//add / 2 so the detection happens exactly

        // let dx = distx - this.obj1.width /2;//add / 2 to detect center of objects
        // let dy = disty - this.obj1.height /2;//add / 2 to detect center of objects
        // // return (dx * dx + dy * dy <= (this.obj2.r * this.obj2.r));
        }
    }
}

class Rotate {
    constructor(c,{ x = 100, y = 100, velocity = { x: canvas1.width / 2, y: canvas1.height / 2 } }) {
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
        // this.c.rotate(90)
        Fist1.draw();
        Fist2.draw();
        // this.c.rotate(175.8)
        this.c.rotate(348.6);
        // if (update == true) {

        //     gun.draw();
        // }
        // guns.forEach(gund => {

            // if (gund.equip == true) {
                if ( update == true) {
                gun1.draw();
            }
            // }
        // })
        // testgun.draw();
        this.c.restore();
    }
}

class DrawImage{
    constructor(c, src, {x, y, width = 100, height = 100}) {
        this.c = c;
        this.src = src;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image
        this.draw(this.c, this.src, this.x, this.y);
    }
    draw(c, src, x, y) {
        this.image = new Image();
        this.image.src = src;
        c.drawImage(this.image,x, y, this.width, this.height);
    }
}

class Gun{
    constructor(c, { src, x, y, width, height, equip = false }) {
        this.c = c;
        this.src = src;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.equip = equip;

        // if (this.there == true) {
        // }
        // this.draw();
        // else {
        //     console.log("not there")
        // }
        // console.log(this.there);
    }
    draw() {
        let gun = new Image();
        gun.src = this.src;
        if (this.width || this.height) {
            this.c.drawImage(gun, this.x, this.y, this.width, this.height);
        }
        else {
            this.c.drawImage(gun, this.x, this.y);
        }
    }
}

class DrawText{
    constructor(c, { text, x, y, mxwdth = 100, font, color, update = false }) {
        this.c = c;
        this.text = text;
        this.x = x;
        this.y = y;
        this.mxwdth = mxwdth;
        this.font = font;
        this.color = color;
        this.update = update;

        if (this.update === true) {
            this.animate();
        }
        else if (this.update === false) {
            this.draw(this.c, this.text);
        }
    }
    draw(c, text) {
        if (this.color) {
            c.fillStyle = this.color;
        }
        c.fillText(text, this.x, this.y, this.mxwdth);
    }
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.draw(this.c, this.text);
    }
}

class Projectile {
    constructor(c, { x = 100, y = 100, radius = 30, color = "blue", velocity = { x: 10, y: 10 } }) {
        this.c = c;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }
    draw() {
        this.c.beginPath()
        this.c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        //drawing the player
        this.c.fillStyle = this.color;
        this.c.fill()
    }
    update() {
        this.draw()
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}
///////

/////// EXPORTS
export{
    Resize,
    Circle,
    Square,
    Map,
    Rotate,
    Collision,
    DrawImage,
    Gun,
    DrawText,
    Projectile
}
///////