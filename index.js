let mainPageDiv = document.querySelector("#main-page-div");
let smokeDiv = document.querySelector("#smoke");
let canvasDiv = document.querySelector("#canvas-div");
let arrowContainer = document.querySelector(".arrow-container");
// let progressElement = document.querySelector("#progress-element");
let loader = document.querySelector(".loader");


var pi = Math.PI;

var scene = new THREE.Scene();
var h = window.innerHeight + 30,
  w = window.innerWidth;
var aspectRatio = w / h,
  fieldOfView = 30,
  nearPlane = 1,
  farPlane = 1000;
var camera = new THREE.PerspectiveCamera(
  fieldOfView,
  aspectRatio,
  nearPlane,
  farPlane
);
var renderer = new THREE.WebGLRenderer({
  canvas: artboard,
  alpha: true,
  antialias: true
});

const dpi = window.devicePixelRatio;
renderer.setSize(w * dpi/2, h * dpi/2);
const theCanvas = document.getElementById("artboard");
theCanvas.style.width = `${w}px`;
theCanvas.style.height = `${h}px`;

renderer.shadowMapEnabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

//camera
camera.position.set(32, 1, 0);
camera.lookAt(new THREE.Vector3(0, 0, 4));

// auto rotate
let h1 = document.querySelector("h1");


// const controls = new THREE.OrbitControls(camera, renderer.domElement);
// controls.target.copy(new THREE.Vector3(0, 0, 4)); // change the z value to move the model left and right
// controls.enableZoom = false;
// controls.autoRotate = false;
// controls.autoRotateSpeed *= 0.03;


// // controls.addEventListener('start', function(){
// //     controls.autoRotate = false;
// //   });

// controls.rotateSpeed = 0.04;

// controls.enableDamping = true;
// controls.dampingFactor = 0.05;

//lights, 3 point lighting
var col_light = 0xffffff; // set

var light = new THREE.AmbientLight(col_light, 0.56);

var keyLight = new THREE.DirectionalLight(col_light, 0.3);
keyLight.position.set(-5, 30, -10);
keyLight.castShadow = true;
keyLight.shadow.camera.top = 8;
keyLight.shadow.camera.left = 8;
keyLight.shadow.camera.right = -8;
keyLight.shadow.camera.bottom = -10;

keyLight.shadow.mapSize.x = 2048;
keyLight.shadow.mapSize.y = 2048;

keyLight.shadow.radius = 12;

keyLight.shadow.bias = -0.0005;


//keylight shadow helper

// var shadowHelper = new THREE.CameraHelper( keyLight.shadow.camera );
// scene.add( shadowHelper );

var fillLight = new THREE.DirectionalLight(col_light, 0.3);
fillLight.position.set(-20, 20, 20);

var backLight = new THREE.DirectionalLight(col_light, 0.1);
backLight.position.set(10, 0, -20);

scene.add(light);
scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

//----------------------------point lights----------------------------

// point light 1

let lightPointNear = 0.1;
let lightPointFar = 3.8;
let lightPointShadowMapSize = 512;
let lightPointIntensity = 0.1;



const lightPoint1 = new THREE.PointLight(0xfff4c1, lightPointIntensity);
lightPoint1.position.set(4, 4, 2);
scene.add(lightPoint1);

lightPoint1.castShadow = true;
lightPoint1.shadow.mapSize.x = lightPointShadowMapSize;
lightPoint1.shadow.mapSize.y = lightPointShadowMapSize;

lightPoint1.shadow.camera.near = lightPointNear; 
lightPoint1.shadow.camera.far = lightPointFar; 

const helper1 = new THREE.PointLightHelper(lightPoint1);
//scene.add(helper1);

// point light 2

const lightPoint2 = new THREE.PointLight(0xfff4c1, lightPointIntensity);
lightPoint2.position.set(-0.5, 4.3, -3.8);
scene.add(lightPoint2);

lightPoint2.castShadow = true;
lightPoint2.shadow.mapSize.x = lightPointShadowMapSize;
lightPoint2.shadow.mapSize.y = lightPointShadowMapSize;

lightPoint2.shadow.camera.near = lightPointNear; 
lightPoint2.shadow.camera.far = lightPointFar; 

const helper2 = new THREE.PointLightHelper(lightPoint2);
//scene.add(helper2);

// point light 3

