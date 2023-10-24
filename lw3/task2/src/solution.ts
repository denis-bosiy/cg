import * as THREE from "three";
import BarashDrawer from "./BarashDrawer";

const main = (): void => {
  const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  const SCENE_WIDTH: number = 500;
  const SCENE_HEIGHT: number = 500;
  renderer.setSize(SCENE_WIDTH, SCENE_HEIGHT);
  renderer.setClearColor( 0xfee6cc, 1 )
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

  const drawScene = () => {
    BarashDrawer.Draw(scene);
    renderer.render(scene, camera);
  };

  drawScene();
};

main();
