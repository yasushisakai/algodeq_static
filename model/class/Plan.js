function Plan(_room_data) {

    if (typeof _room_data === 'undefined') {

        this.room_data = {
            "living": [],
            "dining": [],
            "kitchen": [],
            "bedroom": [],
            "wc": [],
            "staircase": []
        };
    }

    else {
        this.room_data = JSON.parse(_room_data);
        this.generate_parent();
        this.sort_rooms();

    }
}


Plan.room_index = 0;

Plan.room_type = ["living", "dining", "kitchen", "bedroom", "wc", "staircase"];

Plan.format_geometry = function (_geometry_data) {
    // returns formatted geometry data for diff comparison.

    var index = 0;
    var format_geom = "";
    for(var rooms in _geometry_data){
        if(_geometry_data[rooms].length !=0) {
            format_geom += index+", ";
            for (var i=0;i<_geometry_data[rooms].length;i++) {
                var ind = _geometry_data[rooms][i];
                format_geom += ind[0]+""+ind[1]+""+ind[2]+" ";
            }
        }
    }

    return format_geom;
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
}

Plan.prototype.compare_with = function (_geometry_data) {
    //compare with the other geometry
    var format_me = Plan.format_geometry(this.room_data);
    var format_you = Plan.format_geometry(_geometry_data);

    var diff = new diff_match_patch();  // :)
    var result = diff.diff_main(format_me,format_you,false);

    var all_char = 0;
    var same_char = 0;
    for(var i=0;i<result.length;i++){
        all_char += result[i][1].length;
        if(result[i][0] == 0){
            same_char += result[i][1].length;
        }
    }

    return similarity = same_char / all_char;
}

Plan.prototype.add_room = function (_index) {

    this.room_data[Plan.room_type[Plan.room_index]].push(_index);
    this.sort_rooms();

    var cube = new Cube(cursor.get_index(), Plan.room_index);
    cube.create();

}


Plan.prototype.sort_rooms = function () {

    for (var rooms in this.room_data) {
        if (this.room_data[rooms].length == 0) continue;
        this.room_data[rooms].sort();

    }
}


Plan.prototype.remove_room = function (_index) {

    if (typeof _room_type === 'undefined') {  // this is when we don't know the room type
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
    }
    else {  // this is when we know the room type more faster.
        for (var i = 0; i < this.room_data[Plan.room_type[_room_type]].length; i++) {
            if (this.room_data[Plan.room_type[_room_type]][i] == _index) {
                this.room_data[Plan.room_type[_room_type]].splice(i, 1);
                break;
            }
        }
    }

    Cube.remove_cube(_index);  // removes the cube

}


// todo: function to reproduce form given plan_data
Plan.prototype.generate_parent = function () {

    var room_index = 0;

    for (var rooms in this.room_data) {
        for (var i = 0; i < this.room_data[rooms].length; i++) {
            var cube = new Cube(this.room_data[rooms][i], room_index);
            cube.create();
        }
        room_index++;
    }


}

Plan.prototype.get_rooms_json = function () {
    return JSON.stringify(this.room_data);
}