function Floor(_index, _type) {
    this.index = _index;

    if (typeof _type === 'undefined') {
        this.type = "living";
    } else {
        this.type = _type;
    }

}

Floor.thickness = 300;

Floor.texture = {
    "living": new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-13.png"),
    "dining": new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-14.png"),
    "kitchen": new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-15.png"),
    "staircase": new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-16.png"),
    "wc": new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-17.png"),
    "bedroom": new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-18.png"),
    "grass": new THREE.ImageUtils.loadTexture(path_to_static + "img/sitetop.png")
}


Floor.geometry = function () {
    return new THREE.BoxGeometry(unit_size-5, Floor.thickness,unit_size-5);
}

Floor.prototype.create = function () {
    var mat = [
        new THREE.MeshLambertMaterial({ambient: 0xffffff, map: Floor.texture[this.type]}),
        new THREE.MeshLambertMaterial({ambient: 0xffffff, color: '0xffffff'})
    ]

    var face_mats= new THREE.MeshFaceMaterial([
        mat[1],mat[1],mat[0],mat[0],mat[1],mat[1]
    ]);

    this.mesh = new THREE.Mesh(Floor.geometry(),face_mats);
    this.mesh.position.y = -1*Floor.thickness/2.0;
    scene.add(this.mesh);
    this.mesh.name = "floor"+this.index.toString();

    this.mesh.position = new THREE.Vector3(

        (this.index[0]+0.5)*unit_size,
        (this.index[1])*unit_height,
        (this.index[2]+0.5)*unit_size

    );



}
