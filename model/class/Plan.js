function Plan(data, offsetX, offsetZ) {

    if (typeof offsetX === 'undefined') offsetX = 0;
    if (typeof offsetZ === 'undefined') offsetZ = 0;


    this.data = data;
    this.offsetX = offsetX;
    this.offsetZ = offsetZ;

    this.visible = true;

    this.walls = [];
    this.floors = [];
}

/////////////////////////////////////////
// class properties
////////////////////////////////////////

Plan.wallTypes = Array(
    "woodWall",
    "concreteWall",
    "glassWall"
);

Plan.floorTypes = Array(
    "site",
    "woodFloor",
    "concreteFloor"
);

Plan.gridMat = new THREE.LineBasicMaterial({color: 0x000000});
Plan.planeMat = new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide});

Plan.materialList = new THREE.MeshFaceMaterial([Plan.planeMat].concat(Wall.materialList.concat(Floor.materialList)));

Plan.planeGeometry = new THREE.PlaneGeometry(unitLength, unitLength, resolution, resolution);

////////////////////////////////////////////
// instance methods
///////////////////////////////////////////

Plan.prototype.create = function (entities) {
    var wall, floor;
    var offsetX = this.offsetX;
    var offsetZ = this.offsetZ;
    var walls=[],floors = [];

    //create walls;
    for (var i = 0; i < Plan.wallTypes.length; i++) {

        this.data[Plan.wallTypes[i]].forEach(function (wallsData) {

            //using "this" inside this function points the global "this"
            //not the one your thinking of.

            wall = new Wall(wallsData[0], wallsData[1], 1 + i);
            wall.create(entities, offsetX, offsetZ);
            walls.push(wall);
        });
    }

    var wallTypeLength = Wall.materialList.length;

    //create floors
    for (var i = 0; i < Plan.floorTypes.length; i++) {

        this.data[Plan.floorTypes[i]].forEach(function (floorsData) {
            floor = new Floor(floorsData[0], floorsData[1], 1 + wallTypeLength + i);
            floor.create(entities, offsetX, offsetZ);
            floors.push(floor);
        });

    }

    this.walls = walls;
    this.floors = floors;

}

Plan.prototype.createPlane = function (entities) {
    var geometry = new THREE.Mesh(Plan.planeGeometry.clone());

    geometry.position.x += this.offsetX;
    geometry.position.z += this.offsetZ;
    geometry.rotation.x = -90 * Math.PI / 180;

    geometry.recieveShadow = true;

    THREE.GeometryUtils.merge(entities, geometry);

}

Plan.prototype.createGrid = function () {

    for (var i = 0; i < resolution; i++) {
        for (var j = 0; j < resolution; j++) {

            var lineGeom = new THREE.Geometry();
            lineGeom.vertices.push(new THREE.Vector3(i * unitSize - unitLength / 2.0 + this.offsetX, 10, -unitLength / 2.0 + this.offsetZ));
            lineGeom.vertices.push(new THREE.Vector3(i * unitSize - unitLength / 2.0 + this.offsetX, 10, unitLength / 2.0 + this.offsetZ));

            var line = new THREE.Line(lineGeom, Plan.gridMat);
            scene.add(line);

            lineGeom = new THREE.Geometry();
            lineGeom.vertices.push(new THREE.Vector3(-unitLength / 2.0 + this.offsetX, 10, j * unitSize - unitLength / 2.0 + this.offsetZ));
            lineGeom.vertices.push(new THREE.Vector3(unitLength / 2.0 + this.offsetX, 10, j * unitSize - unitLength / 2.0 + this.offsetZ));

            line = new THREE.Line(lineGeom, Plan.gridMat);
            scene.add(line);

        }
    }
}

Plan.prototype.toggleVisible = function () {

    this.visible = !this.visible
    for (var i = 0; i < this.walls.length; i++) this.walls[i].toggleVisible();
    for (var i = 0; i < this.floors.length; i++) this.floors[i].toggleVisible();


}