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

Plan.room_type_to_index = function (_type) {
    switch (_type) {
        case "living":
            return  0
        case "dining":
            return 1
        case "kitchen":
            return 2
        case "bedroom":
            return 3
        case "wc":
            return 4
        case "staircase":
            return 5
        default :
            return 6
    }
}


Plan.room_cost = {"living": 15, "dining": 15, "kitchen": 20, "bedroom": 15, "wc": 20, "staircase": 25}; // the cost for unit_size^2;


Plan.format_cost = function (num) {
    return (num * 10000).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}


Plan.format_similarity = function (num) {
    var ratio = Math.floor(num * 10000) / 100;

    return ratio + "%"
}


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

Plan.cross = function (plan1, plan2) {

    var new_plan1 = new Plan();
    var new_plan2 = new Plan();

    for (var rooms1 in plan1.room_data) {
        for (var i = 0; i < plan1.room_data[rooms1].length; i++) {

            var ind1 = plan1.room_data[rooms1][i];
            var has_room = false;  // has some room in same position

            for (var rooms2 in plan2.room_data) {
                for (var j = 0; j < plan2.room_data[rooms2].length; j++) {

                    var ind2 = plan2.room_data[rooms2][j];

                    if (ind1.toString() == ind2.toString()) {
                        has_room = true;
                        if (rooms1 == rooms2) {
                            // case A : same room, with same type
                            Plan.room_index = Plan.room_type_to_index(rooms1);

                            new_plan1.push_room(ind1);
                            new_plan2.push_room(ind1);

                        } else {
                            // case B: same pos, but different type CROSS
                            if (Math.random() < 0.5) {
                                Plan.room_index = Plan.room_type_to_index(rooms1);
                                new_plan1.push_room(ind1);
                                Plan.room_index = Plan.room_type_to_index(rooms2);
                                new_plan2.push_room(ind1);
                            } else {
                                Plan.room_index = Plan.room_type_to_index(rooms2);
                                new_plan1.push_room(ind1);
                                Plan.room_index = Plan.room_type_to_index(rooms1);
                                new_plan2.push_room(ind1);
                            }

                        }
                    }
                    break;
                }
                if (has_room) break;
            }

            if (!has_room) {  // case C: there was no room in B, but there was in A, push it to the kids
                Plan.room_index = Plan.room_type_to_index(rooms1);
                new_plan1.push_room(ind1);
                new_plan2.push_room(ind2);
            }
        }
    }

    // find case 4: any room in B, but missing in A

    for (var rooms2 in plan2.room_data) {
        for (var j = 0; j < plan2.room_data[rooms2].length; j++) {
            var ind2 = plan2.room_data[rooms2][j];
            var has_room = false;
            for (var rooms1 in plan1.room_data) {
                for (var i = 0; i < plan1.room_data[rooms1].length; i++) {
                    var ind1 = plan1.room_data[rooms1][i];
                    if (ind2.toString() == ind1.toString()) {
                        has_room = true;
                        break;
                    }
                }
                if (has_room) break;
            }

            // there was room in B, but not in A
            if (!has_room) {
                Plan.room_index = Plan.room_type_to_index(rooms2);
                new_plan1.push_room(ind2);
                new_plan2.push_room(ind2);
            }

        }
    }

    new_plan1.clean_rooms();
    new_plan2.clean_rooms();

    while (true) {
        if (new_plan1.get_cost() > 3000) {
            new_plan1.remove_random_region(1);
        } else {
            break;
        }
    }

    while (true) {
        if (new_plan2.get_cost() > 3000) {
            new_plan2.remove_random_region(1);
        } else {
            break;
        }
    }

    if(plan1.compare_with(new_plan1.room_data)==1.0) plan1 = null;
    if(plan2.compare_with(new_plan2.room_data)==1.0) plan2 = null;

    return [new_plan1,new_plan2];
}

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
    if (isNaN(ratio)) ratio = 1.0;

    return ratio;
};

