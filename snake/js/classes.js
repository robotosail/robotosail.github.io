//resizing the canvas.
class Resize{
    //creating a resize class
    constructor({element}){
        this.element = element;
        this.render(this.element, this.fullscreen);
    }
    render(element){
        try{
            addEventListener("resize", function(){
    
                //binding the this object to render
                element.width = innerWidth;
                element.height = innerHeight;
            });
        }
        //catching the errors
        catch(err){
            console.log(err)
        }
    }
}

// --- player class
class Player{
    constructor(ctx, {x, y, size = {x: 20, y: 20}, color = "black", tailLength, outline = false, thickness = 5}){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.ctx = ctx;
        this.outline = outline;
        this.thickness = thickness;
        this.tailLength = tailLength;
        this.draw(this.ctx, this.size, this.color);
    }
    draw(ctx, size, color){
        if(this.outline === true){
            ctx.strokeStyle = "black";
            ctx.lineWidth = this.thickness;
            ctx.lineJoin = "round";
            ctx.strokeRect(this.x, this.y, size.x, size.y);
            ctx.stroke();
        }
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, size.x, size.y);
        ctx.fill();
    }
}

// --- part
class SnakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

// ---- fruit
class Fruit{
    constructor(ctx, {type, x, y, size = {x, y}, outline = false, thickness = 5}){
        this.type = type;
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.size = size;
        this.outline = outline;
        this.thickness = thickness;
        if(this.type === "apple"){
            this.apple(this.ctx, this.x, this.y, this.size)
        }
    }
    apple(ctx, x, y, size){
        if(this.outline === true){
            ctx.strokeStyle = "black";
            ctx.lineWidth = this.thickness;
            ctx.lineJoin = "round";
            ctx.strokeRect(this.x, this.y, size.x, size.y);
            ctx.stroke();
        }
        ctx.fillStyle = "red";
        ctx.fillRect(x, y, size.x, size.y);
        ctx.strokeStyle = 'green';
    }
    checkCollision(element1, element2){
        if(element1.x < element2.x + element2.size.x &&
            element1.x + element1.size.x > element2.x &&
            element1.y < element2.y + element2.size.x &&
            element1.size.y + element1.y > element2.y){
            element2.x = Math.floor(Math.random() * canvas.width);
            element2.y = Math.floor(Math.random() * canvas.height);
        }
    }
}

//collision detection
class Collision{
    constructor(element1, element2){
        if(element1.x < element2.x + element2.size.x &&
            element1.x + element1.size.x > element2.x &&
            element1.y < element2.y + element2.size.x &&
            element1.size.y + element1.y > element2.y){
            element2.x = Math.floor(Math.random() * canvas.width);
            element2.y = Math.floor(Math.random() * canvas.height);
        }
    }
}

//shows the fps
class Frame{
    constructor(element, ctx){
        this.ctx = ctx;
        this.element = element;
        this.currentSec = 0;
        this.frameCount = 0;
        this.frameLastSec = 0;
        this.countFrame(this.ctx);
    }
    countFrame(ctx) {
        requestAnimationFrame(this.countFrame.bind(this))
        if(ctx == null){
            return;
        }
        let sec = Math.floor(Date.now()/1000);
        if(sec !== this.currentSec){
            this.currentSec = sec;
            this.frameLastSec = this.frameCount;
            this.frameCount = 1;
        }
        else{
            this.frameCount ++;
        }
        document.getElementById(this.element).innerHTML = this.frameLastSec;
    }

}


class Text{
    constructor(ctx, {text = "test", x=0 , y = 0, font = "10px Comic", color = "yellow"}){
        this.ctx = ctx;
        this.text = text;
        this.x = x;
        this.y = y;
        this.font = font;
        this.color = color;
        this.drawText(this.ctx, this.text, this.x, this.y, this.font, this.color);
    }
    drawText(ctx, text, x, y, font, color){
        ctx.fillStyle = color;
        ctx.font = font;
        ctx.fillText(text, x, y);
        ctx.strokeStyle = "black"
        ctx.lineWidth = 1;
        ctx.strokeText(text, x, y);
    }

}

export{
    Resize,
    Player,
    Frame,
    Fruit,
    SnakePart,
    Collision,
    Text
}