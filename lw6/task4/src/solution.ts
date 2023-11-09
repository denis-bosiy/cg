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
  camera.position.set(0, 0, 300);
  const raycaster: THREE.Raycaster = new THREE.Raycaster();

  let uniforms: any = {};

  const IMAGE_SIZE: number = 400;
  let fromTexture: THREE.Texture = new THREE.TextureLoader().load(
    "../textures/ussr-flag.jpg"
  );
  let toTexture: THREE.Texture = new THREE.TextureLoader().load(
    "../textures/russian-flag.jpg"
  );
  const swapTextures = (): void => {
    const spareTexture: THREE.Texture = fromTexture.clone();
    fromTexture = toTexture.clone();
    toTexture = spareTexture.clone();
  };
  const lastClickPosition: THREE.Vector2 = new THREE.Vector2(0, 0);

  const createRippleAnimation = (): THREE.Mesh => {
    const fragmentShader: string = /*glsl*/ `
    #define pi 3.14

    uniform float time;
    uniform sampler2D texture0;
    uniform sampler2D texture1;
    uniform vec2 uVCenterOfWaves;

    varying vec2 vUv;

    void main()
    {     
      vec2 centerVector = -1.0 + 2.0 * vUv;
      vec2 centerOfWaves = -1.0 + 2.0 * uVCenterOfWaves;
      centerVector += centerOfWaves;

      float wavesRadius = 0.1;
      float innterCircleSpeedCoef = 1.3;
      float outerCircleSpeedCoef = innterCircleSpeedCoef * 1.4;
      float distanceToCircleFromCenter = time * innterCircleSpeedCoef;
      float distanceToOuterCircleFromCenter = wavesRadius + time * outerCircleSpeedCoef;

      vec2 wavedVuV = vUv;
      if (length(centerVector) > distanceToCircleFromCenter && length(centerVector) <= distanceToOuterCircleFromCenter)
      {
        // y(x,t)=Asin(kx−ωt+φ) -- функция волны
        // A - амплитуда волны(произвольный коэффициент)
        // x - длина от центра до текущей координаты
        // t - время
        // k=2π/λ - волновое число
        // ω=2π/T - угловой коэффициент
        // ф - фазовый сдвиг волны(у нас = 0)
        // λ - длина волны(подбирается вручную)
        // T - период волны(подбирается вручную)

        float k = 2.0 * pi / 0.1;
        float omega = 2.0 * pi / 0.1;
        float A = 0.015;
  
        // Добавляем волновой сдвиг по цвету для текущей координаты
        wavedVuV += A * sin(k * length(centerVector) - omega * time); 
      }

      vec4 fromTexture = texture2D(texture0, wavedVuV);
      vec4 toTexture = texture2D(texture1, wavedVuV);
      vec4 final = mix(toTexture, fromTexture, step(distanceToCircleFromCenter, length(centerVector)));

      gl_FragColor = final;
    }
    `;

    const vertexShader: string = /*glsl*/ `
    varying vec2 vUv;

    void main() {
      vUv = uv;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `;

    const geometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(
      IMAGE_SIZE,
      IMAGE_SIZE
    );
    uniforms = {
      time: {
        value: (Date.now() % 14000) / 7000,
      },
      texture0: {
        value: fromTexture,
      },
      texture1: {
        value: toTexture,
      },
      uVCenterOfWaves: {
        value: new THREE.Vector2(0.5, 0.5),
      },
    };
    const shaderMaterial: THREE.ShaderMaterial = new THREE.ShaderMaterial({
      uniforms,
      fragmentShader,
      vertexShader,
    });

    return new THREE.Mesh(geometry, shaderMaterial);
  };

  const image: THREE.Mesh = createRippleAnimation();
  scene.add(image);

  const animate = (): void => {
    requestAnimationFrame(animate);

    uniforms["time"].value = (Date.now() % 14000) / 7000;
    const intersects: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[] = raycaster.intersectObject(image);
    if (intersects.length === 1 && intersects[0].uv) {
      swapTextures();

      uniforms["texture0"].value = fromTexture;
      uniforms["texture1"].value = toTexture;
      uniforms["uVCenterOfWaves"].value = new THREE.Vector2(
        1 - intersects[0].uv.x,
        1 - intersects[0].uv.y
      );

      lastClickPosition.x = -1;
      lastClickPosition.y = -1;
    }

    raycaster.setFromCamera(lastClickPosition, camera);
    renderer.render(scene, camera);
  };

  window.addEventListener("click", (e: MouseEvent) => {
    lastClickPosition.x =
      ((e.clientX - renderer.domElement.offsetLeft) / SCENE_SIZE) * 2 - 1;
    lastClickPosition.y =
      ((e.clientY - (-window.scrollY + renderer.domElement.offsetTop)) / SCENE_SIZE) * (-2) + 1;
  });

  animate();
};

main();