const lightPoint3 = new THREE.PointLight(0xfff4c1, lightPointIntensity);
lightPoint3.position.set(-3.9, 3.7, 2.4);
scene.add(lightPoint3);

lightPoint3.castShadow = true;
lightPoint3.shadow.mapSize.x = lightPointShadowMapSize;
lightPoint3.shadow.mapSize.y = lightPointShadowMapSize;

lightPoint3.shadow.camera.near = lightPointNear; 
lightPoint3.shadow.camera.far = lightPointFar; 

const helper3 = new THREE.PointLightHelper(lightPoint3);
//scene.add(helper3);

// point light 4

const lightPoint4 = new THREE.PointLight(0xfff4c1, lightPointIntensity);
lightPoint4.position.set(0, 0.5, 4);
scene.add(lightPoint4);

lightPoint4.castShadow = true;
lightPoint4.shadow.mapSize.x = lightPointShadowMapSize;
lightPoint4.shadow.mapSize.y = lightPointShadowMapSize;

lightPoint4.shadow.camera.near = lightPointNear; 
lightPoint4.shadow.camera.far = lightPointFar; 

const helper4 = new THREE.PointLightHelper(lightPoint4);
//scene.add(helper4);

// point light 5

const lightPoint5 = new THREE.PointLight(0xfff4c1, lightPointIntensity);
lightPoint5.position.set(3, 1.2, -2.6);
scene.add(lightPoint5);

lightPoint5.castShadow = true;
lightPoint5.shadow.mapSize.x = lightPointShadowMapSize;
lightPoint5.shadow.mapSize.y = lightPointShadowMapSize;

lightPoint5.shadow.camera.near = lightPointNear; 
lightPoint5.shadow.camera.far = lightPointFar; 

const helper5 = new THREE.PointLightHelper(lightPoint5);
//scene.add(helper5);

// point light 6

const lightPoint6 = new THREE.PointLight(0xfff4c1, lightPointIntensity);
lightPoint6.position.set(-4, 0.1, -2);
scene.add(lightPoint6);

lightPoint6.castShadow = true;
lightPoint6.shadow.mapSize.x = lightPointShadowMapSize;
lightPoint6.shadow.mapSize.y = lightPointShadowMapSize;

lightPoint6.shadow.camera.near = lightPointNear; 
lightPoint6.shadow.camera.far = lightPointFar; 

const helper6 = new THREE.PointLightHelper(lightPoint6);
//scene.add(helper6);

let lightPointBias = -0.008;
lightPoint1.shadow.bias = lightPointBias;
lightPoint2.shadow.bias = lightPointBias;
lightPoint3.shadow.bias = lightPointBias;
lightPoint4.shadow.bias = lightPointBias;
lightPoint5.shadow.bias = lightPointBias;
lightPoint6.shadow.bias = lightPointBias;

let shadowRadius = 24;

lightPoint1.shadow.radius = shadowRadius;
lightPoint2.shadow.radius = shadowRadius;
lightPoint3.shadow.radius = shadowRadius;
lightPoint4.shadow.radius = shadowRadius;
lightPoint5.shadow.radius = shadowRadius;
lightPoint6.shadow.radius = shadowRadius;





//axis
// var axesHelper = new THREE.AxesHelper(50);
// scene.add(axesHelper);

// const size = 20;
// const divisions = 20;

// const gridHelper = new THREE.GridHelper( size, divisions );
// scene.add( gridHelper );


//materials

// var mat_orange = new THREE.MeshLambertMaterial({ color: 0xff8c75 });
// var mat_white = new THREE.MeshLambertMaterial({ color: 0xffffff });
// var mat_grey = new THREE.MeshLambertMaterial({ color: 0xf3f2f7 });
// var mat_yellow = new THREE.MeshLambertMaterial({ color: 0xfeb42b });
// var mat_dark = new THREE.MeshLambertMaterial({ color: 0x5a6e6c });
// var mat_brown = new THREE.MeshLambertMaterial({ color: 0xa3785f });
// var mat_stone = new THREE.MeshLambertMaterial({ color: 0x9eaeac });

var mat_orange = new THREE.MeshPhysicalMaterial({ color: 0xa98467 });
var mat_white = new THREE.MeshPhysicalMaterial({ color: 0xffffff });
var mat_grey = new THREE.MeshPhysicalMaterial({ color: 0xe0fbfc });
var mat_yellow = new THREE.MeshPhysicalMaterial({ color: 0xfeb42b });
var mat_dark = new THREE.MeshPhysicalMaterial({ color: 0x5a6e6c });
var mat_brown = new THREE.MeshPhysicalMaterial({ color: 0xd5bdaf });
var mat_stone = new THREE.MeshPhysicalMaterial({ color: 0x9eaeac });

