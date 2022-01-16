import { Pacman } from "./ninja.js";
import MovingDirection from "./directions.js";

class Map{
    constructor(tileSize){
        this.tileSize = tileSize;
        
        //the images
        this.wall = this.loadImage("wall");
    }

    //// 
    // 0 - wall
    // 1 - ninja
    // 3 - blank space
    ////

    map = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // -- 20 units
        [0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,0], // -- 20 units
        [0,0,3,3,3,3,0,0,0,0,0,0,0,3,3,0,0,0,0,0], // -- 20 units
        [0,0,4,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0], // -- 20 units
        [0,3,4,4,4,3,0,4,4,4,4,4,4,4,4,4,4,4,0,0], // -- 20 units
        [1,3,4,4,3,0,4,4,4,4,4,4,4,4,4,4,4,4,0,0], // -- 20 units
        [0,0,3,4,0,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0], // -- 20 units
        [0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0], // -- 20 units
        [0,0,3,2,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0], // -- 20 units
        [0,0,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,0], // -- 20 units
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // -- 20 units
    ]
    draw(ctx){
        for(let row = 0; row < this.map.length; row++){
            for(let column = 0; column < this.map[row].length; column++){
                let tile = this.map[row][column];
                if(tile === 0){
                    this.drawImage(ctx, this.wall, column, row, this.tileSize);
                }
                ctx.strokeRect(column * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize);
            }
        }
    }
    setCanvasSize(canvas){
        canvas.width = this.map[0].length * this.tileSize; //setting the canvas size
        canvas.height = this.map.length * this.tileSize; 
    }
    loadImage(img){
        const image = new Image();
        image.src = `assets/${img}.png`;
        return image;
    }
    drawImage(ctx, img, column, row, size){
        ctx.drawImage(img, column * this.tileSize, row * this.tileSize, size, size);
    }
    getPacman(velocity){
        for(let row = 0; row < this.map.length; row++){
            for(let column = 0; column < this.map[row].length; column++){
                let tile = this.map[row][column];
                if(tile === 1){
                    return new Pacman(column * this.tileSize, row * this.tileSize, this.tileSize, velocity, this);
                }

            }
        }
    }
    didCollideWithEnvironment(x, y, direction){
        if (direction == null) {
            return;
        }

        //checks if the position is in the tile before moving
        if(Number.isInteger(x/this.tileSize) && Number.isInteger(y/this.tileSize)){
            let column = 0;
            let row = 0;
            let nextColumn = 0;
            let nextRow = 0;
            
            switch (direction) {
                case MovingDirection.right:
                    nextColumn = x + this.tileSize;
                    column = nextColumn / this.tileSize;
                    row = y / this.tileSize;
                    break;
                case MovingDirection.left:
                    nextColumn = x - this.tileSize;
                    column = nextColumn / this.tileSize;
                    row = y / this.tileSize;
                    break;
                case MovingDirection.up:
                    nextRow = y - this.tileSize;
                    row = nextRow / this.tileSize;
                    column = x / this.tileSize;
                    break;
                case MovingDirection.down:
                    nextRow = y + this.tileSize;
                    row = nextRow / this.tileSize;
                    column = x / this.tileSize;
                    break;
            
                default:
                    break;
            }
            const tile = this.map[row][column]; //detecting collision between walls
            if(tile === 0){
                return true;
            }
        }
        return false;
    }
}

export{
    Map
}