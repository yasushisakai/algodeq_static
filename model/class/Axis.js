function Axis(length, thickness) {

    if (typeof thickness === 'undefined') this.thickness = 1;

    this.origin = new THREE.Vector3(0, 0, 0);

    this.X = new THREE.Vector3(length, 0, 0);
    this.Y = new THREE.Vector3(0, length, 0);
    this.Z = new THREE.Vector3(0, 0, length);

    this.materialList = [
        new THREE.LineBasicMaterial({color: 0xFF0000, linewidth: this.thickness}),
        new THREE.LineBasicMaterial({color: 0x00FF00, linewidth: this.thickness}),
        new THREE.LineBasicMaterial({color: 0x0000FF, linewidth: this.thickness})
    ];

}


Axis.prototype.create = function () {

    var geo = new THREE.Geometry();
    geo.vertices.push(this.origin);
    geo.vertices.push(this.X);

    var line = new THREE.Line(geo, this.materialList[0]);
    scene.add(line);

    geo = new THREE.Geometry();
    geo.vertices.push(this.origin);
    geo.vertices.push(this.Y);
    line = new THREE.Line(geo, this.materialList[1]);
    scene.add(line);

    geo = new THREE.Geometry();
    geo.vertices.push(this.origin);
    geo.vertices.push(this.Z);
    line = new THREE.Line(geo, this.materialList[2]);
    scene.add(line);

}