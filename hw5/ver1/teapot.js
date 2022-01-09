import * as THREE from "https://threejs.org/build/three.module.js";
import { TeapotGeometry } from "https://raw.githack.com/jackthehuman/temp/main/myTeapotGeometry.js";
import {scene} from './main.js';

class Teapot {
   constructor (x, z) {
	  const geometry = new TeapotGeometry (5);
	  const meshMaterial = new THREE.ShaderMaterial({
        uniforms: {
        lightpos: {type: 'v3', value: new THREE.Vector3()}
        },
        vertexShader: document.getElementById('myVertexShader').textContent,
        fragmentShader: document.getElementById('myFragmentShader').textContent
	  });

	  this.mesh = new THREE.Mesh(geometry, meshMaterial);
	  this.mesh.position.set(x, 5, z);
	  scene.add(this.mesh);
   }
   
}

export { Teapot };
