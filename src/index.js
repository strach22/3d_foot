//npx vite build

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import camera from "./basic/Camera";
import scene from "./basic/Scene";
import resize from "./basic/Resize";
import renderer from "./basic/Renderer";
import light from "./basic/Light";
import coordenadas from "./basic/Coordenadas";
import patologias from "./basic/Patologias";

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}

const arr = JSON.parse(getQueryVariable("arr"));
const loader = new GLTFLoader();
const coordenadasArr = Object.keys(coordenadas);
let pie;
let shape;

scene.add(light);

loader.load("./resources/shapes/pies.gltf", function (gltf) {
  pie = gltf.scene;
  pie.scale.set(6, 6, 6);

  scene.add(pie);
});

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 0, 280);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

resize.start(renderer);

if (Array.isArray(arr) && arr.length > 0) {
  arr.forEach((item) => {
    if (item[0] < 0 || item[1] < 0 || item[0] >= coordenadasArr.length) return;
    const ubic = coordenadasArr[item[0]];
    const patho = patologias[item[1]];
    $('#legend').append("<table width='100%'><td align='center'><img src='" + patho.replaceAll('_',' ').replace(".gltf",".img") + "'></img></td><td align='center'>" + patho.replaceAll('_',' ').replace(".gltf","") + "</td></table>"); 
    $('#legend').show()
    loader.load("./resources/shapes/" + patho, function (gltf) {
      shape = gltf.scene;

      scene.add(shape);
      shape.position.set(...coordenadas[ubic]);
      shape.rotation.x += coordenadas[ubic][3];
      if (item[0] < 8) {
        shape.scale.set(3, 3, 3);
      }
    });
  });
} else {
  coordenadasArr.forEach((e, i) => {
    loader.load(
      "./resources/shapes/" + patologias[i % patologias.length],
      function (gltf) {
        shape = gltf.scene;

        scene.add(shape);
        shape.position.set(...coordenadas[e]);
        shape.rotation.x += coordenadas[e][3];
      }
    );
  });
}
