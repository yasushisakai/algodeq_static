function loadjson(jsondata) {
    var impData;
    d3.json(jsondata, function (data) {
        //var user_names, user_emails, user_points;

        var model_list = data.model_data;
        var user_list = data.user_data;
        var user_points = new Array(user_list.length);
        for (var i = 0; i < user_points.length; i++) {
            user_points[i] = [0, 0, ""];
        }
        var TOTAL_PRIZE = 276696;//コンペ獲得賞金

        var points_sum = 0;
        var model_rank = [];

        //JSONファイルの中から特定の情報の取得
        for (var i = 0; i < model_list.length; i++) {
            var model_points_inborn = parseFloat(model_list[i].points_inborn);
            var model_points_acquired = parseFloat(model_list[i].points_acquired);
            var model_points = Math.floor(model_points_inborn + model_points_acquired);
            var model_architect_id = model_list[i].architect_id;
            var model_name = model_list[i].name;

            if (model_architect_id != 1) {
                points_sum += model_points;
            }
            if (model_points != 0) {
                user_points[model_architect_id - 1][1] += 1;
            } else if (model_points == 0 && model_architect_id == 6) {
                user_points[model_architect_id - 1][1] += 1;
            }
            user_points[model_architect_id - 1][0] += model_points;
            user_points[model_architect_id - 1][2] = user_list[model_architect_id - 1].username;
            model_rank.push([model_points, model_name, user_list[model_architect_id - 1].username, model_list[i].id, model_list[i].creation_time]);
        }
        model_rank = model_rank.sort(function (a, b) {
            return(b[0] - a[0]);
        });

        var user_points_sort = user_points.sort(function (a, b) {
            return(b[0] - a[0]);
        });
        var money = [];
        var donation = TOTAL_PRIZE;
        for (var i = 0; i < user_points_sort.length; i++) {
            var reimbursement = Math.floor(TOTAL_PRIZE * (user_points_sort[i][0] / points_sum));
            if (reimbursement != 0 && user_points_sort[i][2] != "architect") {
                money.push(reimbursement);
            }
            if (user_points_sort[i][2] != "jaldabaoth" && reimbursement > 20000) {
                donation -= reimbursement;
            }

        }

        var user_data = [];
        for (var i = 0; i < user_points.length; i++) {
            if (user_points_sort[i][0] != 0 && user_points_sort[i][2] != "architect") {
                user_data.push(user_points_sort[i]);
            }
        }
        var model_rank_all = model_rank;
        model_rank = model_rank.slice(0, 13);

        graph_bar_results_sim(user_data, money, donation);
        graph_bar_results(user_data, money, donation);
        model_rank_results(model_rank);
        //graph_craster(model_rank_all);

    })
}

//モデル制作の時系列とモデルの得点分布
function graph_craster(array) {

    var margin = {top: 20, right: 20, bottom: 70, left: 100},
        width = 800 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;

// Parse the date / time
    var parseDate = d3.time.format("%Y-%m").parse;

    var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

    var y = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(d3.time.format("%Y-%m"));

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

    var svg = d3.select(".graph_craster").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)


    var g = svg.selectAll(".data")
        .data(array)
        .enter().append("g")
        .attr("class", "data")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    g.append("axis")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Value ($)");


    g.append('circle')
        .attr("cx", function (d) {
            var xxx = d[0] * 4;
            return xxx;
        })
        .attr("cy", function (d) {
            var yyy = 350 - (1800 - d[3]) / 5;

            return yyy;
        })
        .attr("r", 1)
        .style("fill", d3.rgb(223, 206, 58));


}

