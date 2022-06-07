let mainPageDiv = document.querySelector("#main-page-div");
let smokeDiv = document.querySelector("#smoke");
let canvasDiv = document.querySelector("#canvas-div");
let arrowContainer = document.querySelector(".arrow-container");
// let progressElement = document.querySelector("#progress-element");
let loader = document.querySelector(".loader");

canvasDiv.style.overflow = "hidden";

let animationDiv = document.querySelector("#animation-div");
let communicationDiv = document.querySelector("#communication-div");
let industrialDiv = document.querySelector("#industrial-div");
let interactionDiv = document.querySelector("#interaction-div");
let mobilityDiv = document.querySelector("#mobility-div");
let bdesDiv = document.querySelector("#bdes-div");

let lastPage = document.querySelector("#last-page")

let originalQuaternion, newQuaternion;

let mPhone = window.matchMedia("screen and (max-width: 1200px)");

// let isTouch = window.matchMedia("(pointer: coarse)");

let SPEED = -0.004;


// if(!mPhone.matches) { // for desktops
    
    var pi = Math.PI;

    SPEED = -0.004;

    var scene = new THREE.Scene();
    var h = window.innerHeight + 30;

    if(window.innerWidth < 1200) {
        var w = window.innerWidth;
    }  else {
        var w = window.innerWidth * 1.35;
    } 
    
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
    
    theCanvas.style.left = '0';
    
    theCanvas.style.overflow = "hidden";
    
    renderer.shadowMapEnabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);
    
    //camera
    // camera.position.set(32, 1, 0);
    
    camera.position.set( 32 - 9 * 50/(window.innerHeight), 1 + 50/(window.innerHeight*2), 0); // dont change this
    
    
    // camera.lookAt(new THREE.Vector3(0, 0, 4));
    
    // auto rotate
    
    let h1 = document.querySelector("h1");
    
    
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.copy(new THREE.Vector3(0, 0.3, 0)); 
    controls.enableZoom = false;
    controls.enablePan = false;

    controls.minPolarAngle = Math.PI/2.25; // radians
    controls.maxPolarAngle = Math.PI/1.9; // radians
    
    if(window.innerWidth < 1200) {
        controls.enabled = false;
    }


    controls.autoRotate = true;
    
    controls.autoRotateSpeed = 0.1;
    

    // // controls.addEventListener('start', function(){
    // //     controls.autoRotate = false;
    // //   });
    
    controls.rotateSpeed = 0.04;
    
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
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
    
    
        if(!mPhone.matches) {
    
           cloudGroup.position.x = 0;
           cloudGroup.position.y = 0;
           cloudGroup.position.z = 0;
            
        } else { // in case of phone
        
            cloudGroup.position.x = 0;
            cloudGroup.position.y = 1.1;
            cloudGroup.position.z = 0;
    
            cloudGroup.scale.x = 0.5;
            cloudGroup.scale.y = 0.5;
            cloudGroup.scale.z = 0.5;
     
        }
    
    
    
    //-------------------------------------ground-------------------------------------
    
    
    if(!mPhone.matches) {
    
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
        
    } else { // in case of phone
    
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
        let factor = 0.45;
        
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
    
        ground.position.z = 3.8;
        ground.position.y = 0.5;
        
        ground.scale.x = 0;
        ground.scale.y = 0;
        ground.scale.z = 0;
    
        
        scene.add(ground);
    
    }
    
    
    
    
    //------------------------------------------------------all exterior gltfs------------------------------------------------------
    
    let GLTFOcta;
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
    
            // console.log(loaded)
    
        }, undefined, function(error) {
            console.log(error);
        })
        
    }
    
    function removeLoading() {
        if(loaded < 1) {
    
            loader.style.opacity = "1";
        
        } else {
    
            loader.style.opacity = "0";
            
        }
    }
    
    function init() {
    
        if(!mPhone.matches) {
            loadedGLTF.scale.x = 1.4;
            loadedGLTF.scale.y = 1.4;
            loadedGLTF.scale.z = 1.4;
    
            loadedGLTF.position.y = -5.1;
    
        } else {
            loadedGLTF.scale.x = 0.7;
            loadedGLTF.scale.y = 0.7;
            loadedGLTF.scale.z = 0.7;
        
            loadedGLTF.position.y = -5.2;
            loadedGLTF.position.z = 0;
        }
    
        originalQuaternion = GLTFOcta.quaternion;
    
    
    }
    
    loadGLTFOcta("full 3d baked.gltf");
    
    
    // ------------------------------------modify model-----------------------------------------
    
    
    /// rotating
    cloudGroup.rotation.y -= 4.3;
    cloudGroup.position.y = -2.5;
    
    let abort;
    
    abort = false;
    cameraAbort = false;
    
    
    document.body.addEventListener('mousemove', (e)=> {
     
            
            if(!abort) {
                GLTFOcta.rotation.y = ((e.clientY+e.clientX*1.2)/2)*0.1/(window.innerHeight);
                GLTFOcta.rotation.x = -e.clientX*0.03/(window.innerHeight) + 0.03;
            }
    
    })
    
    theCanvas.style.position = "fixed";
    
    
    var changeDir = false;
    
    
    
    //-----------------------------end rotate mouse event-------------------------------
    
    function rotateClouds() {
        cloudGroup.rotation.y -= 0.004 *0.6;
    
    }
    
    
    window.addEventListener('scroll', () => {
       // console.log(window.scrollY)
    
        if(window.scrollY>20) {
    
            SPEED = -0.0015;
            abort = true;
            
            mainPageDiv.style.opacity = '0';
            mainPageDiv.style.transition = 'opacity 0.5s';
            arrowContainer.style.opacity = '0';
            arrowContainer.style.transition = 'opacity 0.1s';
    
            // isDragging = false;
    
            controls.autoRotate = true;
    
    
    
        } else if(window.scrollY <= 20) {
    
            SPEED = -0.004;
            abort=false;
            
            mainPageDiv.style.opacity = '1';
    
            arrowContainer.style.opacity = '1';
    
            cameraAbort = true;
            // isDragging = false;
    
            controls.autoRotate = true;
    
    
        }
    
        if(window.scrollY > 50 && window.scrollY <= window.innerHeight) { // set less than value to anything till when the model scrolls
    
            // camera.position.set(32, 1, 0);
            cameraAbort = true;
            abort=true;
    
            SPEED = 0;
    
    
            // camera.position.set(32, 1, 0);
    
            if(!mPhone.matches) {
                camera.position.set( 32 - 9 * window.scrollY/(window.innerHeight), 1 + window.scrollY/(window.innerHeight*2), 0); // set this to determine camera position when viewing departments
            } else {
                camera.position.set( 32 - 9 * window.scrollY/(window.innerHeight), 1 + window.scrollY/(window.innerHeight*1.6), 0); // set this to determine camera position when viewing departments
            }
    
            if(changeDir) {
                GLTFOcta.rotation.y = -window.scrollY/(window.innerHeight)*1.25;
            } else {
                GLTFOcta.rotation.y = window.scrollY/(window.innerHeight)*1.25;
            }
    
            controls.autoRotate = false;
            
        }
    
    
    
        // department divs appearing and fading
    
        let initialAnimation, 
            differenceWithinDiv,
            differenceAfterDiv;
    
        if(!mPhone.matches) {
    
            initialAnimation = 120; //these are in vh
            differenceWithinDiv = 45; // sum should be 80
            differenceAfterDiv = 35;
    
        } else {
            initialAnimation = 120; //these are in vh
            differenceWithinDiv = 65; // sum should be 80
            differenceAfterDiv = 15;
        }
    
        //animation
    
        animationDiv.style.top = `${initialAnimation + differenceWithinDiv/2}vh`;
    
        if(window.scrollY > window.innerHeight * (initialAnimation/100) && window.scrollY < window.innerHeight * (initialAnimation/100 + differenceWithinDiv/100)) { // change the values to change where div fades. Current h diff is 0.55, div difference is 0.25
    
            animationDiv.style.opacity = '1';
            
        } else {
            animationDiv.style.opacity = '0.2';
        }
    
        //communication
    
        communicationDiv.style.top = `${initialAnimation + 3/2*differenceWithinDiv + differenceAfterDiv}vh`;
    
        if(window.scrollY > window.innerHeight * (initialAnimation/100 + differenceWithinDiv/100 + differenceAfterDiv/100) && window.scrollY < window.innerHeight * (initialAnimation/100 + 2 * differenceWithinDiv/100 + differenceAfterDiv/100)) { 
    
            communicationDiv.style.opacity = '1';
            
        } else {
            communicationDiv.style.opacity = '0.2';
        }
    
        //industrial
    
        industrialDiv.style.top = `${initialAnimation + 5/2*differenceWithinDiv + 2*differenceAfterDiv}vh`;
    
        if(window.scrollY > window.innerHeight * (initialAnimation/100 + 2 * differenceWithinDiv/100 + 2 * differenceAfterDiv/100) && window.scrollY < window.innerHeight * (initialAnimation/100 + 3 * differenceWithinDiv/100 + 2 * differenceAfterDiv/100)) { // change the values to change where div fades
    
            industrialDiv.style.opacity = '1';
            
        } else {
            industrialDiv.style.opacity = '0.2';
        }
    
        //interaction
    
        interactionDiv.style.top = `${initialAnimation + 7/2*differenceWithinDiv + 3*differenceAfterDiv}vh`;
    
        if(window.scrollY > window.innerHeight * (initialAnimation/100 + 3 * differenceWithinDiv/100 + 3 * differenceAfterDiv/100) && window.scrollY < window.innerHeight * (initialAnimation/100 + 4 * differenceWithinDiv/100 + 3 * differenceAfterDiv/100)) { // change the values to change where div fades
    
            interactionDiv.style.opacity = '1';
            
        } else {
            interactionDiv.style.opacity = '0.2';
        }
    
        //mobility
    
        mobilityDiv.style.top = `${initialAnimation + 9/2*differenceWithinDiv + 4*differenceAfterDiv}vh`;
    
        if(window.scrollY > window.innerHeight * (initialAnimation/100 + 4 * differenceWithinDiv/100 + 4 * differenceAfterDiv/100) && window.scrollY < window.innerHeight * (initialAnimation/100 + 5 * differenceWithinDiv/100 + 4 * differenceAfterDiv/100)) { // change the values to change where div fades
    
            mobilityDiv.style.opacity = '1';
            
        } else {
            mobilityDiv.style.opacity = '0.2';
        }
    
        //bdes
    
        bdesDiv.style.top = `${initialAnimation + 11/2*differenceWithinDiv + 5*differenceAfterDiv}vh`;
    
        if(window.scrollY > window.innerHeight * (initialAnimation/100 + 5 * differenceWithinDiv/100 + 5 * differenceAfterDiv/100) && window.scrollY < window.innerHeight * (initialAnimation/100 + 6 * differenceWithinDiv/100 + 5 * differenceAfterDiv/100)) { // change the values to change where div fades
    
            bdesDiv.style.opacity = '1';
            
        } else {
            bdesDiv.style.opacity = '0.2';
        }
    
    
    
        // fade model at end
    
        if(window.scrollY > window.innerHeight * (initialAnimation/100 + 6 * differenceWithinDiv/100 + 5 * differenceAfterDiv/100)) { // change the values to change where div fades
    
        // camera.position.set(23, 1.5, 0);
    
        if(!mPhone.matches) {
            camera.position.set(23 + 60 * (window.scrollY / (window.innerHeight * (initialAnimation/100 + 6 * differenceWithinDiv/100 + 5 * differenceAfterDiv/100)) - 1), 1.5, 10 * (window.scrollY / (window.innerHeight * (initialAnimation/100 + 6 * differenceWithinDiv/100 + 5 * differenceAfterDiv/100)) - 1)); // set this to determine camera position when viewing departments
        } else {
            camera.position.set(23 + 60 * (window.scrollY / (window.innerHeight * (initialAnimation/100 + 6 * differenceWithinDiv/100 + 5 * differenceAfterDiv/100)) - 1), 1.5 + 8 * (window.scrollY / (window.innerHeight * (initialAnimation/100 + 6 * differenceWithinDiv/100 + 5 * differenceAfterDiv/100)) - 1), 10 * (window.scrollY / (window.innerHeight * (initialAnimation/100 + 6 * differenceWithinDiv/100 + 5 * differenceAfterDiv/100)) - 1));
        }
    
    
        // abort=false;
        SPEED = -0.004;
        controls.autoRotate = true;
    
    
        } 
    
        // set model rotation for branches here
    
        if(window.scrollY > window.innerHeight && window.scrollY <= window.innerHeight * (initialAnimation/100 + 6 * differenceWithinDiv/100 + 5 * differenceAfterDiv/100)) {
    
            SPEED = 0;
    
            
    
            if(changeDir) {
                GLTFOcta.rotation.y = -window.scrollY/(window.innerHeight)*1.25;
            } else {
                GLTFOcta.rotation.y = window.scrollY/(window.innerHeight)*1.25;
            }
        
            abort=true;
    
            controls.autoRotate = false;
    
                
        }
    
        lastPage.style.top = `${initialAnimation + 17/2*differenceWithinDiv + 5*differenceAfterDiv}vh`;
    
    
    // if(!controls.autoRotate)  {
    //     controls.minAzimuthAngle = 0; // radians
    //     controls.maxAzimuthAngle = Math.PI/20; // radians
    // }
            
    })
    
    
    
    //render
    
    function render() {
        requestAnimationFrame(render);
    
        // rotate();
        rotateClouds();
        // progress();
    
        removeLoading();
    
        controls.update();
    
        renderer.render(scene, camera);
    
     // remove when not using orbit controls
    }
    
    render();
