function Plan(_room_data) {

    this.max_height = 0;

    if (typeof _room_data === 'undefined') {

        this.room_data = {
            "living": [],
            "dining": [],
            "kitchen": [],
            "bedroom": [],
            "wc": [],
            "staircase": []
        };

        this.entities = new THREE.Geometry();
    }

    else {
        console.log(typeof _room_data);
        if (typeof _room_data === 'object') {
            this.room_data = _room_data;
        } else {
            this.room_data = JSON.parse(_room_data);
        }
        this.max_height = this.get_max_height();

    }

    this.entities = [];

}


Plan.room_index = 0;

Plan.room_type = ["living", "dining", "kitchen", "bedroom", "wc", "staircase", "nothing"];

Plan.room_cost = {"living": 15, "dining": 15, "kitchen": 20, "bedroom": 15, "wc": 20, "staircase": 25}; // the cost for unit_size^2;

Plan.format_geometry = function (_geometry_data) {
    // returns formatted geometry data for diff comparison.

    var index = 0;
    var format_geom = "";
    for (var rooms in _geometry_data) {
        if (_geometry_data[rooms].length != 0) {
            format_geom += index + ", ";
            for (var i = 0; i < _geometry_data[rooms].length; i++) {
                var ind = _geometry_data[rooms][i];
                format_geom += ind[0] + "" + ind[1] + "" + ind[2] + " ";
            }
        }
    }

    return format_geom;
};


Plan.prototype.check_room_duplicates = function (_index) {
    for (var rooms in this.room_data) {
        for (var i = 0; i < this.room_data[rooms].length; i++) {
            if (this.room_data[rooms][i].toString() == _index.toString()) {
                return false;  // there is a duplicate!
            }
        }
    }

    return true;  // there is no duplicate;
};


Plan.prototype.compare_with = function (_geometry_data) {
    //compare with the other geometry
    var format_me = Plan.format_geometry(this.room_data);
    var format_you = Plan.format_geometry(_geometry_data);

    var diff = new diff_match_patch();  // :)
    var result = diff.diff_main(format_me, format_you, false);

    var all_char = 0;
    var same_char = 0;
    for (var i = 0; i < result.length; i++) {
        all_char += result[i][1].length;
        if (result[i][0] == 0) {
            same_char += result[i][1].length;
        }
    }

    var ratio = same_char / all_char;
    if (ratio < 0.01) ratio = 0.01;

    return ratio;
};


Plan.prototype.add_room = function (_index) {

    if (this.max_height < _index[1]) {
        this.max_height = _index[1];
    }

    this.room_data[Plan.room_type[Plan.room_index]].push(_index);
    this.sort_rooms();

    var cube = new Cube(cursor.get_index(), Plan.room_index);
    cube.create();

};


Plan.prototype.sort_rooms = function () {

    for (var rooms in this.room_data) {
        if (this.room_data[rooms].length == 0) continue;
        this.room_data[rooms].sort();

    }
};


Plan.prototype.remove_room = function (_index) {


    var flag = true;
    for (var rooms in this.room_data) {
        for (var i = 0; i < this.room_data[rooms].length; i++) {
            if (this.room_data[rooms][i].toString() == _index.toString()) {
                this.room_data[rooms].splice(i, 1);
                flag = false;
                break;
            }
            if (!flag) break;
        }
    }


    this.max_height = this.get_max_height();

    Cube.remove_cube(_index);  // removes the cube

};


Plan.prototype.search_for = function (_index) {

    for (var rooms in this.room_data) {
        for (var i = 0; i < this.room_data[rooms].length; i++) {
            if (this.room_data[rooms][i].toString() == _index) return rooms;
        }
    }

    return "nothing";

};

Plan.prototype.get_max_height = function () {

    var is_3f = false;
    for (var rooms in this.room_data) {
        for (var i = 0; i < this.room_data[rooms].length; i++) {
            if (this.max_height < this.room_data[rooms][i][1]) {
                this.max_height = this.room_data[rooms][i][1];
                if (this.max_height == 2) {
                    is_3f = true;
                    break;
                }
            }
        }
        if (is_3f) break;
    }

    return this.max_height;

}

Plan.prototype.get_cost = function () {
    var cost = 0;


    for (var rooms in this.room_data) {

        cost += this.room_data[rooms].length * Plan.room_cost[rooms];
    }

    console.log(this.max_height);

    if (this.max_height == 0) {
        return cost;
    } else if (this.max_height == 1) {
        return cost * 1.2;
    } else {
        return cost * 2.0;
    }


};


