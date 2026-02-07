"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const FireShaderMaterial = {
    uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0xd5320e) }, // Red/Orange
        color0: { value: new THREE.Color(0x2a0e05) }, // Darker base
    },
    vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      vUv = uv;
      vNormal = normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    #define NUM_OCTAVES 5
    uniform vec3 color1;
    uniform vec3 color0;
    uniform float time;
    varying vec2 vUv;
    varying vec3 vNormal;

    float rand(vec2 n) {
      return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
    }

    float noise(vec2 p){
      vec2 ip = floor(p);
      vec2 u = fract(p);
      u = u*u*(3.0-2.0*u);

      float res = mix(
        mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
        mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
      return res*res;
    }

    float fbm(vec2 x) {
      float v = 0.0;
      float a = 0.5;
      vec2 shift = vec2(100);
      mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
      for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(x);
        x = rot * x * 2.0 + shift;
        a *= 0.5;
      }
      return v;
    }

    void main() {
      // Use UVs for plane geometry
      vec2 uv = vUv;
      
      // Animate noise upwards
      vec2 newUv = uv + vec2(0.0, -time * 0.5);
      float scale = 8.0; 
      vec2 p = newUv * scale;
      float noiseVal = fbm(p + fbm(p));

      // Create flame shape/gradient based on Y position and noise
      float gradient = 1.0 - uv.y; 
      
      // Mix colors based on noise threshold
      // Front color (flame tips)
      float frontAlpha = smoothstep(0.4, 0.9, gradient + noiseVal * 0.5);
      vec3 finalColor = mix(color0, color1, frontAlpha);
      
      // Alpha fade out at top
      float alpha = smoothstep(0.1, 0.4, gradient + noiseVal * 0.3);

      gl_FragColor = vec4(finalColor, alpha);
    }
  `,
};

function FireMesh() {
    const mesh = useRef<THREE.Mesh>(null);

    const shaderMaterial = useMemo(
        () =>
            new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 0 },
                    color1: { value: new THREE.Color("#ff4d00") },
                    color0: { value: new THREE.Color("#300000") },
                },
                vertexShader: FireShaderMaterial.vertexShader,
                fragmentShader: FireShaderMaterial.fragmentShader,
                transparent: true,
                blending: THREE.AdditiveBlending,
            }),
        []
    );

    useFrame((state) => {
        if (mesh.current) {
            // @ts-ignore
            mesh.current.material.uniforms.time.value = state.clock.elapsedTime;
        }
    });

    return (
        <mesh ref={mesh}>
            <planeGeometry args={[5, 5, 32, 32]} />
            <primitive object={shaderMaterial} attach="material" />
        </mesh>
    );
}

export default function FireButtonEffect() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-xl opacity-80 mix-blend-screen">
            <Canvas camera={{ position: [0, 0, 2] }}>
                <FireMesh />
            </Canvas>
        </div>
    );
}
