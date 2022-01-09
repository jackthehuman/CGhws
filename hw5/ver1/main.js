import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { Teapot } from "./teapot.js";

javascript:(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='https://mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()

var scene, renderer, camera;
var mesh, pointLight, floor;
var keyboard = new KeyboardState();
var turn = true;
var angle = 0;
var teapot = [];

function init() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);
    renderer.setClearColor(0x888888);
	
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
    camera.position.y = 200;
    camera.position.z = 200;

    let controls = new OrbitControls(camera, renderer.domElement);

    var gridXZ = new THREE.GridHelper(200, 20, 'red', 'white');
    scene.add(gridXZ);
    //0xeb9234
    pointLight = new THREE.PointLight(0x89bbd6);
    scene.add (pointLight);
    scene.add (new THREE.PointLightHelper(pointLight, 3));

	var ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(ambientLight);

    var idx = 0;
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            teapot[idx] = new Teapot(-90+20*i, -90+20*j);
            idx++;
        }
    }
    window.addEventListener('resize', onWindowResize, false);
    ///////////////////////////////////////////////////
    /*
    var floorGeometry = new THREE.PlaneGeometry( 200, 200 );
    var floorMaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
    floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -0.1;
	scene.add(floor);
	floor.rotation.x = Math.PI/2;
    */
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    keyboard.update();
    
    if (keyboard.down("Z")) {
        turn = !turn;    
        console.log(turn);
    }
    if (turn) angle += 0.01;
    pointLight.position.set(50 * Math.cos(angle), 80, 50 * Math.sin(angle));    
    for(let i = 0; i < 100; i++){
        teapot[i].mesh.material.uniforms.lightpos.value.copy (pointLight.position);
        teapot[i].mesh.rotation.y = 1.3*angle;
    }
    requestAnimationFrame(animate);
    render();
}

function render() {
    renderer.render(scene, camera);
}


export {init, animate, scene};