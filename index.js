let threeDDiv = document.querySelector("#three");

async function threeD() {

            

    let dimensions = {
        width: window.innerWidth*2/3,
        height: window.innerHeight
    };


    threeDDiv.setAttribute("style", "width :" + dimensions.width + "px; height :" + dimensions.height + "px");

    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0xFFFFFF);

    const camera = new THREE.PerspectiveCamera(10, dimensions.width/dimensions.height, 1, 10000);

    const renderer = new THREE.WebGLRenderer({antialias : true});

    renderer.setSize(dimensions.width, dimensions.height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;

    threeDDiv.appendChild(renderer.domElement);

    let ambientLight = new THREE.AmbientLight(0x666666, 1);

    scene.add(ambientLight);

    var light;

    light = new THREE.DirectionalLight(0xdfebff, 1.75);
    light.position.set(0, 500, 0);
    light.position.multiplyScalar(1.3);

    light.castShadow = true;

    light.shadow.mapSize.width = 5000;
    light.shadow.mapSize.height = 5000;

    light.shadow.radius = 800;

    var d = 100;

    light.shadow.camera.left = -d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = -d;

    light.shadow.camera.far = 1000;
    light.shadowDarkness = 0.75;

    scene.add(light);

    // light3 directional

    var light3;

    light3 = new THREE.DirectionalLight(0xdfebff, 1.75);
    light3.position.set(100, 100, 100);
    light3.position.multiplyScalar(1.3);

    light3.castShadow = true;

    light3.shadow.mapSize.width = 5000;
    light3.shadow.mapSize.height = 5000;

    light3.shadow.radius = 200;

    var d3 = 100;

    light3.shadow.camera.left = -d3;
    light3.shadow.camera.right = d3;
    light3.shadow.camera.top = d3;
    light3.shadow.camera.bottom = -d3;

    light3.shadow.camera.far = 1000;
    light3.shadowDarkness = 0.75;

    //scene.add(light3);

    // light 2

    const light2 = new THREE.PointLight( 0xffff00, 3, 10000 );
    light2.position.set( 60, 50, 35 );
    light2.castShadow = true;

    scene.add(light2)

// light helper
const pointLightHelper = new THREE.PointLightHelper( light2, 10 );
scene.add( pointLightHelper )


    camera.position.set(-dimensions.height/1.5,dimensions.height/5,dimensions.height*1.7);

    // orbit controls

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed *= -1;

    controls.addEventListener('start', function(){
        controls.autoRotate = false;
      });



    var material3D = new THREE.MeshLambertMaterial({
        color: 0xacacac

    });

    var materialPlane = new THREE.MeshPhongMaterial({
        color: 0xffffff
    });


    let plane = new THREE.Mesh(new THREE.PlaneGeometry(5000, 5000), materialPlane);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -85;
    plane.receiveShadow = true;
    plane.castShadow = true;

    scene.add(plane);


    // add gltf

            function loadGLTF(GLTFName) {
    
                    var loader = new THREE.GLTFLoader();
    
                    loader.load(GLTFName, function(gltf) {
            
                        loadedGLTF = gltf.scene;
                        scene.add(loadedGLTF);
    
                        //gltf material
            
                        gltf.scene.traverse((o) => {
                            if(o.isMesh) o.material = material3D;
                            if( o.material ) {
                                o.material.side = THREE.DoubleSide;
                            }
                        })

                        gltf.scene.traverse(function (child) {
                            if (child.isMesh) {
                              child.castShadow = true;
                              child.receiveShadow = true;
                            }
                         });
    
                        init();
            
                    }, undefined, function(error) {
                        console.log(error);
                    })
                    
            }
    
            function init() {
                loadedGLTF.scale.x = 20;
                loadedGLTF.scale.y = 20;
                loadedGLTF.scale.z = 20;
    
                // loadedGLTF.rotation.y = Math.PI / 14;
    
                // loadedGLTF.position.x = -42.05;
                loadedGLTF.position.y = -65;
                // loadedGLTF.position.z = 23.2;
            }

            loadGLTF("assets/3d.glb");



            var materialLights = new THREE.MeshBasicMaterial({
                color: 0xffffff
            });


                // add gltf lights

                function loadGLTFLights(GLTFName) {
    
                    var loader = new THREE.GLTFLoader();
    
                    loader.load(GLTFName, function(gltf) {
            
                        loadedGLTF = gltf.scene;
                        scene.add(loadedGLTF);
    
                        //gltf material
            
                        gltf.scene.traverse((o) => {
                            if(o.isMesh) o.material = materialLights;
                            if( o.material ) {
                                o.material.side = THREE.DoubleSide;
                            }
                        })

                        gltf.scene.traverse(function (child) {
                            if (child.isMesh) {
                              child.castShadow = true;
                              child.receiveShadow = true;
                            }
                         });
    
                        init();
            
                    }, undefined, function(error) {
                        console.log(error);
                    })
                    
            }
    
            function init() {
                loadedGLTF.scale.x = 20;
                loadedGLTF.scale.y = 20;
                loadedGLTF.scale.z = 20;
    
                // loadedGLTF.rotation.y = Math.PI / 14;
    
                // loadedGLTF.position.x = -42.05;
                loadedGLTF.position.y = -65;
                // loadedGLTF.position.z = 23.2;
            }

            // loadGLTFLights("assets/3dlights.glb");


    const size = 500;
    const divisions = 25;

    const gridHelper = new THREE.GridHelper( size, divisions );
    scene.add( gridHelper );

    // animate function

    function animate() {

        requestAnimationFrame(animate);
        renderer.render(scene , camera);

        controls.update();

    }

    animate();

}

threeD();



