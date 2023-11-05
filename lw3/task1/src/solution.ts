import * as THREE from "three";

const drawCoordinateAxes = (scene: THREE.Scene) => {
  const AXE_LINE_LENGTH: number = 90;
  const AXE_ARROW_LENGTH: number = AXE_LINE_LENGTH / 20;
  const AXE_DIVISION_LENGTH: number = 5;

  const material = new THREE.LineBasicMaterial({
    linewidth: 5,
  });

  // Построение прямых осей
  const coordinateAxesPoints = [];
  coordinateAxesPoints.push(new THREE.Vector2(0, AXE_LINE_LENGTH));
  coordinateAxesPoints.push(new THREE.Vector2(0, 0));
  coordinateAxesPoints.push(new THREE.Vector2(AXE_LINE_LENGTH, 0));

  const coordinateAxesGeometry = new THREE.BufferGeometry().setFromPoints(
    coordinateAxesPoints
  );
  const coordinateAxes = new THREE.Line(coordinateAxesGeometry, material);

  scene.add(coordinateAxes);

  // Построение стрелки оси Y
  const yArrowPoints = [];
  yArrowPoints.push(
    new THREE.Vector2(-AXE_ARROW_LENGTH, AXE_LINE_LENGTH - AXE_ARROW_LENGTH)
  );
  yArrowPoints.push(new THREE.Vector2(0, AXE_LINE_LENGTH));
  yArrowPoints.push(
    new THREE.Vector2(AXE_ARROW_LENGTH, AXE_LINE_LENGTH - AXE_ARROW_LENGTH)
  );

  const yArrowGeometry = new THREE.BufferGeometry().setFromPoints(yArrowPoints);
  const yArrow = new THREE.Line(yArrowGeometry, material);

  scene.add(yArrow);
  // Построение делений оси Y
  for (
    let i = AXE_DIVISION_LENGTH;
    i < AXE_LINE_LENGTH;
    i += AXE_DIVISION_LENGTH
  ) {
    const coordinateDividerPoints = [];
    coordinateDividerPoints.push(new THREE.Vector2(-2, AXE_LINE_LENGTH - i));
    coordinateDividerPoints.push(new THREE.Vector2(2, AXE_LINE_LENGTH - i));

    const coordinateDividerGeometry = new THREE.BufferGeometry().setFromPoints(
      coordinateDividerPoints
    );
    const divider = new THREE.Line(coordinateDividerGeometry, material);

    scene.add(divider);
  }

  // Построение стрелки оси X
  const xArrowPoints = [];
  xArrowPoints.push(
    new THREE.Vector2(AXE_LINE_LENGTH - AXE_ARROW_LENGTH, -AXE_ARROW_LENGTH)
  );
  xArrowPoints.push(new THREE.Vector2(AXE_LINE_LENGTH, 0));
  xArrowPoints.push(
    new THREE.Vector2(AXE_LINE_LENGTH - AXE_ARROW_LENGTH, AXE_ARROW_LENGTH)
  );

  const xArrowGeometry = new THREE.BufferGeometry().setFromPoints(xArrowPoints);
  const xArrow = new THREE.Line(xArrowGeometry, material);

  scene.add(xArrow);
  // Построение делений оси X
  for (
    let i = AXE_DIVISION_LENGTH;
    i < AXE_LINE_LENGTH;
    i += AXE_DIVISION_LENGTH
  ) {
    const coordinateDividerPoints = [];
    coordinateDividerPoints.push(new THREE.Vector2(AXE_LINE_LENGTH - i, -2));
    coordinateDividerPoints.push(new THREE.Vector2(AXE_LINE_LENGTH - i, 2));

    const coordinateDividerGeometry = new THREE.BufferGeometry().setFromPoints(
      coordinateDividerPoints
    );
    const divider = new THREE.Line(coordinateDividerGeometry, material);

    scene.add(divider);
  }
};

const drawBezierCurve = (
  referencePoints: THREE.Vector2[],
  scene: THREE.Scene
) => {
  const curve = new THREE.CubicBezierCurve(...referencePoints);

  const points = curve.getPoints(50);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

  const curveObject = new THREE.Line(geometry, material);
  scene.add(curveObject);
};

const hightlightDottedLines = (
  referencePoints: THREE.Vector2[],
  scene: THREE.Scene
): void => {
  const material = new THREE.LineDashedMaterial({
    dashSize: 1,
    gapSize: 2,
  });

  const geometry = new THREE.BufferGeometry().setFromPoints(referencePoints);
  const dottedLines = new THREE.Line(geometry, material);
  dottedLines.computeLineDistances();

  scene.add(dottedLines);
};

const highlightReferencePoints = (
  referencePoints: THREE.Vector2[],
  scene: THREE.Scene
): void => {
  // Построение контрольных точек кривой
  for (let i = 0; i < referencePoints.length; i++) {
    const dotGeometry = new THREE.BufferGeometry();
    dotGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(referencePoints[i]), 2)
    );
    const dotMaterial = new THREE.PointsMaterial({
      size: 7,
      sizeAttenuation: false,
    });
    const dot = new THREE.Points(dotGeometry, dotMaterial);
    scene.add(dot);
  }

  hightlightDottedLines(referencePoints, scene);
};

const main = (): void => {
  const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  const SCENE_WIDTH: number = 500;
  const SCENE_HEIGHT: number = 500;
  renderer.setSize(SCENE_WIDTH, SCENE_HEIGHT);
  document.body.appendChild(renderer.domElement);

  const camera: THREE.OrthographicCamera = new THREE.OrthographicCamera(
    -100,
    100,
    100,
    -100,
    0.1
  );
  camera.position.set(0, 0, 1);
  camera.lookAt(0, 0, 0);

  const scene: THREE.Scene = new THREE.Scene();

  const referencePoints: THREE.Vector2[] = [
    new THREE.Vector2(30, 70),
    new THREE.Vector2(40, 90),
    new THREE.Vector2(50, 70),
    new THREE.Vector2(40, 20),
  ];

  const drawScene = () => {
    drawCoordinateAxes(scene);
    drawBezierCurve(referencePoints, scene);
    highlightReferencePoints(referencePoints, scene);
  };

  drawScene();
  renderer.render(scene, camera);
};

main();