var mat_sidewall = new THREE.MeshPhysicalMaterial({ color: 0xbc6c25 });
var mat_cornertable = new THREE.MeshPhysicalMaterial({ color: 0xe07a5f });
var mat_stool = new THREE.MeshPhysicalMaterial({ color: 0xbc6c25 });
var mat_chandel = new THREE.MeshPhysicalMaterial({ color: 0xffbe0b, emissive:0xffffff,  emissiveIntensity:0.1});
var mat_base = new THREE.MeshPhysicalMaterial({ color: 0xfb8b24});
var mat_ceiling = new THREE.MeshPhysicalMaterial({ color: 0xb8c0ff });
var mat_centertable = new THREE.MeshPhysicalMaterial({ color: 0xf2cc8f });






                const degreesToRadians = (degrees) => { 
                    return degrees * (Math.PI / 180); 
                };
                // Add shadow support to object
                const shadowSupport = (group) => {
                    group.traverse((object) => {
                    if (object instanceof THREE.Mesh) {
                        object.castShadow = true;
                        object.receiveShadow = true;
                    }
                    });
                };
                // Get random number
                const randomize = (min, max, float = false) => {
                    const val = Math.random() * (max - min) + min;
                    if (float) {
                    return val;
                    }
                    return Math.floor(val);
                };
                // Box Helper 
                const boxHelperSupport = (group) => {
                    const box = new THREE.BoxHelper(group, 0xffff00);
                    scene.add(box);
                };
                // Random MORE VERTICES
                const map = (val, smin, smax, emin, emax) => ((emax - emin) * (val - smin)) / (smax - smin) + emin;
                const jitter = (geo, per) => geo.vertices.forEach((v) => {
                    v.x += map(Math.random(), 0, 1, -per, per);
                    v.y += map(Math.random(), 0, 1, -per, per);
                    v.z += map(Math.random(), 0, 1, -per, per);
                });
                // Cut Object helpers
                const chopBottom = (geo, bottom) => geo.vertices.forEach((v) => (v.y = Math.max(v.y, bottom)));
                const chopTop = (geo, top) => geo.vertices.forEach((v) => (v.y = Math.min(v.y, top)));

// clouds
  
var cloudMaterial = new THREE.MeshPhongMaterial({ color: 0xdef9ff, transparent: true, opacity: 0.65, flatShading: true });

const geoCloud = new THREE.SphereGeometry(2, 6, 6);
    jitter(geoCloud, 0.2);
    
    const cloud = new THREE.Mesh(geoCloud, cloudMaterial);
    cloud.scale.set(1, 0.8, 1);
    cloud.position.set(7,6,8);
    // scene.add(cloud)

    const cloud2 = new THREE.Mesh(geoCloud, cloudMaterial);
    cloud2.scale.set(0.75, 0.5, 1);
    cloud2.position.set(-7,-1,-8);
    // scene.add(cloud2)

    const cloud3 = new THREE.Mesh(geoCloud, cloudMaterial);
    cloud3.scale.set(0.9, 0.8, 0.75);
    cloud3.position.set(12,2,0);
    // scene.add(cloud3)

    const cloud4 = new THREE.Mesh(geoCloud, cloudMaterial);
    cloud4.scale.set(0.5, 0.3, 0.6);
    cloud4.position.set(12,1.5,1.9);
    // scene.add(cloud4)

    const cloud5 = new THREE.Mesh(geoCloud, cloudMaterial);
    cloud5.scale.set(0.5, 0.3, 0.6);
    cloud5.position.set(-7,0,-6);
    // scene.add(cloud5)

    var cloudGroup = new THREE.Group();
    cloudGroup.add(cloud);
    cloudGroup.add(cloud2);
    cloudGroup.add(cloud3);
    cloudGroup.add(cloud4);
    cloudGroup.add(cloud5);

    scene.add(cloudGroup)


//-------------------------------------ground-------------------------------------


