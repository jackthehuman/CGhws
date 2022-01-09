import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { Teapot } from "./teapot.js";

javascript:(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='https://mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()

var scene, renderer, camera;
var sceneRTT = [];
var pointLight = [];
var angle = 0;
var renderTarget = [];
var quad = [];
var teapot = [], quad = [];
var keyboard = new KeyboardState();
var turn = true;
function init() {

	renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);


  scene = new THREE.Scene();
  var gridXZ = new THREE.GridHelper(200, 20, 'red', 'white');
  scene.add(gridXZ);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
  camera.position.set (200, 200, 0);

  let controls = new OrbitControls(camera, renderer.domElement);

  var ambientLight = new THREE.AmbientLight(0x555555);
  scene.add(ambientLight);

  window.addEventListener('resize', onWindowResize, false);
  var ambientLight = new THREE.AmbientLight(0x555555);
  scene.add(ambientLight);
  /////////////////////////////////////////////////////////
  
  let plane = new THREE.PlaneBufferGeometry(20, 20);
    var idx = 0;
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            sceneRTT[idx] = new THREE.Scene();
            pointLight[idx] = new THREE.PointLight(0xffffff);
            pointLight[idx].position.set(0, 300, 200);
            sceneRTT[idx].add(pointLight[idx]);
            renderTarget[idx] = new THREE.WebGLRenderTarget(
                1024, 1024, {
                  minFilter: THREE.LinearFilter,
                  magFilter: THREE.NearestFilter,
                  format: THREE.RGBFormat
            });
            let rttmaterial = new THREE.ShaderMaterial({
            uniforms: {
                mytex: {
                type: "t",
                value: renderTarget[0].texture
                }
            },
            vertexShader: document.getElementById('myVertexShaderPlane').textContent,
            fragmentShader: document.getElementById('myFragmentShaderPlane').textContent
            });
            teapot[idx] = new Teapot(0, 0);
            teapot[idx].mesh.color = 0xff1234;
            sceneRTT[idx].add(teapot[idx].mesh);
            sceneRTT[idx].add(ambientLight);
            
            quad[idx] = new THREE.Mesh(plane, rttmaterial);
            quad[idx].position.set(-90+20*i, 5, -90+20*j);
            quad[idx].rotation.x = Math.PI/2;
            scene.add(quad[idx]);
            idx++;
        }
    }
    scene.add (new THREE.AxesHelper (50));
    window.addEventListener('resize', onWindowResize, false);
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
	requestAnimationFrame(animate);
    if(turn) angle += 0.01;
    
    for(let i = 0; i < 100; i++){
    pointLight[i].position.set(300 * Math.cos(angle), 300, 300 * Math.sin(angle));  
    teapot[i].mesh.material.uniforms.lightpos.value.copy (pointLight[i].position);
    teapot[i].mesh.rotation.y = 1.3*angle;
    renderer.setRenderTarget (renderTarget[i]);
     renderer.setClearColor(0xffff00);
    renderer.render(sceneRTT[i], camera);
    quad[i].lookAt(camera.position);

    }
    renderer.setRenderTarget(null);
    renderer.setClearColor(0x888888);
    renderer.render(scene, camera);
}


export {init, animate, scene};