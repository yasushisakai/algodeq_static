function Floor(XZIndex, YIndex, matId) {

    if (typeof matId === 'undefined') matId = 0;
    if (typeof XZIndex === 'undefined') XZIndex = 0;
    if (typeof YIndex === 'undefined') YIndex = 0;

    this.XZIndex = XZIndex;
    this.YIndex = YIndex;
    this.matId = matId;
}

Floor.materialList = [

    new THREE.MeshBasicMaterial({color: 0xFF0000, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color: 0x00FF00, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color: 0x0000FF, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color: 0xFF00FF, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color: 0xFFFF00, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color: 0x00FFFF, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.DoubleSide})

];

Floor.floorGeometry = new THREE.PlaneGeometry(unitSize, unitSize);

Floor.prototype.create = function (merger,offsetX, offsetZ) {

    if (typeof offsetX === 'undefined') offsetX = 0;
    if (typeof offsetZ === 'undefined') offsetZ = 0;

    var floor = new THREE.Mesh(Floor.floorGeometry.clone());
    floor.position.x = (this.XZIndex%resolution - resolution / 2.0 + 0.5) * unitSize + offsetX;
    floor.position.z = (Math.floor(this.XZIndex/resolution) - resolution / 2.0 + 0.5) * unitSize + offsetZ;
    floor.position.y = this.YIndex * unitHeight - 50;

    floor.rotation.x = -90 * Math.PI / 180;

    floor.recieveShadow = true;
    floor.castShadow = true;

    //return floor;

    THREE.GeometryUtils.merge(merger,floor,this.matId);

}