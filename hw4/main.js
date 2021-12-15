import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { Candle } from "./candle.js";

var scene, camera, renderer;
var raycaster;
var mouseLoc;
var candles = [];
var pickables = [];
var clock;

$('#blinker').click( function() {

	isBlinking = ! isBlinking;  // toggle
	
	if (isBlinking) // now is NOT blinking ...
		intervalHandle = setInterval (blinkFun, 200);
	else {
		clearInterval (intervalHandle);
		ball.material.color.set ('white');
	}
});

function init() {
	scene = new THREE.Scene();
	clock = new THREE.Clock();

	renderer = new THREE.WebGLRenderer();
	renderer.setSize (window.innerWidth, window.innerHeight);
	renderer.setClearColor(0x888888);
	document.body.appendChild (renderer.domElement);
	
	camera = new THREE.PerspectiveCamera (50, window.innerWidth/window.innerHeight, 1, 10000);
	camera.position.set (0,300,300);
	
	let controls = new OrbitControls (camera, renderer.domElement);
	
	//scene.add (new THREE.GridHelper (200,20, 'red','white'));
	var floor = new THREE.Mesh(new THREE.PlaneGeometry( 240, 240 ), new THREE.MeshPhongMaterial( {color: 0xa6a9ad, side: THREE.DoubleSide} ));
	floor.rotation.x = Math.PI/2;
	scene.add(floor);
	///////////////
	var candle = new Candle(2, 2);
	for(let i = 0; i < 6; i++){
		candles.push (new Candle(-100+40*i, -100+40*i));
		candles[i].init();
		pickables.push(candles[i].group);
	}
	candles[0].group.name = 'candle[0]';
	candles[1].group.name = 'candle[1]';
	candles[2].group.name = 'candle[2]';
	candles[3].group.name = 'candle[3]';
	candles[4].group.name = 'candle[4]';
	candles[5].group.name = 'candle[5]';
	//console.log(candles[0]);
	//console.log(candles[0].group);
	//console.log(candles[0].group.children);
	//console.log(candles[0].group.children.);
	raycaster = new THREE.Raycaster();
	mouseLoc = new THREE.Vector2();
	document.addEventListener ('pointerdown', doPointerDown, false);
}

function doPointerDown (event) {
	event.preventDefault();
	
	mouseLoc.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouseLoc.y = -(event.clientY / window.innerHeight) * 2 + 1;
	
	raycaster.setFromCamera (mouseLoc, camera);
	var intersects = raycaster.intersectObjects (pickables);
	
	if (intersects.length > 0) {
	    console.log (intersects.length + ' picked ...');
		/*
		for(let i = 0; i < intersects.length; i++){
			console.log (intersects[i].object.parent.name + 'is now put out');
		}
		*/
		console.log (intersects[0].object.parent.name + 'is now put out');
		//console.log(intersects[0].object.parent);
		//console.log(intersects[0].object.parent.children[2]);
		//console.log(intersects[0]);
		//console.log(intersects[0].object);
		intersects[0].object.parent.children[2].visible = false;
		//console.log(intersects[0].object.parent.children[2].visible);
	} else {
		console.log ('nothing picked...');
	}
	
}

function animate() {
	requestAnimationFrame(animate);
	renderer.render (scene, camera);
	let dt = clock.getDelta();
	
	candles.forEach (function(b) { b.update(dt);});
}

export {init, animate, scene};
