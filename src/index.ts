import "./index.css";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as THREE from "three";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import spline from "./spline";
import { initAvatarScene } from "./avatarScene";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { initNav, toggleMenu } from "./navbar";
import "./avatar-description";

// Wormhole traveling scene setup
const w = window.innerWidth;
const h = window.innerHeight;
const wormholeScene = new THREE.Scene();
wormholeScene.fog = new THREE.FogExp2(0x000000, 0.3);

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.domElement.style.opacity = "1"; // Ensure initial opacity is set to 1
const wormholeContainer = document.getElementById(
  "wormhole-container"
) as HTMLDivElement;
wormholeContainer.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = false;
controls.dampingFactor = 0.03;

// Post-processing for wormhole
const renderScene = new RenderPass(wormholeScene, camera);
const bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 1.5, 0.4, 100);
bloomPass.threshold = 0.002;
bloomPass.strength = 3.5;
bloomPass.radius = 0;
const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);

// Create tube geometry for wormhole
const tubeGeo = new THREE.TubeGeometry(spline, 222, 0.65, 16, true);
const edges = new THREE.EdgesGeometry(tubeGeo, 0.2);
const lineMat = new THREE.LineBasicMaterial({ color: 0x008000 });
const tubeLines = new THREE.LineSegments(edges, lineMat);
wormholeScene.add(tubeLines);

function updateCamera(t: number) {
  const time = t * 1;
  const looptime = 10 * 1000;
  const p = (time % looptime) / looptime;
  const pos = tubeGeo.parameters.path.getPointAt(p);
  const lookAt = tubeGeo.parameters.path.getPointAt((p + 0.03) % 1);
  camera.position.copy(pos);
  camera.lookAt(lookAt);
}

function animateWormhole(t = 0) {
  requestAnimationFrame(animateWormhole);
  updateCamera(t);
  composer.render();
  controls.update();
}
animateWormhole();

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", handleWindowResize, false);

// Transition logic after 2 seconds
setTimeout(() => {
  // Smooth transition (fade out)
  const fadeOutInterval = 100; // Adjust for smoothness
  let opacity = 1;

  const fadeOut = setInterval(() => {
    opacity -= 0.1; // Decrease opacity
    renderer.domElement.style.opacity = opacity.toString();

    if (opacity <= 0) {
      clearInterval(fadeOut); // Stop fading once fully transparent
      document.getElementById("wormhole-container")?.remove();
      initMainScene(); // Load the main scene after the wormhole disappears
    }
  }, fadeOutInterval);
}, 2000); // 2 seconds delay before starting fade-out

// Main scene (with models and animations) initialization
function initMainScene() {
  const hackerRoom = document.querySelector("#hacker-room") as HTMLDivElement;
  const menuToggle = document.getElementById(
    "menu-toggle"
  ) as HTMLButtonElement;

  // Navbar
  menuToggle.addEventListener("click", toggleMenu);
  initNav();

  const scene: THREE.Scene = new THREE.Scene();
  const mainCamera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  mainCamera.position.set(0, 100, -200);

  const mainRenderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  mainRenderer.setSize(window.innerWidth, window.innerHeight);
  mainRenderer.setClearColor(0x000000, 0); // Transparent background
  hackerRoom.appendChild(mainRenderer.domElement);

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

  // Lighting for the main scene
  const ambientLight = new THREE.AmbientLight(0x404040, 1);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(10, 10, 10);
  scene.add(directionalLight);

  // Orbit Controls
  const controls: OrbitControls = new OrbitControls(
    mainCamera,
    mainRenderer.domElement
  );
  controls.enableZoom = false;

  window.addEventListener("resize", () => {
    mainCamera.aspect = window.innerWidth / window.innerHeight;
    mainCamera.updateProjectionMatrix();
    mainRenderer.setSize(window.innerWidth, window.innerHeight);
  });

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    mainCamera.position.y = 50 - scrollY * 0.2;
    mainCamera.lookAt(scene.position);
  });

  // Animation loop for the main scene
  const clock: THREE.Clock = new THREE.Clock();
  const animateMainScene = (): void => {
    requestAnimationFrame(animateMainScene);
    const delta = clock.getDelta();
    mixer?.update(delta);
    controls.update();
    mainRenderer.render(scene, mainCamera);
  };
  animateMainScene();
  initAvatarScene();
}
