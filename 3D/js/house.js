import { drawShape } from "./classes.js";
//"use strict";
// import { slipperyMaterial } from "./crates.js";
import { scene, THREE, CANNON, world, Materials } from "./index.js";

let roof,
  roofBody,
  roof1,
  roof1Body,
  roofpatch1,
  roofpatch1Body,
  roofpatch2,
  roofpatch2Body,
  mass = 0;
let cube,
  cubeBody,
  cube1,
  cube1Body,
  cube3,
  cube3Body,
  cube4,
  cube4Body,
  inside_wall,
  inside_wallBody,
  cube11,
  cube11Body,
  cube12,
  cube12Body,
  cube33,
  cube33Body,
  cube44,
  cube44Body,
  inside_wall1,
  inside_wall1Body,
  rampBody,
  ramp;
let front_topwall1,
  front_topwall1Body,
  front_topleftwall1,
  front_topleftwall1Body,
  front_toprightwall1,
  front_toprightwall1Body,
  front_topbackwall1,
  front_topbackwall1Body,
  insidewall11,
  insidewall11Body,
  insidewall12,
  insidewall12Body;
let front_topwall2,
  front_topwall2Body,
  front_topleftwall2,
  front_topleftwall2Body,
  front_toprightwall2,
  front_toprightwall2Body,
  front_topbackwall2,
  front_topbackwall2Body,
  insidewall21,
  insidewall21Body,
  insidewall22,
  insidewall22Body;

const wallmaterial = new CANNON.Material("wallMaterial"),
  friction = 1,
  restitution = 0.3;

