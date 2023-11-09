import * as THREE from "three";

const main = (): void => {
  const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  const SCENE_SIZE: number = 500;
  const BACKGROUND_COLOR: number = 0x000000;
  const BACKGROUND_OPACITY: number = 1;

  renderer.setSize(SCENE_SIZE, SCENE_SIZE);
  renderer.setClearColor(BACKGROUND_COLOR, BACKGROUND_OPACITY);
  document.body.appendChild(renderer.domElement);

  const scene: THREE.Scene = new THREE.Scene();
  const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
    25,
    1,
    1,
    500
  );
  camera.position.set(0, 0, 200);

  const createRing = (): THREE.Mesh => {
    const fragmentShader: string = /*glsl*/ `
      uniform float radius;
      uniform float width;
      uniform vec3 center1;
      uniform vec3 center2;

      void main() {
        gl_FragColor = vec4(1, 0, 0, 1);
        if (distance(vec3(gl_FragCoord), center1) <= radius && distance(vec3(gl_FragCoord), center1) >= width) {
          gl_FragColor = vec4(0, 0, 0, 1);
        }
        if (distance(vec3(gl_FragCoord), center2) <= radius && distance(vec3(gl_FragCoord), center2) >= width) {
          gl_FragColor = vec4(0, 0, 0, 1);
        }
      }
    `;

    const geometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(100, 50);
    const shaderMaterial: THREE.ShaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        radius: {
          value: 50,
        },
        width: {
          value: 30,
        },
        center1: {
          value: { x: 250, y: 250, z: 0 },
        },
        center2: {
          value: { x: 100, y: 100, z: 0}
        }
      },
      fragmentShader,
    });

    return new THREE.Mesh(geometry, shaderMaterial);
  };

  scene.add(createRing());
  renderer.render(scene, camera);
};

main();
