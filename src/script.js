import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * Test Geometry
 */
const geometry = new THREE.IcosahedronGeometry(20, 1)
const material = new THREE.MeshNormalMaterial()

material.wireframe = true
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.001, 5000)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 40
scene.add(camera)


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * GSAP
 */
gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.defaults({
    scrub: 3,
    ease: 'none'
})

const sections = document.querySelectorAll('.section')

gsap.from(mesh.position, {
    y: 1,
    duration: 1,
    ease: 'expo'
})

gsap.from('h1', {
    yPercent: 100,
    autoAlpha: 0,
    ease: 'back',
    delay: 0.3
})

gsap.to(mesh.rotation, {
    x: Math.PI * 2,
    scrollTrigger: {
        trigger: sections[1],
    },
})

gsap.to(mesh.scale, {
    x: 1.5,
    y: 1.5,
    scrollTrigger: {
        trigger: sections[2],
    },
})

gsap.to(mesh.rotation, {
    x: Math.PI * 2,
    scrollTrigger: {
        trigger: sections[3],
    },
})



/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()