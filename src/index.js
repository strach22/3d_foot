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
  const showLegend =
    !arr.filter((e) => e[0] == -1)[0] ||
    !(arr.filter((e) => e[0] == -1)[0][1] == 0);
  let filtrado = arr.filter((e) => e[0] >= 0 ).map((e) => e[1]);
  filtrado = filtrado.filter((item, index) => {
    return filtrado.indexOf(item) === index;
  });
  if (showLegend) {
    console.log(filtrado)
    filtrado.forEach((item) => {
      const patho = patologias[item];
      $("#legendTable").append(
        "<tr></tr><td align='center'><img src='./resources/images/" +
          patho.replace(".gltf", ".png") +
          "'></img></td><td align='left'>" +
          patho.replaceAll("_", " ").replace(".gltf", "").toUpperCase().replaceAll("UNA I",'UÑA I') +
          "</td></tr>"
      );
      $("#legend").show();
    });
  }
  arr.forEach((item) => {
    if (item[0] < 0 || item[1] < 0 || item[0] >= coordenadasArr.length) return;
    const ubic = coordenadasArr[item[0]];
    const patho = patologias[item[1]];
    loader.load("./resources/shapes/" + patho, function (gltf) {
      shape = gltf.scene;

      scene.add(shape);
      shape.position.set(...coordenadas[ubic]);
      shape.rotation.x += coordenadas[ubic][3];
      shape.scale.set(coordenadas[ubic][4],coordenadas[ubic][4],coordenadas[ubic][4]);
    });
  });
} else {
  coordenadasArr.forEach((e, i) => {
    loader.load(
      "./resources/shapes/" + patologias[i % patologias.length],
      // "./resources/shapes/" + patologias[0],
      function (gltf) {
        shape = gltf.scene;

        scene.add(shape);
        shape.position.set(...coordenadas[e]);
        shape.rotation.x += coordenadas[e][3];
        shape.scale.set(coordenadas[e][4],coordenadas[e][4],coordenadas[e][4]);
      }
    );
  });
}
