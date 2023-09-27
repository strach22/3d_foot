//npx vite build

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import camera from "./basic/Camera";
import scene from "./basic/Scene";
import resize from "./basic/Resize";
import renderer from "./basic/Renderer";
import light from "./basic/Light";
import coordenadas from "./basic/Coordenadas";

scene.add(light);

const loader = new GLTFLoader();
let pie;
let cilindro;
loader.load("./src/shapes/pies.gltf", function (gltf) {
  pie = gltf.scene;
  pie.scale.set(6, 6, 6);

  scene.add(pie);
});

loader.load("./src/shapes/cilindro.gltf", function (gltf) {
  cilindro = gltf.scene;

  scene.add(cilindro);
  cilindro.position.set(...coordenadas.dorsalpieDerecho)
  cilindro.rotation.x+= coordenadas.dorsalpieDerecho[3];
});

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 0, 250);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

resize.start(renderer);
