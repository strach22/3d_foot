import * as THREE from "three";
const light = new THREE.AmbientLight(0x404040, 100); // soft white light

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(0, 3, 5);
light.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 5);
directionalLight2.position.set(0, -1, 0);
light.add(directionalLight2);

const directionalLight3 = new THREE.DirectionalLight(0xffffff, 5);
directionalLight3.position.set(-1, 0, 0);
light.add(directionalLight3);

const directionalLight4 = new THREE.DirectionalLight(0xffffff, 5);
directionalLight4.position.set(0, 0, -1);
light.add(directionalLight4);

export default light;