function graph_bar_results_sim(array, money, donation) {

    var pitch = 70;
    var bar_width = 40;
    var base_height = 350;
    var bar_scale = 500;

    for (var i = 0; i < array.length; i++) {
        //var bar_height = array[i][0]/bar_scale;
        var bar_height = money[i] / bar_scale;
        var xx = i * pitch;
        var yy = base_height - bar_height;

        array[i].x = xx;
        array[i].y = yy;
    }


    var margin = {top: 20, right: 20, bottom: 70, left: 100},
        width = 800 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;

    // Parse the date / time
    var parseDate = d3.time.format("%Y-%m").parse;

    var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

    var y = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(d3.time.format("%Y-%m"));

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

    var svg = d3.select(".graph_result_simple").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

    var limt = base_height - 20000 / bar_scale;

    var lineData = [
        { "x": 0, "y": limt},
        { "x": 600, "y": limt}
    ];
    var lineData2 = [
        { "x": -50, "y": base_height},
        { "x": 600, "y": base_height}
    ];
    var lineFunction = d3.svg.line()
        .x(function (d) {
            return d.x;
        })
        .y(function (d) {
            return d.y;
        })
        .interpolate("linear");

    var g = svg.selectAll(".data")
        .data(array)
        .enter().append("g")
        .attr("class", "data")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    g.append("axis")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Value ($)");

    g.append("rect")
        .attr("class", "bar")
        .style("fill", d3.rgb(223, 206, 58))
        .attr("x", function (d) {
            return d.x;
        })
        .attr("y", function (d) {
            return d.y;
        })
        .attr("height", function (d, i) {
            var bar = money[i] / bar_scale;
            return bar;

        })
        .attr("width", bar_width);

    g.append("text")
        .attr("x", -40)
        .attr("y", base_height + 10)
        .attr("dy", ".35em")
        .style("font-size", 10)
        .style("text-anchor", "start")
        .style("fill", d3.rgb(223, 206, 58))
        .text("name");


    g.append("text")
        .attr("x", -40)
        .attr("y", base_height + 25)
        .attr("dy", ".35em")
        .style("font-size", 10)
        .style("text-anchor", "start")
        .style("fill", d3.rgb(223, 206, 58))
        .text("amaount");

    g.append("text")
        .attr("x", 600)
        .attr("y", base_height + 70)
        .attr("dy", ".35em")
        .style("font-size", 10)
        .style("text-anchor", "end")
        .style("fill", "black")
        .text("▲ユーザー別獲得ポイント一覧");


    g.append("text")
        .attr("x", function (d) {
            return d.x + 2;
        })
        .attr("y", function (d) {
            var yyy = base_height;
            return yyy + 10;
        })
        .attr("dy", ".35em")
        .style("font-size", 10)
        .style("text-anchor", "start")
        .text(function (d, i) {
            var aaa = d[2];
            return aaa;
        });


    //ユーザーの作ったモデルの数
    g.append("text")

        .attr("x", function (d) {
            return d.x + 2;
        })
        .attr("y", function (d) {
            var yyy = base_height;
            return yyy + 25;
        })
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .style("font-size", 10)
        .style("fill", "black")
        .text(function (d, i) {
            var u_num = array[i][1];
            return u_num;
        });

    g.append("text")

        .attr("x", function (d) {
            return d.x + 2;
        })
        .attr("y", function (d) {
            var yyy = 200;
            return d.y - 8;
        })
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .style("font-size", 10)
        .text(function (d, i) {
            var u_cost = Math.floor(array[i][0]);
            return u_cost + "pt";
        });
    g.append("path")
        .attr("d", lineFunction(lineData2))
        .attr("stroke", d3.rgb(223, 206, 58))
        .attr("stroke-width", 1)
        .attr("fill", "none");


}

