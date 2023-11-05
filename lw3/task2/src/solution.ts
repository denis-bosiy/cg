import * as THREE from "three";
import BarashDrawer from "./BarashDrawer";

const main = (): void => {
  const SCENE_WIDTH: number = 500;
  const SCENE_HEIGHT: number = 500;
  const BACKGROUND_COLOR: number = 0xfee6cc;
  const BACKGROUND_OPACITY: number = 1;

  const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  renderer.setSize(SCENE_WIDTH, SCENE_HEIGHT);
  renderer.setClearColor(BACKGROUND_COLOR, BACKGROUND_OPACITY);
  document.body.appendChild(renderer.domElement);

  const camera: THREE.OrthographicCamera = new THREE.OrthographicCamera(
    -500,
    500,
    500,
    -500,
    0.1
  );
  camera.position.set(0, 0, 1);
  camera.lookAt(0, 0, 0);

  const scene: THREE.Scene = new THREE.Scene();

  BarashDrawer.Draw(scene);
  renderer.render(scene, camera);
};

main();
