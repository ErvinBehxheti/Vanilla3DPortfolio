import { myProjects } from "./constants";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

let selectedProject: number = 0;
let tvScreen: THREE.Mesh | null = null; // Reference to the TV screen mesh

function handleNavigation(direction: string) {
  if (direction === "previous") {
    selectedProject =
      selectedProject === 0 ? myProjects.length - 1 : selectedProject - 1;
  } else {
    selectedProject =
      selectedProject === myProjects.length - 1 ? 0 : selectedProject + 1;
  }
  renderProject(selectedProject);
}

function renderProject(index: number) {
  const project = myProjects[index];

  const projectTitle = document.getElementById("project-title") as HTMLElement;
  const projectDescription = document.getElementById(
    "project-description"
  ) as HTMLElement;
  const projectLogo = document.getElementById(
    "project-logo"
  ) as HTMLImageElement;
  const projectSpotlight = document.getElementById(
    "project-spotlight"
  ) as HTMLImageElement;
  const projectSkills = document.getElementById(
    "project-skills"
  ) as HTMLDivElement;
  const visitSite = document.getElementById("visit-site") as HTMLAnchorElement;
  const checkSite = document.getElementById(
    "check-site"
  ) as HTMLParagraphElement;
  const logoStyle = document.getElementById("logo-style") as HTMLDivElement;

  projectTitle.innerText = project.title;
  projectDescription.innerText = project.desc;
  logoStyle.style.cssText = "";
  Object.entries(project.logoStyle).forEach(([key, value]) => {
    (logoStyle.style as any)[key] = value;
  });
  projectLogo.src = project.logo;
  projectSpotlight.src = project.spotlight;
  visitSite.href = project.href || "#";
  checkSite.innerText = project.href ? "Check live site" : "Can't check site";

  // Clear previous skills
  projectSkills.innerHTML = "";
  project.tags.forEach((tag) => {
    const div = document.createElement("div");
    div.className = "tech-logo";
    const image = document.createElement("img");
    image.src = tag.path;
    image.alt = tag.name;
    div.appendChild(image);
    projectSkills.appendChild(div);
  });

  // Update the TV screen with the new project spotlight image
  if (tvScreen) {
    const textureLoader = new THREE.TextureLoader();
    const newTexture = textureLoader.load(project.image);
    (tvScreen.material as THREE.MeshBasicMaterial).map = newTexture;
    (tvScreen.material as THREE.MeshBasicMaterial).needsUpdate = true;
  }
}

document
  .getElementById("arrow-previous")
  ?.addEventListener("click", () => handleNavigation("previous"));
document
  .getElementById("arrow-next")
  ?.addEventListener("click", () => handleNavigation("next"));

// Initial render
renderProject(selectedProject);

let mixer: THREE.AnimationMixer | undefined;

function loadModel(
  loader: GLTFLoader,
  scene: THREE.Scene,
  mixer: THREE.AnimationMixer | undefined
) {
  loader.load(
    "model/vintage-tv.glb",
    (gltf) => {
      const model = gltf.scene;
      tvScreen = model.getObjectByName("Object_3") as THREE.Mesh;

      // Apply a placeholder texture initially
      const textureLoader = new THREE.TextureLoader();
      const screenTexture = textureLoader.load(
        myProjects[selectedProject].image
      );
      tvScreen.material = new THREE.MeshBasicMaterial({ map: screenTexture });
      model.position.set(-500, -200, 400);
      model.scale.set(3, 3, 3);

      scene.add(model);
      mixer = new THREE.AnimationMixer(model);

      gltf.animations.forEach((clip: THREE.AnimationClip) => {
        mixer?.clipAction(clip).play();
      });
    },
    undefined,
    (error) => {
      console.error("Error loading model:", error);
    }
  );
}

export function initTvScene(): void {
  const tv = document.getElementById("tv") as HTMLDivElement;

  const width = tv.clientWidth;
  const height = tv.clientHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(100, width / height, 0.1, 1000);
  camera.position.set(0, 100, -800);

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(width, height);
  tv.appendChild(renderer.domElement);

  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(
    "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
  );
  loader.setDRACOLoader(dracoLoader);

  loadModel(loader, scene, mixer);

  const ambientLight = new THREE.AmbientLight(0x404040, 1);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(100, 100, 100);
  scene.add(directionalLight);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;

  const clock = new THREE.Clock();
  const animate = (): void => {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    mixer?.update(delta);
    controls.update();
    renderer.render(scene, camera);
  };

  animate();

  window.addEventListener("resize", () => {
    const newWidth = tv.clientWidth;
    const newHeight = tv.clientHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });
}
