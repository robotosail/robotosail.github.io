import * as THREE from "../library/three.module.js";
import { PointerLockControls } from "../library/controls/PointerLockControls.js";

const CANNON = window.CANNON;
let scene, world, camera, controls, renderer, groundBody, floor, contactPhysics, semiContactSlippery;
let Materials = {
    playerMaterial: new CANNON.Material("playerMaterial"), //naming a material
    groundMaterial: new CANNON.Material("groundMaterial", "1")
}
let fov = -100;
// let options = {
//     friction: 1.0,
//     restitution: 0.2
// }
let options = {
    friction: 1.0,
    // Bounciness (0-1, higher is bouncier). How much energy is conserved
    // after a collision
    restitution: 0,
}
let optionsSlippery = {
    friction: 0.7, //how slippery it is
    restitution: 0 //the bounciness
}

class Initialize{
    constructor() {
        // CANNON JS
        this.cannonInit();
        this.threeInit();
    }
    // CANNON JS
    cannonInit() {
        world = new CANNON.World(); // initializing the world
        world.quatNormalizeSkip = 0;
        world.quatNormalizeFast = false;

        // world.gravity.set(0, -20, 0);
        world.broadphase = new CANNON.NaiveBroadphase();
        world.gravity.set(0, 0.8, 0); // Setting the gravity of the world.
        // world.broadphase = new CANNON.NaiveBroadphase(); // Detect colliding object
        world.solver.iterations = 10; // Collision detection sampling rate
        contactPhysics = new CANNON.ContactMaterial(Materials.groundMaterial, Materials.groundMaterial, options);
        semiContactSlippery = new CANNON.ContactMaterial(Materials.playerMaterial, Materials.groundMaterial, optionsSlippery);
        world.addContactMaterial(contactPhysics);
        world.addContactMaterial(semiContactSlippery);
        this.#updatePhysics();
    }
    #updatePhysics() {
        requestAnimationFrame(this.#updatePhysics.bind(this));
            
            world.step(1 / 60);
    }
    // THREE JS
    threeInit() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
            fov, //the fov
            1024 / 1084, // the aspect ratio
            0.1, // the near 
            1000 // The far
        )

        /// RENDERER
        renderer = new THREE.WebGL1Renderer({ antialias: true });
        renderer.setSize(innerWidth, innerHeight);
        renderer.setClearColor("skyblue");
        renderer.setPixelRatio(devicePixelRatio);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.BasicShadowMap;
        document.body.appendChild(renderer.domElement);
        ///

        /// CONTROLS
        controls = new PointerLockControls(camera, renderer.domElement);
        const btn = document.getElementById("playbtn");
        btn.addEventListener("click", () => {
            controls.lock();
        })
        // to make the ui and other stuff disappear when clicked
        controls.addEventListener("lock", function () {
            btn.style.display = "none";
        });

        controls.addEventListener("unlock", function () {
            btn.style.display = "block";
        });
        ///

        /// LIGHT
        let ambientlight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientlight);

        // //makes the light shine
        // 0xffffff
        let light = new THREE.PointLight("skyblue", 0.15, 1000);
        light.position.set(0, -100, 50);

        //to make it cast shadow
        light.castShadow = true;
        light.shadow.camera.near = 0.1;
        light.shadow.camera.far = 50;
        scene.add(light);
        ///

        /// FLOOR
            // --- cannon js
                const groundShape = new CANNON.Plane();
                groundBody = new CANNON.Body({
                    mass: 0, // mass == 0 makes the body static
                    shape: groundShape,
                    // material: groundMaterial
                    material: Materials.playerMaterial
                });
                groundBody.position.y = 0;
                world.addBody(groundBody);
            // ---
        
            // --- THREE JS
                floor = new THREE.Mesh(
                new THREE.PlaneGeometry(700, 700, 50, 50, 50),
                new THREE.MeshPhongMaterial({ color: "orange" }));
                // 0x808080
                //makes the floor spin
                // groundBody.angularVelocity.set(Math.PI / 2, 0, 0)
                floor.rotation.x = Math.PI / 2;
                //make the floor show shadow
                floor.receiveShadow = true;
                scene.add(floor);
            // ---
        ///
        this.animate();
    }
    #render() {
        renderer.render(scene, camera);
    }
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.#render();
        floor.position.copy(groundBody.position);
        groundBody.quaternion.copy(floor.quaternion);
    }
    
}

new Initialize();

// function init() {
//   // camera.position.z =
//   //   Math.floor(Math.random() * -347) + 1 ||
//   //   Math.floor(Math.random() * 338) + 1 ||
//   //   Math.floor(Math.random() * -345) + 1 ||
//   //   Math.floor(Math.random() * 340) + 1;
//   // camera.position.x =
//   //   Math.floor(Math.random() * -344) + 1 ||
//   //   Math.floor(Math.random() * 344) + 1 ||
//   //   Math.floor(Math.random() * -331) + 1 ||
//   //   Math.floor(Math.random() * 345) + 2;
//   // camera.position.y = -4;
// //   controls.addEventListener("change", render);

// }

//when window is resized
window.addEventListener("resize", windowresize, false);
//when window is resized
function windowresize() {
  camera.aspect = 1024/1084;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

const fps = {
  startTime: 0,
  frameNumber: 0,
  getFPS: function () {
    this.frameNumber++;
    const d = performance.now(),
      currentTime = (d - this.startTime) / 1000,
      result = Math.floor(this.frameNumber / currentTime);
    if (currentTime > 1) {
      this.startTime = performance.now();
      this.frameNumber = 0;
    }
    return result;
  }
};
const f = document.querySelector("#fps");
function fpsLoop() {
  setTimeout(fpsLoop, 1000 / 60);
  f.innerHTML = fps.getFPS();
}

fpsLoop();


export{
  scene, 
  world,
  camera,
  controls, 
  renderer, 
  floor,
  Materials,
  options,
  THREE,
  CANNON,
}