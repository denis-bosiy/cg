var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as THREE from "three";
var drawCoordinateAxes = function (scene) {
    var AXE_LINE_LENGTH = 90;
    var AXE_ARROW_LENGTH = AXE_LINE_LENGTH / 20;
    var AXE_DIVISION_LENGTH = 5;
    var material = new THREE.LineBasicMaterial({
        linewidth: 5,
    });
    // Построение прямых осей
    var coordinateAxesPoints = [];
    coordinateAxesPoints.push(new THREE.Vector2(0, AXE_LINE_LENGTH));
    coordinateAxesPoints.push(new THREE.Vector2(0, 0));
    coordinateAxesPoints.push(new THREE.Vector2(AXE_LINE_LENGTH, 0));
    var coordinateAxesGeometry = new THREE.BufferGeometry().setFromPoints(coordinateAxesPoints);
    var coordinateAxes = new THREE.Line(coordinateAxesGeometry, material);
    scene.add(coordinateAxes);
    // Построение стрелки оси Y
    var yArrowPoints = [];
    yArrowPoints.push(new THREE.Vector2(-AXE_ARROW_LENGTH, AXE_LINE_LENGTH - AXE_ARROW_LENGTH));
    yArrowPoints.push(new THREE.Vector2(0, AXE_LINE_LENGTH));
    yArrowPoints.push(new THREE.Vector2(AXE_ARROW_LENGTH, AXE_LINE_LENGTH - AXE_ARROW_LENGTH));
    var yArrowGeometry = new THREE.BufferGeometry().setFromPoints(yArrowPoints);
    var yArrow = new THREE.Line(yArrowGeometry, material);
    scene.add(yArrow);
    // Построение делений оси Y
    for (var i = AXE_DIVISION_LENGTH; i < AXE_LINE_LENGTH; i += AXE_DIVISION_LENGTH) {
        var coordinateDividerPoints = [];
        coordinateDividerPoints.push(new THREE.Vector2(-2, AXE_LINE_LENGTH - i));
        coordinateDividerPoints.push(new THREE.Vector2(2, AXE_LINE_LENGTH - i));
        var coordinateDividerGeometry = new THREE.BufferGeometry().setFromPoints(coordinateDividerPoints);
        var divider = new THREE.Line(coordinateDividerGeometry, material);
        scene.add(divider);
    }
    // Построение стрелки оси X
    var xArrowPoints = [];
    xArrowPoints.push(new THREE.Vector2(AXE_LINE_LENGTH - AXE_ARROW_LENGTH, -AXE_ARROW_LENGTH));
    xArrowPoints.push(new THREE.Vector2(AXE_LINE_LENGTH, 0));
    xArrowPoints.push(new THREE.Vector2(AXE_LINE_LENGTH - AXE_ARROW_LENGTH, AXE_ARROW_LENGTH));
    var xArrowGeometry = new THREE.BufferGeometry().setFromPoints(xArrowPoints);
    var xArrow = new THREE.Line(xArrowGeometry, material);
    scene.add(xArrow);
    // Построение делений оси X
    for (var i = AXE_DIVISION_LENGTH; i < AXE_LINE_LENGTH; i += AXE_DIVISION_LENGTH) {
        var coordinateDividerPoints = [];
        coordinateDividerPoints.push(new THREE.Vector2(AXE_LINE_LENGTH - i, -2));
        coordinateDividerPoints.push(new THREE.Vector2(AXE_LINE_LENGTH - i, 2));
        var coordinateDividerGeometry = new THREE.BufferGeometry().setFromPoints(coordinateDividerPoints);
        var divider = new THREE.Line(coordinateDividerGeometry, material);
        scene.add(divider);
    }
};
var drawBezierCurve = function (referencePoints, scene) {
    var _a;
    var curve = new ((_a = THREE.CubicBezierCurve).bind.apply(_a, __spreadArray([void 0], referencePoints, false)))();
    var points = curve.getPoints(50);
    var geometry = new THREE.BufferGeometry().setFromPoints(points);
    var material = new THREE.LineBasicMaterial({ color: 0xff0000 });
    var curveObject = new THREE.Line(geometry, material);
    scene.add(curveObject);
};
var hightlightDottedLines = function (referencePoints, scene) {
    var material = new THREE.LineDashedMaterial({
        dashSize: 1,
        gapSize: 2,
    });
    var geometry = new THREE.BufferGeometry().setFromPoints(referencePoints);
    var dottedLines = new THREE.Line(geometry, material);
    dottedLines.computeLineDistances();
    scene.add(dottedLines);
};
var highlightReferencePoints = function (referencePoints, scene) {
    // Построение контрольных точек кривой
    for (var i = 0; i < referencePoints.length; i++) {
        var dotGeometry = new THREE.BufferGeometry();
        dotGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(referencePoints[i]), 2));
        var dotMaterial = new THREE.PointsMaterial({
            size: 7,
            sizeAttenuation: false,
        });
        var dot = new THREE.Points(dotGeometry, dotMaterial);
        scene.add(dot);
    }
    hightlightDottedLines(referencePoints, scene);
};
var main = function () {
    var renderer = new THREE.WebGLRenderer();
    var SCENE_WIDTH = 500;
    var SCENE_HEIGHT = 500;
    renderer.setSize(SCENE_WIDTH, SCENE_HEIGHT);
    document.body.appendChild(renderer.domElement);
    var camera = new THREE.OrthographicCamera(-100, 100, 100, -100, 0.1);
    camera.position.set(0, 0, 1);
    camera.lookAt(0, 0, 0);
    var scene = new THREE.Scene();
    var referencePoints = [
        new THREE.Vector2(30, 70),
        new THREE.Vector2(40, 90),
        new THREE.Vector2(50, 70),
        new THREE.Vector2(40, 20),
    ];
    var drawScene = function () {
        drawCoordinateAxes(scene);
        drawBezierCurve(referencePoints, scene);
        highlightReferencePoints(referencePoints, scene);
    };
    drawScene();
    renderer.render(scene, camera);
};
main();
