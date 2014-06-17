function Ground(_size){

    if(typeof _size === 'undefined') this.size = unit_size*16.0;
    else this.size = _size;

    this.level=0;

    this.geometry = new THREE.CubeGeometry(this.size,unit_size,this.size);
    this.level_height_geom = new THREE.PlaneGeometry(this.size,this.size,2,2);

    console.log(path_to_static + 'img/make_grid.png');

}

Ground.material_types=[
    new THREE.MeshLambertMaterial({ambient:0xffffff, map: THREE.ImageUtils.loadTexture(path_to_static + 'img/make_grid.png')}),
    new THREE.MeshLambertMaterial({ambient:0xffffff, color:'0xffffff'}),
    new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture(path_to_static + 'img/make_grid.png'), transparent:true, opacity:0.8})
];

Ground.materials = new THREE.MeshFaceMaterial([
    Ground.material_types[1],
    Ground.material_types[1],
    Ground.material_types[0],  // top
    Ground.material_types[0],  // bottom
    Ground.material_types[1],
    Ground.material_types[1]
]);

Ground.prototype.create = function(){

    this.ground = new THREE.Mesh(this.geometry,Ground.materials);
    this.ground.position.y = -unit_size /2.0 +100;
    scene.add(this.ground);
    this.ground.name="ground"

    this.level_grid = new THREE.Mesh(this.level_height_geom,Ground.material_types[2]);
    scene.add(this.level_grid);
    this.level_grid.name = "grid";
    this.level_grid.rotation.x = -90 * Math.PI / 180;

}

Ground.prototype.get_level_height = function(){
    return this.level*unit_height;
}

Ground.prototype.move_level_grid= function (_level) {
    this.level = _level;
    this.level_grid.position = new THREE.Vector3(0.0,this.level*unit_height,0.0);
}