var layers = [];
var ground = new THREE.Group();
for (var i = 0; i < 5; i++) {
  var h = 0.1;
  var geometry = new THREE.CylinderGeometry(8 - i - 0.01, 8 - i, h, 9);
  layers.push(new THREE.Mesh(geometry, mat_grey));
  layers[i].position.y = -6.5 + h * i;
  layers[i].receiveShadow = true;
  ground.add(layers[i]);
}
let factor = 0.8;

layers[0].scale.x = 0.8*factor;
layers[0].scale.z = 0.9*factor;
layers[1].scale.set(0.77*factor, 1, 0.91*factor);
layers[1].rotation.y = ((2 * pi) / 9) * 0.6;
layers[2].scale.set(0.8*factor, 1, 0.91*factor);
layers[2].rotation.y = ((2 * pi) / 9) * 0.3;
layers[3].scale.set(0.75*factor, 1, 0.92*factor);
layers[3].rotation.y = ((2 * pi) / 9) * 0.7;
layers[4].scale.set(0.7*factor, 1, 0.93*factor);
layers[4].rotation.y = ((2 * pi) / 9) * 0.9;

var geo_base = new THREE.CylinderGeometry(8, 1, 7, 9);
var base = new THREE.Mesh(geo_base, mat_grey);
base.scale.x = layers[0].scale.x;
base.scale.z = layers[0].scale.z;

base.position.y = -10;
ground.add(base);

scene.add(ground);




//------------------------------------------------------all exterior gltfs------------------------------------------------------

let GLTFOcta, GLTFBase, GLTFBoxes, GLTFSideWall, GLTFLaptop, GLTFAlmirah, GLTFCeiling, GLTFChandel, GLTFSofa, GLTFStool, GLTFCenterTable, GLTFSideTable;
let loaded=0;


function loadGLTFOcta(GLTFName) {
    
    var loader = new THREE.GLTFLoader();

    loader.load(GLTFName, function(gltf) {

        loadedGLTF = gltf.scene;
        GLTFOcta = loadedGLTF;
        
        scene.add( GLTFOcta);

        //gltf material

        // gltf.scene.traverse((o) => {
        //     if(o.isMesh) o.material = mat_white;
        //     if( o.material ) {
        //         o.material.side = THREE.DoubleSide;
        //     }
        // })

        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
         });

        init();

    }, function(xhr) {

		// console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

        loaded = xhr.loaded/25353554; // change the denominator to total xhr if changing the gltf model




	}, undefined, function(error) {
        console.log(error);
    })
    
}

if(loaded>1) {
    loader.style.opacity = "1";

} else {
    loader.style.opacity = "0";
}

// function progress() {
//     progressElement.style.width = `${loaded*200}px`;
//     console.log(loaded)

// }


function init() {
    loadedGLTF.scale.x = 1.4;
    loadedGLTF.scale.y = 1.4;
    loadedGLTF.scale.z = 1.4;

    loadedGLTF.position.y = -5.1;
}

loadGLTFOcta("assets/full 3d baked.gltf");


// //load sec gltf

// function loadGLTFBoxes(GLTFName) {
    
//     var loader = new THREE.GLTFLoader();

//     loader.load(GLTFName, function(gltf) {

//         loadedGLTF = gltf.scene;
//         GLTFBoxes = loadedGLTF;
//         scene.add(loadedGLTF);

//         //gltf material

//         gltf.scene.traverse((o) => {
//             if(o.isMesh) o.material = mat_grey;
//             if( o.material ) {
//                 o.material.side = THREE.DoubleSide;
//             }
//         })

//         gltf.scene.traverse(function (child) {
//             if (child.isMesh) {
//               child.castShadow = true;
//               child.receiveShadow = true;
//             }
//          });

//         init2();

//     }, undefined, function(error) {
//         console.log(error);
//     })
    
// }

// function init2() {
// loadedGLTF.scale.x = 1.4;
// loadedGLTF.scale.y = 1.4;
// loadedGLTF.scale.z = 1.4;

// loadedGLTF.position.y = -4;
// }

// loadGLTFBoxes("assets/boxes.glb");

//------------------------------------------------------all interior gltfs------------------------------------------------------

//load base

// function loadGLTFBase(GLTFName) {
    
//     var loader = new THREE.GLTFLoader();

//     loader.load(GLTFName, function(gltf) {

//         loadedGLTF = gltf.scene;
//         GLTFBase = loadedGLTF;
//         scene.add(loadedGLTF);

//         //gltf material

