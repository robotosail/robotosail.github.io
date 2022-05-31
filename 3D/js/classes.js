import * as THREE from "../library/three.module.js";
import { scene, world } from "./index.js";

class drawShape {
  constructor({
    update,
    name,
    shape,
    width = 10,
    height = 10,
    depth = 10,
    x,
    y,
    z,
    color,
    phong,
    mass,
    texture,
    wireframe,
    material,
    velocity = { x, y, z },
  }) {
    this.width = width;
    this.name = name;
    this.height = height;
    this.depth = depth;
    this.update = update;
    this.material = material;
    this.x = x;
    this.y = y;
    this.z = z;
    this.texture = texture;
    this.velocity = velocity;
    this.wireframe = wireframe;
    this.color = color;
    this.phong = phong;
    this.shape = shape;
    this.mass = mass;
    if (this.shape === "box") {
      this.drawBox(
        this.width,
        this.height,
        this.depth,
        this.color,
        this.x,
        this.y,
        this.z
      );
    } else {
      return console.log("the given shape is not a type given");
    }
    if (this.update === true) {
      this.animate();
      console.log("update");
    }
  }
  drawBox(width, height, depth, color, x, y, z) {
    let boxMaterial;
    const boxShape = new THREE.BoxGeometry(width, height, depth);
    if (this.phong === true) {
      boxMaterial = new THREE.MeshPhongMaterial({ color: color });
    } else {
      boxMaterial = new THREE.MeshBasicMaterial({ color: color });
    }
    if (this.wireframe === true) {
      boxMaterial.wireframe = true;
    } else {
      boxMaterial.wireframe = false;
    }
    this.name = new THREE.Mesh(boxShape, boxMaterial);
    scene.add(this.name);

    // material = new CANNON.Material("wallMaterial")
    const BodyShape = new CANNON.Box(
      new CANNON.Vec3(width / 2, height / 2, depth / 2)
    );
    this.Body = new CANNON.Body({
      mass: this.mass,
      shape: BodyShape,
      material: this.material,
    });
    world.addBody(this.Body);
    this.Body.position.set(x, y, z);

    if (this.name) {
      this.name.name = this.name;
    }
    if (this.texture) {
      boxMaterial.map = this.texture;
    }
  }
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.name.position.copy(this.Body.position);
    this.Body.quaternion.copy(this.name.quaternion);
  }
  remove() {
    scene.remove(this.name);
    scene.world.remove(this.Body);
  }
  set(x, y, z) {
    this.Body.position.set(x, y, z);
  }
  velocity() {
    this.Body.velocity.x += this.velocity.x;
    this.Body.velocity.y += this.velocity.x;
    this.Body.velocity.z += this.velocity.x;
    console.log(this.Body.velocity);
  }
}

export { drawShape };