function graph_bar_results(array, money, donation) {

    //SortScore(array, "points");
    var pitch = 70;
    var bar_width = 40;
    var base_height = 350;
    var bar_scale = 500;


    for (var i = 0; i < array.length; i++) {
        //var bar_height = array[i][0]/bar_scale;
        var bar_height = money[i] / bar_scale;
        var xx = i * pitch;
        var yy = base_height - bar_height;

        array[i].x = xx;
        array[i].y = yy;
    }


    var margin = {top: 20, right: 20, bottom: 70, left: 100},
        width = 800 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;

// Parse the date / time
    var parseDate = d3.time.format("%Y-%m").parse;

    var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

    var y = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(d3.time.format("%Y-%m"));

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

    var svg = d3.select(".graph_result").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

    var limt = base_height - 20000 / bar_scale;

    var lineData = [
        { "x": 0, "y": limt},
        { "x": 600, "y": limt}
    ];
    var lineData2 = [
        { "x": -50, "y": base_height},
        { "x": 600, "y": base_height}
    ];

    var lineFunction = d3.svg.line()
        .x(function (d) {
            return d.x;
        })
        .y(function (d) {
            return d.y;
        })
        .interpolate("linear");


    var g = svg.selectAll(".data")
        .data(array)
        .enter().append("g")
        .attr("class", "data")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    g.append("axis")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Value ($)");

    g.append("rect")
        .attr("class", "bar")
        .style("fill", d3.rgb(223, 206, 58))
        .attr("x", function (d) {
            return d.x;
        })
        .attr("y", function (d) {
            return d.y;
        })
        .attr("height", function (d, i) {
            var bar = money[i] / bar_scale;
            return bar;

        })
        .attr("width", bar_width);

    g.append("text")
        .attr("x", -40)
        .attr("y", base_height + 10)
        .attr("dy", ".35em")
        .style("font-size", 10)
        .style("text-anchor", "start")
        .style("fill", d3.rgb(223, 206, 58))
        .text("name");

    g.append("text")
        .attr("x", -40)
        .attr("y", base_height + 40)
        .attr("dy", ".35em")
        .style("font-size", 10)
        .style("text-anchor", "start")
        .style("fill", d3.rgb(223, 206, 58))
        .text("money");
    g.append("text")
        .attr("x", -40)
        .attr("y", base_height + 25)
        .attr("dy", ".35em")
        .style("font-size", 10)
        .style("text-anchor", "start")
        .style("fill", d3.rgb(223, 206, 58))
        .text("amaount");

    g.append("text")
        .attr("x", 600)
        .attr("y", base_height + 70)
        .attr("dy", ".35em")
        .style("font-size", 10)
        .style("text-anchor", "end")
        .style("fill", "black")
        .text("▲ユーザー別賞金分配額一覧");

    g.append("text")
        .attr("x", 560)
        .attr("y", base_height - 10 - 20000 / bar_scale)
        .attr("dy", ".35em")
        .style("font-size", 10)
        .style("text-anchor", "start")
        .style("fill", "red")
        .text("20000円");


    g.append("text")
        .attr("x", function (d) {
            return d.x + 2;
        })
        .attr("y", function (d) {
            var yyy = base_height;
            return yyy + 10;
        })
        .attr("dy", ".35em")
        .style("font-size", 10)
        .style("text-anchor", "start")
        .text(function (d, i) {
            var aaa = d[2];
            return aaa;
        });

    g.append("text")

        .attr("x", function (d) {
            return d.x + 2;
        })
        .attr("y", function (d) {
            var yyy = base_height;
            return yyy + 40;
        })
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .style("font-size", 10)
        .style("fill", function (d, i) {
            var tcolor = "black";
            if (money[i] > 20000) {
                tcolor = "red";

            }
            return tcolor;
        })
        .text(function (d, i) {

            var u_cost = money[i];
            return u_cost + "円";
        });
    g.append("text")

        .attr("x", function (d) {
            return d.x + 2;
        })
        .attr("y", function (d) {
            var yyy = base_height;
            return yyy + 25;
        })
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .style("font-size", 10)
        .style("fill", "black")
        .text(function (d, i) {
            var u_cost = array[i][1];
            return u_cost;
        });

    g.append("text")

        .attr("x", function (d) {
            return d.x + 2;
        })
        .attr("y", function (d) {
            var yyy = 200;
            return d.y - 8;
        })
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .style("font-size", 10)
        .text(function (d, i) {
            var u_cost = Math.floor(array[i][0]);
            return u_cost + "pt";
        });

    g.append("path")
        .attr("d", lineFunction(lineData))
        .attr("stroke", "red")
        .attr("stroke-width", 1)
        .attr("fill", "none");

    g.append("path")
        .attr("d", lineFunction(lineData2))
        .attr("stroke", d3.rgb(223, 206, 58))
        .attr("stroke-width", 1)
        .attr("fill", "none");

}