//         gltf.scene.traverse((o) => {
//             if(o.isMesh) o.material = mat_base;
//             if( o.material ) {
//                 o.material.side = THREE.DoubleSide;
//             }
//         })

//         gltf.scene.traverse(function (child) {
//             if (child.isMesh) {
//               child.castShadow = true;
//               child.receiveShadow = true;
//             }
//          });

//         init();

//     }, undefined, function(error) {
//         console.log(error);
//     })
    
// }


// loadGLTFBase("assets/base.glb");




// //load sidewall

// function loadGLTFSideWall(GLTFName) {
    
//     var loader = new THREE.GLTFLoader();

//     loader.load(GLTFName, function(gltf) {

//         loadedGLTF = gltf.scene;
//         GLTFSideWall = loadedGLTF;
//         scene.add(loadedGLTF);

//         //gltf material

//         gltf.scene.traverse((o) => {
//             if(o.isMesh) o.material = mat_sidewall;
//             if( o.material ) {
//                 o.material.side = THREE.DoubleSide;
//             }
//         })

//         gltf.scene.traverse(function (child) {
//             if (child.isMesh) {
//               child.castShadow = true;
//               child.receiveShadow = true;
//             }
//          });

//         init();

//     }, undefined, function(error) {
//         console.log(error);
//     })
    
// }


// loadGLTFSideWall("assets/sidewall.glb");



// //load laptop

// function loadGLTFLaptop(GLTFName) {
    
//     var loader = new THREE.GLTFLoader();

//     loader.load(GLTFName, function(gltf) {

//         loadedGLTF = gltf.scene;
//         GLTFLaptop = loadedGLTF;
//         scene.add(loadedGLTF);

//         //gltf material

//         gltf.scene.traverse((o) => {
//             if(o.isMesh) o.material = mat_dark;
//             if( o.material ) {
//                 o.material.side = THREE.DoubleSide;
//             }
//         })

//         gltf.scene.traverse(function (child) {
//             if (child.isMesh) {
//               child.castShadow = true;
//               child.receiveShadow = true;
//             }
//          });

//         init();

//     }, undefined, function(error) {
//         console.log(error);
//     })
    
// }

// loadGLTFLaptop("assets/laptop.glb");



// //load centertable

// function loadGLTFCenterTable(GLTFName) {
    
//     var loader = new THREE.GLTFLoader();

//     loader.load(GLTFName, function(gltf) {

//         loadedGLTF = gltf.scene;
//         GLTFCenterTable = loadedGLTF;
//         scene.add(loadedGLTF);

//         //gltf material

//         gltf.scene.traverse((o) => {
//             if(o.isMesh) o.material = mat_centertable;
//             if( o.material ) {
//                 o.material.side = THREE.DoubleSide;
//             }
//         })

//         gltf.scene.traverse(function (child) {
//             if (child.isMesh) {
//               child.castShadow = true;
//               child.receiveShadow = true;
//             }
//          });

//         init();

//     }, undefined, function(error) {
//         console.log(error);
//     })
    
// }

// loadGLTFCenterTable("assets/centertable.glb");


// //load almirah

// function loadGLTFAlmirah(GLTFName) {
    
//     var loader = new THREE.GLTFLoader();

//     loader.load(GLTFName, function(gltf) {

//         loadedGLTF = gltf.scene;
//         GLTFAlmirah = loadedGLTF;
//         scene.add(loadedGLTF);

//         //gltf material

//         gltf.scene.traverse((o) => {
//             if(o.isMesh) o.material = mat_brown;
//             if( o.material ) {
//                 o.material.side = THREE.DoubleSide;
//             }
//         })

//         gltf.scene.traverse(function (child) {
//             if (child.isMesh) {
//               child.castShadow = false;
//               child.receiveShadow = true;
//             }
//          });

//         init();

//     }, undefined, function(error) {
//         console.log(error);
//     })
    
// }

// loadGLTFAlmirah("assets/almirah.glb");


// //load stool

// function loadGLTFStool(GLTFName) {
    
//     var loader = new THREE.GLTFLoader();

//     loader.load(GLTFName, function(gltf) {

//         loadedGLTF = gltf.scene;
//         GLTFStool = loadedGLTF;
//         scene.add(loadedGLTF);

//         //gltf material

//         gltf.scene.traverse((o) => {
//             if(o.isMesh) o.material = mat_stool;
//             if( o.material ) {
//                 o.material.side = THREE.DoubleSide;
//             }
//         })

