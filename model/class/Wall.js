function Wall(_index, _type, _flip) {

    if (typeof  _type === 'undefined') this.type = "living";
    else this.type = _type;
    if (typeof  _flip === 'undefined') this.flip = false;
    else this.flip = _flip;

    this.index = _index;

}

Wall.textures = {
    "living": {
        inside: new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-01.png"),
        outside: new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-02.png")
    },
    "dining": {
        inside: new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-03.png"),
        outside: new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-04.png")
    },
    "kitchen": {
        inside: new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-05.png"),
        outside: new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-06.png")
    },
    "staircase": {
        inside: new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-07.png"),
        outside: new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-08.png")
    },
    "wc_bath": {
        inside: new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-09.png"),
        outside: new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-10.png")
    },
    "bedroom": {
        inside: new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-11.png"),
        outside: new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-12.png")
    }
};

Wall.geometry = function () {

    var wall_geometry = new THREE.Geometry();
    var wall_single_side = new THREE.PlaneGeometry(unit_size, unit_height);
    THREE.GeometryUtils.merge(wall_geometry, wall_single_side, 0);
    THREE.GeometryUtils.merge(wall_geometry, wall_single_side.clone(), 1);

    return wall_geometry;

}

Wall.prototype.create = function (_flag) {

    var materials;

    if (!this.flip) {
        materials = [
            new THREE.MeshLambertMaterial({map: Wall.textures[this.type].inside, side: THREE.BackSide}),
            new THREE.MeshLambertMaterial({map: Wall.textures[this.type].outside, side: THREE.FrontSide})
        ]
    } else {
        materials = [
            new THREE.MeshLambertMaterial({map: Wall.textures[this.type].inside, side: THREE.FrontSide}),
            new THREE.MeshLambertMaterial({map: Wall.textures[this.type].outside, side: THREE.BackSide})
        ]
    }

    this.mesh = new THREE.Mesh(Wall.geometry(), new THREE.MeshFaceMaterial(materials));
    scene.add(this.mesh);
    this.mesh.rotation.y = -90 * Math.PI / 180;
    if(_flag){
        this.mesh.rotation.y = 180 * Math.PI / 180;
    }

    if(!_flag) {
        this.mesh.position = new THREE.Vector3(
                (this.index[0] + 1) * unit_size,
                (this.index[1] + 0.5) * unit_height,
                (this.index[2] + 0.5) * unit_size);
    }else{
        this.mesh.position = new THREE.Vector3(
                (this.index[0] + 0.5) * unit_size,
                (this.index[1] + 0.5) * unit_height,
                (this.index[2] + 1) * unit_size);
    }

}