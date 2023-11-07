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
  camera.position.set(0, 0, 300);

  let uniforms: any = {};

  const createRippleAnimation = (): THREE.Mesh => {
    const fragmentShader: string = /*glsl*/ `
    uniform float time;
    
    uniform sampler2D texture0;
    uniform sampler2D texture1;

    varying vec2 vUv;

    // Code from library
    // URL: https://gist.github.com/akella/330b3caec2b68bb7f4534dae5918c0e9
    mat2 rot2d (in float angle) {
      return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    }
    float r (in float a, in float b) { return fract(sin(dot(vec2(a,b),vec2(12.9898,78.233)))*43758.5453); }
    float h (in float a) { return fract(sin(dot(a,dot(12.9898,78.233)))*43758.5453); }

    float noise (in vec3 x) {
      vec3 p  = floor(x);
      vec3 f  = fract(x);
      f = f*f*(3.0-2.0*f);
      float n = p.x + p.y*57.0 + 113.0*p.z;
      return mix(mix(mix( h(n+0.0), h(n+1.0),f.x),
                   mix( h(n+57.0), h(n+58.0),f.x),f.y),
                 mix(mix( h(n+113.0), h(n+114.0),f.x),
                   mix( h(n+170.0), h(n+171.0),f.x),f.y),f.z);
    }

    vec3 dnoise2f (in vec2 p) {
      float i = floor(p.x), j = floor(p.y);
      float u = p.x-i, v = p.y-j;
      float du = 30.*u*u*(u*(u-2.)+1.);
      float dv = 30.*v*v*(v*(v-2.)+1.);
      u=u*u*u*(u*(u*6.-15.)+10.);
      v=v*v*v*(v*(v*6.-15.)+10.);
      float a = r(i,     j    );
      float b = r(i+1.0, j    );
      float c = r(i,     j+1.0);
      float d = r(i+1.0, j+1.0);
      float k0 = a;
      float k1 = b-a;
      float k2 = c-a;
      float k3 = a-b-c+d;
      return vec3(k0 + k1*u + k2*v + k3*u*v,
                  du*(k1 + k3*v),
                  dv*(k2 + k3*u));
    }

    float fbm (in vec2 uv) {
      vec2 p = uv;
      float f, dx, dz, w = 0.5;
      f = dx = dz = 0.0;
      for(int i = 0; i < 3; ++i) {        
        vec3 n = dnoise2f(uv);
        dx += n.y;
        dz += n.z;
        f += w * n.x / (1.0 + dx*dx + dz*dz);
        w *= 0.86;
        uv *= vec2(1.36);
        uv *= rot2d(1.25 * noise(vec3(p * 0.1, 0.12 * time)) +
                    0.75 * noise(vec3(p * 0.1, 0.20 * time)));
      }
      return f;
    }

    float fbmLow (in vec2 uv) {
      float f, dx, dz, w = 0.5;
      f = dx = dz = 0.0;
      for(int i = 0; i < 3; ++i) {        
        vec3 n = dnoise2f(uv);
        dx += n.y;
        dz += n.z;
        f += w * n.x / (1.0 + dx*dx + dz*dz);
        w *= 0.95;
        uv *= vec2(3);
      }
      return f;
    }
    
    float circle(vec2 uv, float radius, float sharp)
    {
      vec2 tempUV = uv - vec2(0.5);

      return 1.0 - smoothstep(
        radius - radius * sharp,
        radius + radius * sharp,
        dot(tempUV, tempUV) * 4.0
      );
    }

    void main()
    {
      vec2 centerVector = vUv - vec2(0.5);
      vec2 multiplier = vec2(1.0);
      
      vec2 newUv = (vUv - vec2(0.5)) * multiplier + vec2(0.5);

      // start ripples code
      vec2 noiseUV = vUv - vec2(0.5);
      vec2 rv = noiseUV / (length(noiseUV * 10.0) * noiseUV * 20.0);

      float swirl = 20.0 * fbm(noiseUV * fbmLow(vec2(length(noiseUV) - time / 7.0 + rv)));

      vec2 swirlDistort = fbmLow(noiseUV * swirl) * centerVector;

      newUv += swirlDistort;
      // end ripples code

      float circleProgress = circle(vUv, time, time / 7.0);

      vec4 fromTexture = texture2D(texture0, newUv);
      vec4 toTexture = texture2D(texture1, newUv);

      vec4 final = mix(fromTexture, toTexture, circleProgress);

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
      100,
      100
    );
    uniforms = {
      time: {
        value: (Date.now() % 2000) / 1000,
      },
      texture0: {
        value: new THREE.TextureLoader().load("../textures/ussr-flag.jpg"),
      },
      texture1: {
        value: new THREE.TextureLoader().load("../textures/russian-flag.jpg"),
      },
    };
    const shaderMaterial: THREE.ShaderMaterial = new THREE.ShaderMaterial({
      uniforms,
      fragmentShader,
      vertexShader
    });

    return new THREE.Mesh(geometry, shaderMaterial);
  };

  scene.add(createRippleAnimation());

  const animate = (): void => {
    requestAnimationFrame(animate);

    uniforms["time"].value = (Date.now() % 2000) / 1000;

    renderer.render(scene, camera);
  };

  animate();
};

main();
