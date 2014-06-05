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

    else this.room_data = _room_data;

}

Plan.room_type = ["living", "dining", "kitchen", "bedroom", "wc", "staircase"];


Plan.prototype.check_room_duplicates = function (_index) {

    console.log(_index);

    for (var rooms in this.room_data) {
        for (var i = 0; i < this.room_data[rooms].length; i++) {
            if(this.room_data[rooms][i] == _index){
                return false;  // there is a duplicate!
            }
        }
    }

    return true;  // there is no duplicate;
}


Plan.prototype.add_room = function (_index, _room_type) {

    this.room_data[Plan.room_type[_room_type]].push(_index);
    this.sort_rooms();

}


Plan.prototype.sort_rooms = function () {

    for (var rooms in this.room_data) {
        var id = 0;
        this.room_data[rooms].sort();

    }
}


Plan.prototype.remove_room = function (_index, _room_type) {

    if (typeof _room_type === 'undefined') {  // this is when we don't know the room type
        var flag = true;
        for (var rooms in this.room_data) {
            for (var i = 0; i < this.room_data[rooms].length; i++) {
                if (this.room_data[Plan.room_type[_room_type]][i] == _index) {
                    this.room_data[Plan.room_type[_room_type]].splice(i, 1);
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

}


// todo: function to reproduce form given plan_data


Plan.prototype.get_rooms_json = function () {
    return JSON.stringify(this.room_data);
}