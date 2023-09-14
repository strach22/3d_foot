//npx vite build

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import camera from "./basic/Camera";
import scene from "./basic/Scene";
import resize from "./basic/Resize";
import renderer from "./basic/Renderer";
import cube from "./shapes/Cube";
import light from "./basic/Light";

scene.add(light);

const loader = new GLTFLoader();
let pie;
loader.load("./src/shapes/feet.gltf", function (gltf) {
  pie = gltf.scene;
  pie.position.set(-10, 85, 0);
  pie.scale.set(2, 2, 2);

  scene.add(pie);
});

const controls = new OrbitControls(camera, renderer.domElement);

// scene.add(cube);

// camera.position.z = 5;
camera.position.set(0, 0, 200);

function animate() {
  requestAnimationFrame(animate);
  // camera.rotation.x += 0.01;
  // camera.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, camera);
}
animate();

resize.start(renderer);
