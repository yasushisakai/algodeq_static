function Wall(XZIndex, YIndex, matId) {


    if (typeof XZIndex === 'undefined') XZIndex = 0;
    if (typeof YIndex === 'undefined') YIndex = 0;
    if (typeof matId === 'undefined') matId = 0;

    this.XZIndex = XZIndex;
    this.YIndex = YIndex;
    this.matId = matId;

}

Wall.materialList = [

    new THREE.MeshBasicMaterial({color: 0xFF0000, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color: 0x00FF00, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color: 0x0000FF, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color: 0xFF00FF, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color: 0xFFFF00, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color: 0x00FFFF, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.DoubleSide})

];

var wallGeometry = new THREE.Geometry();

wallGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
wallGeometry.vertices.push(new THREE.Vector3(unitSize, 0, 0));
wallGeometry.vertices.push(new THREE.Vector3(unitSize, unitHeight, 0));
wallGeometry.vertices.push(new THREE.Vector3(0, unitHeight, 0));

wallGeometry.faces.push(new THREE.Face3(0, 1, 2));
wallGeometry.faces.push(new THREE.Face3(2, 3, 0));
wallGeometry.computeBoundingSphere();

Wall.wallGeometry = wallGeometry;

Wall.prototype.create = function (merger, offsetX, offsetZ) {

    if (typeof offsetX === 'undefined') offsetX = 0;
    if (typeof offsetZ === 'undefined') offsetZ = 0;

    var wall = new THREE.Mesh(Wall.wallGeometry.clone());

    if (this.XZIndex < (resolution * 2 + 1) * resolution) {

        var col = (this.XZIndex % (resolution * 2 + 1));
        var row = Math.floor(this.XZIndex / (resolution * 2 + 1));

        wall.position.x = (Math.floor(col / 2) - resolution / 2) * unitSize + offsetX;
        wall.position.z = (row - resolution / 2) * unitSize + offsetZ;

        if (col % 2 == 0) {
            wall.rotation.y = -90 * Math.PI / 180;
        }
    } else {
        wall.position.x = (this.XZIndex - ((resolution * 2 + 1) * resolution) - resolution / 2) * unitSize + offsetX;
        wall.position.z = (resolution / 2) * unitSize + offsetZ;
    }

    wall.position.y = this.YIndex * unitHeight;

    wall.recieveShadow = true;
    wall.castShadow = true;

    //return wall;

    THREE.GeometryUtils.merge(merger, wall, this.matId);

}