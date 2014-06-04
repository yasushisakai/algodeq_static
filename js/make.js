//////////////////////////////////////////////////////
// make
/////////////////////////////////////////////////////

//todo: add something below, THIS IS HARD CODING!!
var new_plan_name;
var new_plan_geometry;
var new_plan_similarity;

$(document).ready(function () {


    }
)

function save_plan(_id) {
    // saves the plan
    // the process is two-folded

    new_plan_name = Math.random().toString(36).substr(2,5);
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
                        document.location.href = "../../plan/"+new_plan_name;
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