import "./index.css";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { initNav, toggleMenu } from "./navbar";
import { initAvatarScene } from "./avatarScene";
import "./avatar-description";

const hackerRoom = document.querySelector("#hacker-room") as HTMLDivElement;
const menuToggle = document.getElementById("menu-toggle") as HTMLButtonElement;

// Navbar
menuToggle.addEventListener("click", toggleMenu);
initNav();

const scene: THREE.Scene = new THREE.Scene();
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 100, -200);

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // Transparent background
hackerRoom?.appendChild(renderer.domElement);

// Loader for 3D model
const loader: GLTFLoader = new GLTFLoader();
const dracoLoader: DRACOLoader = new DRACOLoader();
dracoLoader.setDecoderPath(
  "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
);
loader.setDRACOLoader(dracoLoader);

let mixer: THREE.AnimationMixer; // Declare mixer for model animations

loader.load(
  "model/matrix_void.glb",
  (gltf) => {
    const model = gltf.scene;
    model.scale.set(100, 100, 100);
    scene.add(model);
    mixer = new THREE.AnimationMixer(model);

    gltf.animations.forEach((clip: THREE.AnimationClip) =>
      mixer.clipAction(clip).play()
    );
  },
  undefined,
  function (error) {
    console.error("Error loading model:", error);
  }
);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 1);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Orbit Controls
const controls: OrbitControls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  camera.position.y = 50 - scrollY * 0.2;
  camera.lookAt(scene.position);
});

// Animation loop
const clock: THREE.Clock = new THREE.Clock();
const animate = (): void => {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  mixer?.update(delta);
  controls.update();
  renderer.render(scene, camera);
};
animate();
initAvatarScene();
