import * as THREE from "three";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import map from "./map.png";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const animate = function () {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();

// 텍스처 입힌 plane 그리기
const geometry = new THREE.PlaneGeometry(2, 2);
const texture = new THREE.TextureLoader().load(map);
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });

// 그리기
const plane = new THREE.Mesh(geometry, material);
plane.position.z = -2;
scene.add(plane);

// 드래그
const controls = new DragControls([plane], camera, renderer.domElement);

// 드래그하여 회전
controls.addEventListener("dragstart", (event) => {
  console.log((event.object as THREE.Mesh).material);
  // (event.object as THREE.Mesh).material.opacity = 0.5;
});
controls.addEventListener("dragend", (event) => {
  event.object.material.opacity = 1;
});
