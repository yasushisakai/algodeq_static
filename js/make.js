//////////////////////////////////////////////////////
// make
/////////////////////////////////////////////////////


//
// GLOBAL VARIABLES
//

// essential global variables for three.js
var canvas, camera, scene, renderer, controls, clock, projector;

// dimensions
var unit_size = 1820;
var unit_height = 3000;
var resolution = 8;
var unit_length = unit_size * resolution;
var max_floor = 3;

// geometry
var plans = [];
var geometry_data;


// document specific global variables
// todo: add something below, THIS IS HARD CODING!!
var new_plan_name;
var new_plan_geometry;
var new_plan_similarity;


//
// METHODS
//

function initialize() {
    // first thing done after document is ready (in the jquery manner)
    console.log("--initialize--");

    // setting things up
    // todo: maybe webGL checking?
    setup_three_js();  // renderer (DOM element), cameras, and declaring variables
    setup_world();   // entities such as lights, geometries ...etc
    setup_events();  // mouse and keyboard

    // infinite loop
    // todo: try a smarter way. may be able to shortcut 'animate'.
    requestAnimationFrame(function animate() {
        run();
        requestAnimationFrame(animate);
    });
}

function setup_three_js() {
    console.log("--setup three js--");
    var CANVAS_WIDTH = window.innerWidth;
    var CANVAS_HEIGHT = window.innerHeight;

    // todo: valid geometry data needed.
    // this may go to the setup_world function.
    geometry_data = plan_json["geometry"];  // plan_json generated by server. refer head section of make.html

    scene = new THREE.Scene();

    // todo: take care CAMERA pos and CONTROLS target
    camera = new THREE.PerspectiveCamera(
        20,
            CANVAS_WIDTH / CANVAS_HEIGHT,
        unit_size,
            unit_size * 100
    );

    camera.position = new THREE.Vector3(
            unit_size * 2.5,
            unit_size * 2.5,
            unit_size * 2.5
    );

    controls = new THREE.OrbitControls(camera);
    controls.target = new THREE.Vector3(
        0.0,
        0.0,
        0.0
    );

    clock = new THREE.Clock();
    projector = new THREE.Projector();

    renderer = new THREE.WebGLRenderer({antialias: true, preserveDrawingBuffer: true});
    renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
    renderer.shadowMapEnabled = true;

    // html element

    canvas = $("#webgl_canvas").prepend(renderer.domElement);
    canvas.width(CANVAS_WIDTH);
    canvas.height(CANVAS_HEIGHT);
}

function setup_world() {
    console.log("--setup world--");
    //
    // lights
    //

    var ambient = new THREE.AmbientLight(0x959f9f);
    scene.add(ambient);

    // light is same as initial camera
    var light = new THREE.DirectionalLight(0xcccccc, 1);
    light.position.set(
        camera.position.x,
        camera.position.y,
        camera.position.z
    );

    // todo: fine-tune the shadows
    light.castShadow = true;
    light.shadowMapWidth = 4096;
    light.shadowMapHeight = 4096;
    var d = 1000000;
    light.shadowCameraLeft = d;
    light.shadowCameraRight = -d;
    light.shadowCameraTop = d;
    light.shadowCameraBottom = -d;
    light.shadowCameraNear = 100000;
    light.shadowCameraFar = 2500000;
    //light.shadowCameraVisible = true;
    light.shadowBias = 0.000001;
    light.shadowDarkness = 0.2;

    scene.add(light);

    //
    // geometry
    //

    // todo: generate main plan geometry

    // todo: add infinite plane (horizon)

    var axis = new Axis(unit_length * 10);
    axis.create();
}

function setup_events() {
    console.log("--setup events--");
    renderer.domElement.addEventListener('mousemove', function (event) {

        event.preventDefault();
        var vector = new THREE.Vector3(
                renderer.devicePixelRatio * (event.pageX - this.offsetLeft) / this.width * 2 - 1,
                -renderer.devicePixelRatio * (event.pageY - this.offsetTop) / this.height * 2 + 1,
            0
        );

        projector.unprojectVector(vector, camera);

        // will need after unprojection
        var raycaster = new THREE.Raycaster(
            camera.position,
            vector.sub(camera.position).normalize()
        );
    });

    renderer.domElement.addEventListener('mousedown', function (event) {
//        console.log(camera.position);
//        console.log(controls.target);
    });
}

function run() {
    renderer.render(scene, camera);
    controls.update(clock.getDelta());
}

function save_plan(_id) {
    // saves the plan
    // the process is two-folded

    new_plan_name = Math.random().toString(36).substr(2, 5);
    new_plan_geometry = 'nice geometry';
    new_plan_similarity = Math.random();

    // first attempt validates the new model
    $.post("",
        {
            phase: '0',  // 0 means to validate
            new_plan_name: new_plan_name,
            new_plan_geometry: new_plan_geometry,
            new_plan_similarity: new_plan_similarity,
            csrfmiddlewaretoken: csrf_token
        },
        function (data, status) {
            var answer = JSON.parse(data);
            if (answer["is_validation"]) {
                $("div.error").text("validation");

                // validation confirmed, fetch image and save data
                $.post("",
                    {
                        phase: '1',  // 1 means to save geometry
                        new_plan_name: new_plan_name,
                        new_plan_geometry: new_plan_geometry,
                        new_plan_similarity: new_plan_similarity,
                        // todo: fetch the image here
                        csrfmiddlewaretoken: csrf_token
                    },
                    function () {
                        document.location.href = "../../plan/" + new_plan_name;
                    })
                    .fail(function (xhr) {
                        console.log("Error: " + xhr.statusText);
                        alert("Error: " + xhr.statusText);
                    });


            } else {
                $("div.error").text(answer["message"]);
            }
        })
        .fail(function (xhr) {
            console.log("Error: " + xhr.statusText);
            alert("Error: " + xhr.statusText);
        });
    return false;
}