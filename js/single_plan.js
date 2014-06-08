//////////////////////////////////////////////////////
// single_plan
/////////////////////////////////////////////////////

$(document).ready(function () {
        //do something
    }
)

function make_plan(_id) {
    // jumps to corresponding make url
    document.location.href = "../../make/" + _id;
}

function add_points(_id,_points) {
    // todo:check whether the time has come to add points

    //add points to plan and update info

    $.post("",
        {
            points: _points,
            csrfmiddlewaretoken: csrf_token
        },
        function (data, status) {

            var result = JSON.parse(data);
            var current_value = parseFloat($("#plan_total_points").text())+result["points_added"];
            console.log("added "+ result["points_added"] +"points to model id:" + _id);
            $("#plan_total_points").text(current_value);
        })
        .fail(function (xhr) {
            console.log("Error: " + xhr.statusText);
            alert("Error: " + xhr.statusText);
        });
    return false;

}

