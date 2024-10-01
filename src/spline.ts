import * as THREE from "three";
import { curvePath } from "./constants";

// construct tunnel track
const points = [];
const len = curvePath.length;
for (let p = 0; p < len; p += 3) {
  points.push(
    new THREE.Vector3(curvePath[p], curvePath[p + 1], curvePath[p + 2])
  );
}

const spline = new THREE.CatmullRomCurve3(points);

export default spline;