Plan.prototype.push_room = function (_index) {
    if (this.max_height < _index[1]) {
        this.max_height = _index[1];
    }

    this.room_data[Plan.room_type[Plan.room_index]].push(_index);
    this.sort_rooms();
}

Plan.prototype.add_room = function (_index) {

    if (this.max_height < _index[1]) {
        this.max_height = _index[1];
    }

    this.room_data[Plan.room_type[Plan.room_index]].push(_index);
    this.sort_rooms();

    var cube = new Cube(_index, Plan.room_index);
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

Plan.prototype.fabricate1 = function (_times) {

    //add blocks
    this.add_random_region(_times);

    //get the cost
    while (this.get_cost() > 3000) {
        this.remove_random_region(1);
    }

    this.clean_rooms();

}

Plan.prototype.add_random_region = function (_times) {
    var indices;
    var rnd;

    for (var n = 0; n < _times; n++) {
        indices = [];
        rnd = Math.random();

        // making the indices
        if (rnd < 0.6) {
            var pivot = [Math.floor(Math.random() * 11) - 6, Math.floor(Math.random() * 3), Math.floor(Math.random() * 11) - 6];
            indices.push(pivot);
            indices.push([pivot[0] + 1, pivot[1], pivot[2]]);
            indices.push([pivot[0] + 1, pivot[1], pivot[2] + 1]);
            indices.push([pivot[0], pivot[1], pivot[2] + 1]);
        } else if (rnd >= 0.6 && rnd < 0.8) {
            var pivot = [Math.floor(Math.random() * 11) - 6, Math.floor(Math.random() * 3), Math.floor(Math.random() * 12) - 6];
            indices.push(pivot);
            indices.push([pivot[0] + 1, pivot[1], pivot[2]]);
        } else {
            var pivot = [Math.floor(Math.random() * 12) - 6, Math.floor(Math.random() * 3), Math.floor(Math.random() * 11) - 6];
            indices.push(pivot);
            indices.push([pivot[0], pivot[1], pivot[2] + 1]);
        }

        // floating detection = if it dosen't have a block in the bottom layer, indices sink.
        for (var i = 0; i < indices[0][1]; i++) {
            if (this.is_floating(indices)) {
                for (var j = 0; j < indices.length; j++) {
                    indices[j][1]--;
                }
            }
        }
        for (var i = 0; i < indices[0][1]; i++) {
            if (this.is_floating(indices)) {
                for (var j = 0; j < indices.length; j++) {
                    indices[j][1]--;
                }
            }
        }

        rnd = Math.random();

        if (rnd < 0.3) {
            // living
            Plan.room_index = 0;
        } else if (rnd < 0.5) {
            // dining
            Plan.room_index = 1;

        } else if (rnd < 0.65) {
            // kitchen
            Plan.room_index = 2;

        } else if (rnd < 0.8) {
            //bath
            Plan.room_index = 3;

        } else if (rnd < 0.95) {
            //wc
            Plan.room_index = 4;

        } else {
            //staircase
            Plan.room_index = 5;
        }

        for (var i = 0; i < indices.length; i++) {
            if (this.check_room_duplicates(indices[i])) {
                this.push_room(indices[i]);
            } else {
                this.remove_room(indices[i]);
                this.push_room(indices[i]);
            }
        }
    }

};

Plan.prototype.is_floating = function (_indices) {
    var indices = _indices;
    if (indices[0][1] > 0) {
        for (var rooms in this.room_data) {
            for (var c = 0; c < this.room_data[rooms].length; c++) {
                for (var i = 0; i < indices.length; i++) {
                    if (this.room_data[rooms][c].toString() == [indices[i][0], indices[i][1] - 1, indices[i][2]].toString()) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
};

Plan.prototype.remove_random_region = function (_times) {

    var indices;
    var rnd;
    var max_height;

    for (var n = 0; n < _times; n++) {
        indices = [];
        rnd = Math.random();
        max_height = this.get_max_height() + 1;

        // making the indices
        if (rnd < 0.5) {
            var pivot = [Math.floor(Math.random() * 11) - 6, Math.floor(Math.random() * max_height), Math.floor(Math.random() * 11) - 6];
            indices.push(pivot);
            indices.push([pivot[0] + 1, pivot[1], pivot[2]]);
            indices.push([pivot[0] + 1, pivot[1], pivot[2] + 1]);
            indices.push([pivot[0], pivot[1], pivot[2] + 1]);
        } else if (rnd >= 0.5 && rnd < 0.7) {
            var pivot = [Math.floor(Math.random() * 11) - 6, Math.floor(Math.random() * max_height), Math.floor(Math.random() * 12) - 6];
            indices.push(pivot);
            indices.push([pivot[0] + 1, pivot[1], pivot[2]]);
        } else if (rnd >= 0.7 && rnd < 0.9) {
            var pivot = [Math.floor(Math.random() * 12) - 6, Math.floor(Math.random() * max_height), Math.floor(Math.random() * 11) - 6];
            indices.push(pivot);
            indices.push([pivot[0], pivot[1], pivot[2] + 1]);
        } else {
            indices.push([Math.floor(Math.random() * 12) - 6, Math.floor(Math.random() * max_height), Math.floor(Math.random() * 12) - 6]);
        }


        for (var i = 0; i < indices.length; i++) {
            this.remove_room(indices[i]);
        }
    }

};

Plan.prototype.clean_rooms = function () {

    var rm_rooms;

    for (var k = 0; k < 2; k++) {
        rm_rooms = []

        for (var rooms in this.room_data) {
            for (var i = 0; i < this.room_data[rooms].length; i++) {
                if (this.room_data[rooms][i][1] == 0) continue;
                var ind = this.room_data[rooms][i];
                var flag = false;

                for (var rooms2 in this.room_data) {
                    for (var j = 0; j < this.room_data[rooms2].length; j++) {
                        if (this.room_data[rooms2][j][1] >= ind[1]) continue;
                        var ind2 = this.room_data[rooms2][j];
                        if (ind2.toString() == [ind[0], ind[1] - 1, ind[2]].toString()) {
                            flag = true;
                            break;
                        }
                    }
                    if (flag) break;
                }

                if (!flag) {
                    rm_rooms.push(ind);
                }
            }
        }

        for (var i = 0; i < rm_rooms.length; i++) {
            this.remove_room(rm_rooms[i]);
        }
    }

}

Plan.prototype.is_glazzed = function (_indices) {
    for (var rooms in this.room_data) {
        for (var i = 0; i < this.room_data[rooms].length; i++) {
            for (var j = 0; j < _indices.length; j++) {
                if (this.room_data[rooms][i].toString() == [_indices[j][0], _indices[j][1] + 1, _indices[j][2]].toString()) {
                    return true;
                }
            }
        }
    }

    return false;
}

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

};

Plan.prototype.get_cost = function () {
    var cost = 0;

    var max_height = 0;
    for (var rooms in this.room_data) {
        cost += this.room_data[rooms].length * Plan.room_cost[rooms];

        if (max_height == 2) {
            continue;
        }
        for (var i = 0; i < this.room_data[rooms].length; i++) {
            if (max_height < this.room_data[rooms][i][1]) {
                max_height = this.room_data[rooms][i][1];
            }
            if (max_height == 2)    break;
        }
    }

    // update max height
    this.max_height = max_height;

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
                var flag = true;
                // typical cases the middle places
                if (x < (resolution - 1)) {

                    if (room_matrix[floor][z][x] != room_matrix[floor][z][x + 1]) {  // detects weather the two room types are different
                        if (room_matrix[floor][z][x] != "nothing") {  //the spot is not nothing
                            if (room_matrix[floor][z][x + 1] == "nothing") wall = new Wall([x - 6, floor, z - 6], false, room_matrix[floor][z][x]);
                            else {

                                if (((room_matrix[floor][z][x] == "living") && (room_matrix[floor][z][x + 1] == "dining")) ||
                                    ((room_matrix[floor][z][x] == "dining") && (room_matrix[floor][z][x + 1] == "living")) ||
                                    ((room_matrix[floor][z][x] == "dining") && (room_matrix[floor][z][x + 1] == "kitchen")) ||
                                    ((room_matrix[floor][z][x] == "kitchen") && (room_matrix[floor][z][x + 1] == "dining")) ||
                                    ((room_matrix[floor][z][x] == "living") && (room_matrix[floor][z][x + 1] == "staircase")) ||
                                    ((room_matrix[floor][z][x] == "staircase") && (room_matrix[floor][z][x + 1] == "living")) ||
                                    ((room_matrix[floor][z][x] == "dining") && (room_matrix[floor][z][x + 1] == "staircase")) ||
                                    ((room_matrix[floor][z][x] == "staircase") && (room_matrix[floor][z][x + 1] == "dining")) ||
                                    ((room_matrix[floor][z][x] == "kitchen") && (room_matrix[floor][z][x + 1] == "staircase")) ||
                                    ((room_matrix[floor][z][x] == "staircase") && (room_matrix[floor][z][x + 1] == "kitchen"))) {
                                    flag = false;
                                }

                                else {
                                    wall = new Wall([x - 6, floor, z - 6], true, room_matrix[floor][z][x], room_matrix[floor][z][x + 1]);
                                }

                            }
                        } else {
                            wall = new Wall([x - 6, floor, z - 6], true, room_matrix[floor][z][x + 1]);
                        }
                        if (flag) this.entities.push(wall.create(false));
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


                flag = true;
                // this is for z line
                if ((z < resolution - 1)) {
                    if (room_matrix[floor][z][x] != room_matrix[floor][z + 1][x]) {
                        if (room_matrix[floor][z][x] != "nothing") {
                            if (room_matrix[floor][z + 1][x] == "nothing")  wall = new Wall([x - 6, floor, z - 6], false, room_matrix[floor][z][x]);
                            else {
                                if (((room_matrix[floor][z][x] == "living") && (room_matrix[floor][z + 1][x] == "dining")) ||
                                    ((room_matrix[floor][z][x] == "dining") && (room_matrix[floor][z + 1][x] == "living")) ||
                                    ((room_matrix[floor][z][x] == "dining") && (room_matrix[floor][z + 1][x] == "kitchen")) ||
                                    ((room_matrix[floor][z][x] == "kitchen") && (room_matrix[floor][z + 1][x] == "dining")) ||
                                    ((room_matrix[floor][z][x] == "living") && (room_matrix[floor][z + 1][x] == "staircase")) ||
                                    ((room_matrix[floor][z][x] == "staircase") && (room_matrix[floor][z + 1][x] == "living")) ||
                                    ((room_matrix[floor][z][x] == "dining") && (room_matrix[floor][z + 1][x] == "staircase")) ||
                                    ((room_matrix[floor][z][x] == "staircase") && (room_matrix[floor][z + 1][x] == "dining")) ||
                                    ((room_matrix[floor][z][x] == "kitchen") && (room_matrix[floor][z + 1][x] == "staircase")) ||
                                    ((room_matrix[floor][z][x] == "staircase") && (room_matrix[floor][z + 1][x] == "kitchen"))) {
                                    flag = false;
                                }


                                else {
                                    wall = new Wall([x - 6, floor, z - 6], true, room_matrix[floor][z][x], room_matrix[floor][z + 1][x]);
                                }
                            }
                        } else {
                            wall = new Wall([x - 6, floor, z - 6], true, room_matrix[floor][z + 1][x]);
                        }
                        if (flag) this.entities.push(wall.create(true));
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