// }


// -----------------------------------------------------------------------------------for phone----------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------for phone----------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------for phone----------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------for phone----------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------for phone----------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------for phone----------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------for phone----------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------for phone----------------------------------------------------------------------------------------------------------------



// else { // for phones

//     var pi = Math.PI;

//     SPEED = -0.004;
    
//     var scene = new THREE.Scene();
//     var h = window.innerHeight + 30,
//       w = window.innerWidth;
//     var aspectRatio = w / h,
//       fieldOfView = 30,
//       nearPlane = 1,
//       farPlane = 1000;
//     var camera = new THREE.PerspectiveCamera(
//       fieldOfView,
//       aspectRatio,
//       nearPlane,
//       farPlane
//     );
//     var renderer = new THREE.WebGLRenderer({
//       canvas: artboard,
//       alpha: true,
//       antialias: true
//     });
    
//     const dpi = window.devicePixelRatio;
//     renderer.setSize(w * dpi/2, h * dpi/2);
//     const theCanvas = document.getElementById("artboard");
//     theCanvas.style.width = `${w}px`;
//     theCanvas.style.height = `${h}px`;
    
//     theCanvas.style.overflow = "hidden";
    
//     renderer.shadowMapEnabled = true;
//     renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//     document.body.appendChild(renderer.domElement);
    
