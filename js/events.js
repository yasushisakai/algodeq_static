var intersect_objects;


function mouse_move(event) {

    event.preventDefault(); // todo: straighten up stuff

    if (is_make) {
        var vector = new THREE.Vector3(
                renderer.devicePixelRatio * (event.pageX - this.offsetLeft) / this.width * 2 - 1,
                -renderer.devicePixelRatio * (event.pageY - this.offsetTop-100) / this.height * 2 + 1,
            0
        );

        projector.unprojectVector(vector, camera);

        var raycaster = new THREE.Raycaster(
            camera.position,
            vector.sub(camera.position).normalize()
        );

        intersect_objects = raycaster.intersectObjects(scene.children);

        //if (intersect_objects.length > 0 && intersect_objects[0].object.name == "grid") {
        if (intersect_objects.length > 0) {
            var flag = false;
            var i;
            for (i = 0; i < intersect_objects.length; i++) {
                if (intersect_objects[i].object.name == "grid") {
                    flag = true;
                    break;
                }
            }
            if (flag) {
                if (Math.abs(ground.get_level_height() - intersect_objects[i].point.y) < 1) {
                    var int_point = intersect_objects[i].point;
                    int_point.y = ground.get_level_height();  // over write height to clean value
                    if (cursor.check_position(int_point)) {
                        cursor.index_from_pos(int_point);
                        cursor.update_pos();
                    }
                }
            }
        }
    }
}


function mouse_down(event) {

    // limit the event to left mouse
    if (event.button == 0) {

        if (Plan.room_index != 6) {  // 6 is deleting cubes
            // add a cube if the cursor is in boundary and there is no rooms extant
            if (cursor.is_valid) {
                if (plan.check_room_duplicates(cursor.get_index())) {
                    plan.add_room(cursor.get_index());
                } else {
                    plan.remove_room(cursor.get_index());  // this over writes the program for convenience
                    plan.add_room(cursor.get_index());
                }
            }
        } else {
            if (cursor.is_valid) {
                plan.remove_room(cursor.get_index());
            }
        }

    }

    update_model_info(); // update the information
}


function key_down(event) {
}

function key_up(event) {

}

function window_resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight);
}


