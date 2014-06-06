function Cube(_index,_room_index) {

    if (typeof _index === 'undefined') this.index = [0, 0, 0];
    else this.index = _index;

    if (typeof _room_index === 'undefined') this.room_index = 0;
    else this.room_index = _room_index;

}


Cube.geometry = new THREE.CubeGeometry(unit_size, unit_height, unit_size);


Cube.material_types = [
    new THREE.MeshLambertMaterial({ambient: 0xffffff, color: 0xff0000, transparent: true, opacity: 0.5}),  // 1.Living
    new THREE.MeshLambertMaterial({ambient: 0xffffff, color: 0x00ff00, transparent: true, opacity: 0.5}),  // 2.Dinning
    new THREE.MeshLambertMaterial({ambient: 0xffffff, color: 0x0000ff, transparent: true, opacity: 0.5}),  // 3.Kitchen
    new THREE.MeshLambertMaterial({ambient: 0xffffff, color: 0xffff00, transparent: true, opacity: 0.5}),  // 4.Bedroom
    new THREE.MeshLambertMaterial({ambient: 0xffffff, color: 0xff00ff, transparent: true, opacity: 0.5}),  // 5.wc/bath
    new THREE.MeshLambertMaterial({ambient: 0xffffff, color: 0x00ffff, transparent: true, opacity: 0.5})  // 6.staircase
];

Cube.remove_cube = function (_index) {

    // todo: delete the cube from scene
    var obj_name = "cube[" + _index[0] + "," + _index[1] + "," + _index[2] + "]";
    var object = scene.getObjectByName(obj_name);
    console.log(obj_name);
    scene.remove(object);

}


Cube.prototype.create = function (){
    // adds a cube to the scene
    this.mesh = new THREE.Mesh(Cube.geometry, Cube.material_types[this.room_index]);
    scene.add(this.mesh);

    this.update_pos();
    this.mesh.name = "cube[" + this.index[0] + "," + this.index[1] + "," + this.index[2] + "]";

}


Cube.prototype.index_from_pos = function (_vector) {
    // updates its index and moves the Cube to designated place

    this.index = [
        Math.floor(_vector.x / unit_size),
        this.index[1],
        Math.floor(_vector.z / unit_size)
    ]
}


Cube.prototype.update_pos = function () {

    this.mesh.position = new THREE.Vector3(
            (this.index[0] + 0.5) * unit_size,
            (this.index[1] + 0.5) * unit_height,
            (this.index[2] + 0.5) * unit_size);

    // adds a room to the plan(class: Plan)

}


Cube.prototype.change_floor = function (_num) {
    this.index[1] = _num;
}


Cube.prototype.check_position = function (_point) {
    // is the point inside the boundary(x,z)
    // boundary will be +- unit_length/2.0
    if ((_point.x < -unit_length / 2.0) || (_point.x > unit_length / 2.0)) {
        this.is_valid = false;
        return false;
    }

    else if ((_point.z < -unit_length / 2.0) || (_point.z > unit_length / 2.0)) {
        this.is_valid = false;
        return false;
    }

    //is the point near enough to the floor height
    else if (Math.abs((this.index[1]) * unit_height - _point.y) > 1) {
        this.is_valid = false;
        return false;
    }

    else {
        this.is_valid = true;
        return true;
    }

}


Cube.prototype.get_index = function () {
    return this.index;
}


Cube.prototype.set_index = function (_index) {
    this.index = _index;
}