//     //camera
//     // camera.position.set(32, 1, 0);
    
//     camera.position.set( 32 - 9 * 50/(window.innerHeight), 1 + 50/(window.innerHeight*2), 0);
    
    
//     camera.lookAt(new THREE.Vector3(0, 0, 4));
    
//     // auto rotate
//     let h1 = document.querySelector("h1");
    
    
//     // const controls = new THREE.OrbitControls(camera, renderer.domElement);
//     // controls.target.copy(new THREE.Vector3(0, 0, 4)); 
//     // controls.enableZoom = false;
//     // controls.autoRotate = false;
    
//     // controls.update();
//     // controls.autoRotateSpeed *= 2;
    
    
//     // // controls.addEventListener('start', function(){
//     // //     controls.autoRotate = false;
//     // //   });
    
//     // controls.rotateSpeed = 0.04;
    
//     // controls.enableDamping = true;
//     // controls.dampingFactor = 0.05;
    
//     //lights, 3 point lighting
//     var col_light = 0xffffff; // set
    
//     var light = new THREE.AmbientLight(col_light, 0.56);
    
//     var keyLight = new THREE.DirectionalLight(col_light, 0.3);
//     keyLight.position.set(-5, 30, -10);
//     keyLight.castShadow = true;
//     keyLight.shadow.camera.top = 8;
//     keyLight.shadow.camera.left = 8;
//     keyLight.shadow.camera.right = -8;
//     keyLight.shadow.camera.bottom = -10;
    
