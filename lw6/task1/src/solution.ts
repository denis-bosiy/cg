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
    100,
    1,
    1,
    500
  );
  camera.position.set(0, 0, 2);

  const geometry: THREE.BufferGeometry = new THREE.BufferGeometry();
  const endPoint: number = 2 * Math.PI;
  const step: number = Math.PI / 1000;
  const stepsCount: number = Math.ceil(endPoint / step);
  const vertices: number[][] = [];
  for (let i = 0; i < stepsCount; i++) {
      vertices.push([i * step, 0, 0]);
  }
  const verticesFloat: Float32Array = new Float32Array(vertices.flat());
  geometry.setAttribute('position', new THREE.BufferAttribute(verticesFloat, 3));

  const fragmentShader: string = /*glsl*/`
    void main()
    {     
      gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
    }
    `;

  const vertexShader: string = /*glsl*/`
    float getR(float x) {
        return (1.0 + sin(x))*(1.0 + 0.9 * cos(8.0 * x))*(1.0 + 0.1 * cos(24.0 * x)) * (0.5 + 0.05 * cos(140.0 * x));
    }

    void main() {
      float R = getR(position.x);
      vec3 newPosition = vec3(R * cos(position.x), R * sin(position.x), position.z);

      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
    `;
  const shaderMaterial: THREE.ShaderMaterial = new THREE.ShaderMaterial({
    fragmentShader,
    vertexShader,
  });
  const cannabis: THREE.Line = new THREE.Line(geometry, shaderMaterial);
  scene.add(cannabis);
  renderer.render(scene, camera);
};

main();
