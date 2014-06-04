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

function add_points(_id) {
    // todo:check whether the time has come to add points

    //add points to plan and update info
    $.post("",
        {
            csrfmiddlewaretoken: csrf_token
        },
        function (data, status) {
            console.log("added points to model id:" + _id);
            var current_value = parseFloat($("#plan_total_points").text())+10.0;
            $("#plan_total_points").text(current_value);
        })
        .fail(function (xhr) {
            console.log("Error: " + xhr.statusText);
            alert("Error: " + xhr.statusText);
        });
    return false;

}