Plan.prototype.room_matrix = function () {

    var room_matrix = [];

    for (var floor = 0; floor < 3; floor++) {
        var index_floor = []
        for (var z = resolution / 2 * -1; z < resolution / 2; z++) {
            var index = [];
            for (var x = resolution / 2 * -1; x < resolution / 2; x++) {
                index.push(this.search_for([x, floor, z]));
            }
            index_floor.push(index);
        }
        room_matrix.push(index_floor);
    }

    return room_matrix;

};


Plan.prototype.create = function () {
    // simple view for version - used for make view.

    var room_index = 0;

    for (var rooms in this.room_data) {
        for (var i = 0; i < this.room_data[rooms].length; i++) {
            var cube = new Cube(this.room_data[rooms][i], room_index);
            cube.create();
        }
        room_index++;
    }

    this.sort_rooms();

};


Plan.prototype.create_walls_floors = function () {
    // the realistic version - will be used for finalize version for showing
    // todo:maybe optimizing the meshes for accumilated viewing??

    var room_matrix = this.room_matrix();

    var wall;

    for (var floor = 0; floor < 3; floor++) {
        for (var z = 0; z < resolution; z++) {
            for (var x = 0; x < resolution; x++) {


                //west edge (x==0 index:-7)
                if (x == 0) {
                    if (room_matrix[floor][z][x] != "nothing") {
                        console.log(room_matrix[floor][z][x]);
                        wall = new Wall([-7, floor, z - 6], true, room_matrix[floor][z][x]);
                        this.entities.push(wall.create(false));
                    }
                }

                // typical cases the middle places
                if (x < (resolution - 1)) {

                    if (room_matrix[floor][z][x] != room_matrix[floor][z][x + 1]) {  // detects weather the two room types are different
                        if (room_matrix[floor][z][x] != "nothing") {
                            if (room_matrix[floor][z][x + 1] == "nothing") wall = new Wall([x - 6, floor, z - 6], false, room_matrix[floor][z][x]);
                            else wall = new Wall([x - 6, floor, z - 6], true, room_matrix[floor][z][x], room_matrix[floor][z][x + 1]);
                        } else {
                            wall = new Wall([x - 6, floor, z - 6], true, room_matrix[floor][z][x + 1]);
                        }
                        this.entities.push(wall.create(false));
                    }
                }

                //east edge (x==11 index:5)
                if (x == 11) {
                    if (room_matrix[floor][z][x] != "nothing") {
                        wall = new Wall([5, floor, z - 6], false, room_matrix[floor][z][x]);
                        this.entities.push(wall.create(false));
                    }
                }


                //north edge (z==0 index:-7)
                if (z == 0) {
                    if (room_matrix[floor][z][x] != "nothing") {
                        wall = new Wall([x - 6, floor, -7], true, room_matrix[floor][z][x]);
                        this.entities.push(wall.create(true));
                    }
                }


                // this is for z line
                if ((z < resolution - 1)) {
                    if (room_matrix[floor][z][x] != room_matrix[floor][z + 1][x]) {
                        if (room_matrix[floor][z][x] != "nothing") {
                            if (room_matrix[floor][z + 1][x] == "nothing")  wall = new Wall([x - 6, floor, z - 6], false, room_matrix[floor][z][x]);
                            else wall = new Wall([x - 6, floor, z - 6], true, room_matrix[floor][z][x], room_matrix[floor][z + 1][x]);
                        } else {
                            wall = new Wall([x - 6, floor, z - 6], true, room_matrix[floor][z + 1][x]);
                        }
                        this.entities.push(wall.create(true));
                    }
                }

                //south edge (z==11 index:5)
                if (z == 11) {
                    if (room_matrix[floor][z][x] != "nothing") {
                        wall = new Wall([x - 6, floor, 5], false, room_matrix[floor][z][x]);
                        this.entities.push(wall.create(true));
                    }
                }

                //floors
                var floor_plate;
                if (room_matrix[floor][z][x] != "nothing") {
                    floor_plate = new Floor([x - 6, floor, z - 6], room_matrix[floor][z][x]);
                    floor_plate.create();
                } else {
                    if (floor < 1) {
                        floor_plate = new Floor([x - 6, floor, z - 6], "grass");
                        this.entities.push(floor_plate.create());
                    }
                }


            }
        }
    }

};


Plan.prototype.get_rooms_json = function () {
    return JSON.stringify(this.room_data);
};