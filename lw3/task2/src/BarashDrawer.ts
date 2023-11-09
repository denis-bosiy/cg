import * as THREE from "three";

const toRadians = (angleInDegrees: number) => {
  return angleInDegrees * (Math.PI / 180);
};

export default class BarashDrawer {
  private static DrawOutlinedEllipse(
    aX: number,
    aY: number,
    xRadius: number,
    yRadius: number,
    aStartAngle: number,
    aEndAngle: number,
    aClockwise: boolean,
    aRotation: number,
    curveStartAngle: number,
    curveEndAngle: number,
    barash: THREE.Group,
    renderOrder: number
  ) {
    const fillMaterial = new THREE.MeshBasicMaterial({ color: 0xfcd0eb });
    const outlineMaterial = new THREE.LineBasicMaterial({
      color: 0x7a3b92,
    });

    const ellipseFillPath: THREE.Shape = new THREE.Shape();
    ellipseFillPath.absellipse(
      aX,
      aY,
      xRadius,
      yRadius,
      aStartAngle,
      aEndAngle,
      aClockwise,
      aRotation
    );
    const ellipseFillGeometry: THREE.ShapeGeometry = new THREE.ShapeGeometry(
      ellipseFillPath
    );
    const ellipseCurve = new THREE.EllipseCurve(
      aX,
      aY,
      xRadius,
      yRadius,
      curveStartAngle,
      curveEndAngle,
      aClockwise,
      aRotation
    );
    const ellipsePoints = ellipseCurve.getPoints(50);
    const ellipseOutlineGeometry: THREE.BufferGeometry =
      new THREE.BufferGeometry().setFromPoints(ellipsePoints);
    const ellipseFill = new THREE.Mesh(ellipseFillGeometry, fillMaterial);
    const ellipseOutline = new THREE.Line(
      ellipseOutlineGeometry,
      outlineMaterial
    );
    ellipseFill.renderOrder = renderOrder;
    ellipseOutline.renderOrder = renderOrder;
    barash.add(ellipseFill);
    barash.add(ellipseOutline);
  }

  private static DrawBody(barash: THREE.Group): void {
    const fillMaterial = new THREE.MeshBasicMaterial({ color: 0xfcd0eb });

    const furCircles: any[][] = [
      [143, 20, 15, 10, 0, Math.PI * 2, false, toRadians(25), 0, Math.PI * 2],
      [180, 30, 25, 10, 0, Math.PI * 2, false, toRadians(25), 0, Math.PI * 2],
      [200, 50, 15, 10, 0, Math.PI * 2, false, toRadians(25), 0, Math.PI * 2],
      [208, 77, 10, 15, 0, Math.PI * 2, false, 0, 0, Math.PI * 2],
      [202, 105, 10, 17, 0, Math.PI * 2, false, 0, 0, Math.PI * 2],
      [184, 133, 15, 15, 0, Math.PI * 2, false, 0, 0, Math.PI * 2],
      [115, 140, 45, 15, 0, Math.PI * 2, false, toRadians(20), 0, Math.PI * 2],
      [82, 90, 25, 30, 0, Math.PI * 2, false, -toRadians(15), 0, Math.PI * 2],
      [
        72,
        48,
        15,
        15,
        Math.PI * 0.5,
        Math.PI * 1.7,
        false,
        0,
        Math.PI * 0.5,
        Math.PI * 1.7,
      ],
      [
        105,
        35,
        33,
        20,
        0,
        Math.PI * 2,
        false,
        -toRadians(15),
        Math.PI * 1.1,
        Math.PI * 2,
      ],
    ];
    furCircles.forEach((furCircleData: any[]) =>
      this.DrawOutlinedEllipse(
        furCircleData[0],
        furCircleData[1],
        furCircleData[2],
        furCircleData[3],
        furCircleData[4],
        furCircleData[5],
        furCircleData[6],
        furCircleData[7],
        furCircleData[8],
        furCircleData[9],
        barash,
        1
      )
    );

    // Основа тела
    const bodyFillPath: THREE.Shape = new THREE.Shape();
    bodyFillPath.absellipse(142, 85, 70, 70, 0, Math.PI * 2, false, 0);
    const bodyFillGeometry: THREE.ShapeGeometry = new THREE.ShapeGeometry(
      bodyFillPath
    );
    const bodyFill = new THREE.Mesh(bodyFillGeometry, fillMaterial);
    bodyFill.renderOrder = 2;
    barash.add(bodyFill);
  }

