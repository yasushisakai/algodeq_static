function Wall(_index, _flip, _type_A, _type_B) {
    // this class needs to generate every possible variation of textures

    if (typeof  _type_A === 'undefined') this.type_A = "living";
    else this.type_A = _type_A;

    if (typeof  _type_B === 'undefined') this.type_B = this.type_A;
    else this.type_B = _type_B;

    if (typeof  _flip === 'undefined') this.flip = false;
    else this.flip = _flip;

    this.index = _index;

}

Wall.textures = {
    "living": {
        inside: new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-01.png"),
        outside: new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-02.png"),
        inside_inside: new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-19.png")
    },
    "dining": {
        inside: new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-03.png"),
        outside: new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-04.png"),
        inside_inside: new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-20.png")

    },
    "kitchen": {
        inside: new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-05.png"),
        outside: new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-06.png"),
        inside_inside: new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-21.png")

    },
    "staircase": {
        inside: new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-07.png"),
        outside: new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-08.png"),
        inside_inside: new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-22.png")

    },
    "wc": {
        inside: new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-09.png"),
        outside: new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-10.png"),
        inside_inside: new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-23.png")

    },
    "bedroom": {
        inside: new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-11.png"),
        outside: new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-12.png"),
        inside_inside: new THREE.ImageUtils.loadTexture(path_to_static + "img/textures-24.png")

    }
};

//Wall.geometry = function () {
//
//    var wall_geometry = new THREE.Geometry();
//    var wall_single_side = new THREE.PlaneGeometry(unit_size, unit_height);
//    THREE.GeometryUtils.merge(wall_geometry, wall_single_side, 0);
//    var new_single_side =  new THREE.PlaneGeometry(unit_size, unit_height);
//    new_single_side.position = new THREE.Vector3(0,-10,10);
//    THREE.GeometryUtils.merge(wall_geometry, new_single_side, 1);
////    THREE.GeometryUtils.merge(wall_geometry, wall_single_side.clone(), 1);
//
//    return wall_geometry;
//
//}

Wall.geometry = function(){

    return new THREE.BoxGeometry(unit_size,unit_height,20);

}


Wall.prototype.create = function (_rotate) {

    var materials;

    if (this.type_A == this.type_B) {
        if (!this.flip) {

            materials = [
                new THREE.MeshLambertMaterial({map: Wall.textures[this.type_A].inside, transparent:true,side: THREE.FrontSide}),
                new THREE.MeshLambertMaterial({map: Wall.textures[this.type_A].outside, transparent:true,side: THREE.FrontSide})
            ]
        } else {
            materials = [
                new THREE.MeshLambertMaterial({map: Wall.textures[this.type_A].inside, transparent:true,side: THREE.FrontSide}),
                new THREE.MeshLambertMaterial({map: Wall.textures[this.type_A].outside, transparent:true,side: THREE.FrontSide})
            ]
        }
    } else {
        if (!this.flip) {
            materials = [
                new THREE.MeshLambertMaterial({map: Wall.textures[this.type_A].inside_inside, transparent:true,side: THREE.FrontSide}),
                new THREE.MeshLambertMaterial({map: Wall.textures[this.type_B].inside_inside, transparent:true,side: THREE.FrontSide})
            ]
        } else {
            materials = [
                new THREE.MeshLambertMaterial({map: Wall.textures[this.type_A].inside_inside, transparent:true,side: THREE.FrontSide}),
                new THREE.MeshLambertMaterial({map: Wall.textures[this.type_B].inside_inside, transparent:true,side: THREE.FrontSide})
            ]
        }
    }
    materials.push(new THREE.MeshLambertMaterial({color:'0xffffff'}));

    if(this.flip) {
        this.mesh = new THREE.Mesh(Wall.geometry(), new THREE.MeshFaceMaterial([
            materials[1],
            materials[0],
            materials[2],
            materials[2],
            materials[0],
            materials[1]
        ]));
    }else {
        this.mesh = new THREE.Mesh(Wall.geometry(), new THREE.MeshFaceMaterial([
            materials[0],
            materials[1],
            materials[2],
            materials[2],
            materials[1],
            materials[0]
        ]));
    }
    this.receiveShadow=true;
    this.castShadow = true;
    scene.add(this.mesh);


    this.mesh.rotation.y = -90 * Math.PI / 180;

    if (_rotate) {
        this.mesh.rotation.y = 180 * Math.PI / 180;
    }

    if (!_rotate) {
        this.mesh.position = new THREE.Vector3(
                (this.index[0] + 1) * unit_size,
                (this.index[1] + 0.5) * unit_height,
                (this.index[2] + 0.5) * unit_size);
    } else {
        this.mesh.position = new THREE.Vector3(
                (this.index[0] + 0.5) * unit_size,
                (this.index[1] + 0.5) * unit_height,
                (this.index[2] + 1) * unit_size);
    }

    //shadowing
    this.mesh.traverse(function (object) {
        object.castShadow=true;
        object.receiveShadow=true;
    });

    return this.mesh

}