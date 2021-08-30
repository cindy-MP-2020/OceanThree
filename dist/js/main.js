import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js'
import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';
import { colorToFog, colorToScene, colorToLight } from './colorTo.js';
// import {OrbitControls} from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls";
// import { GLTFLoader } from './GLTFLoader.js';
// import * as dat from 'dat.gui'

let theRenderer, theScene, theCamera, theControls,theLoader, theParticle, Water, theMixer, theSphere,theMixer3,
    theFish, fishArray, duck
let theLight, ambientLight, directionalLight,directionalLight2,theLight2

// const gui = new dat.GUI()

let mouseX = 0
let mouseY = 0
let targetX = 0
let targetY = 0
const windowHaldfX = window.innerWidth / 2
const windowHaldfY = window.innerHeight / 2
const clock = new THREE.Clock()

let cameraX = 0
let cameraY = 5
let cameraZ = 15

function init() {
  const scene = new THREE.Scene();
  theScene = scene
  theScene.fog = new THREE.FogExp2(0xf17d56, 0.015)
  theScene.background = new THREE.Color( 0xff6940);
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  theCamera = camera
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias:true
  })
  theRenderer = renderer

  theRenderer.setPixelRatio(window.devicePixelRatio)
  theRenderer.setSize(window.innerWidth,window.innerHeight)
  theCamera.position.setZ(cameraZ);
  theCamera.position.setX(cameraX);
  theCamera.position.setY(cameraY);

  theRenderer.render(theScene,theCamera)

  ambientLight = new THREE.AmbientLight(0x4e538c);
  ambientLight.intensity = 3
  theScene.add(ambientLight)
//   const ambientLightControl = gui.addFolder('ambientLightControl')
//   ambientLightControl.add(ambientLight,'intensity').min(0).max(20).step(0.01)

  const pointLight = new THREE.PointLight(0xfaed5a)
  pointLight.position.set(0,20,-90)
  pointLight.intensity = 20
  pointLight.castShasow = true;
  pointLight.shadow.radius = .1;
  theLight = pointLight
  theScene.add(theLight)
  // const pointLightControl = gui.addFolder('pointLightControl')
  // pointLightControl.add(theLight.position, 'x').min(-60).max(60).step(0.01)
  // pointLightControl.add(theLight.position, 'y').min(-60).max(60).step(0.01)
  // pointLightControl.add(theLight.position, 'z').min(-60).max(60).step(0.01)
  // pointLightControl.add(theLight, 'intensity').min(0).max(60).step(0.01)
  // const lightHelper = new THREE.PointLightHelper(theLight)
//   const gridHelper = new THREE.GridHelper(400, 100);
  // theScene.add(lightHelper)
  const pointLight2 = new THREE.PointLight(0x0d00ff,1)
  pointLight2.position.set(-3.71,-32.82,1.58)
  pointLight2.castShasow = true;
  theLight2 = pointLight2
  theScene.add(theLight2)
  // const lightHelper2 = new THREE.PointLightHelper(theLight2)
  // theScene.add(lightHelper2)
  // const pointLightControl2 = gui.addFolder('pointLightControl2')
  // pointLightControl2.add(theLight2.position, 'x').min(-60).max(60).step(0.01)
  // pointLightControl2.add(theLight2.position, 'y').min(-60).max(60).step(0.01)
  // pointLightControl2.add(theLight2.position, 'z').min(-60).max(60).step(0.01)
  // pointLightControl2.add(theLight2, 'intensity').min(0).max(60).step(0.01)

  directionalLight = new THREE.DirectionalLight(0x4e538c,3);
  directionalLight.position.set(5.7,0.41,-45.91)
  directionalLight.castShasow = true;
  theScene.add(directionalLight);

  directionalLight2 = new THREE.DirectionalLight(0x0091ff,2);
  directionalLight2.position.set(-9,10.85,0.26)
  directionalLight2.castShasow = true;
  theScene.add(directionalLight2);
  // const directionalLightControl = gui.addFolder('directionalLightControl')
  // directionalLightControl.add(directionalLight2.position, 'x').min(-60).max(60).step(0.01)
  // directionalLightControl.add(directionalLight2.position, 'y').min(-60).max(60).step(0.01)
  // directionalLightControl.add(directionalLight2.position, 'z').min(-60).max(60).step(0.01)
  // directionalLightControl.add(directionalLight2, 'intensity').min(0).max(60).step(0.01)

//   const controls = new OrbitControls(theCamera, theRenderer.domElement);
//   theControls = controls
  var directionalLight3 = new THREE.DirectionalLight(0xeb349b,5);
  directionalLight3.position.set(5,-60,0)
  directionalLight3.castShasow = true;
  theScene.add(directionalLight3);
  // const directionalLightControl = gui.addFolder('directionalLightControl')
  // directionalLightControl.add(directionalLight3.position, 'x')
  // directionalLightControl.add(directionalLight3.position, 'y')
  // directionalLightControl.add(directionalLight3.position, 'z')
  // directionalLightControl.add(directionalLight3, 'intensity').min(0)
  // const lightHelper4 = new THREE.PointLightHelper(directionalLight3)
  // theScene.add(lightHelper4)
}