  private static DrawHorns(barash: THREE.Group): void {
    const material = new THREE.MeshBasicMaterial({ color: 0x7a3b92 });

    const drawHorn = (
      offsetX: number,
      offsetY: number,
      angle: number,
      renderOrder: number
    ) => {
      const hornPath: THREE.Shape = new THREE.Shape();
      hornPath.absellipse(
        182 + offsetX,
        143 + offsetY,
        20,
        30,
        0,
        Math.PI * 2,
        false,
        toRadians(angle)
      );
      const hornGeometry: THREE.ShapeGeometry = new THREE.ShapeGeometry(
        hornPath
      );
      const horn = new THREE.Mesh(hornGeometry, material);
      horn.renderOrder = renderOrder;
      barash.add(horn);
    };

    drawHorn(0, 0, 70, 0);
    drawHorn(-60, -15, 70, 3);
  }

  private static DrawEar(barash: THREE.Group) {
    const material = new THREE.LineBasicMaterial({ color: 0x7a3b92 });

    const earCurve = new THREE.EllipseCurve(
      92,
      110,
      17,
      7,
      0,
      Math.PI * 1.5,
      false,
      toRadians(55)
    );
    const earPoints = earCurve.getPoints(50);
    const earOutlineGeometry: THREE.BufferGeometry =
      new THREE.BufferGeometry().setFromPoints(earPoints);
    const ear = new THREE.Line(earOutlineGeometry, material);
    ear.renderOrder = 3;

    barash.add(ear);
  }

  private static DrawHands(barash: THREE.Group) {
    const drawHand = (
      offsetX: number,
      offsetY: number,
      angle: number,
      renderOrder: number = 3
    ) => {
      this.DrawOutlinedEllipse(
        105 + offsetX,
        30 + offsetY,
        10,
        40,
        0,
        Math.PI * 2,
        false,
        toRadians(angle),
        0,
        Math.PI * 2,
        barash,
        renderOrder
      );

      const drawHoofsPart = (
        from: THREE.Vec2,
        to1: THREE.Vec2,
        to2: THREE.Vec2
      ) => {
        const partOfTheHoof = new THREE.Shape();
        partOfTheHoof.moveTo(from.x, from.y);
        partOfTheHoof.lineTo(to1.x, to1.y);
        partOfTheHoof.lineTo(to2.x, to2.y);
        const hoofGeometry: THREE.ShapeGeometry = new THREE.ShapeGeometry(
          partOfTheHoof
        );
        const halfOfTheHoof: THREE.Mesh = new THREE.Mesh(
          hoofGeometry,
          new THREE.MeshBasicMaterial({ color: 0x7a3b92 })
        );
        halfOfTheHoof.renderOrder = renderOrder;
        barash.add(halfOfTheHoof);
      };
      // Левая половина копыта
      drawHoofsPart(
        { x: 103 + offsetX, y: 0 + offsetY },
        { x: 113 + offsetX, y: -30 + offsetY },
        { x: 123 + offsetX, y: 5 + offsetY }
      );
      // Правая половина копыта
      drawHoofsPart(
        { x: 123 + offsetX, y: 5 + offsetY },
        { x: 130 + offsetX, y: -28 + offsetY },
        { x: 103 + offsetX, y: 0 + offsetY }
      );
    };

    drawHand(0, 0, 20);
    drawHand(95, 40, 20, 0);
  }

  private static DrawLegs(barash: THREE.Group) {
    const drawLeg = (offsetX, offsetY) => {
      this.DrawOutlinedEllipse(
        150 + offsetX,
        5 + offsetY,
        10,
        40,
        0,
        Math.PI * 2,
        false,
        toRadians(40),
        0,
        Math.PI * 2,
        barash,
        0
      );

      const drawHoofsPart = (
        from: THREE.Vec2,
        to1: THREE.Vec2,
        to2: THREE.Vec2
      ) => {
        const partOfTheHoof = new THREE.Shape();
        partOfTheHoof.moveTo(from.x, from.y);
        partOfTheHoof.lineTo(to1.x, to1.y);
        partOfTheHoof.lineTo(to2.x, to2.y);
        const hoofGeometry: THREE.ShapeGeometry = new THREE.ShapeGeometry(
          partOfTheHoof
        );
        const halfOfTheHoof: THREE.Mesh = new THREE.Mesh(
          hoofGeometry,
          new THREE.MeshBasicMaterial({ color: 0x7a3b92 })
        );
        halfOfTheHoof.renderOrder = 3;
        barash.add(halfOfTheHoof);
      };
      // Левая половина копыта
      drawHoofsPart(
        { x: 158 + offsetX, y: -20 + offsetY },
        { x: 178 + offsetX, y: -45 + offsetY },
        { x: 178 + offsetX, y: -15 + offsetY }
      );
      // Прававя половина копыта
      drawHoofsPart(
        { x: 178 + offsetX, y: -15 + offsetY },
        { x: 195 + offsetX, y: -43 + offsetY },
        { x: 158 + offsetX, y: -20 + offsetY }
      );
    };

    drawLeg(-3, -3);
    drawLeg(35, 25);
  }

