import * as THREE from "three"

console.log(THREE)

/***********
 ** SCENE **
 ***********/

// Canvas
const canvas = document.querySelector(".webgl")

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color("pink")

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
)
scene.add(camera)
camera.position.set(0, 0, 5)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(window.innerWidth, window.innerHeight)

/************
 ** MESHES **
 ************/
// testSphere
const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh (sphereGeometry, sphereMaterial)

    /*pascalCase
        CamelCase
            snake_case*/

scene.add(testSphere)
//testSphere.position.set(0, 0, -5)

/********************
 ** ANIMATION LOOP **
 ********************/
const clock = new THREE.Clock()
 // Animate
 const animation = () => {
    // Return elapsedTime
    const elaTime = clock.getElapsedTime()

    // ***** ANIMATE testSphere ******
    testSphere.position.z = Math.sin(elaTime) // moves testSphere towards and away from camera (along z axis)
    //testSphere.position.y = Math.sin(elaTime) // moves testSphere up and down y axis (vertical)

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
 }

 animation()