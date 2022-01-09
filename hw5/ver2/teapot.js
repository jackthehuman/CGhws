import * as THREE from "https://threejs.org/build/three.module.js";
import { TeapotGeometry } from "https://raw.githack.com/jackthehuman/temp/main/myTeapotGeometry.js";

class Teapot {
   constructor (x, y) {
     const sceneRTT = new THREE.Scene();
	  const geometry = new TeapotGeometry(60);
     const meshM = new THREE.MeshNormalMaterial();
	  const meshMaterial = new THREE.ShaderMaterial({
        uniforms: {
        lightpos: {type: 'v3', value: new THREE.Vector3()}
        },
        vertexShader: document.getElementById('myVertexShader').textContent,
        fragmentShader: document.getElementById('myFragmentShader').textContent
	  });
	  this.mesh = new THREE.Mesh(geometry, meshMaterial);
	  this.mesh.position.set(0, 10, 0);
   }
   
}

export { Teapot };
