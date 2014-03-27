/////////////////////////////////
// WALL
////////////////////////////////


//materials for walls
//TODO: prettify the walls!!
var wallMaterials = [];

wallMaterials.push(new THREE.MeshBasicMaterial({color: 0x802A2A, side: THREE.DoubleSide}));
wallMaterials.push(new THREE.MeshBasicMaterial({color: 0xCCCCCC, side: THREE.DoubleSide}));
wallMaterials.push(new THREE.MeshBasicMaterial({color: 0x87CEEB, side: THREE.DoubleSide}));

//base geometries
function createWallGeometry(_unitSize, _unitHeight,_offsetX,_offsetZ) {


    if(typeof _offsetX === 'undefined') _offsetX = 0;
    if(typeof _offsetZ === 'undefined') _offsetZ = 0;


    var wallGeometry = new THREE.Geometry();
    wallGeometry.vertices.push(new THREE.Vector3(_offsetX, 0, _offsetZ));
    wallGeometry.vertices.push(new THREE.Vector3(_offsetX+_unitSize, 0, _offsetZ));
    wallGeometry.vertices.push(new THREE.Vector3(_offsetX+_unitSize, _unitHeight, _offsetZ));
    wallGeometry.vertices.push(new THREE.Vector3(_offsetX, _unitHeight, _offsetZ));

    wallGeometry.faces.push(new THREE.Face3(0, 1, 2));
    wallGeometry.faces.push(new THREE.Face3(2, 3, 0));
    wallGeometry.computeBoundingSphere();

    return wallGeometry;
}

var wallGeometry = createWallGeometry(unitSize, unitHeight); //from Wall.js

function addWall(_xzindex, _yindex) {
    var wall = new THREE.Mesh(wallGeometry.clone());

//    if(_xzindex%2==0){
//        wall.rotation.y = 90 * Math.PI/180;
//    }

    if (_xzindex < (resolution * 2 + 1) * resolution) {

        var col = (_xzindex % (resolution * 2 + 1));
        var row = Math.floor(_xzindex / (resolution * 2 + 1));

        wall.position.x = (Math.floor(col / 2) - resolution / 2) * unitSize;
        wall.position.z = (row - resolution / 2) * unitSize;

        if (col % 2 == 0) {
            wall.rotation.y = -90 * Math.PI / 180;
        }
    }else{
        wall.position.x = (_xzindex-((resolution*2+1)*resolution)-resolution / 2) * unitSize;
        wall.position.z = (resolution/2)*unitSize;
    }

    wall.position.y = _yindex * unitHeight;

    wall.recieveShadow = true;
    wall.castShadow = true;

    return wall;
}