function model_rank_results(array) {

    var margin = {top: 20, right: 20, bottom: 70, left: 100},
        width = 800 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

// Parse the date / time
    var parseDate = d3.time.format("%Y-%m").parse;

    var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

    var y = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(d3.time.format("%Y-%m"));

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

    var svg = d3.select(".model_result").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)


    var g = svg.selectAll(".data")
        .data(array)
        .enter().append("g")
        .attr("class", "data");

    g.append("svg:image")
        .attr({
            'xlink:href': function (d, i) {
                var img_name = d[1];
                return "/media/plans/img_" + img_name + ".png";
            },
            'width': function (d, i) {
                var img_width = 150;
                if (i < 3) {
                    img_width = 250;
                }
                return img_width;
            },
            'height': function (d, i) {
                var img_height = 150;
                if (i < 3) {
                    img_height = 250;
                }
                return img_height;
            },
            'x': function (d, i) {
                var x_pos = 0;
                if (i < 3) {
                    x_pos = i * 250 + 50;
                } else {
                    x_pos = ((i - 3) % 5) * 150 + 50;
                }
                return x_pos;
            },
            'y': function (d, i) {
                var y_pos = 0;
                if (i < 3) {
                    y_pos = 0;
                } else {
                    y_pos = 250 + Math.floor((i - 3) / 5) * 170;
                }
                return y_pos;
            }
        });
    g.append("text")
        .attr("x", function (d, i) {
            var x_pos = 0;
            if (i < 3) {
                x_pos = i * 250 + 50;
            } else {
                x_pos = ((i - 3) % 5) * 150 + 50;
            }
            return x_pos;
        })
        .attr("y", function (d, i) {
            var y_pos = 0;
            if (i < 3) {
                y_pos = 20;
            } else {
                y_pos = 270 + Math.floor((i - 3) / 5) * 170;
            }
            return y_pos;
        })
        .attr("dy", ".35em")
        .style("font-size", function (d, i) {
            var t_size = 10;
            if (i < 3) {
                t_size = 15;
            }
            return t_size;
        })
        .style("text-anchor", "start")
        .style("fill", "black")
        .text(function (d, i) {
            return "No." + (i + 1);
        });
    text_attr(g, 0, 3, "id");
    text_attr(g, 10, 1, "name");
    text_attr(g, 20, 0, "pt");
    text_attr(g, 30, 2, "create");
    text_attr(g, 40, 4, "time");


    function text_attr(g, y, parameter, str_text, array) {
        var iii = parameter;
        g.append("text")
            .attr("x", function (d, i) {
                var x_pos = 0;
                if (i < 3) {
                    x_pos = i * 250 + 50;
                } else {
                    x_pos = ((i - 3) % 5) * 150 + 50;
                }
                return x_pos;
            })
            .attr("y", function (d, i) {
                var y_pos = 0;
                if (i < 3) {
                    y_pos = 200;
                } else {
                    y_pos = 370 + Math.floor((i - 3) / 5) * 170;
                }
                return y_pos + y;
            })
            .attr("dy", ".35em")
            .style("font-size", function (d, i) {
                var t_size = 10;
                if (i < 3) {
                    t_size = 10;
                }
                return t_size;
            })
            .style("text-anchor", "start")
            .style("fill", "black")
            .text(function (d) {
                return str_text + ":" + d[iii];
            });

    }


}

