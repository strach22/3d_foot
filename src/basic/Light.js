import * as THREE from "three";
const light = new THREE.AmbientLight( 0xFFFFF ); // soft white light
const directionalLight = new THREE.DirectionalLight( 0xffffff, 3 );
light.add(directionalLight)

export default light