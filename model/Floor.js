/////////////////////////////////
// FLOOR
////////////////////////////////


//materials for walls
//TODO: prettify the walls!!
var floorMaterials = [];

floorMaterials.push(new THREE.MeshBasicMaterial({color: 0x802A2A, side: THREE.DoubleSide}));
floorMaterials.push(new THREE.MeshBasicMaterial({color: 0xCCCCCC, side: THREE.DoubleSide}));
floorMaterials.push(new THREE.MeshBasicMaterial({color: 0x87CEEB, side: THREE.DoubleSide}));

//base geometries
function createFloorGeometry(_unitSize) {

    var floorGeometry = new THREE.PlaneGeometry(_unitSize, _unitSize);
    return floorGeometry;
}

var floorGeometry = createFloorGeometry(unitSize); //from Floor.js

function addFloor(_index, _hIndex) {
    var floor = new THREE.Mesh(floorGeometry.clone());
    floor.position.x = (_index%resolution - resolution / 2.0 + 0.5) * unitSize;
    floor.position.z = (Math.floor(_index/resolution) - resolution / 2.0 + 0.5) * unitSize;
    floor.position.y = _hIndex * unitHeight - 50;


    floor.rotation.x = -90 * Math.PI / 180;

    floor.recieveShadow = true;
    floor.castShadow = true;
    return floor;
}