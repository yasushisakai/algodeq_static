function Ground(_size){

    if(typeof _size === 'undefined') this.size = 10000.0;
    else this.size = _size;

    this.material = new THREE.MeshBasicMaterial({color: 0xdddddd});

}

Ground.prototype.create = function(){
    var geo = new THREE.CubeGeometry(this.size,20,this.size);
    var mesh = new THREE.Mesh(geo,this.material);
    scene.add(mesh);
}
