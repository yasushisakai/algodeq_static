////////////////////////////////////////////////////////////////////////
// setupThreeJS
///////////////////////////////////////////////////////////////////////
function setupThreeJS() {

    scene = new THREE.Scene();
//    scene.fog = new THREE.FogExp2(0x9db3b5, 0.0004);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 50000);
    camera.position.y = 10000;
    camera.position.z = 10000;
    camera.rotation.x = -45 * Math.PI / 180;

    clock = new THREE.Clock();
    controls = new THREE.OrbitControls(camera);


    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    document.body.appendChild(renderer.domElement);

    projector = new THREE.Projector();
}


/////////////////////////////////////////////////////////////////////////////
// GEOMETRY
////////////////////////////////////////////////////////////////////////////
function setupWorld(modelData) {

    //FLOOR
    var geo = new THREE.PlaneGeometry(unitLength, unitLength, resolution, resolution);
    var mat = new THREE.MeshBasicMaterial({color: 0xffffff});
    mesh = new THREE.Mesh(geo, mat);
    mesh.material.side = THREE.DoubleSide;

    mesh.rotation.x = -90 * Math.PI / 180;
    mesh.receiveShadow = true;
    scene.add(mesh);


    //GRID
    var gridMat = new THREE.LineBasicMaterial({color: 0x000000});

    for (var i = 0; i < resolution; i++) {
        for (var j = 0; j < resolution; j++) {
            var lineGeom = new THREE.Geometry();
            lineGeom.vertices.push(new THREE.Vector3(i * unitSize - unitLength / 2.0, 10, -unitLength / 2.0));
            lineGeom.vertices.push(new THREE.Vector3(i * unitSize - unitLength / 2.0, 10, unitLength / 2.0));

            var line = new THREE.Line(lineGeom, gridMat);
            scene.add(line);

            lineGeom = new THREE.Geometry();
            lineGeom.vertices.push(new THREE.Vector3(-unitLength / 2.0, 10, j * unitSize - unitLength / 2.0));
            lineGeom.vertices.push(new THREE.Vector3(unitLength / 2.0, 10, j * unitSize - unitLength / 2.0));

            line = new THREE.Line(lineGeom, gridMat);
            scene.add(line);

        }
    }

    //MODEL
    modelData.forEach(function(md){

        createModel(md);

    });



    //LIGHT
    var light = new THREE.DirectionalLight(0xf9f1c2, 1);
    light.position.set(10000, 10000, 10000);
    light.castShadow = true;
    light.shadowMapWidth = 2048;
    light.shadowMapHeight = 2048;
    var d = 1000;
    light.shadowCameraLeft = d;
    light.shadowCameraRight = -d;
    light.shadowCameraTop = d;
    light.shadowCameraBottom = -d;
    light.shadowCameraFar = 40000;
    scene.add(light);

}

function createModel(geometryData) {


    var entities = new THREE.Geometry();

    var walls = geometryData["woodWall"];
    for (var i = 0; i < walls.length; i++) {
        THREE.GeometryUtils.merge(entities, addWall(walls[i][0], walls[i][1]), 0);
    }

    walls = geometryData["concreteWall"];
    for (var i = 0; i < walls.length; i++) {
        THREE.GeometryUtils.merge(entities, addWall(walls[i][0], walls[i][1]), 1);
    }

    walls = geometryData["glassWall"];
    for (var i = 0; i < walls.length; i++) {
        THREE.GeometryUtils.merge(entities, addWall(walls[i][0], walls[i][1]), 2);
    }

    var floors = geometryData["site"];
    for (var i = 0; i < floors.length; i++) {
        THREE.GeometryUtils.merge(entities, addFloor(floors[i][0], floors[i][1]), wallMaterials.length);
    }

    floors = geometryData["woodFloor"];
    for (var i = 0; i < floors.length; i++) {
        THREE.GeometryUtils.merge(entities, addFloor(floors[i][0], floors[i][1]), wallMaterials.length + 1);
    }
    floors = geometryData["concreteFloor"];
    for (var i = 0; i < floors.length; i++) {
        THREE.GeometryUtils.merge(entities, addFloor(floors[i][0], floors[i][1]), wallMaterials.length + 2);
    }

    var model = new THREE.Mesh(entities, new THREE.MeshFaceMaterial(wallMaterials.concat(floorMaterials)));
    scene.add(model);

}

//////////////////////////////////////////////////////////////////////////////////////////
// EVENTS
////////////////////////////////////////////////////////////////////////////////////////
function setupEvents() {
    renderer.domElement.addEventListener('mousemove', function (event) {

        event.preventDefault();

        var vector = new THREE.Vector3(
            renderer.devicePixelRatio * (event.pageX - this.offsetLeft) / this.width * 2 - 1,
            -renderer.devicePixelRatio * (event.pageY - this.offsetTop) / this.height * 2 + 1,
            0
        );

        projector.unprojectVector(vector, camera);

        var raycaster = new THREE.Raycaster(
            camera.position,
            vector.sub(camera.position).normalize()
        );

        var intersects = raycaster.intersectObject(mesh);
        if (intersects.length) {
            var vec = intersects[0].point;
            console.log(vec);
        } else {

        }
    });

    renderer.domElement.addEventListener('mousedown', function (event) {
        event.preventDefault();

    });

}
