import MidiAccess from './midi/midiAccess';
import onMidiMessage from './scenes/one/midi.js';
import THREE from 'three';
import './styles/app.less';

let midi = new MidiAccess(onMidiMessage);

// scene, camera, renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// geometry
var geometry = new THREE.BoxGeometry(50, 50, 50);
var material = new THREE.MeshBasicMaterial({ color: '#ba3333' });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// grid
/*var size = 500, step = 50;
var  geometry  = new THREE.Geometry();
for (var i = -size; i <= size; i += step) {
  geometry.vertices.push(new THREE.Vector3(-size, 0, i));
  geometry.vertices.push(new THREE.Vector3(size, 0, i));
  geometry.vertices.push(new THREE.Vector3(i, 0, -size));
  geometry.vertices.push(new THREE.Vector3(i, 0, size));
}
var material = new THREE.LineBasicMaterial({ color: '#aaa', opacity: 0.2 });
var line = new THREE.LineSegments(geometry, material);
scene.add(line);*/

// grid-help
var size = 500, step = 50;
var gridHelper = new THREE.GridHelper(size, step);
scene.add(gridHelper);

camera.position.z = 300;
camera.position.y = 300;
camera.lookAt(new THREE.Vector3(0,0,0));

function rotate(camera) {

}

// render loop
function render() {
  requestAnimationFrame(render);

  // incremental animation
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;


  renderer.render(scene, camera);
}

render();