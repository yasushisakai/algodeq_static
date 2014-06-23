//////////////////////////////////////////////////////
// Model Manipulation
/////////////////////////////////////////////////////


//
// GLOBAL VARIABLES
//

// essential global variables for three.js
var canvas, camera, scene, renderer, controls, clock, projector;

// dimensions
var unit_size = 910;
var unit_height = 2550;
var resolution = 12;
var unit_length = unit_size * resolution;

// geometry
var cursor, ground;
var plan;

var new_name, new_points, image;
var similarity, cost;


function initialize() {

    setup_three_js();
    setup_world();

    requestAnimationFrame(function animate() {
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    });
}

function setup_three_js() {
    console.log("--setup three js--");

//    var CANVAS_WIDTH = window.innerWidth;
//    var CANVAS_HEIGHT = window.innerHeight;
    var CANVAS_WIDTH = 640;
    var CANVAS_HEIGHT = 720;

    scene = new THREE.Scene();

    var camera_coef = 0.0620;

    camera = new THREE.OrthographicCamera(
            CANVAS_WIDTH / -camera_coef,
            CANVAS_WIDTH / camera_coef,
            CANVAS_HEIGHT / camera_coef,
            CANVAS_HEIGHT / -camera_coef,
        10,
        10000000);

    camera.position.set(
            unit_length * 2.5,
            unit_length * 2.5,
            unit_length * 2.5
    );
    //camera.up.set(0, 1, 0);
    camera.lookAt({x: 0, y: 0, z: 0});

    // the clock and two timers
    clock = new THREE.Clock();


    projector = new THREE.Projector();

    renderer = new THREE.WebGLRenderer({antialias: true, preserveDrawingBuffer: true, alpha: true});
    //renderer.setClearColor(0xffffff,0);  // something is wrong with white, transparent background
    renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;


    // html element
    canvas = $("#webgl_canvas_finalize").prepend(renderer.domElement);
    canvas.width(CANVAS_WIDTH);
    canvas.height(CANVAS_HEIGHT);
}


function setup_world() {

    console.log("--setup world--");

    // lights
    var light = new Light();  // refer to Light.js
    light.create();

    // geometry (geometry data is already ready.)
    plan = new Plan(geometry_data);
    switch (bot_type) {
        case 0:
            plan.fabricate1(10);
            break;
        case 1:
            var sibling = new Plan(geometry2_data);
            var plans = Plan.cross(plan,sibling);
            if(plans[0] != null){
                plan = plans[0];
            }else if(plans[1] != null) {
                plan = plans[1];
            }else{
                alert("cannot make different plan");
            }

        default :
            break;
    }
    console.log(plan.get_rooms_json());
    console.log(JSON.stringify(geometry_data));
    similarity = plan.compare_with(parent_geometry);
    plan.create_walls_floors();

    if(bot_type == 0) {
        new_name = random_station() + "_" + bot_type + "" + zero_add(Math.floor(Math.random() * 10000));
    }else if(bot_type ==1){
        new_name = random_constellations() +"_" + bot_type + "_" +parent_id+"_"+parent2_id+"_"+ zero_add(Math.floor(Math.random() * 10000));
    }

    // update cost and points_inborn
    cost = plan.get_cost();
    new_points = parent_points * similarity;
    $("#name").text(new_name);

    $("#similarity").text(Plan.format_similarity(similarity));
    $("#cost").text(Plan.format_cost(cost));
    $("#points_inborn").text(Math.floor(new_points));


    // base ground w/ grid
    ground = new Ground();
    ground.create();

}


function save_plan() {

    $.post("/fabricate/",
        {
            input_name: new_name,
            input_username: "jaldabaoth",
            input_image: renderer.domElement.toDataURL().replace("data:image/png;base64,", ""),
            input_geometry: plan.get_rooms_json(),
            input_similarity: similarity,
            input_points: new_points,
            input_cost: cost,
            input_parent_id: parent_id,
            csrfmiddlewaretoken: csrf_token
        },
        function (data) {
            document.location.href = "/bot/"+bot_type+"/";
            var status = JSON.parse(data);
        })
        .fail(function (xhr) {
            console.log("Error: " + xhr.statusText);
            alert("Error: " + xhr.statusText);
        });


}