function addModel(){
  const geometry = new THREE.SphereGeometry( 5, 32, 16 );
    const material = new THREE.MeshToonMaterial( { color: 0xffe18f, opacity: 1, transparent: false } );
    const sphere = new THREE.Mesh( geometry, material );
    theSphere = sphere;
    theSphere.position.setZ(-90)
    theSphere.position.setY(20)
    theScene.add( theSphere );
}

function animate(){
  requestAnimationFrame( animate);

  // moving sun w/ mouse
  targetX = mouseX * .2
  targetY = mouseY * .02
  if(theSphere){
      theSphere.position.setX(cameraX + targetX);
      theSphere.position.setY(cameraY - targetY);
      theLight.position.setX(cameraX + targetX);
      theLight.position.setY(cameraY - targetY);
  }
  // moving fish and light w/ mouse
  targetX = (mouseX+windowHaldfX-1600) * .001
  targetY = (mouseY+windowHaldfY-400) * .001
  for (var i = 0 ; i < fisharr.length; i++){
    if(fisharr[i]){
      fisharr[i].rotation.y = targetX + Math.PI;
      fisharr[i].rotation.x = targetY;
    }
  }

  // var targetX2 = mouseX * .002
  // var targetY2 = mouseY * .002
  // theCamera.position.setY(cameraY - targetY2);
  // theCamera.position.setX(cameraX - targetX2);

  var dt = clock.getDelta()
  if(theMixer){
  theMixer.update(dt)
  }
  for(var i = 0; i <=arr.length; i++){
    if(arr[i]){
      arr[i].update(dt)
    }
  }
  for(var i = 0; i <=coralFisharr.length; i++){
    if(coralFisharr[i]){
      coralFisharr[i].update(dt)
    }
  }
  if(theMixer3){
  theMixer3.update(dt)
  }
  // theControls.update();
  theRenderer.render(theScene, theCamera);
}

function addWater(){
  theLoader = new GLTFLoader()
  theLoader.load(
    '../three-assets/ocean_wave_sim/scene.gltf',
    gltf => {
      Water = gltf.scene
      theMixer = new THREE.AnimationMixer(Water)
      var clip1 = gltf.animations[0]
      var action1 = theMixer.clipAction(clip1);
      Water.scale.set(5,1.8,2.5)
      Water.position.set(0, 0, 0)
      theScene.add(Water);
      action1.play();
    }
  )
}

function addDuck(){
  theLoader = new GLTFLoader()
  theLoader.load(
    '../three-assets/rubber_duck/scene.gltf',
    gltf => {
      duck = gltf.scene
      duck.scale.set(18,18,18)
      duck.position.set(-10, -10, -40)
      theScene.add(duck);
    }
  )
}
let land
function addLand(){
  theLoader = new GLTFLoader()
  theLoader.load(
    '../three-assets/starfish__sarcophyton_-_agisoftnaturechallenge/scene.gltf',
    gltf => {
      land = gltf.scene
      land.scale.set(50,50,50)
      land.position.set(0, -380, -110)
      land.rotation.y += Math.PI/2;
      theScene.add(land);
    }
  )
}

var arr = new Array;
var fisharr = new Array;
var url = '../three-assets/clown_fish/scene.gltf'
function addFish(index){
  var size = (Math.random() * (1.5 - 0.8) + 0.8).toFixed(2)
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(30))
  theLoader = new GLTFLoader()
  theLoader.load(
    url,
    gltf => {
      theFish = gltf.scene
      theFish.scale.set(size,size,size)
      theFish.position.set(20 + x, -75 + y, -20 + z*0.8)
      theFish.rotation.y += Math.PI;
      theScene.add(theFish);
      fisharr[index] = theFish
      let theMixer2 = new THREE.AnimationMixer(theFish)
      theMixer2.clipAction(gltf.animations[0]).play();
      arr[index] = theMixer2
    }
  )
}

function addManyFish(){
  var size = (Math.random() * (0.2 - 0.1) + 0.1).toFixed(2)
  // const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(7))
  theLoader = new GLTFLoader()
  theLoader.load(
    '../three-assets/the_fish_particle/scene.gltf',
    gltf => {
      fishArray = gltf.scene
      theMixer3 = new THREE.AnimationMixer(fishArray)
      var clip1 = gltf.animations[0]
      var action1 = theMixer3.clipAction(clip1);
      fishArray.scale.set(6,6,6)
      fishArray.position.set(-10, -40, 0)
      theScene.add(fishArray);
      action1.play();
    }
  )
}
var coralFisharr = new Array
let coralFish
function addcoralFishh(index){
  // var size = (Math.random() * (20 - 8) + 8).toFixed(2)
  var size = 1
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(7))
  theLoader = new GLTFLoader()
  theLoader.load(
    '../three-assets/school_of_fish_i_am_back_guyssssssssssssssss/scene.gltf',
    gltf => {
      coralFish = gltf.scene
      coralFish.scale.set(size,size,size)
      coralFish.position.set(0+x*5, -140+y*5, -300+z*5)
      theScene.add(coralFish);
      let theMixer5 = new THREE.AnimationMixer(coralFish)
      theMixer5.clipAction(gltf.animations[0]).play();
      coralFisharr[index] = theMixer5
    }
  )
}

