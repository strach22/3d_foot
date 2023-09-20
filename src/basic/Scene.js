import * as THREE from "three";

const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xdddddd);
scene.background = new THREE.TextureLoader().load("./src/textures/space.jpeg")
export default scene;
