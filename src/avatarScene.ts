import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import HolographicMaterial from "./holographicMaterial";

export function initAvatarScene(): void {
  const avatarDiv = document.getElementById("avatar") as HTMLDivElement;

  const width = avatarDiv.clientWidth;
  const height = avatarDiv.clientHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(100, width / height, 0.1, 1000);
  camera.position.set(-1, 0.2, 2.5);

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(width, height);
  avatarDiv.appendChild(renderer.domElement);

  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(
    "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
  );
  loader.setDRACOLoader(dracoLoader);

  let mixer: THREE.AnimationMixer;
  const holoMaterial = new HolographicMaterial();

  loader.load(
    "model/avatar.glb",
    (gltf) => {
      const model = gltf.scene;
      model.position.set(0, -1.5, 0);
      model.scale.set(2, 2, 2);

      model.traverse((node: THREE.Object3D) => {
        if (node instanceof THREE.Mesh) {
          node.material = holoMaterial;
        }
      });

      scene.add(model);
      mixer = new THREE.AnimationMixer(model);

      gltf.animations.forEach((clip: THREE.AnimationClip) => {
        mixer.clipAction(clip).play();
      });
      loader.load(
        "model/avatar-holo.glb",
        function (secondGltf) {
          const secondModel = secondGltf.scene;
          secondModel.position.set(0, -0.1, 0);
          secondModel.scale.set(0.5, 0.5, 0.5);

          model.add(secondModel);

          secondGltf.animations.forEach((clip) => {
            const secondAction = mixer.clipAction(clip);
            secondAction.play();
          });
        },
        undefined,
        function (error) {
          console.error("Error loading the second model:", error);
        }
      );
    },
    undefined,
    function (error) {
      console.error("Error loading model:", error);
    }
  );

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;

  const clock = new THREE.Clock();
  const animate = (): void => {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    mixer?.update(delta);
    holoMaterial.update();
    controls.update();
    renderer.render(scene, camera);
  };

  animate();

  window.addEventListener("resize", () => {
    const newWidth = avatarDiv.clientWidth;
    const newHeight = avatarDiv.clientHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });
}