//         gltf.scene.traverse(function (child) {
//             if (child.isMesh) {
//               child.castShadow = true;
//               child.receiveShadow = true;
//             }
//          });

//         init();

//     }, undefined, function(error) {
//         console.log(error);
//     })
    
// }

// loadGLTFStool("assets/stool.glb");


// //load chandelier

// function loadGLTFChandel(GLTFName) {
    
//     var loader = new THREE.GLTFLoader();

//     loader.load(GLTFName, function(gltf) {

//         loadedGLTF = gltf.scene;
//         GLTFChandel = loadedGLTF;
//         scene.add(loadedGLTF);

//         //gltf material

//         gltf.scene.traverse((o) => {
//             if(o.isMesh) o.material = mat_chandel;
//             if( o.material ) {
//                 o.material.side = THREE.DoubleSide;
//             }
//         })

//         gltf.scene.traverse(function (child) {
//             if (child.isMesh) {
//               child.castShadow = false;
//               child.receiveShadow = false;
//             }
//          });

//         init();

//     }, undefined, function(error) {
//         console.log(error);
//     })
    
// }

// loadGLTFChandel("assets/chandel.glb");



// //load side table

// function loadGLTFSideTable(GLTFName) {
    
//     var loader = new THREE.GLTFLoader();

//     loader.load(GLTFName, function(gltf) {

//         loadedGLTF = gltf.scene;
//         GLTFSideTable = loadedGLTF;
//         scene.add(loadedGLTF);

//         //gltf material

//         gltf.scene.traverse((o) => {
//             if(o.isMesh) o.material = mat_cornertable;
//             if( o.material ) {
//                 o.material.side = THREE.DoubleSide;
//             }
//         })

//         gltf.scene.traverse(function (child) {
//             if (child.isMesh) {
//               child.castShadow = true;
//               child.receiveShadow = true;
//             }
//          });

//         init();

//     }, undefined, function(error) {
//         console.log(error);
//     })
    
// }

// loadGLTFSideTable("assets/cornertable.glb");


// //load sofa

// function loadGLTFSofa(GLTFName) {
    
//     var loader = new THREE.GLTFLoader();

//     loader.load(GLTFName, function(gltf) {

//         loadedGLTF = gltf.scene;
//         GLTFSofa= loadedGLTF;
//         scene.add(loadedGLTF);

//         //gltf material

//         gltf.scene.traverse((o) => {
//             if(o.isMesh) o.material = mat_orange;
//             if( o.material ) {
//                 o.material.side = THREE.DoubleSide;
//             }
//         })

//         gltf.scene.traverse(function (child) {
//             if (child.isMesh) {
//               child.castShadow = true;
//               child.receiveShadow = true;
//             }
//          });

//         init();

//     }, undefined, function(error) {
//         console.log(error);
//     })
    
// }

// loadGLTFSofa("assets/sofa.glb");


// //load ceiling

// function loadGLTFCeiling(GLTFName) {
    
//     var loader = new THREE.GLTFLoader();

//     loader.load(GLTFName, function(gltf) {

//         loadedGLTF = gltf.scene;
//         GLTFCeiling = loadedGLTF;
//         scene.add(loadedGLTF);

//         //gltf material

//         gltf.scene.traverse((o) => {
//             if(o.isMesh) o.material = mat_ceiling;
//             if( o.material ) {
//                 o.material.side = THREE.DoubleSide;
//             }
//         })

//         gltf.scene.traverse(function (child) {
//             if (child.isMesh) {
//               child.castShadow = true;
//               child.receiveShadow = true;
//             }
//          });

//         init();

//     }, undefined, function(error) {
//         console.log(error);
//     })
    
// }

// loadGLTFCeiling("assets/ceiling.glb");


/// rotating
cloudGroup.rotation.y -= 4.3;
cloudGroup.position.y = -2.5;

let octaRY, octaRX, abort;

abort = false;
cameraAbort = false;

let SPEED = -0.004;

document.body.addEventListener('mousemove', (e)=> {
 
        
        if(!abort) {
            GLTFOcta.rotation.y = ((e.clientY*2+e.clientX/2)/2)*1.3/(window.innerHeight);
            // GLTFOcta.rotation.x = -e.clientX*0.03/(window.innerHeight) + 0.03;
        }

})

theCanvas.style.position = "fixed";

theCanvas.addEventListener('drag', (e) => {
console.log(e.clientX)
})


 // rotate with mouse event


