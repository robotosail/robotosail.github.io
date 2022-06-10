# 3D
## Purpose:
The purpose of this project is to simulate a 3d world that has physics integrated (like gravity, 3d collision etc.)
By combining the 3d library three.js and the physics library cannon.js, one is able to make this possible.

## THREE.JS:
Three.js was made by mrdoob. it is a javascript library that helps create an easy to use, lightweight, cross-browser.

## Usage:
```javascript
import * as THREE from "three";

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
camera.position.z = 1;
```
Think of the camera like our eyes, they help us see things in our world, this is the same as in three.js

```javascript
const scene = new THREE.Scene();
```
The like our environment, the scene it contains objects in our 3D world.
```javascript
const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 ); // defines the shape of the object; the shape of this object is a box.
const material = new THREE.MeshNormalMaterial(); // defines the type of material to use.
const mesh = new THREE.Mesh( geometry, material ); // merging the shape, and the material together.
scene.add( mesh ); // adding it to the environment(scene);
```
```javascript
const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animation );
document.body.appendChild( renderer.domElement );

// animation

function animation( time ) {

	mesh.rotation.x = time / 2000;
	mesh.rotation.y = time / 1000;

	renderer.render( scene, camera );

}
```
The renderer is like our world, it contains the scene. if done correctly you should see <a href="https://jsfiddle.net/7u84j6kp/" target="_blank">this</a>
