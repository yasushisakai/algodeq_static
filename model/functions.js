function addModel(_geometryData, _offsetX, _offsetZ) {
    var entities = new THREE.Geometry();

    var walls = _geometryData["woodWall"];
    for (var i = 0; i < walls.length; i++) {
        THREE.GeometryUtils.merge(entities, addWall(walls[i][0], walls[i][1]), 0);
    }

    walls = _geometryData["concreteWall"];
    for (var i = 0; i < walls.length; i++) {
        THREE.GeometryUtils.merge(entities, addWall(walls[i][0], walls[i][1]), 1);
    }

    walls = _geometryData["glassWall"];
    for (var i = 0; i < walls.length; i++) {
        THREE.GeometryUtils.merge(entities, addWall(walls[i][0], walls[i][1]), 2);
    }

    var floors = _geometryData["site"];
    for (var i = 0; i < floors.length; i++) {
        THREE.GeometryUtils.merge(entities, addFloor(floors[i][0], floors[i][1]), wallMaterials.length);
    }

    floors = _geometryData["woodFloor"];
    for (var i = 0; i < floors.length; i++) {
        THREE.GeometryUtils.merge(entities, addFloor(floors[i][0], floors[i][1]), wallMaterials.length + 1);
    }
    floors = _geometryData["concreteFloor"];
    for (var i = 0; i < floors.length; i++) {
        THREE.GeometryUtils.merge(entities, addFloor(floors[i][0], floors[i][1]), wallMaterials.length + 2);
    }

    entities.position.x += _offsetX;
    entities.position.z += _offsetZ;

    var model = new THREE.Mesh(entities, new THREE.MeshFaceMaterial(wallMaterials.concat(floorMaterials)));
    scene.add(model);;
}