//     keyLight.shadow.mapSize.x = 2048;
//     keyLight.shadow.mapSize.y = 2048;
    
//     keyLight.shadow.radius = 12;
    
//     keyLight.shadow.bias = -0.0005;
    
    
//     //keylight shadow helper
    
//     // var shadowHelper = new THREE.CameraHelper( keyLight.shadow.camera );
//     // scene.add( shadowHelper );
    
//     var fillLight = new THREE.DirectionalLight(col_light, 0.3);
//     fillLight.position.set(-20, 20, 20);
    
//     var backLight = new THREE.DirectionalLight(col_light, 0.1);
//     backLight.position.set(10, 0, -20);
    
//     scene.add(light);
//     scene.add(keyLight);
//     scene.add(fillLight);
//     scene.add(backLight);
    
//     //----------------------------point lights----------------------------
    
//     // point light 1
    
//     let lightPointNear = 0.1;
//     let lightPointFar = 3.8;
//     let lightPointShadowMapSize = 512;
//     let lightPointIntensity = 0.1;
    
    
    
//     const lightPoint1 = new THREE.PointLight(0xfff4c1, lightPointIntensity);
//     lightPoint1.position.set(4, 4, 2);
//     scene.add(lightPoint1);
    
//     lightPoint1.castShadow = true;
//     lightPoint1.shadow.mapSize.x = lightPointShadowMapSize;
//     lightPoint1.shadow.mapSize.y = lightPointShadowMapSize;
    
//     lightPoint1.shadow.camera.near = lightPointNear; 
//     lightPoint1.shadow.camera.far = lightPointFar; 
    
//     const helper1 = new THREE.PointLightHelper(lightPoint1);
//     //scene.add(helper1);
    
//     // point light 2
    
//     const lightPoint2 = new THREE.PointLight(0xfff4c1, lightPointIntensity);
//     lightPoint2.position.set(-0.5, 4.3, -3.8);
//     scene.add(lightPoint2);
    
//     lightPoint2.castShadow = true;
//     lightPoint2.shadow.mapSize.x = lightPointShadowMapSize;
//     lightPoint2.shadow.mapSize.y = lightPointShadowMapSize;
    
//     lightPoint2.shadow.camera.near = lightPointNear; 
//     lightPoint2.shadow.camera.far = lightPointFar; 
    
//     const helper2 = new THREE.PointLightHelper(lightPoint2);
//     //scene.add(helper2);
    
//     // point light 3
    
//     const lightPoint3 = new THREE.PointLight(0xfff4c1, lightPointIntensity);
//     lightPoint3.position.set(-3.9, 3.7, 2.4);
//     scene.add(lightPoint3);
    
//     lightPoint3.castShadow = true;
//     lightPoint3.shadow.mapSize.x = lightPointShadowMapSize;
//     lightPoint3.shadow.mapSize.y = lightPointShadowMapSize;
    
//     lightPoint3.shadow.camera.near = lightPointNear; 
//     lightPoint3.shadow.camera.far = lightPointFar; 
    
//     const helper3 = new THREE.PointLightHelper(lightPoint3);
//     //scene.add(helper3);
    
//     // point light 4
    
//     const lightPoint4 = new THREE.PointLight(0xfff4c1, lightPointIntensity);
//     lightPoint4.position.set(0, 0.5, 4);
//     scene.add(lightPoint4);
    
//     lightPoint4.castShadow = true;
//     lightPoint4.shadow.mapSize.x = lightPointShadowMapSize;
//     lightPoint4.shadow.mapSize.y = lightPointShadowMapSize;
    
//     lightPoint4.shadow.camera.near = lightPointNear; 
//     lightPoint4.shadow.camera.far = lightPointFar; 
    
//     const helper4 = new THREE.PointLightHelper(lightPoint4);
//     //scene.add(helper4);
    
//     // point light 5
    
//     const lightPoint5 = new THREE.PointLight(0xfff4c1, lightPointIntensity);
//     lightPoint5.position.set(3, 1.2, -2.6);
//     scene.add(lightPoint5);
    
//     lightPoint5.castShadow = true;
//     lightPoint5.shadow.mapSize.x = lightPointShadowMapSize;
//     lightPoint5.shadow.mapSize.y = lightPointShadowMapSize;
    
//     lightPoint5.shadow.camera.near = lightPointNear; 
//     lightPoint5.shadow.camera.far = lightPointFar; 
    
//     const helper5 = new THREE.PointLightHelper(lightPoint5);
//     //scene.add(helper5);
    
//     // point light 6
    
//     const lightPoint6 = new THREE.PointLight(0xfff4c1, lightPointIntensity);
//     lightPoint6.position.set(-4, 0.1, -2);
//     scene.add(lightPoint6);
    
//     lightPoint6.castShadow = true;
//     lightPoint6.shadow.mapSize.x = lightPointShadowMapSize;
//     lightPoint6.shadow.mapSize.y = lightPointShadowMapSize;
    
//     lightPoint6.shadow.camera.near = lightPointNear; 
//     lightPoint6.shadow.camera.far = lightPointFar; 
    
//     const helper6 = new THREE.PointLightHelper(lightPoint6);
//     //scene.add(helper6);
    
//     let lightPointBias = -0.008;
//     lightPoint1.shadow.bias = lightPointBias;
//     lightPoint2.shadow.bias = lightPointBias;
//     lightPoint3.shadow.bias = lightPointBias;
//     lightPoint4.shadow.bias = lightPointBias;
//     lightPoint5.shadow.bias = lightPointBias;
//     lightPoint6.shadow.bias = lightPointBias;
    