function house() {
  const insideWallcolor = 0x808080;
  const roofcolor = "grey";
  const roofcolor2 = 0xd3d3d3;
  // const color1 = "red";
  const color1 = 0xc78d5a;
  const color2 = 0x808080;
  // const color2 = 0x808080;
  // for creating the house
  const houseTexture = new THREE.TextureLoader().load("assets/wall.jpg");

  const Texture = new THREE.TextureLoader().load("assets/wall2.jpg");
  function house1() {
    //front wall
    // cannonJS body
    const shape1 = new CANNON.Box(new CANNON.Vec3(3 / 2, 40 / 2, 135 / 2));
    cubeBody = new CANNON.Body({
      shape: shape1,
      mass: mass,
      // material: Materials.groundMaterial
    });
    world.add(cubeBody);
    // threeJS Mesh
    const shape = new THREE.BoxGeometry(3, 40, 135);
    const material = new THREE.MeshPhongMaterial({
      color: color1,
      // map: houseTexture
    });
    cube = new THREE.Mesh(shape, material);
    cube.castShadow = true;
    cube.recieveShadow = true;

    // right wall from the view of facing left
    const shapeBody = new CANNON.Box(new CANNON.Vec3(120 / 2, 40 / 2, 3 / 2));
    cube1Body = new CANNON.Body({
      shape: shapeBody,
      mass: mass,
      // material: Materials.groundMaterial
    });
    world.add(cube1Body);

    const shape2 = new THREE.BoxGeometry(120, 40, 3);
    const material2 = new THREE.MeshPhongMaterial({
      color: color1,
      // map: houseTexture
    });
    cube1 = new THREE.Mesh(shape2, material2);
    cube1.castShadow = true;

    // left wall
    const shape3Body = new CANNON.Box(new CANNON.Vec3(120 / 2, 40 / 2, 3 / 2));
    cube3Body = new CANNON.Body({
      shape: shape3Body,
      mass: mass,
      // material: Materials.groundMaterial
    });
    world.add(cube3Body);

    const shape3 = new THREE.BoxGeometry(120, 40, 3);
    const material3 = new THREE.MeshPhongMaterial({
      color: color1,
      // map: houseTexture
    });
    cube3 = new THREE.Mesh(shape3, material3);
    cube3.castShadow = true;

    //back wall
    const shape4Body = new CANNON.Box(new CANNON.Vec3(3 / 2, 40 / 2, 190 / 2));
    cube4Body = new CANNON.Body({
      shape: shape4Body,
      mass: mass,
      // material: Materials.groundMaterial
    });
    world.add(cube4Body);

    const shape4 = new THREE.BoxGeometry(3, 40, 190);
    const material4 = new THREE.MeshPhongMaterial({
      color: color1,
      // map: houseTexture
    });
    cube4 = new THREE.Mesh(shape4, material4);

    //roof
    const shape5Body = new CANNON.Box(
      new CANNON.Vec3(138 / 2, 0.7 / 2, 124.5 / 2)
    );
    roofBody = new CANNON.Body({
      shape: shape5Body,
      mass: mass,
      // material: Materials.groundMaterial
    });
    world.add(roofBody);

    const roofGeometry = new THREE.BoxGeometry(138, 0.7, 124.5);
    const roofColor = new THREE.MeshPhongMaterial({ color: roofcolor2 });
    roof = new THREE.Mesh(roofGeometry, roofColor);

    //the small roof patxh
    const shape6Body = new CANNON.Box(new CANNON.Vec3(50 / 2, 3 / 2, 56 / 2));
    roofpatch2Body = new CANNON.Body({
      shape: shape6Body,
      mass: mass,
      material: Materials.groundMaterial,
    });
    world.add(roofpatch2Body);

    const roofpatchGeometry2 = new THREE.BoxGeometry(50, 3, 56);
    const roofpatchColor2 = new THREE.MeshPhongMaterial({ color: roofcolor2 });
    roofpatch2 = new THREE.Mesh(roofpatchGeometry2, roofpatchColor2);

    // inside wall
    const shape7Body = new CANNON.Box(new CANNON.Vec3(87 / 2, 40 / 2, 3 / 2));
    inside_wallBody = new CANNON.Body({
      shape: shape7Body,
      mass: mass,
      // material: Materials.groundMaterial
    });
    world.add(inside_wallBody);

    const shape5 = new THREE.BoxGeometry(87, 40, 3);
    const material5 = new THREE.MeshPhongMaterial({
      color: color1,
      // map: houseTexture
    });
    inside_wall = new THREE.Mesh(shape5, material5);

    //ramp
    const shape_ramp = new THREE.BoxGeometry(3, 80, 60);
    const material_ramp = new THREE.MeshPhongMaterial({
      color: 0xC78D5A,
      // map: houseTexture
    });
    ramp = new THREE.Mesh(shape_ramp, material_ramp);

    const rampShape = new CANNON.Box(new CANNON.Vec3(3 / 2, 80 / 2, 60 / 2));
    rampBody = new CANNON.Body({
      shape: rampShape,
      mass: mass,
      material: Materials.groundMaterial,
    });
    world.add(rampBody);

    //position

    // roof
    roofBody.position.set(-150, -34, -33);

    // roof patch
    roofpatch2Body.position.set(-90, -34, 56.5);
    //left wall
    cube3Body.position.set(-140, -15, 85);

    // right wall from the view of facing left
    cube1Body.position.set(-140, -15, -95);

    //front wall
    cubeBody.position.set(-81.5, -15, 17);

    // back wall
    cube4Body.position.set(-200.5, -15, -2);

    //inside wall
    inside_wallBody.position.set(-157, -15, 30);

    //ramp
    rampBody.position.set(-160.5, -15, 60);
    ramp.rotation.z = 90;
    scene.add(cube, cube1, cube3, cube4, roof, inside_wall, roofpatch2, ramp);
  }
  house1();

  function house2() {
    //front wall
    const shape11Body = new CANNON.Box(new CANNON.Vec3(3 / 2, 40 / 2, 155 / 2));
    cube11Body = new CANNON.Body({
      mass: mass,
      shape: shape11Body,
      // material: Materials.groundMaterial
    });
    world.add(cube11Body);

    const shape11 = new THREE.BoxGeometry(3, 40, 155);
    const material11 = new THREE.MeshPhongMaterial({
      color: color2,
      // map: houseTexture
    });
    cube11 = new THREE.Mesh(shape11, material11);
    cube11.castShadow = true;
    cube11.receiveShadow = true;

    // right wall
    const shape22Body = new CANNON.Box(new CANNON.Vec3(120 / 2, 40 / 2, 3));
    cube12Body = new CANNON.Body({
      mass: mass,
      shape: shape22Body,
      //  material: Materials.groundMaterial
    });
    world.add(cube12Body);

    const shape22 = new THREE.BoxGeometry(120, 40, 3);
    const material22 = new THREE.MeshPhongMaterial({
      color: color2,
      // map: houseTexture
    });
    cube12 = new THREE.Mesh(shape22, material22);
    cube12.castShadow = true;
    cube12.receiveShadow = true;

    // left wall
    const shape33Body = new CANNON.Box(new CANNON.Vec3(120 / 2, 40 / 2, 3 / 2));
    cube33Body = new CANNON.Body({
      mass: mass,
      shape: shape33Body,
      //  material: Materials.groundMaterial
    });
    world.add(cube33Body);

    const shape33 = new THREE.BoxGeometry(120, 40, 3);
    const material33 = new THREE.MeshPhongMaterial({
      color: color2,
      // map: houseTexture
    });
    cube33 = new THREE.Mesh(shape33, material33);
    cube33.castShadow = true;
    cube33.receiveShadow = true;

    //back wall
    const shape44Body = new CANNON.Box(new CANNON.Vec3(3 / 2, 40 / 2, 199 / 2));
    cube44Body = new CANNON.Body({
      mass: mass,
      shape: shape44Body,
      //  material: Materials.groundMaterial
    });
    world.add(cube44Body);

    const shape44 = new THREE.BoxGeometry(3, 40, 199);
    const material44 = new THREE.MeshPhongMaterial({
      color: color2,
      // map: houseTexture
    });
    cube44 = new THREE.Mesh(shape44, material44);
    cube44.castShadow = true;
    cube44.receiveShadow = true;

    //roof
    const roof1Shape = new CANNON.Box(new CANNON.Vec3(138 / 2, 1 / 2, 145 / 2));
    roof1Body = new CANNON.Body({
      mass: mass,
      shape: roof1Shape,
      material: Materials.groundMaterial,
    });
    world.add(roof1Body);

    const roofGeometry1 = new THREE.BoxGeometry(138, 1, 145);
    const roofColor1 = new THREE.MeshBasicMaterial({ color: roofcolor });
    roof1 = new THREE.Mesh(roofGeometry1, roofColor1);

    //the small roof patch
    const roofpatchShape = new CANNON.Box(
      new CANNON.Vec3(50 / 2, 3 / 2, 54 / 2)
    );
    roofpatch1Body = new CANNON.Body({
      mass: mass,
      shape: roofpatchShape,
      material: Materials.groundMaterial,
    });
    world.add(roofpatch1Body);

    const roofpatchGeometry1 = new THREE.BoxGeometry(50, 3, 54);
    const roofpatchColor1 = new THREE.MeshBasicMaterial({ color: roofcolor });
    roofpatch1 = new THREE.Mesh(roofpatchGeometry1, roofpatchColor1);

    // inside wall
    const inside_wall1Shape = new CANNON.Box(
      new CANNON.Vec3(90 / 2, 40 / 2, 3 / 2)
    );
    inside_wall1Body = new CANNON.Body({
      mass: mass,
      shape: inside_wall1Shape,
      //  material: Materials.groundMaterial
    });
    world.add(inside_wall1Body);

    const shape55 = new THREE.BoxGeometry(90, 40, 3);
    const material55 = new THREE.MeshPhongMaterial({ color: insideWallcolor });
    inside_wall1 = new THREE.Mesh(shape55, material55);

    //position

    // roof
    roof1Body.position.set(150, -35, 12);

    // roof patch
    roofpatch1Body.position.set(90, -35, -87.5);

    //left wall
    cube33Body.position.set(140, -15, 85);
    // right wall
    cube12Body.position.set(140, -15, -114);
    //front wall
    cube11Body.position.set(80.5, -15, -37);

    // back wall
    cube44Body.position.set(200.5, -15, -14);

    //inside wall
    inside_wall1Body.position.set(155.5, -15, -56);

    scene.add(cube12, cube11, roof1, cube33, inside_wall1, cube44, roofpatch1);
  }
  house2();

  //this is for the first house second floor
  function tophouse1() {
    // the front top of the hpuse
    const front_topwallShape = new CANNON.Box(
      new CANNON.Vec3(3 / 2, 40 / 2, 144 / 2)
    );
    front_topwall2Body = new CANNON.Body({
      mass: mass,
      shape: front_topwallShape,
      //  material: Materials.groundMaterial
    });
    world.add(front_topwall2Body);

    const front_topwallGeometry2 = new THREE.BoxGeometry(3, 40, 144);
    const front_topwallMaterial2 = new THREE.MeshPhongMaterial({
      color: color1,
      // map: houseTexture
    });
    front_topwall2 = new THREE.Mesh(
      front_topwallGeometry2,
      front_topwallMaterial2
    );

    // the top left wall of the house
    const front_topleftwallShape = new CANNON.Box(
      new CANNON.Vec3(120 / 2, 40 / 2, 3 / 2)
    );
    front_topleftwall2Body = new CANNON.Body({
      mass: mass,
      shape: front_topleftwallShape,
      //  material: Materials.groundMaterial
    });
    world.add(front_topleftwall2Body);

    const front_topleftwallGeometry2 = new THREE.BoxGeometry(120, 40, 3);
    const front_topleftwallMaterial2 = new THREE.MeshPhongMaterial({
      color: color1,
      // map: houseTexture
    });

    front_topleftwall2 = new THREE.Mesh(
      front_topleftwallGeometry2,
      front_topleftwallMaterial2
    );

    // the top right wall of the house
    const front_toprightwallshape2 = new CANNON.Box(
      new CANNON.Vec3(120 / 2, 40 / 2, 3 / 2)
    );
    front_toprightwall2Body = new CANNON.Body({
      mass: mass,
      shape: front_toprightwallshape2,
      //  material: Materials.groundMaterial
    });
    world.add(front_toprightwall2Body);

    const front_toprightwallGeometry2 = new THREE.BoxGeometry(120, 40, 3);
    const front_toprightwallMaterial2 = new THREE.MeshPhongMaterial({
      color: color1,
      // map: houseTexture
    });

    front_toprightwall2 = new THREE.Mesh(
      front_toprightwallGeometry2,
      front_toprightwallMaterial2
    );

    // the top back wall
    const front_topbackwallshape = new CANNON.Box(
      new CANNON.Vec3(3 / 2, 40 / 2, 140 / 2)
    );
    front_topbackwall2Body = new CANNON.Body({
      mass: mass,
      shape: front_topbackwallshape,
      //  material: Materials.groundMaterial
    });
    world.add(front_topbackwall2Body);

    const front_topbackwallGeometry2 = new THREE.BoxGeometry(3, 40, 140);
    const front_topbackwallMaterial2 = new THREE.MeshPhongMaterial({
      color: color1,
      // map: houseTexture
    });
    front_topbackwall2 = new THREE.Mesh(
      front_topbackwallGeometry2,
      front_topbackwallMaterial2
    );

    //inside wall 1
    const insidewallshape = new CANNON.Box(
      new CANNON.Vec3(3 / 2, 32 / 2, 55 / 2)
    );
    insidewall11Body = new CANNON.Body({
      mass: mass,
      shape: insidewallshape,
      //  material: Materials.groundMaterial
    });
    world.add(insidewall11Body);

    const insidewallGeometry11 = new THREE.BoxGeometry(3, 32, 55);
    const insidewallMaterial11 = new THREE.MeshPhongMaterial({
      color: color1,
    });
    insidewall11 = new THREE.Mesh(insidewallGeometry11, insidewallMaterial11);

    // insidewall 2
    const insidewall2shape = new CANNON.Box(
      new CANNON.Vec3(55 / 2, 32 / 2, 3 / 2)
    );
    insidewall12Body = new CANNON.Body({
      mass: mass,
      shape: insidewall2shape,
      //  material: Materials.groundMaterial
    });
    world.add(insidewall12Body);

    const insidewallGeometry12 = new THREE.BoxGeometry(55, 32, 3);
    const insidewallMaterial12 = new THREE.MeshPhongMaterial({
      color: color1,
    });
    insidewall12 = new THREE.Mesh(insidewallGeometry12, insidewallMaterial12);

    // position
    // the front top wall
    front_topwall2Body.position.set(-81, -53, -25);

    //the top left wall
    front_topleftwall2Body.position.set(-140, -53, 85);

    // the top right wall
    front_toprightwall2Body.position.set(-140, -53, -95);

    // the front top wall
    front_topbackwall2Body.position.set(-200.5, -53, -24);

    // the first inside wall of the top house1 that faces the outside
    insidewall11Body.position.set(-115, -50.5, 57);

    // the second inside wall of the top house1 that faces the inside next to the ladder going into the balcony
    insidewall12Body.position.set(-140.5, -50.5, 30);

    scene.add(
      front_topwall2,
      front_topleftwall2,
      front_toprightwall2,
      front_topbackwall2,
      insidewall11,
      insidewall12
    );
  }
  tophouse1();

  // top first house on the second house

  function tophouse2() {
    // the front top of the hpuse
    const front_topwallShape = new CANNON.Box(
      new CANNON.Vec3(3 / 2, 40 / 2, 156 / 2)
    );
    front_topwall1Body = new CANNON.Body({
      material: wallmaterial,
      mass: mass,
      material: Materials.groundMaterial,
      shape: front_topwallShape,
    });
    world.add(front_topwall1Body);

    const front_topwallGeometry = new THREE.BoxGeometry(3, 40, 156);
    const front_topwallMaterial = new THREE.MeshPhongMaterial({
      color: color2,
      // map: houseTexture
    });
    front_topwall1 = new THREE.Mesh(
      front_topwallGeometry,
      front_topwallMaterial
    );

    // the top left wall of the house
    const front_topleftwall1Shape = new CANNON.Box(
      new CANNON.Vec3(120 / 2, 40 / 2, 3 / 2)
    );
    front_topleftwall1Body = new CANNON.Body({
      material: wallmaterial,
      mass: mass,
      material: Materials.groundMaterial,
      shape: front_topleftwall1Shape,
    });
    world.add(front_topleftwall1Body);

    const front_topleftwallGeometry = new THREE.BoxGeometry(120, 40, 3);
    const front_topleftwallMaterial = new THREE.MeshPhongMaterial({
      color: color2,
      // map: houseTexture
    });

    front_topleftwall1 = new THREE.Mesh(
      front_topleftwallGeometry,
      front_topleftwallMaterial
    );

    // the top right wall of the house
    const front_toprightwall1Shape = new CANNON.Box(
      new CANNON.Vec3(120 / 2, 40 / 2, 3 / 2)
    );
    front_toprightwall1Body = new CANNON.Body({
      material: wallmaterial,
      mass: mass,
      material: Materials.groundMaterial,
      shape: front_toprightwall1Shape,
    });
    world.add(front_toprightwall1Body);

    const front_toprightwallGeometry = new THREE.BoxGeometry(120, 40, 3);
    const front_toprightwallMaterial = new THREE.MeshPhongMaterial({
      color: color2,
      // map: houseTexture
    });

    front_toprightwall1 = new THREE.Mesh(
      front_toprightwallGeometry,
      front_toprightwallMaterial
    );

    // the top back wall
    const front_topbackwallShape = new CANNON.Box(
      new CANNON.Vec3(3 / 2, 40 / 2, 156 / 2)
    );
    front_topbackwall1Body = new CANNON.Body({
      material: wallmaterial,
      mass: mass,
      material: Materials.groundMaterial,
      shape: front_topbackwallShape,
    });
    world.add(front_topbackwall1Body);

    const front_topbackwallGeometry = new THREE.BoxGeometry(3, 40, 156);
    const front_topbackwallMaterial = new THREE.MeshPhongMaterial({
      color: color2,
      // map: houseTexture
    });
    front_topbackwall1 = new THREE.Mesh(
      front_topbackwallGeometry,
      front_topbackwallMaterial
    );

    //inside wall 1
    const insidewall21Shape = new CANNON.Box(
      new CANNON.Vec3(3 / 2, 30 / 2, 55 / 2)
    );
    insidewall21Body = new CANNON.Body({
      material: wallmaterial,
      mass: mass,
      material: Materials.groundMaterial,
      shape: insidewall21Shape,
    });
    world.add(insidewall21Body);

    const insidewallGeometry21 = new THREE.BoxGeometry(3, 30, 55);
    const insidewallMaterial21 = new THREE.MeshPhongMaterial({
      color: insideWallcolor,
    });
    insidewall21 = new THREE.Mesh(insidewallGeometry21, insidewallMaterial21);

    const insidewall22Shape = new CANNON.Box(
      new CANNON.Vec3(55 / 2, 30 / 2, 3 / 2)
    );
    insidewall22Body = new CANNON.Body({
      material: wallmaterial,
      mass: mass,
      material: Materials.groundMaterial,
      shape: insidewall22Shape,
    });
    world.add(insidewall22Body);

    const insidewallGeometry22 = new THREE.BoxGeometry(55, 30, 3);
    const insidewallMaterial22 = new THREE.MeshPhongMaterial({
      color: insideWallcolor,
    });
    insidewall22 = new THREE.Mesh(insidewallGeometry22, insidewallMaterial22);

    // position
    // the front top wall
    front_topwall1Body.position.set(81, -53, 8);

    //the top left wall
    front_topleftwall1Body.position.set(140, -53, 85);

    // the top right wall
    front_toprightwall1Body.position.set(140, -53, -114);

    // the front top wall
    front_topbackwall1Body.position.set(200, -53, 8);

    // the first inside wall of the top house2 that faces the outside
    insidewall21Body.position.set(115, -50.5, -86);

    // the second inside wall of the top house2 that faces the inside next to the ladder going into the balcony
    insidewall22Body.position.set(142, -50.5, -60);

    scene.add(
      front_topwall1,
      front_topleftwall1,
      front_toprightwall1,
      front_topbackwall1,
      insidewall21,
      insidewall22
    );
  }
  tophouse2();

  // the small yellow house

  function hut() {
    const hut_frontwall = new THREE.Mesh(
      new THREE.BoxGeometry(90, 100, 50),
      new THREE.MeshPhongMaterial({ color: "yellow" })
    );

    const hut_roof = new THREE.Mesh(
      new THREE.BoxGeometry(1, 60, 60),
      new THREE.MeshPhongMaterial({ color: "grey" })
    );

    const hut_roof2 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 60, 60),
      new THREE.MeshPhongMaterial({ color: "grey" })
    );

    const hut_f = new THREE.Mesh(
      new THREE.BoxGeometry(80, 30, 1),
      new THREE.MeshPhongMaterial({ color: "grey" })
    );

    // the position
    hut_frontwall.position.z = 330;
    hut_frontwall.position.y = -4;

    //the hut roof
    hut_roof.position.z = 330;
    hut_roof.position.y = -67;
    hut_roof.position.x = -20;

    // the second side of the roof Phonglly the left side from a straight view
    hut_roof2.position.z = 330;
    hut_roof2.position.y = -67;
    hut_roof2.position.x = 20;

    // the front
    hut_f.position.z = 300;
    hut_f.position.y = -67;
    hut_f.position.x = 5;

    //the rotation
    hut_roof.rotation.z = 20;
    //the second roof
    hut_roof2.rotation.z = -20;

    scene.add(hut_frontwall, hut_roof, hut_roof2, hut_f);
  }
  hut();
}
house();

