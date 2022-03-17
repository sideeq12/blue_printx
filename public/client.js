import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'
import { PointerLockControls } from "./jsm/controls/PointerLockControls.js"
import {GLTFLoader} from "./jsm/loaders/GLTFLoader.js"

console.log("it is working..")


const canvas = document.querySelector(".webgl");
const start = document.querySelector(".first_span")
const downleft = document.querySelector(".downleft")
const downright = document.querySelector(".down-right")
const admin = document.querySelector(".admin")
const link = document.querySelector(".link")


const scene = new THREE.Scene()

const gltfLoader = new GLTFLoader();
  gltfLoader.load(
      "/models/shop/brandon.glb",
      (gltf)=>{
          const root = gltf.scene
          root.scale.set(0.5, 0.5, 0.5)
          root.position.set(0, -1, 0)
          scene.add(root)
        console.log("this is the scene", gltf.scene)
          }
  )


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.set(0,1.5,5)

const renderer = new THREE.WebGLRenderer({canvas : canvas})
renderer.setSize(window.innerWidth, window.innerHeight)



// const controls = new OrbitControls(camera, canvas)
const controls = new PointerLockControls(camera, canvas)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})
const cube = new THREE.Mesh(geometry, material)

// scene.add(cube)

 start.addEventListener("click", ()=>{
        controls.lock()
    })

controls.addEventListener("lock", ()=>{
    downleft.style.display = "none"
    downright.style.display = "none"
    admin.style.display = "none"
    start.style.display = "none"
    link.style.display = "none"
})

controls.addEventListener("unlock", ()=>{
    downleft.style.display = "block"
    downright.style.display = "block"
    admin.style.display = "block"
    start.style.display = "block"
    link.style.display = "block"
})

    let keyboard =[];

addEventListener("keydown", (e)=>{
    keyboard[e.key] = true
})


addEventListener("keyup", (e)=>{
    keyboard[e.key] = false
})

function processKeyboard(){
    let actualspeed = 0.05
    if(keyboard["w"] || keyboard["ArrowUp"]){
        controls.moveForward(actualspeed)
    }
    if(keyboard["s"] || keyboard["ArrowDown"]){
        controls.moveForward(-actualspeed)
    }
    if(keyboard["a"] || keyboard["ArrowLeft"]){
        controls.moveRight(-actualspeed)
    }
    if(keyboard["d"] || keyboard["ArrowRight"]){
        controls.moveRight(actualspeed) 
    }
    
}

window.addEventListener(
    'resize',
    () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        render()
    },
    false
)



function animate() {
    
    processKeyboard()
    requestAnimationFrame(animate)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    render()
}

function render() {
    renderer.render(scene, camera)
}

animate()
