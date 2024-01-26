import * as THREE from "three"

console.log(THREE)

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
scene.background = new THREE.Color("pink")

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)
camera.position.set(0, 0, 5)

// Lightsource
const light = new THREE.HemisphereLight( 0xeeffe6, 0x0077b3, 3 );
scene.add( light );

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

/************
 ** MESHES **
 ************/
/* testSphere
const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh (sphereGeometry, sphereMaterial)
*/

// testPoly
const icoGeometry = new THREE.IcosahedronGeometry(1, 0);
const torusGeometry = new THREE.TorusGeometry( 10, 3, 16, 100 ); 
const polyMaterial = new THREE.MeshToonMaterial({ color: 0xffff99})
const polyMaterial2 = new THREE.MeshToonMaterial({ color: 0xffe6ff})
const testPoly = new THREE.Mesh (icoGeometry, polyMaterial)
const testPoly2 = new THREE.Mesh (torusGeometry, polyMaterial2)
    /*pascalCase
        CamelCase
            snake_case*/

scene.add(testPoly)
scene.add(testPoly2)
testPoly2.position.set(-50, 0, 0)
//testSphere.position.set(0, 0, -5)

/********************
 ** ANIMATION LOOP **
 ********************/
const clock = new THREE.Clock()
 // Animate
 const animation = () => {
    // Return elapsedTime
    const elaTime = clock.getElapsedTime()

    // ***** ANIMATE shape ******
    // testSphere.position.z = Math.cos(elaTime/2) // moves testSphere towards and away from camera (along z axis)
    // testSphere.position.y = Math.sin(elaTime) // moves testSphere up and down y axis (vertical)
    testPoly.position.y = Math.sin(elaTime)
    testPoly.position.x = Math.sin(elaTime/5)
    testPoly.position.z = Math.sin(elaTime/15)
    testPoly.rotation.y = elaTime/10
    testPoly.rotation.z = elaTime/10

    testPoly2.position.y = Math.cos(elaTime-50)
    testPoly2.position.x = Math.cos(elaTime/5)
    testPoly2.rotation.y = elaTime/8
    testPoly2.rotation.z = elaTime/10

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
 }

 animation()