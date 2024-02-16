import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

console.log(OrbitControls)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

/***********
 ** SCENE **
 ***********/

// Canvas
const canvas = document.querySelector(".webgl")

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xEDDEA4)

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
camera.position.set(2, 2, 4)
scene.add(camera)

// Lightsource
const light = new THREE.HemisphereLight( 0xEDDEA4, 0xFF9B42, 8 );
scene.add( light );

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
/************
 ** MESHES **
 ************/

 // Plane
 const planeGeometry = new THREE.PlaneGeometry(10, 10, 50, 50)
 const planeMaterial = new THREE.MeshBasicMaterial({
     color: new THREE.Color(0x0FA3B1),
     side: THREE.DoubleSide,
     wireframe: true
 })
 const plane = new THREE.Mesh(planeGeometry, planeMaterial)
 
 plane.rotation.x = Math.PI * 0.5
 scene.add(plane)

 // shape
 const shapeGeometry = new THREE.BoxGeometry(1)
 const shapeMaterial = new THREE.MeshPhysicalMaterial({
    roughness: 0.0,
    color: 0xF7A072,
    reflectivity: 1.0,
    transmission: 0,
    thickness: 1.0
})
 const shape = new THREE.Mesh (shapeGeometry, shapeMaterial)
 shape.rotateX(90).rotateY(180).rotateZ(270)
 scene.add(shape)

/********
 ** UI **
 ********/
// UI
const ui = new dat.GUI()

// Object UI
const uiObject = {}
uiObject.play = false

//Plane UI
const planeFolder = ui.addFolder('Plane')
planeFolder
    .add(planeMaterial, 'wireframe')

// Shape UI
const shapeFolder = ui.addFolder('Shape')
shapeFolder
    .add(shape.position, 'y').min(-3).max(3).step(0.05).name('Height')

shapeFolder
    .add(uiObject, 'play')
    .name('Animate')

/********************
 ** ANIMATION LOOP **
 ********************/
 const clock = new THREE.Clock()
 // Animate
 const animation = () => {
    // Return elapsedTime
    const elaTime = clock.getElapsedTime()

    // ***** ANIMATE shape ******
    if(uiObject.play)
    {
        shape.position.y = Math.sin(elaTime*.75)*1.5
    }

    // Controls
    controls.update()

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
 }

 animation()