//     let shadowRadius = 24;
    
//     lightPoint1.shadow.radius = shadowRadius;
//     lightPoint2.shadow.radius = shadowRadius;
//     lightPoint3.shadow.radius = shadowRadius;
//     lightPoint4.shadow.radius = shadowRadius;
//     lightPoint5.shadow.radius = shadowRadius;
//     lightPoint6.shadow.radius = shadowRadius;
    
    
    
    
    
//     //axis
//     // var axesHelper = new THREE.AxesHelper(50);
//     // scene.add(axesHelper);
    
//     // const size = 20;
//     // const divisions = 20;
    
//     // const gridHelper = new THREE.GridHelper( size, divisions );
//     // scene.add( gridHelper );
    
    
//     //materials
    
//     // var mat_orange = new THREE.MeshLambertMaterial({ color: 0xff8c75 });
//     // var mat_white = new THREE.MeshLambertMaterial({ color: 0xffffff });
//     // var mat_grey = new THREE.MeshLambertMaterial({ color: 0xf3f2f7 });
//     // var mat_yellow = new THREE.MeshLambertMaterial({ color: 0xfeb42b });
//     // var mat_dark = new THREE.MeshLambertMaterial({ color: 0x5a6e6c });
//     // var mat_brown = new THREE.MeshLambertMaterial({ color: 0xa3785f });
//     // var mat_stone = new THREE.MeshLambertMaterial({ color: 0x9eaeac });
    
//     var mat_orange = new THREE.MeshPhysicalMaterial({ color: 0xa98467 });
//     var mat_white = new THREE.MeshPhysicalMaterial({ color: 0xffffff });
//     var mat_grey = new THREE.MeshPhysicalMaterial({ color: 0xe0fbfc });
//     var mat_yellow = new THREE.MeshPhysicalMaterial({ color: 0xfeb42b });
//     var mat_dark = new THREE.MeshPhysicalMaterial({ color: 0x5a6e6c });
//     var mat_brown = new THREE.MeshPhysicalMaterial({ color: 0xd5bdaf });
//     var mat_stone = new THREE.MeshPhysicalMaterial({ color: 0x9eaeac });
    
//     var mat_sidewall = new THREE.MeshPhysicalMaterial({ color: 0xbc6c25 });
//     var mat_cornertable = new THREE.MeshPhysicalMaterial({ color: 0xe07a5f });
//     var mat_stool = new THREE.MeshPhysicalMaterial({ color: 0xbc6c25 });
//     var mat_chandel = new THREE.MeshPhysicalMaterial({ color: 0xffbe0b, emissive:0xffffff,  emissiveIntensity:0.1});
//     var mat_base = new THREE.MeshPhysicalMaterial({ color: 0xfb8b24});
//     var mat_ceiling = new THREE.MeshPhysicalMaterial({ color: 0xb8c0ff });
//     var mat_centertable = new THREE.MeshPhysicalMaterial({ color: 0xf2cc8f });
    
    
    
    
    
    
//                     const degreesToRadians = (degrees) => { 
//                         return degrees * (Math.PI / 180); 
//                     };
//                     // Add shadow support to object
//                     const shadowSupport = (group) => {
//                         group.traverse((object) => {
//                         if (object instanceof THREE.Mesh) {
//                             object.castShadow = true;
//                             object.receiveShadow = true;
//                         }
//                         });
//                     };
//                     // Get random number
//                     const randomize = (min, max, float = false) => {
//                         const val = Math.random() * (max - min) + min;
//                         if (float) {
//                         return val;
//                         }
//                         return Math.floor(val);
//                     };
//                     // Box Helper 
//                     const boxHelperSupport = (group) => {
//                         const box = new THREE.BoxHelper(group, 0xffff00);
//                         scene.add(box);
//                     };
//                     // Random MORE VERTICES
//                     const map = (val, smin, smax, emin, emax) => ((emax - emin) * (val - smin)) / (smax - smin) + emin;
//                     const jitter = (geo, per) => geo.vertices.forEach((v) => {
//                         v.x += map(Math.random(), 0, 1, -per, per);
//                         v.y += map(Math.random(), 0, 1, -per, per);
//                         v.z += map(Math.random(), 0, 1, -per, per);
//                     });
//                     // Cut Object helpers
//                     const chopBottom = (geo, bottom) => geo.vertices.forEach((v) => (v.y = Math.max(v.y, bottom)));
//                     const chopTop = (geo, top) => geo.vertices.forEach((v) => (v.y = Math.min(v.y, top)));
    
//     // clouds
      
//     var cloudMaterial = new THREE.MeshPhongMaterial({ color: 0xdef9ff, transparent: true, opacity: 0.65, flatShading: true });
    
//     const geoCloud = new THREE.SphereGeometry(2, 6, 6);
//         jitter(geoCloud, 0.2);
        
//         const cloud = new THREE.Mesh(geoCloud, cloudMaterial);
//         cloud.scale.set(1, 0.8, 1);
//         cloud.position.set(7,6,8);
//         // scene.add(cloud)
    
//         const cloud2 = new THREE.Mesh(geoCloud, cloudMaterial);
//         cloud2.scale.set(0.75, 0.5, 1);
//         cloud2.position.set(-7,-1,-8);
//         // scene.add(cloud2)
    
