import {
  ShaderMaterial,
  Clock,
  Uniform,
  Color,
  AdditiveBlending,
  FrontSide,
  MaterialParameters,
  Side,
  Blending,
} from "three";

interface HolographicMaterialParameters extends MaterialParameters {
  time?: number;
  fresnelOpacity?: number;
  fresnelAmount?: number;
  scanlineSize?: number;
  hologramBrightness?: number;
  signalSpeed?: number;
  hologramColor?: Color | string;
  enableBlinking?: boolean;
  blinkFresnelOnly?: boolean;
  hologramOpacity?: number;
  blendMode?: Blending;
  side?: Side | undefined;
  depthTest?: boolean;
}

class HolographicMaterial extends ShaderMaterial {
  uniforms: {
    time: Uniform<number>;
    fresnelOpacity: Uniform<number>;
    fresnelAmount: Uniform<number>;
    scanlineSize: Uniform<number>;
    hologramBrightness: Uniform<number>;
    signalSpeed: Uniform<number>;
    hologramColor: Uniform<Color>;
    enableBlinking: Uniform<boolean>;
    blinkFresnelOnly: Uniform<boolean>;
    hologramOpacity: Uniform<number>;
  };
  clock: Clock;

  constructor(parameters: HolographicMaterialParameters = {}) {
    super();

    this.vertexShader =
      /*GLSL */
      `
      varying vec3 vViewPosition;
      varying vec2 vUv;
      varying vec4 vPos;
      varying vec3 vNormalW;
      varying vec3 vPositionW;

      #include <common>
      #include <uv_pars_vertex>
      #include <envmap_pars_vertex>
      #include <color_pars_vertex>
      #include <fog_pars_vertex>
      #include <morphtarget_pars_vertex>
      #include <skinning_pars_vertex>
      #include <logdepthbuf_pars_vertex>
      #include <clipping_planes_pars_vertex>

      void main() {
        #include <uv_vertex>
        #include <color_vertex>
        #include <morphcolor_vertex>
      
        #if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
          #include <beginnormal_vertex>
          #include <morphnormal_vertex>
          #include <skinbase_vertex>
          #include <skinnormal_vertex>
          #include <defaultnormal_vertex>
        #endif
      
        #include <begin_vertex>
        #include <morphtarget_vertex>
        #include <skinning_vertex>
        #include <project_vertex>
        #include <logdepthbuf_vertex>
        #include <clipping_planes_vertex>
      
        #include <worldpos_vertex>
        #include <envmap_vertex>
        #include <fog_vertex>

        mat4 modelViewProjectionMatrix = projectionMatrix * modelViewMatrix;
        vUv = uv;
        vPos = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
        vPositionW = vec3(vec4(transformed, 1.0) * modelMatrix);
        vNormalW = normalize(vec3(vec4(normal, 0.0) * modelMatrix));
        gl_Position = modelViewProjectionMatrix * vec4(transformed, 1.0);
      }`;

    this.fragmentShader =
      /*GLSL */
      `
      varying vec2 vUv;
      varying vec3 vPositionW;
      varying vec4 vPos;
      varying vec3 vNormalW;

      uniform float time;
      uniform float fresnelOpacity;
      uniform float scanlineSize;
      uniform float fresnelAmount;
      uniform float signalSpeed;
      uniform float hologramBrightness;
      uniform float hologramOpacity;
      uniform bool blinkFresnelOnly;
      uniform bool enableBlinking;
      uniform vec3 hologramColor;

      float flicker(float amt, float time) {
        return clamp(fract(cos(time) * 43758.5453123), amt, 1.0);
      }

      float random(in float a, in float b) {
        return fract(cos(dot(vec2(a, b), vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main() {
        vec2 vCoords = vPos.xy;
        vCoords /= vPos.w;
        vCoords = vCoords * 0.5 + 0.5;
        vec2 myUV = fract(vCoords);

        vec4 hologramColor = vec4(hologramColor, mix(hologramBrightness, vUv.y, 0.5));

        float scanlines = 10.0;
        scanlines += 20.0 * sin(time * signalSpeed * 20.8 - myUV.y * 60.0 * scanlineSize);
        scanlines *= smoothstep(1.3 * cos(time * signalSpeed + myUV.y * scanlineSize), 0.78, 0.9);
        scanlines *= max(0.25, sin(time * signalSpeed) * 1.0);

        float r = random(vUv.x, vUv.y);
        float g = random(vUv.y * 20.2, vUv.y * 0.2);
        float b = random(vUv.y * 0.9, vUv.y * 0.2);

        hologramColor += vec4(r * scanlines, b * scanlines, r, 1.0) / 84.0;
        vec4 scanlineMix = mix(vec4(0.0), hologramColor, hologramColor.a);

        vec3 viewDirectionW = normalize(cameraPosition - vPositionW);
        float fresnelEffect = dot(viewDirectionW, vNormalW) * (1.6 - fresnelOpacity / 2.0);
        fresnelEffect = clamp(fresnelAmount - fresnelEffect, 0.0, fresnelOpacity);

        float blinkValue = enableBlinking ? 0.6 - signalSpeed : 1.0;
        float blink = flicker(blinkValue, time * signalSpeed * 0.02);

        vec3 finalColor;

        if (blinkFresnelOnly) {
          finalColor = scanlineMix.rgb + fresnelEffect * blink;
        } else {
          finalColor = scanlineMix.rgb * blink + fresnelEffect;
        }

        gl_FragColor = vec4(finalColor, hologramOpacity);
      }`;

    this.uniforms = {
      time: new Uniform(0),
      fresnelOpacity: new Uniform(parameters.fresnelOpacity ?? 1.0),
      fresnelAmount: new Uniform(parameters.fresnelAmount ?? 0.45),
      scanlineSize: new Uniform(parameters.scanlineSize ?? 8.0),
      hologramBrightness: new Uniform(parameters.hologramBrightness ?? 1.0),
      signalSpeed: new Uniform(parameters.signalSpeed ?? 1.0),
      hologramColor: new Uniform(
        parameters.hologramColor
          ? new Color(parameters.hologramColor)
          : new Color("#00d5ff")
      ),
      enableBlinking: new Uniform(parameters.enableBlinking ?? true),
      blinkFresnelOnly: new Uniform(parameters.blinkFresnelOnly ?? false),
      hologramOpacity: new Uniform(parameters.hologramOpacity ?? 1.0),
    };

    this.clock = new Clock();
    this.setValues(parameters);
    this.depthTest = parameters.depthTest ?? true;
    this.blending = parameters.blendMode ?? AdditiveBlending;
    this.transparent = true;
    this.side = parameters.side ?? FrontSide;
  }

  update() {
    this.uniforms.time.value = this.clock.getElapsedTime();
  }
}

export default HolographicMaterial;
