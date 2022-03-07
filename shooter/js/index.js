//import in the player class
import {Player, Projectile, Enemy, Particle, getElem, Weapon} from "./class.js";
import {movespeed} from "./controls.js";

//the canvas
const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
const startGameBtn = document.getElementById("startGame");
const backBtn = document.getElementById("backbtn");
const modelEl = document.getElementById("modelEl");
const bigScore = document.getElementById("bigScore");
const scoreEl = document.getElementById("Score");

canvas.width = innerWidth;
canvas.height = innerHeight;

const x = canvas.width /2;
const y = canvas.height / 2;

let offset = {
    x: 0, 
    y: 0
    };

let cameraSpeed = {
	x: movespeed,
	y: movespeed
};

const player = new Player({x:x, y:y, radius:30, color:"red"})


//projectile arrays
let projectiles = [];
let enemies = [];
let particles = [];
let projectile;

//reset function
function init() {
    projectiles = [];
    enemies = [];
    particles = [];
    scoreVal = 0; //resets the score
    scoreEl.innerHTML = scoreVal;
    bigScore.innerHTML = scoreVal;
    document.documentElement.requestFullscreen();
}

// adding eventlistener
addEventListener("click", function(e){

    //the angle
    
    const angle = Math.atan2(e.clientY - canvas.height / 2, e.clientX - canvas.width / 2);
    const velocity = {
    x: Math.cos(angle) * 6, //the speed of the bullet
    y: Math.sin(angle) * 6 //the speed of the bullet
    }

    //setting the position of the projectile to be from the player
projectiles.push(projectile = new Projectile({ x: player.x, y: player.y,
    radius: 10, color:"red", velocity: {x: velocity.x, y: velocity.y
    }}))
})

//disabling right clicking
addEventListener("contextmenu", function(e){
    e.preventDefault();
});

//spawns enemies at random
function spawnEnemies(){
    setInterval(() => {
        // random size from 0 to 30
        const radius = Math.random() * (50 - 10) + 10;
        let x;
         let y;
         if( Math.random() < 0.5){
             //checking if the x position is at the left side
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
            y = Math.random() * canvas.height;
            // y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
        }
        else{
            x = Math.random() * canvas.width;
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
        }
        //setting the enemy color to be random
        const color = `hsl(${Math.random() * 1000}, 50%, 50%)`;
        ///getting the enemy postition to go to the player
        const angle = Math.atan2( canvas.height / 2 - y, canvas.width / 2 - x);
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        //pushing the enemy object
        enemies.push(new Enemy({x:x, y:y, radius: radius, color: color, velocity: velocity}));
    }, 1000);
}

let animationId;
let scoreVal = 0;
let weapon = new Weapon({x: player.x, y: player.y, width: 20, height:20, color: "purple"});

// animating the game
function animate(){
    animationId = requestAnimationFrame(animate);
    //clearing the canvas
    c.fillStyle = "rgba(0, 0, 0, 1)";
    c.save();
    
    //translating the scene to focus on the player- or so the view changes
    c.translate(offset.x, offset.y);
    c.fillRect(-offset.x, -offset.y, canvas.width, canvas.height);
    // Map();
    
    //drawing the players
    player.draw();
    

    //the projectiles
    projectiles.forEach( function(projectile, index){
        projectile.update();
        
        //remove from edges of screen
        // if(projectile.x + projectile.radius < 0 || projectile.x - projectile.radius > canvas.width || projectile.y + projectile.radius < 0 || projectile.y - projectile.radius > canvas.height){
        //     setTimeout(() => {
        //         projectiles.splice(index, 1);
        //     }, 0);
        // }

    });
    
    //drawing the particles
    particles.forEach((particle, i) => {
        if(particle.alpha <= 0){
            //removing the particles from the game
            particles.splice(i, 1)
        }
        else{
            //updating the particle
            particle.update();
        }
    });
    
    //the enemy
    enemies.forEach( function(enemy, i){
        enemy.update();
        //collsion detection with the player and enemy
        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)
        
        //end game collision
        if (dist - enemy.radius - player.radius < 1){
            cancelAnimationFrame(animationId);
            modelEl.style.display = "flex";
            bigScore.innerText = scoreVal;
        }

        //the collision dectection with the projectiles and the enemy
        projectiles.forEach((projectile, index)  => {
            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
            if (dist - enemy.radius - projectile.radius < 1){

                //creating the explosion effect
                for (let i = 0; i < enemy.radius * 2; i++) {
                    particles.push(new Particle({x: projectile.x, radius: Math.random() * 3, 
                    y: projectile.y, color: enemy.color, velocity: 
                    {
                        x: (Math.random() - 0.5) * (Math.random() * 8),
                        y: (Math.random() - 0.5) * (Math.random() * 8)
                    }}));
                    
                }
                if (enemy.radius -10 > 10 ) {
                    // if player shoots big enemies increase points by 50
                    scoreVal += 50;
                    const score = new getElem({element:"#Score"});
                    score.value(scoreVal);
                    
                    //for smooth shrinking
                    // gsap.to(enemy, {radius: enemy.radius - 10})
                    enemy.radius -= 10;
                    setTimeout(() => {
                        projectiles.splice(index, 1);
                    }, 0);
                }
                else{
                    //setting the score to 100 when the player removes the enemy from scene
                    scoreVal += 100;
                    const score = new getElem({element:"#Score"});
                    score.value(scoreVal);
                    //removing the enemy when the size is less than 10 and it collides with the bullet
                    setTimeout(() => {
                        enemies.splice(i, 1);
                        projectiles.splice(index, 1);
                    }, 0);
                }
            }
        });
    });

    // c.translate(offset.x /2, offset.y /2);
    // c.translate(player.x, player.y);
    //restoring the elements back to position
    weapon.render();
    c.restore();


}

//restarts game
startGameBtn.addEventListener("click", function () {
    init(); //resetting the arrays
    animate();// game loop
    spawnEnemies(); // spawnEnemies every second
    
    modelEl.style.display = "none";
})

backBtn.addEventListener("click", function () {
    window.location.href = "../"
})
//fps counter

const fps = {
    startTime : 0,
    frameNumber : 0,	
    getFPS : function(){
        this.frameNumber++;		
        const d = performance.now(),		
        currentTime = ( d - this.startTime ) / 1000,	
        result = Math.floor( ( this.frameNumber / currentTime ) );
    	if( currentTime > 1 ){			
            this.startTime = performance.now();	
            this.frameNumber = 0;
        }
        return result;
    	}
    };

const f = document.querySelector("#fps");
function fpsLoop(){	
    setTimeout( fpsLoop, 1000 / 60 );	f.innerHTML = fps.getFPS();
}

fpsLoop()
            
addEventListener("resize", function (e) {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

 // exports
export{
    canvas,
    c,
    player,
    x,
    y,
    projectile,
    offset,
    cameraSpeed
}

function Map() {
    // for (let i = 0; i < 20; i++) {
     for (let k = 0; k < 20; k++) {
    for (let j = 0; j < 20; j++) {
      c.save();
      c.fillStyle = "limegreen";
      c.translate(0 + j * 50, 0 + k * 50);
      c.fillRect(0, 0, 48, 48);
      c.restore();
    }
  }
//  }
} 