//         const cloud3 = new THREE.Mesh(geoCloud, cloudMaterial);
//         cloud3.scale.set(0.9, 0.8, 0.75);
//         cloud3.position.set(12,2,0);
//         // scene.add(cloud3)
    
//         const cloud4 = new THREE.Mesh(geoCloud, cloudMaterial);
//         cloud4.scale.set(0.5, 0.3, 0.6);
//         cloud4.position.set(12,1.5,1.9);
//         // scene.add(cloud4)
    
//         const cloud5 = new THREE.Mesh(geoCloud, cloudMaterial);
//         cloud5.scale.set(0.5, 0.3, 0.6);
//         cloud5.position.set(-7,0,-6);
//         // scene.add(cloud5)
    
//         var cloudGroup = new THREE.Group();
//         cloudGroup.add(cloud);
//         cloudGroup.add(cloud2);
//         cloudGroup.add(cloud3);
//         cloudGroup.add(cloud4);
//         cloudGroup.add(cloud5);
    
//         scene.add(cloudGroup)
    
    
//         if(!mPhone.matches) {
    
//            cloudGroup.position.x = 0;
//            cloudGroup.position.y = 0;
//            cloudGroup.position.z = 0;
            
//         } else { // in case of phone
        
//             cloudGroup.position.x = 0;
//             cloudGroup.position.y = 1.1;
//             cloudGroup.position.z = 3.8;
    
//             cloudGroup.scale.x = 0.5;
//             cloudGroup.scale.y = 0.5;
//             cloudGroup.scale.z = 0.5;
     
//         }
    
    
    
//     //-------------------------------------ground-------------------------------------
    
    
    
    
//     if(!mPhone.matches) {
    
//         var layers = [];
//         var ground = new THREE.Group();
//         for (var i = 0; i < 5; i++) {
//           var h = 0.1;
//           var geometry = new THREE.CylinderGeometry(8 - i - 0.01, 8 - i, h, 9);
//           layers.push(new THREE.Mesh(geometry, mat_grey));
//           layers[i].position.y = -6.5 + h * i;
//           layers[i].receiveShadow = true;
//           ground.add(layers[i]);
//         }
//         let factor = 0.8;
        
//         layers[0].scale.x = 0.8*factor;
//         layers[0].scale.z = 0.9*factor;
//         layers[1].scale.set(0.77*factor, 1, 0.91*factor);
//         layers[1].rotation.y = ((2 * pi) / 9) * 0.6;
//         layers[2].scale.set(0.8*factor, 1, 0.91*factor);
//         layers[2].rotation.y = ((2 * pi) / 9) * 0.3;
//         layers[3].scale.set(0.75*factor, 1, 0.92*factor);
//         layers[3].rotation.y = ((2 * pi) / 9) * 0.7;
//         layers[4].scale.set(0.7*factor, 1, 0.93*factor);
//         layers[4].rotation.y = ((2 * pi) / 9) * 0.9;
        
//         var geo_base = new THREE.CylinderGeometry(8, 1, 7, 9);
//         var base = new THREE.Mesh(geo_base, mat_grey);
//         base.scale.x = layers[0].scale.x;
//         base.scale.z = layers[0].scale.z;
        
//         base.position.y = -10;
//         ground.add(base);
        
//         scene.add(ground);
        
//     } else { // in case of phone
    
//         var layers = [];
//         var ground = new THREE.Group();
//         for (var i = 0; i < 5; i++) {
//           var h = 0.1;
//           var geometry = new THREE.CylinderGeometry(8 - i - 0.01, 8 - i, h, 9);
//           layers.push(new THREE.Mesh(geometry, mat_grey));
//           layers[i].position.y = -6.5 + h * i;
//           layers[i].receiveShadow = true;
//           ground.add(layers[i]);
//         }
//         let factor = 0.45;
        
//         layers[0].scale.x = 0.8*factor;
//         layers[0].scale.z = 0.9*factor;
//         layers[1].scale.set(0.77*factor, 1, 0.91*factor);
//         layers[1].rotation.y = ((2 * pi) / 9) * 0.6;
//         layers[2].scale.set(0.8*factor, 1, 0.91*factor);
//         layers[2].rotation.y = ((2 * pi) / 9) * 0.3;
//         layers[3].scale.set(0.75*factor, 1, 0.92*factor);
//         layers[3].rotation.y = ((2 * pi) / 9) * 0.7;
//         layers[4].scale.set(0.7*factor, 1, 0.93*factor);
//         layers[4].rotation.y = ((2 * pi) / 9) * 0.9;
        
//         var geo_base = new THREE.CylinderGeometry(8, 1, 7, 9);
//         var base = new THREE.Mesh(geo_base, mat_grey);
//         base.scale.x = layers[0].scale.x;
//         base.scale.z = layers[0].scale.z;
        
//         base.position.y = -10;
//         ground.add(base);
    
//         ground.position.z = 3.8;
//         ground.position.y = 0.5;
        
//         ground.scale.x = 0;
//         ground.scale.y = 0;
//         ground.scale.z = 0;
    
        
//         scene.add(ground);
    
//     }
    

//     //------------------------------------------------------all exterior gltfs------------------------------------------------------
    
//     let GLTFOcta;
//     let loaded=0;
    
    
//     function loadGLTFOcta(GLTFName) {
        
//         var loader = new THREE.GLTFLoader();
    
//         loader.load(GLTFName, function(gltf) {
    
//             loadedGLTF = gltf.scene;
//             GLTFOcta = loadedGLTF;
            
//             scene.add( GLTFOcta);
    
//             //gltf material
    