function onDocumentMouseMove(event){
  mouseX = (event.clientX -windowHaldfX)
  mouseY = (event.clientY -windowHaldfY)
}

init();
addWater();
addDuck()
for(var i = 0; i <= 15; i++){
  addFish(i);
}
addManyFish();
for(var i = 0; i < 1; i++){
  addcoralFishh(i);
}
addModel();
addLand();
animate();
document.addEventListener('mousemove',onDocumentMouseMove)

var lastScrollTop = 0;
window.addEventListener("scroll", function(){ 
   var st = window.pageYOffset || document.documentElement.scrollTop;
   if (st > lastScrollTop){
    updateCamera();
   } else {
    updateCamera2();
   }
   lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false);


// scene2
function updateCamera(){
  if(document.documentElement.scrollTop<100){
    changeColor(0.03, 0x0d0626, 0x0d0626, 0x2151ff);
  }
  if(document.documentElement.scrollTop<950){
    moveToFish();
  }
  if(document.documentElement.scrollTop>950 && document.documentElement.scrollTop<2000){
    moveToFish();
    changeColor(0.03, 0x0d0626, 0x010014, 0x4826ff);
    theLight.intensity = 0;
  }
  if(document.documentElement.scrollTop>2000 && document.documentElement.scrollTop<2633){
    moveToFish();
    changeColor(0.03, 0x0d0626, 0x010014, 0x4826ff);
    theLight.intensity = 0;
    // console.log(theCamera.position.z);
  }
  if(document.documentElement.scrollTop>=2633 && document.documentElement.scrollTop<6000){
    theCamera.position.setZ(15 + distance*2633 - distance*document.documentElement.scrollTop );
    if(theScene.fog.density > 0.00001){
      theScene.fog.density -= 0.0002
    }
    console.log(theCamera.position.z);
  }
}
var distance = 0.9
function updateCamera2(){
  if(document.documentElement.scrollTop<100){
    changeColor(0.015, 0xf17d56, 0xff6940, 0xfaed5a);
  }
  if(document.documentElement.scrollTop<950){
    LeaveFish();
  }
  if(document.documentElement.scrollTop>950 && document.documentElement.scrollTop<2000){
    LeaveFish();
    changeColor(0.03, 0x0d0626, 0x0d0626, 0x2151ff);
  }
  if(document.documentElement.scrollTop>2000 && document.documentElement.scrollTop<2633){
    LeaveFish();
    changeColor(0.03, 0x0d0626, 0x0d0626, 0x2151ff);
  }
  if(document.documentElement.scrollTop>=2633 && document.documentElement.scrollTop<6000){
    theCamera.position.setZ(15 + distance*2633 - distance*document.documentElement.scrollTop );
    if(theScene.fog.density < 0.03){
      theScene.fog.density += 0.0002
    }
  }
}

function changeColor(density, color1, color2, color3){
  theScene.fog.density = density
  colorToFog(theScene.fog, color1) 
  colorToScene(theScene, color2) 
  colorToLight(theLight, color3) 
}

function moveToFish(){
  theCamera.position.y = 5 - 0.05 * document.documentElement.scrollTop 
 if(theCamera.position.y >= -30 && document.documentElement.scrollTop<800){
   theSphere.material.opacity = 1-document.documentElement.scrollTop * 0.015
   ambientLight.intensity = 3 - document.documentElement.scrollTop * 0.0005
   theSphere.material.transparent = true
 }
 if(document.documentElement.scrollTop<1570 && document.documentElement.scrollTop>800){
  ambientLight.intensity = 3 - document.documentElement.scrollTop * 0.0005
 }
}
function LeaveFish(){
  theCamera.position.y = 5 - 0.05 * document.documentElement.scrollTop 
 if(theCamera.position.y < 5 && document.documentElement.scrollTop<800){
   theSphere.material.opacity = 1-document.documentElement.scrollTop * 0.015
   ambientLight.intensity = 3 + document.documentElement.scrollTop * 0.0005
   theSphere.material.transparent = false
 }
 if(document.documentElement.scrollTop<1570 && document.documentElement.scrollTop>800){
  theLight.intensity = 10 - document.documentElement.scrollTop * 0.0001
  theSphere.material.opacity -= document.documentElement.scrollTop * 0.015
  theSphere.material.transparent = true
  ambientLight.intensity = 3 + document.documentElement.scrollTop * 0.0005
 }
}
var num = 15
// floating
theRenderer.setAnimationLoop(al);
function al() {
  let t = clock.getElapsedTime();
  if(duck){
    duck.position.y = Math.sin(1.5*t) -3;
    duck.position.x = Math.sin(2*t) * 2 -10;
    duck.rotation.x = Math.sin(1*t) * .2;
    duck.rotation.y = Math.sin(1*t) * .2;
  }
}
