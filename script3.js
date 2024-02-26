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

 // Plane
 const geometry = new THREE.PlaneGeometry(5, 5)
 const material = new THREE.MeshNormalMaterial()
 const plane = new THREE.Mesh(geometry, material)

 //plane.position.set(0, 0, -5)
 scene.add(plane)


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