//             // gltf.scene.traverse((o) => {
//             //     if(o.isMesh) o.material = mat_white;
//             //     if( o.material ) {
//             //         o.material.side = THREE.DoubleSide;
//             //     }
//             // })
    
//             gltf.scene.traverse(function (child) {
//                 if (child.isMesh) {
//                   child.castShadow = true;
//                   child.receiveShadow = true;
//                 }
//              });
    
//             init();
    
//         }, function(xhr) {
    
//             // console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
//             loaded = xhr.loaded/25353554; // change the denominator to total xhr if changing the gltf model
    
//             // console.log(loaded)
    
//         }, undefined, function(error) {
//             console.log(error);
//         })
        
//     }
    
//     function removeLoading() {
//         if(loaded < 1) {
    
//             loader.style.opacity = "1";
        
//         } else {
    
//             loader.style.opacity = "0";
            
//         }
//     }
    
    
//     function init() {
    
//         if(!mPhone.matches) {
//             loadedGLTF.scale.x = 1.4;
//             loadedGLTF.scale.y = 1.4;
//             loadedGLTF.scale.z = 1.4;
    
//             loadedGLTF.position.y = -5.1;
    
//         } else {
//             loadedGLTF.scale.x = 0.7;
//             loadedGLTF.scale.y = 0.7;
//             loadedGLTF.scale.z = 0.7;
        
//             loadedGLTF.position.y = -5.2;
//             loadedGLTF.position.z = 3.8;
//         }
    
//         originalQuaternion = GLTFOcta.quaternion;
    
    
//     }
    
//     loadGLTFOcta("full 3d baked.gltf");
    
    
//     /// rotating
//     cloudGroup.rotation.y -= 4.3;
//     cloudGroup.position.y = -2.5;
        
//     abort = false;
//     cameraAbort = false;
    
    
//     theCanvas.style.position = "fixed";
    
//     theCanvas.addEventListener('drag', (e) => {
//     console.log(e.clientX)
//     })
    
//     // rotate with mouse event
    
//     var changeDir = false;
    

    
//     function toRadians(angle) {
//         return angle * (Math.PI / 180);
//     }
    
//     function toDegrees(angle) {
//         return angle * (180 / Math.PI);
//     }
    
   
//     //------end rotate mouse event------------
    
//     function rotateClouds() {
//         cloudGroup.rotation.y -= -0.004 * 0.22;
    
//     }
    
//     function rotate() {
//         GLTFOcta.rotation.y -= SPEED * 1.1;
//         ground.rotation.y -= SPEED / 6; 
//     }
    
//     window.addEventListener('scroll', () => {
//        // console.log(window.scrollY)
    
//         if(window.scrollY>20) {
    
//             SPEED = -0.0015;
//             abort = true;
            
//             mainPageDiv.style.opacity = '0';
//             mainPageDiv.style.transition = 'opacity 0.5s';
//             arrowContainer.style.opacity = '0';
//             arrowContainer.style.transition = 'opacity 0.1s';
    
//             // isDragging = false;
    
    
//         } else if(window.scrollY <= 20) {
    
//             SPEED = -0.004;
//             abort=false;
            
//             mainPageDiv.style.opacity = '1';
    
//             arrowContainer.style.opacity = '1';
    
//             cameraAbort = true;
//             // isDragging = false;
    
//         }
    
//         if(window.scrollY > 50 && window.scrollY <= window.innerHeight) { // set less than value to anything till when the model scrolls
    
//             // camera.position.set(32, 1, 0);
//             cameraAbort = true;
//             abort=true;
    
//             SPEED = 0;
    
    
//             // camera.position.set(32, 1, 0);
    
//             if(!mPhone.matches) {
//                 camera.position.set( 32 - 9 * window.scrollY/(window.innerHeight), 1 + window.scrollY/(window.innerHeight*2), 0); // set this to determine camera position when viewing departments
//             } else {
//                 camera.position.set( 32 - 9 * window.scrollY/(window.innerHeight), 1 + window.scrollY/(window.innerHeight*1.6), 0); // set this to determine camera position when viewing departments
//             }
    
//             if(changeDir) {
//                 GLTFOcta.rotation.y = -window.scrollY/(window.innerHeight)*1.25;
//             } else {
//                 GLTFOcta.rotation.y = window.scrollY/(window.innerHeight)*1.25;
//             }
            
//         }
    
    
    
//         // department divs appearing and fading
    
//         let initialAnimation, 
//             differenceWithinDiv,
//             differenceAfterDiv;
    
//         if(!mPhone.matches) {
    
//             initialAnimation = 120; //these are in vh
//             differenceWithinDiv = 45; // sum should be 80
//             differenceAfterDiv = 35;
    
//         } else {
//             initialAnimation = 120; //these are in vh
//             differenceWithinDiv = 65; // sum should be 80
//             differenceAfterDiv = 15;
//         }
    
//         //animation
    
//         animationDiv.style.top = `${initialAnimation + differenceWithinDiv/2}vh`;
    
//         if(window.scrollY > window.innerHeight * (initialAnimation/100) && window.scrollY < window.innerHeight * (initialAnimation/100 + differenceWithinDiv/100)) { // change the values to change where div fades. Current h diff is 0.55, div difference is 0.25
    
//             animationDiv.style.opacity = '1';
            
//         } else {
//             animationDiv.style.opacity = '0.2';
//         }
    
//         //communication
    
//         communicationDiv.style.top = `${initialAnimation + 3/2*differenceWithinDiv + differenceAfterDiv}vh`;
    
