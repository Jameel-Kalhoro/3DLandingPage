import * as three from './three.js-master/three.js-master/build/three.module.js'
import {GLTFLoader} from './js/GLTFLoader.js'
import {OrbitControls} from './three.js-master/three.js-master/examples/jsm/controls/OrbitControls.js'
// for checking module

const scene = new three.Scene();
const camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new three.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x87ceeb);
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    let plane;
    let homeCloud;
    let aboutCloud;
    let contactCloud;
    let menuCount =1;
    const homeButton = document.getElementById('home');
    const aboutButton = document.getElementById('aboutus');
    const contactButton = document.getElementById('contactus');
    homeButton.style.display = 'none';
    aboutButton.style.display = 'none';
    contactButton.style.display = 'none';
    let planeMovement = false;

    // Add directional light to the scene
    const directionalLight = new three.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize(); // Adjust the position as needed
    scene.add(directionalLight);




    // Load GLTF model
    let loader = new GLTFLoader();
    loader.load('dae_-_rustairborn.glb', function (glb) {
        plane = glb.scene;
        plane.scale.set(5, 5, 5);
        plane.rotation.x += 1;
        plane.rotation.y += 1.5;
        plane.rotation.x -= 0.2;
        plane.position.set(+10,+10,-10);
        scene.add(plane);
        animate();
    },function ( xhr ){
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    // called when loading has errors
    function ( error ) {
        console.log( 'An error happened' );
    });


    loader.load('clouds.glb', function (glb) {
        homeCloud = glb.scene;
        homeCloud.scale.set(0.1, 0.1, 0.1);
        homeCloud.rotation.x += 1;
        homeCloud.rotation.y += 1.5;
        homeCloud.rotation.x -= 0.2;
        homeCloud.position.set(+60,+10,-140);
        scene.add(homeCloud);
        // Traverse through the cloud object and set material color to white
        homeCloud.traverse(child => {
            if (child.isMesh) {
                child.material.color.set(0xffffff);
            }
        });
        animate();
    },function ( xhr ){
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    // called when loading has errors
    function ( error ) {
        console.log( 'An error happened' );
    });

    // about us cloud 
    loader.load('clouds.glb', function (glb) {
        aboutCloud = glb.scene;
        aboutCloud.scale.set(0.1, 0.1, 0.1);
        aboutCloud.rotation.x += 1;
        aboutCloud.rotation.y += 1.5;
        aboutCloud.rotation.x -= 0.2;
        aboutCloud.position.set(-55,+10,-315);
        scene.add(aboutCloud);
        // Traverse through the cloud object and set material color to white
        aboutCloud.traverse(child => {
            if (child.isMesh) {
                child.material.color.set(0xffffff);
            }
        });
        animate();
    },function ( xhr ){
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    // called when loading has errors
    function ( error ) {
        console.log( 'An error happened' );
    });

    loader.load('clouds.glb', function (glb) {
        contactCloud = glb.scene;
        contactCloud.scale.set(0.1, 0.1, 0.1);
        contactCloud.rotation.x += 1;
        contactCloud.rotation.y += 1.5;
        contactCloud.rotation.x -= 0.2;
        contactCloud.position.set(+60,+10,-450);
        scene.add(contactCloud);
        // Traverse through the cloud object and set material color to white
        contactCloud.traverse(child => {
            if (child.isMesh) {
                child.material.color.set(0xffffff);
            }
        });
        animate();
    },function ( xhr ){
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    // called when loading has errors
    function ( error ) {
        console.log( 'An error happened' );
    });



    
    // variables for move movement
    let time = 0;
    const movementSpeed = 0.1;
    const amplitude = 7;


    

    // Scroll up and down event listener
    window.addEventListener('wheel', async function (event) {
        // scroll up
        if (event.deltaY < 0) {
            homeButton.style.display = 'none';
            aboutButton.style.display = 'none';
            contactButton.style.display = 'none';
            time += movementSpeed;
            planeMovement = true;
            if(menuCount < 80){
                this.setTimeout(()=>{
                    planeMovement = false;
                    homeButton.style.display ='block';
                    console.log(menuCount);
                    menuCount = menuCount+1;
                },2000);
            }else if (menuCount >80 && menuCount < 200 ){
                this.setTimeout(()=>{
                    planeMovement = false;
                    aboutButton.style.display ='block';
                    console.log(menuCount);
                    menuCount = menuCount+1;
                },2000);
            }else if (menuCount > 200 ){
                this.setTimeout(()=>{
                    planeMovement = false;
                    contactButton.style.display= 'block';
                    console.log(menuCount);
                    menuCount = menuCount+1;
                },2000);
            }    
        } else {
            // Scroll down
        }
    });



    // Camera positioning
    camera.position.z = 100;

    // Render loop
    function animate() {
        requestAnimationFrame(animate);


        // Apply the serpentine movement to the plane
        if (plane) {
            plane.position.x = Math.sin(time) * amplitude;
            plane.position.y = Math.cos(time) * amplitude;
        }
        if(planeMovement){
            plane.position.z -=0.25;
            camera.position.z -= 0.25;
        }

        renderer.render(scene, camera);
    }
    animate();