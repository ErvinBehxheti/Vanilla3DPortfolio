import "./index.css";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { initNav, toggleMenu } from "./navbar";

const hackerRoom = document.querySelector("#hacker-room");
const menuToggle = document.getElementById("menu-toggle") as HTMLButtonElement;

// Navbar
menuToggle.addEventListener("click", toggleMenu);
initNav();

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  100, // Wider field of view for full-screen model
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Adjust camera for better view
camera.position.set(0, 100, -200);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // Transparent background
hackerRoom?.appendChild(renderer.domElement);

// Load the model
const loader = new GLTFLoader();
const dLoader = new DRACOLoader();
dLoader.setDecoderPath(
  "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
);
loader.setDRACOLoader(dLoader);

let mixer: THREE.AnimationMixer; // Declare mixer variable for animations

loader.load(
  "model/matrix_void.glb",
  function (gltf) {
    // Add the model to the scene
    const model = gltf.scene;
    model.scale.set(100, 100, 100); // Scale the model to fit the screen
    scene.add(model);

    // Set up the animation mixer for the model
    mixer = new THREE.AnimationMixer(model);

    // Play all the animations
    gltf.animations.forEach((clip) => {
      mixer.clipAction(clip).play();
    });
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

// Camera controls for zooming
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.zoomSpeed = 1.0; // Adjust zoom sensitivity

// Resize handling
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  // Move the camera upwards as the user scrolls down
  camera.position.y = 50 - scrollY * 0.2; // Adjust the scroll sensitivity
  camera.lookAt(scene.position);
});

// Animation loop
const clock = new THREE.Clock(); // Clock to keep track of time for animations

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta(); // Get the time passed since last frame

  // Update the mixer for animations
  if (mixer) {
    mixer.update(delta); // Update the animation based on time elapsed
  }

  controls.update(); // Update camera controls
  renderer.render(scene, camera);
}

animate();
