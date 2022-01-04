import { canvas, c, offset, player } from "./index.js";

//the player class
class Player{
    constructor({x = 100, y = 100, radius = 30, color = "red"}){
        this.x = x;
        this.y = y;

        this.radius = radius;
        this.color = color;
    }
    draw(){
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false );
        //drawing the player
        c.fillStyle = this.color;
        c.fill()
    }
}

class Projectile{
    constructor({x = 100, y = 100, radius = 30, color = "blue", velocity = {x: 10, y: 10}}){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }
    draw(){
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false );
        //drawing the player
        c.fillStyle = this.color;
        c.fill()
    }
    update(){
        this.draw()
       this.x = this.x + this.velocity.x; 
       this.y = this.y + this.velocity.y; 
    }
}

class Enemy{
    constructor({x = 100, y = 100, radius = 30, color = "blue", velocity}){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }
    draw(){
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false );
        //drawing the player
        c.fillStyle = this.color;
        c.fill()
    }
    update(){
        this.draw()
       this.x = this.x + this.velocity.x; 
       this.y = this.y + this.velocity.y; 
    }
}

const friction = 1;
class Particle{
    constructor({x = 100, y = 100, radius = 30, color = "blue", velocity = {x: 10, y: 10}}){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
    }
    draw(){
        //saving the canvas so what happens only affects current code
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false );
        //drawing the player
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
        c.restore();
    }
    update(){
       this.draw()
       this.velocity.x *= friction;
       this.velocity.y *= friction;
       this.x = this.x + this.velocity.x; 
       this.y = this.y + this.velocity.y; 
       this.alpha -= 0.01;
    }
}

//function to get an element
class getElem{
    constructor({element = ""}){
        this.element = element;
    }
    value(value = 10){
        let element = document.querySelector(this.element);
        element.innerHTML = value;
    }
}

class Weapon{
    constructor({x = 100, y = 100, width = 40, height = 50, color = "blue", velocity = {x: canvas.width / 2, y: canvas.height / 2} }){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocity = velocity;
        this.angle = 0;
        this.toAngle = this.angle;
        this.binding()
    }
    draw(){
      
        c.beginPath();
        // c.rotate(150);
        c.fillStyle =  this.color;
        //Drawing a rectangle as the weapon
        c.fillRect(this.x, this.y, this.width, this.height);
        c.fill();
        c.closePath();
    }
    binding(){
		const self = this;
		window.addEventListener("mousemove", function(e){
			self.update(e.clientX, e.clientY);
		});
	}
    // make the gun rotate to the player
    update(nx, ny){
        this.toAngle = Math.atan2(ny - this.y, nx - this.x)
    }
    render(){
        c.save();
		//translating to the position of the mouse
		c.translate(-offset.x, -offset.y);
		// c.clearRect(-offset.x, -offset.y, canvas.width, canvas.height);
		  c.translate(player.x, player.y);
		//adding the map
		if(this.toAngle !== this.angle){
			c.rotate(this.toAngle - this.angle);
		}
        this.draw();
        c.restore();
    }
}

export{
    Player,
    Projectile,
    Enemy,
    Particle,
    getElem,
    Weapon
}
