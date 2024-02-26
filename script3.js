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
scene.background = new THREE.Color(0x0D1321)

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
camera.position.set(2, 2, 4)
scene.add(camera)

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

 const caveMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
 })

// caveWall
const caveWallGeometry = new THREE.PlaneGeometry(10, 5)
const caveWall = new THREE.Mesh(caveWallGeometry, caveMaterial)
caveWall.rotation.y = Math.PI * .5
caveWall.position.set(-5, 0, 0)
scene.add(caveWall)

// barrierWall
const barrierWallGeometry = new THREE.PlaneGeometry(10, 2)
const barrierWall = new THREE.Mesh(barrierWallGeometry, caveMaterial)
barrierWall.rotation.y = Math.PI * .5
barrierWall.position.set(5, -1.5, 0)
scene.add(barrierWall)

// caveFloor

const caveFloorGeometry = new THREE.PlaneGeometry(10, 10)
const caveFloor = new THREE.Mesh(caveFloorGeometry, caveMaterial)
caveFloor.rotation.x = Math.PI * .5
caveFloor.position.set(0, -2.5, 0)
scene.add(caveFloor)


/********
 ** UI **
 ********/
// UI
const ui = new dat.GUI()


/********************
 ** ANIMATION LOOP **
 ********************/
 const clock = new THREE.Clock()

 // Animate
 const animation = () => {
    // Return elapsedTime
    const elaTime = clock.getElapsedTime()

    // ***** ANIMATE shape ******

    // Controls
    controls.update()

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
 }

 animation()