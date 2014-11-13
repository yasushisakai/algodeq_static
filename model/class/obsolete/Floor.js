function Floor(XZIndex, YIndex, matId) {

    if (typeof matId === 'undefined') matId = 0;
    if (typeof XZIndex === 'undefined') XZIndex = 0;
    if (typeof YIndex === 'undefined') YIndex = 0;

    this.XZIndex = XZIndex;
    this.YIndex = YIndex;

    this.matId = matId;

//    this.matId = []
//    for(var i=0;i<6;i++){
//            this.matId.push(matId);
//    }

    this.geometry = null;
    this.visible = true;
}

    Floor.materialTypes = [

        new THREE.MeshLambertMaterial({ambient: 0xffffff, map: THREE.ImageUtils.loadTexture("../static/img/siteTop.png")}),
        new THREE.MeshLambertMaterial({ambient: 0xffffff, map: THREE.ImageUtils.loadTexture("../static/img/woodTop.png")}),
        new THREE.MeshLambertMaterial({ambient: 0xffffff, map: THREE.ImageUtils.loadTexture("../static/img/rcTop.png")}),
        new THREE.MeshBasicMaterial({color: 0xFF00FF}),
        new THREE.MeshBasicMaterial({color: 0xFFFF00}),
        new THREE.MeshBasicMaterial({color: 0x00FFFF}),
        new THREE.MeshBasicMaterial({color: 0xFFFFFF}),
        new THREE.MeshBasicMaterial({color: 0x000000})

    ];

Floor.materialList=[];
for(var i=0;i<Floor.materialTypes.length;i++){
    for(var j=0;j<6;j++) Floor.materialList.push(Floor.materialTypes[i]);
}

//Floor.floorGeometry = new THREE.PlaneGeometry(unitSize, unitSize);
Floor.floorGeometry = new THREE.CubeGeometry(unitSize,unitSize,150);


Floor.prototype.create = function (merger,offsetX, offsetZ) {

    if (typeof offsetX === 'undefined') offsetX = 0;
    if (typeof offsetZ === 'undefined') offsetZ = 0;

    var floor = new THREE.Mesh(Floor.floorGeometry.clone());
    floor.position.x = (this.XZIndex%resolution - resolution / 2.0 + 0.5) * unitSize + offsetX;
    floor.position.z = (Math.floor(this.XZIndex/resolution) - resolution / 2.0 + 0.5) * unitSize + offsetZ;
    floor.position.y = this.YIndex * unitHeight;

    floor.rotation.x = -90 * Math.PI / 180;

    //floor.castShadow = true;

    //return floor;
    this.geometry = floor;



    THREE.GeometryUtils.merge(merger,floor,this.matId);
}

Floor.prototype.toggleVisible = function(){

    if(this.geometry == null) return;

    this.geometry.visible = !this.geometry.visible;

    this.visible = !this.visible;

}