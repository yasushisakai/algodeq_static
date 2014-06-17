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
var geometry_data;

var new_name, new_points, image;


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

    // todo: take care CAMERA pos and CONTROLS target
//    camera = new THREE.PerspectiveCamera(
//        20,
//            CANVAS_WIDTH / CANVAS_HEIGHT,
//        unit_size,
//            unit_size * 100
//    );
//    camera = new THREE.OrthographicCamera(
//            CANVAS_WIDTH / - 8,
//            CANVAS_WIDTH / 8,
//            CANVAS_HEIGHT / 8,
//            CANVAS_HEIGHT / - 8,
//        10,
//        10000000 );

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
    renderer.shadowMapSoft=true;


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
    plan.create_walls_floors();

    // update cost and points_inborn
    new_points = parent_points * similarity;
    cost = plan.get_cost();
    $("#cost").text('cost: ' + cost);
    $("#points_inborn").text('points inborn: ' + Math.floor(new_points));

    // base ground w/ grid
    ground = new Ground();
    ground.create();

    validate_name();  // initial validation
}

function validate_name() {
    // validate name

    // null filtering
    if ($("#name_input").val() == "") {
        $("#name_input").css("border", "solid 1px #000000");
        $("#status").text("please enter something for a name.");
        if ($("#save_plan").is(":visible"))   $("#save_plan").hide('fade','',300);

        // regex name filtering
    } else if ($("#name_input").val().match(/^[-a-zA-Z0-9]+[-a-zA-Z0-9_]+$/) == null) {
        $("#name_input").css("border", "solid 1px #ff0000");
        $("#status").text("use only numbers and alphabets.('_' is permitted in between)");
        if ($("#save_plan").is(":visible"))   $("#save_plan").hide('fade','',300);

    } else { // ajax search for uniqueness
        $.post("",
            {
                name: $("#name_input").val(),
                csrfmiddlewaretoken: csrf_token

            },
            function (data, status) {
                var result = JSON.parse(data);

                // valid
                if (result["flag"]) {
                    $("#name_input").css("border", "solid 1px #DFCE3A");
                    $("#status").text("valid name!..ready to submit");
                    new_name = $("#name_input").val();
                    if (!$("#save_plan").is(":visible"))   $("#save_plan").show();

                    // duplicate
                } else {
                    $("#name_input").css("border", "solid 1px #ff0000");
                    $("#status").text("name is already used...");
                    if ($("#save_plan").is(":visible"))   $("#save_plan").hide('fade','',300);
                }
            });
    }
}


function save_plan() {

    // no worries the validation has ended....
    $.post("",
        {
            save_name: new_name,
            save_geometry: JSON.stringify(geometry_data),
            save_similarity: similarity,
            save_cost: cost,
            save_points: new_points,
            save_parent_id: parent_id,
            save_image: renderer.domElement.toDataURL().replace("data:image/png;base64,", ""),
            csrfmiddlewaretoken: csrf_token
        },
        function () {
            document.location.href = "../plan/" + new_name;

        })
        .fail(function (xhr) {
            console.log("Error: " + xhr.statusText);
            alert("Error: " + xhr.statusText);
        });
}