var isDragging = false;
var previousMousePosition = {
    x: 0,
    y: 0
};
$(renderer.domElement).on('mousedown', function(e) {
    isDragging = true;
})
.on('mousemove', function(e) {
    //console.log(e);
    var deltaMove = {
        x: e.clientX-previousMousePosition.x,
        y: e.clientY-previousMousePosition.y
    };

    if(!cameraAbort) {
        camera.position.set(32 + e.clientY/10000, 0.5 + e.clientX/20000, e.clientY/10000);

    }


    if(isDragging) {

        // GLTFOcta.rotation.x = 0;

        abort=true;

        var deltaRotationQuaternion = new THREE.Quaternion()
            .setFromEuler(new THREE.Euler(
                0,
                toRadians(deltaMove.x * 0.2),
                0,
                'XYZ'
            ));
        
        GLTFOcta.quaternion.multiplyQuaternions(deltaRotationQuaternion, GLTFOcta.quaternion);
    }
    
    previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
    };
});
/* */

$(document).on('mouseup', function(e) {
    isDragging = false;
    // abort=false;
});

function toRadians(angle) {
	return angle * (Math.PI / 180);
}

function toDegrees(angle) {
	return angle * (180 / Math.PI);
}


//------end rotate mouse event------------

function rotateClouds() {
    cloudGroup.rotation.y -= -0.004 * 0.22;

}

function rotate() {

    GLTFOcta.rotation.y -= SPEED * 1.1;
    ground.rotation.y -= SPEED / 8;


    // GLTFBoxes.rotation.y -= SPEED;
    // GLTFSideWall.rotation.y -= SPEED;
    // GLTFLaptop.rotation.y -= SPEED;
    // GLTFAlmirah.rotation.y -= SPEED;
    // GLTFCeiling.rotation.y -= SPEED;
    // GLTFChandel.rotation.y -= SPEED;
    // GLTFSofa.rotation.y -= SPEED;
    // GLTFStool.rotation.y -= SPEED;
    // GLTFCenterTable.rotation.y -= SPEED;
    // GLTFSideTable.rotation.y -= SPEED;

    // lightPoint1.rotation.y -= SPEED;
    // lightPoint2.rotation.y -= SPEED;
    // lightPoint3.rotation.y -= SPEED;
    // lightPoint4.rotation.y -= SPEED;
    // lightPoint5.rotation.y -= SPEED;
    // lightPoint6.rotation.y -= SPEED;

}

// theCanvas.addEventListener('wheel', (e)=> {
 
//     if(e.deltaY > 25) { // change this to increase scrolling required

//         SPEED = -0.0015;
        
//         mainPageDiv.style.opacity = '0';
//         mainPageDiv.style.transition = 'opacity 0.5s';

//     } 
// })


window.addEventListener('scroll', () => {
   // console.log(window.scrollY)

    if(window.scrollY>20) {

        SPEED = -0.0015;
        
        mainPageDiv.style.opacity = '0';
        mainPageDiv.style.transition = 'opacity 0.5s';
        arrowContainer.style.opacity = '0';
        arrowContainer.style.transition = 'opacity 0.1s';

        // isDragging = false;


    } else if(window.scrollY <= 20) {

        SPEED = -0.004;
        abort=false;
        
        mainPageDiv.style.opacity = '1';

        arrowContainer.style.opacity = '1';

        cameraAbort = false;
        // isDragging = false;

    }

    if(window.scrollY>50 && window.scrollY<=800) { // set less than value to anything till when the model scrolls

        // camera.position.set(32, 1, 0);
        cameraAbort = true;
        abort=false;

        SPEED = -0.0015;

        camera.position.set(32-window.scrollY/80, 1 + window.scrollY/1600, 0)

    }

    if(window.scrollY>800) {

        SPEED = 0;
        GLTFOcta.rotation.y = window.scrollY/600 - 2.5;

        abort=true;
        
    }
        
})


// gltf progress bar
// var manager = new THREE.LoadingManager();

// manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
//     progressElement.style.width = (itemsLoaded / itemsTotal * 100) + '%';
// };

// var Loaders = {
//     Texture: new THREE.TextureLoader(manager)
// }


//render

function render() {
    requestAnimationFrame(render);

    rotate();
    rotateClouds();
    // progress();

    renderer.render(scene, camera);

    // controls.update();
}

render();
