import MidiAccess from './midi/midiAccess';
import onMidiMessage from './scenes/one/midi.js';
import THREE from 'three';
import TWEEN from 'tween.js';
import './styles/app.less';

let midi = new MidiAccess();

// scene, camera, renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// fog
scene.fog = new THREE.Fog( 0x000000, 100, 500);

// geometry
var geometry = new THREE.BoxGeometry(50, 50, 50);
var material = new THREE.MeshBasicMaterial({ color: '#ba3333' });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

var cubeTween = new TWEEN.Tween(cube.scale)
  .to({ x: 1 }, 500)
  .easing(TWEEN.Easing.Linear.None)
  .start();



// grid-helper
var size = 500, step = 50;
var gridHelper = new THREE.GridHelper(size, step);
scene.add(gridHelper);

camera.position.z = 300;
camera.position.y = 300;
camera.lookAt(new THREE.Vector3(0,0,0));

// render loop
function render() {
  requestAnimationFrame(render);

  // incremental animation
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  var r = Date.now() * 0.0001;

  camera.position.x = 300 * Math.cos( r );
  camera.position.z = 300 * Math.sin( r );
  camera.position.y = 200 * Math.sin( r )+50;

  camera.lookAt(new THREE.Vector3(0,0,0));

TWEEN.update();

  renderer.render(scene, camera);
}


window.addEventListener('__note', onNote);

function onNote(event) {

  if (event.detail.velocity !== 0) {
    // size up the cube
    scene.children[0].scale.x = 3;
    scene.children[0].scale.y = 3;
    scene.children[0].scale.z = 3;

    // change the color randomly
    scene.children[0].material.color = new THREE.Color(Math.random() * 0xffffff);

    // pulse the cube
    let cubeTween = new TWEEN.Tween(scene.children[0].scale)
      .to({ x: 1, y: 1, z: 1 }, 400)
      .easing(TWEEN.Easing.Linear.None)
      .start();
  }
}

console.log(scene.children);

render();
