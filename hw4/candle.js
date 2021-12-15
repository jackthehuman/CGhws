//
// new features:
//   inelastic collision, causing the ball to stop bouncing
//
import * as THREE from "https://threejs.org/build/three.module.js";
import {scene} from './main.js';

class Candle {
   constructor (x, z) {
 	  this.group = new THREE.Group();
	  scene.add(this.group);
	  this.group.position.x = x;
	  this.group.position.z = z;
	  this.pause = true;
   }
   createCylinder(){
	  const cylinder = new THREE.Mesh (new THREE.CylinderGeometry (10,10,40,64), new THREE.MeshNormalMaterial());
	  cylinder.position.y = 20;
	  this.group.add(cylinder);
   }
   createFlame() {
	  const flame = new THREE.Mesh (new THREE.SphereGeometry (8,20,20), new THREE.MeshBasicMaterial());
	  flame.position.y = 48;
	  this.group.add(flame);
  }
  createPointLight(){
	  var light = new THREE.PointLight( 0xff0000, 1, 125 );
	  light.position.y = 48;
	  this.group.add(light);
	  //console.log(this.group.children[2].visible)
  }
   init(){
	   this.createCylinder();
	   this.createFlame();
	   this.createPointLight();
   }
   
   /*
   makeObj() {
	var obj = new THREE.Group();
			
	 var sphere = new THREE.Mesh (new THREE.SphereGeometry (8,20,20), new THREE.MeshBasicMaterial());
	var body = new THREE.Mesh (new THREE.CylinderGeometry (10,10,40,20), new THREE.MeshNormalMaterial());
	body.position.y = 20;
	sphere.position.y = 48;
	obj.add (sphere,body);

	//body.name = 'body';
	//sphere.name = 'sphere';
		  
	return obj;
 }
 blinkFun() {
	this.lit = ! this.lit;
	//console.log (this.lit);
	if (this.mesh === undefined) return;
	
	if (this.lit) 
		this.mesh.material.color.set ('red');	
	else
		this.mesh.material.color.set ('white');

   }
   */
  litFun(){
		clearInterval (this.interval);
	 	this.group.children[2].visible = true;
		 this.pause = true;
		console.log (this.group.name + 'is now lit up');
  }
  update(dt) {
	//console.log(this.lit);
	if (this.group.children[2].visible === false && this.pause === true) {
		this.pause = false;
		setTimeout (this.litFun.bind(this), 3000);
		
	}
	
 }
}

export { Candle };