function animate() {
  requestAnimationFrame(animate);

  //syncing the cubeMesh's position in three js to the cannon body.
  ramp.position.copy(rampBody.position);
  rampBody.quaternion.copy(ramp.quaternion);

  cube.position.copy(cubeBody.position);
  cube.quaternion.copy(cubeBody.quaternion);

  cube1.position.copy(cube1Body.position);
  cube1.quaternion.copy(cube1Body.quaternion);

  cube3.position.copy(cube3Body.position);
  cube3.quaternion.copy(cube3Body.quaternion);

  cube4.position.copy(cube4Body.position);
  cube4.quaternion.copy(cube4Body.quaternion);

  roof.position.copy(roofBody.position);
  roof.quaternion.copy(roofBody.quaternion);

  roofpatch2.position.copy(roofpatch2Body.position);
  roofpatch2.quaternion.copy(roofpatch2Body.quaternion);

  inside_wall.position.copy(inside_wallBody.position);
  inside_wall.quaternion.copy(inside_wallBody.quaternion);

  //second house
  cube11.position.copy(cube11Body.position);
  cube11.quaternion.copy(cube11Body.quaternion);

  cube12.position.copy(cube12Body.position);
  cube12.quaternion.copy(cube12Body.quaternion);

  roof1.position.copy(roof1Body.position);
  roof1.quaternion.copy(roof1Body.quaternion);

  cube33.position.copy(cube33Body.position);
  cube33.quaternion.copy(cube33Body.quaternion);

  cube44.position.copy(cube44Body.position);
  cube44.quaternion.copy(cube44Body.quaternion);

  roofpatch1.position.copy(roofpatch1Body.position);
  roofpatch1.quaternion.copy(roofpatch1Body.quaternion);

  inside_wall1.position.copy(inside_wall1Body.position);
  inside_wall1.quaternion.copy(inside_wall1Body.quaternion);

  //the top house 1
  front_topwall2.position.copy(front_topwall2Body.position);
  front_topwall2.quaternion.copy(front_topwall2Body.quaternion);

  front_topleftwall2.position.copy(front_topleftwall2Body.position);
  front_topleftwall2.quaternion.copy(front_topleftwall2Body.quaternion);

  front_toprightwall2.position.copy(front_toprightwall2Body.position);
  front_toprightwall2.quaternion.copy(front_toprightwall2Body.quaternion);

  front_topbackwall2.position.copy(front_topbackwall2Body.position);
  front_topbackwall2.quaternion.copy(front_topbackwall2Body.quaternion);

  insidewall11.position.copy(insidewall11Body.position);
  insidewall11.quaternion.copy(insidewall11Body.quaternion);

  insidewall12.position.copy(insidewall12Body.position);
  insidewall12.quaternion.copy(insidewall12Body.quaternion);

  //the top 2 house
  front_topwall1.position.copy(front_topwall1Body.position);
  front_topwall1.quaternion.copy(front_topwall1Body.quaternion);

  //the top left wall
  front_topleftwall1.position.copy(front_topleftwall1Body.position);
  front_topleftwall1.quaternion.copy(front_topleftwall1Body.quaternion);

  // the top right wall
  front_toprightwall1.position.copy(front_toprightwall1Body.position);
  front_toprightwall1.quaternion.copy(front_toprightwall1Body.quaternion);

  // the front top wall
  front_topbackwall1.position.copy(front_topbackwall1Body.position);
  front_topbackwall1.quaternion.copy(front_topbackwall1Body.quaternion);

  // the first inside wall of the top house2 that faces the outside
  insidewall21.position.copy(insidewall21Body.position);
  insidewall21.quaternion.copy(insidewall21Body.quaternion);

  // the second inside wall of the top house2 that faces the inside next to the ladder going into the balcony
  insidewall22.position.copy(insidewall22Body.position);
  insidewall22.quaternion.copy(insidewall22Body.quaternion);
}
animate();

export {
  roof,
  roof1,
  roofpatch1,
  roofpatch2,
  cube,
  cube1,
  cube3,
  cube4,
  inside_wall,
  cube11,
  cube12,
  cube33,
  cube44,
  inside_wall1,
  front_topwall1,
  front_topleftwall1,
  front_toprightwall1,
  front_topbackwall1,
  insidewall11,
  insidewall12,
  front_topwall2,
  front_topleftwall2,
  front_toprightwall2,
  front_topbackwall2,
  insidewall21,
  insidewall22,
  house,
  wallmaterial,
  mass,
};