//         if(window.scrollY > window.innerHeight * (initialAnimation/100 + differenceWithinDiv/100 + differenceAfterDiv/100) && window.scrollY < window.innerHeight * (initialAnimation/100 + 2 * differenceWithinDiv/100 + differenceAfterDiv/100)) { 
    
//             communicationDiv.style.opacity = '1';
            
//         } else {
//             communicationDiv.style.opacity = '0.2';
//         }
    
//         //industrial
    
//         industrialDiv.style.top = `${initialAnimation + 5/2*differenceWithinDiv + 2*differenceAfterDiv}vh`;
    
//         if(window.scrollY > window.innerHeight * (initialAnimation/100 + 2 * differenceWithinDiv/100 + 2 * differenceAfterDiv/100) && window.scrollY < window.innerHeight * (initialAnimation/100 + 3 * differenceWithinDiv/100 + 2 * differenceAfterDiv/100)) { // change the values to change where div fades
    
//             industrialDiv.style.opacity = '1';
            
//         } else {
//             industrialDiv.style.opacity = '0.2';
//         }
    
//         //interaction
    
//         interactionDiv.style.top = `${initialAnimation + 7/2*differenceWithinDiv + 3*differenceAfterDiv}vh`;
    
//         if(window.scrollY > window.innerHeight * (initialAnimation/100 + 3 * differenceWithinDiv/100 + 3 * differenceAfterDiv/100) && window.scrollY < window.innerHeight * (initialAnimation/100 + 4 * differenceWithinDiv/100 + 3 * differenceAfterDiv/100)) { // change the values to change where div fades
    
//             interactionDiv.style.opacity = '1';
            
//         } else {
//             interactionDiv.style.opacity = '0.2';
//         }
    
//         //mobility
    
//         mobilityDiv.style.top = `${initialAnimation + 9/2*differenceWithinDiv + 4*differenceAfterDiv}vh`;
    
//         if(window.scrollY > window.innerHeight * (initialAnimation/100 + 4 * differenceWithinDiv/100 + 4 * differenceAfterDiv/100) && window.scrollY < window.innerHeight * (initialAnimation/100 + 5 * differenceWithinDiv/100 + 4 * differenceAfterDiv/100)) { // change the values to change where div fades
    
//             mobilityDiv.style.opacity = '1';
            
//         } else {
//             mobilityDiv.style.opacity = '0.2';
//         }
    
//         //bdes
    
//         bdesDiv.style.top = `${initialAnimation + 11/2*differenceWithinDiv + 5*differenceAfterDiv}vh`;
    
//         if(window.scrollY > window.innerHeight * (initialAnimation/100 + 5 * differenceWithinDiv/100 + 5 * differenceAfterDiv/100) && window.scrollY < window.innerHeight * (initialAnimation/100 + 6 * differenceWithinDiv/100 + 5 * differenceAfterDiv/100)) { // change the values to change where div fades
    
//             bdesDiv.style.opacity = '1';
            
//         } else {
//             bdesDiv.style.opacity = '0.2';
//         }
    
    
    
//         // fade model at end
    
//         if(window.scrollY > window.innerHeight * (initialAnimation/100 + 6 * differenceWithinDiv/100 + 5 * differenceAfterDiv/100)) { // change the values to change where div fades
    
//         // camera.position.set(23, 1.5, 0);
    
//         if(!mPhone.matches) {
//             camera.position.set(23 + 60 * (window.scrollY / (window.innerHeight * (initialAnimation/100 + 6 * differenceWithinDiv/100 + 5 * differenceAfterDiv/100)) - 1), 1.5, 10 * (window.scrollY / (window.innerHeight * (initialAnimation/100 + 6 * differenceWithinDiv/100 + 5 * differenceAfterDiv/100)) - 1)); // set this to determine camera position when viewing departments
//         } else {
//             camera.position.set(23 + 60 * (window.scrollY / (window.innerHeight * (initialAnimation/100 + 6 * differenceWithinDiv/100 + 5 * differenceAfterDiv/100)) - 1), 1.5 + 8 * (window.scrollY / (window.innerHeight * (initialAnimation/100 + 6 * differenceWithinDiv/100 + 5 * differenceAfterDiv/100)) - 1), 10 * (window.scrollY / (window.innerHeight * (initialAnimation/100 + 6 * differenceWithinDiv/100 + 5 * differenceAfterDiv/100)) - 1));
//         }
    
    
//         // abort=false;
//         SPEED = -0.004;
    
//         } 
    
//         // set model rotation for branches here
    
//         if(window.scrollY > window.innerHeight && window.scrollY <= window.innerHeight * (initialAnimation/100 + 6 * differenceWithinDiv/100 + 5 * differenceAfterDiv/100)) {
    
//             SPEED = 0;
    
            
    
//             if(changeDir) {
//                 GLTFOcta.rotation.y = -window.scrollY/(window.innerHeight)*1.25;
//             } else {
//                 GLTFOcta.rotation.y = window.scrollY/(window.innerHeight)*1.25;
//             }
        
//             abort=true;
                
//         }
    
//         lastPage.style.top = `${initialAnimation + 17/2*differenceWithinDiv + 5*differenceAfterDiv}vh`;
            
//     })
    
    
    
//     //render
    
//     function render() {
//         requestAnimationFrame(render);
    
//         rotate();
//         rotateClouds();
//         // progress();
    
//         removeLoading();
    
//         renderer.render(scene, camera);
    
//         // controls.update(); // remove when not using orbit controls
//     }
    
//     render();

// }