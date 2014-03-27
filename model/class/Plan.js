function Plan(data, offsetX, offsetZ) {

    if (typeof offsetX === 'undefined') offsetX = 0;
    if (typeof offsetZ === 'undefined') offsetZ = 0;


    this.data = data;
    this.offsetX = offsetX;
    this.offsetZ = offsetZ;
}

Plan.prototype.wallTypes = Array(
    "woodWall",
    "concreteWall",
    "glassWall"
);

Plan.prototype.floorTypes =Array(
    "site",
    "woodFloor",
    "concreteFloor"
);

Plan.prototype.create = function (entities) {
    var wall,floor;
    var offsetX = this.offsetX;
    var offsetZ = this.offsetZ;

    //TODO:add plane and grid

    //create walls;
    for(var i = 0;i<this.wallTypes.length;i++){

        this.data[this.wallTypes[i]].forEach(function(walls){

            //using "this" inside this function points the global "this"
            //not the one your thinking of.

            wall = new Wall(walls[0],walls[1],i);
            wall.create(entities,offsetX,offsetZ);
        });
    }

    var wallTypeLength = this.wallTypes.length;

    //create floors
    for(var i=0;i<this.floorTypes.length;i++){

        this.data[this.floorTypes[i]].forEach(function(floors){
            floor = new Floor(floors[0],floors[1],wallTypeLength+i);
            floor.create(entities,offsetX,offsetZ);
        });

    }


}