  private static DrawEyebrows(barash: THREE.Group) {
    const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
      color: 0x894590,
    });

    const drawEyebrow = (coordinates: THREE.Vec2[]) => {
      const eyebrowShape = new THREE.Shape();
      eyebrowShape.moveTo(coordinates[0].x, coordinates[0].y);
      eyebrowShape.lineTo(coordinates[1].x, coordinates[1].y);
      eyebrowShape.lineTo(coordinates[2].x, coordinates[2].y);
      eyebrowShape.lineTo(coordinates[3].x, coordinates[3].y);
      const eyebrowGeometry: THREE.ShapeGeometry = new THREE.ShapeGeometry(
        eyebrowShape
      );
      const eyebrow: THREE.Mesh = new THREE.Mesh(eyebrowGeometry, material);
      eyebrow.renderOrder = 3;
      barash.add(eyebrow);
    };

    drawEyebrow([
      { x: 160, y: 110 },
      { x: 165, y: 115 },
      { x: 175, y: 110 },
      { x: 172, y: 105 },
    ]);
    drawEyebrow([
      { x: 185, y: 107 },
      { x: 185, y: 112 },
      { x: 200, y: 115 },
      { x: 200, y: 110 },
    ]);
  }

  private static DrawEyes(barash: THREE.Group) {
    const scleraFillMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const scleraOutlineMaterial = new THREE.LineBasicMaterial({
      color: 0x7a3b92,
    });
    const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

    const drawEye = (x: number, y: number, angle: number) => {
      const scleraPath: THREE.Shape = new THREE.Shape();
      scleraPath.absellipse(
        x,
        y,
        13,
        10,
        (Math.PI * 3) / 4,
        Math.PI * 2,
        false,
        toRadians(angle)
      );
      const scleraFillGeometry: THREE.ShapeGeometry = new THREE.ShapeGeometry(
        scleraPath
      );
      const scleraFill = new THREE.Mesh(scleraFillGeometry, scleraFillMaterial);
      scleraFill.renderOrder = 3;
      barash.add(scleraFill);
      const scleraCurve = new THREE.EllipseCurve(
        x,
        y,
        13,
        10,
        (Math.PI * 3) / 4,
        Math.PI * 2,
        false,
        toRadians(angle)
      );
      const scleraPoints = scleraCurve.getPoints(50);
      const scleraOutlineGeometry: THREE.BufferGeometry =
        new THREE.BufferGeometry().setFromPoints(scleraPoints);
      const sclearOutline = new THREE.Line(
        scleraOutlineGeometry,
        scleraOutlineMaterial
      );
      sclearOutline.renderOrder = 3;
      barash.add(sclearOutline);
      const pupilPath: THREE.Shape = new THREE.Shape();
      pupilPath.absellipse(x, y, 4, 4, 0, Math.PI * 2, false, 0);
      const pupilGeometry: THREE.ShapeGeometry = new THREE.ShapeGeometry(
        pupilPath
      );
      const pupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
      pupil.renderOrder = 3;
      barash.add(pupil);
    };
    drawEye(165, 90, 40);
    drawEye(193, 93, 35);
  }

  private static DrawNose(barash: THREE.Group) {
    const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
      color: 0x894590,
    });

    const noseShape = new THREE.Shape();
    noseShape.moveTo(177, 77);
    noseShape.lineTo(182, 71);
    noseShape.lineTo(195, 78);
    const noseGeometry: THREE.ShapeGeometry = new THREE.ShapeGeometry(
      noseShape
    );
    const nose: THREE.Mesh = new THREE.Mesh(noseGeometry, material);
    nose.renderOrder = 3;
    barash.add(nose);
  }

  private static DrawMouth(barash: THREE.Group) {
    const material = new THREE.LineBasicMaterial({
      color: 0x7a3b92,
    });

    const curve = new THREE.CubicBezierCurve(
      new THREE.Vector2(177, 63),
      new THREE.Vector2(182, 68),
      new THREE.Vector2(187, 68),
      new THREE.Vector2(192, 63)
    );

    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const mouth = new THREE.Line(geometry, material);
    mouth.renderOrder = 3;

    barash.add(mouth);
  }

  private static DrawFace(barash: THREE.Group) {
    this.DrawEyebrows(barash);
    this.DrawEyes(barash);
    this.DrawNose(barash);
    this.DrawMouth(barash);
  }

  public static GetBarash(): THREE.Group {
    const barash: THREE.Group = new THREE.Group();

    this.DrawBody(barash);
    this.DrawHorns(barash);
    this.DrawEar(barash);
    this.DrawHands(barash);
    this.DrawLegs(barash);
    this.DrawFace(barash);

    return barash;
  }
}
