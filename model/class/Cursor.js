function Cursor() {
    this.index =[0,0,0]; // index of Cursor
    this.is_valid = false;
}

Cursor.geometry = new THREE.CubeGeometry(unit_size*1.2, unit_height*1.2, unit_size*1.2);


Cursor.material_types = [
    new THREE.MeshBasicMaterial({transparent:true, opacity:0.7, color: 0xffffff})
];


Cursor.prototype.create = function () {
    this.mesh = new THREE.Mesh(Cursor.geometry, Cursor.material_types[0]);
    //this.mesh.rotation.x = -90 * Math.PI / 180;
    scene.add(this.mesh);
    this.mesh.position = new THREE.Vector3(0,-10000000000000,0);
}


Cursor.prototype.index_from_pos = function (_vector) {
    // updates its index and moves the cursor to designated place

    this.index = [
        Math.floor(_vector.x/unit_size),
        Math.floor(_vector.y/unit_height),
        Math.floor(_vector.z/unit_size)
    ]

}


Cursor.prototype.update_pos = function(){

    this.mesh.position = new THREE.Vector3(
            (this.index[0]+0.5)*unit_size,
            (this.index[1]+0.5)*unit_height,
            (this.index[2]+0.5)*unit_size);

}


Cursor.prototype.change_floor = function (_num) {
    this.index[1] = _num;
}


Cursor.prototype.check_position = function (_point) {
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
    else if (Math.abs((this.index[1])*unit_height - _point.y)>1){
        this.is_valid = false;
        return false;
    }

    else {
        this.is_valid = true;
        return true;
    }

}


Cursor.prototype.get_index = function(){
    return this.index;
}


Cursor.prototype.set_index = function(_index){
    this.index = _index;
}