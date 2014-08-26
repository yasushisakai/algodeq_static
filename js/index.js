function treeDiagram(users, bool) {
    var modelGene = impData[0];
    var account = users;
    var point_color = d3.rgb(223, 206, 58);


    var nodeSizeW = 140,
        nodeSizeH = 140,
        mxDiv = width / nodeSizeW;

    var width = 1000,
        height = 600,
        scl = 1.2;
    if(bool == false){
        width = 1870;
    }

    //何世代目までいるかを調べる
    var cluster = d3.layout.tree();
    var generation = [];
    var geneID = [];
    var node = cluster.nodes(modelGene);
    //console.log(node);
    for (var i in node) {
        var gene = node[i].depth;
        var gID = node[i].id;
        if (node[i].parent == null) {
            var gPar = 0;
        } else {
            var gPar = node[i].parent.id;
        }
        //console.log(gPar);

        generation.push(gene);
        geneID.push([gID, gPar]);
    }
    ;
    var geneMax = Math.max.apply(null, generation);

    var money = user_money(node);


    //世代ごとの配列生成
    var geneHi = [];
    for (var ii = 0; ii < geneMax; ii++) {
        var tt = [];

        for (var k = 0; k < generation.length; k++) {
            if (generation[k] == ii + 1) {
                tt.push(geneID[k]);


            }
        }
        geneHi.push(tt);
    }

    var c_num = cl_size(geneHi, nodeSizeW);

    var cluster_sizeH = 8000;//nodeSizeH * c_num;


    //樹形図領域生成
    cluster = d3.layout.tree()
        .size([width, cluster_sizeH]);

    var diagonal = d3.svg.diagonal()

        .projection(function (d) {
            return [d.x, d.y];
        });

    var dx = 0;// (width * scl - width) * 0.5;
    var dy = (height * scl - height) * 0.5;

    //DOM svgのフィールドを作成
    if(bool==true){
            var svg = d3.select(".pure-u-19-24").append("svg")
        .attr("width", width)
        .attr("height", cluster_sizeH * scl)
        .append("g")
        .attr("transform", "translate(" + dx + "," + dy + ")");
    }else{
            var svg = d3.select(".pure-u-24-24").append("svg")
        .attr("width", width)
        .attr("height", cluster_sizeH * scl)
        .append("g")
        .attr("transform", "translate(" + dx + "," + dy + ")");
    }





    netnode(modelGene, geneHi, width, nodeSizeW, nodeSizeH, bool);

    //樹形図を作成する
    function netnode(json, geneHi, width, nodeSizeW, nodeSizeH, bool) {
        var nodes = cluster.nodes(json),
            links = cluster.links(nodes);

        if (bool == true) {
            layout_tree(nodes, geneHi, width, nodeSizeW, nodeSizeH);
        } else {
            layout_treeGraphic(nodes, geneHi, width, nodeSizeW, nodeSizeH);
        }


        var ar = [0];
        var link = svg.selectAll(".link")
            .data(links)
            .enter().append("path")
            .attr("class", "link")

            .attr("d", diagonal)
            .style("stroke", function (d) {
                var pnt = d.target.similarity;
                var clr = 255 - pnt * 155;
                if (pnt == 0.01) {
                    clr = 0;
                }
                return d3.rgb(clr, clr, clr);
            })
            .style("stroke-width", function (d) {
                //console.log(d);
                var wd;
                var wid = d.target.similarity;
                if (wid == 0) {
                    wd = 0.1;
                } else {
                    wd = (0.1 + wid) * 4;
                }

                return wd;
            });

        var array_node = [];
        var node = svg.selectAll(".node")
            .data(nodes)
            .enter().append("g")
            .attr("class", "node")

            .attr("transform", function (d) {

                return "translate(" + d.x + "," + d.y + ")";
            });

        var arr = [];


        //各サムネイルを入れ込む
        var array_image = [];
        node.append("svg:image")
            .attr("xlink:href", function (d) {
                var name = d.name;
                var ch = d.paID;
                var tm = d.time;
                return "/media/plans/small/img_" + d.name + ".png";
                //return "/media/plans/img_tokyo_0.png";

            })
            .attr("x", -nodeSizeW / 2)
            .attr("y", -nodeSizeH / 2)
            .attr("width", nodeSizeW)
            .attr("height", nodeSizeH);

        svg.selectAll(".node")
            .on("mouseover", function (d, i) {
                d3.select(this)
                    .style('opacity', 0.8)
                    .style('fill', d3.rgb(223, 206, 58));
            })
            .on("mouseout", function (d, i) {
                d3.select(this)
                    .style("fill", d3.rgb(0, 0, 0))
                    .style('opacity', 1);

            })
            .on("click", function (d, i) {
                d3.select(this)
                    .style("fill", d3.rgb(81, 79, 90));

                //link設定

                gotoView(d.name);
            });

        //テキストの基準座標 [x,y,height]
        var textPos = [10, -30, 10];

        //ID
        a_text = [];
        node.append("text")
            .attr("dx", -nodeSizeW / 2 + textPos[0])
            .attr("dy", nodeSizeH / 2 + textPos[1])
            .style("text-anchor", "start")
            .style("font-weight", function (d) {
                if (account == d.architect) {
                    return "bold";
                }

            })
            .text(function (d) {
                return "id: " + d.id;
            });

        //name
        a_text = [];
        node.append("text")
            .attr("dx", -nodeSizeW / 2 + textPos[0])
            .attr("dy", nodeSizeH / 2 + textPos[1] + 10)
            .style("text-anchor", "start")
            .style("font-weight", function (d) {
                if (account == d.architect) {
                    return "bold";
                }

            })
            .text(function (d) {
                var name = d.name;
                return name.substring(0, 10);
            });

        //creation_time
        a_text = [];
        node.append("text")
            .attr("dx", -nodeSizeW / 2 + textPos[0])
            .attr("dy", nodeSizeH / 2 + textPos[1] + 10 * 2)
            .style("text-anchor", "start")
            .style("font-size", 5)

            .text(function (d) {
                var txt = d.creation_time;
                return txt.substring(2, 16);
            });

        //diff
        a_text = [];
        node.append("text")

            .attr("dy", -nodeSizeH / 2 + 20)
            .style("text-anchor", "middle")

            .text(function (d) {

                var sim = d.similarity * 100;

                return sim.toFixed(1) + "%";
            });


        //point
        a_text = [];
        node.append("text")

            .attr("dx", -nodeSizeH / 2 + 25)
            .attr("dy", -nodeSizeH / 2 + 50)
            .style("text-anchor", "end")
            .style("font-size", function (d) {
                var pnt = d.total_points;
                var clr = 10;
                SortScore(nodes, "rank");

                for (var i = 1; i < 6; i++) {
                    if (nodes[i].id == d.id) {
                        clr = 10 + (10 / 6) * (6 - i);


                    }
                }
                return clr;
            })
            .style("fill", function (d) {
                var pnt = d.total_points;
                var clr = 0;
                SortScore(nodes, "rank");

                for (var i = 1; i < 11; i++) {
                    if (nodes[i].id == d.id) {
                        clr = (255 / 10) * (10 - i);

                    }
                }

                return d3.rgb(Math.round(clr), 0, 0);

            })
            .style("font-weight", function (d) {
                SortScore(nodes, "rank");
                var sty = "none";

                for (var i = 1; i < 6; i++) {
                    if (nodes[i].id == d.id) {
                        sty = "bold";
                    }
                }
                ;

                return sty;
            })

            .text(function (d) {
                var pnt = d.total_points;

                return pnt.toFixed(1);
            });

        //rank
        a_text = [];
        node.append("text")

            .attr("dx", -nodeSizeW / 2 + textPos[0])
            .attr("dy", nodeSizeH / 2 + textPos[1] - 10)
            .style("text-anchor", "start")
            .style("font-weight", function (d) {
                if (account == d.architect) {
                    return "bold";
                }

            })
            .text(function (d) {

                var rankrank = Lst_sort();
                var rk;
                for (var i in rankrank) {
                    if (d.id == rankrank[i].id) {
                        rk = rankrank[i].rank
                    }
                }

                return "rank:" + rk;
            });


    }

    d3.select(self.frameElement).style("width", width + "py");

    function gotoView(modelName) {

        var link = "plan/" + modelName;
        location.href = link;

    }

    //世代の数を知る
    function array_count_values(array) {

        var tmp_arr = array;

        var countArray = [];

        for (var i in  tmp_arr) {
            countArray.push(tmp_arr[i].children.length);
            //console.log(tmp_arr[i].children.length);
        }
        var maxCount = Math.max.apply(null, countArray);

        return maxCount;
    }

    function geneKnow(gene) {
        //自分の子供データをインポート
        for (var k = gene.length - 1; k >= 0; k--) {
            var pn = gene[k].paID;//modelParentId[k];
            if (pn > 0) {
                var IDD = pn - 1;//modelIds.indexOf(pn);

                JYUKEI[IDD].children.push(JYUKEI[k]);
            }
        }
        //樹形図の階層データをインポート
        //ID:0が祖先
        myJSONObject = JYUKEI[0];

        //自分が何世代目かを調べる
        function ID(_num) {
            var nn = _num;
            var cID;
            if (nn == 0) {
                cID = 0
            } else {
                var IDD = modelIds.indexOf(nn);
                var cID = modelParentId[IDD]
            }
            return cID;
        }
    }

    function pos_trance(d, array) {
        var c_x;
        var xxx = 0;
        var dis = 0;
        var j_num = 0;
        array[0] = [1, 0, 1];

        for (var l = 0; l < geneHi.length; l++) {
            var ar_t = [];
            for (var j = 0; j < geneHi[l].length; j++) {
                if (d.id == geneHi[l][j][0]) {
                    var a_r = [d.id, d.x, d.parent.id];
                    var dis = 0;
                    var signal = false;
                    if (j > 0) {
                        for (var zz = 0; zz < array.length; zz++) {
                            if (geneHi[l][j - 1][0] == array[zz][0]) {
                                dis = d.x - array[zz][1];
                            }
                        }
                    }
                    if (d.parent.id == array[array.length - 1][2]) {

                        j_num = j;
                        signal = true;


                    }

                    if (dis == 0) {
                        xxx = 0;
                    } else if (dis < (nodeSizeW / 2 + 5) * 2) {
                        if (signal == true) {
                            xxx = ((nodeSizeW / 2 + 5) * 2 - dis) * (j - j_num + 1);
                        } else {
                            xxx = ((nodeSizeW / 2 + 5) * 2 - dis);
                        }

                    } else {
                        xxx = 0;
                    }
                    array.push(a_r);


                }

            }


        }
        var yyy = 0;


        array = [];
        return [xxx, yyy];

    }

}

//JSONデータをD3の連想配列に変換
function Lst_sort() {

    var modelGene = impData[0];
    var cluster = d3.layout.tree();
    var node = cluster.nodes(modelGene);

    var rank = rank_maker(node);

    for (var i in node) {
        var counter = 1;
        for (var l in rank) {
            if (node[i].id == 1) {
                node[i]["rank"] = 0;
            } else if (node[i].id == rank[l]) {
                node[i]["rank"] = counter;

            }
            counter += 1;

        }

    }

    return node;

}

//配列をソート
function SortScore(array, parameter) {


    array.sort(function (a, b) {
        var aa = eval("a." + parameter);
        var bb = eval("b." + parameter);
        if (parameter == "rank" || parameter == "id") {
            return (aa < bb) ? -1 : 1;
        } else {
            return (aa > bb) ? -1 : 1;
        }

    });
}

//rank
function rank_maker(array) {
    var ranker = [];
    SortScore(array, "total_points");
    for (var i in array) {
        if (array[i].id != 1) {
            ranker.push(array[i].id);

        }

    }
    return ranker;
}


//List DOMを生成

function domMaker(array) {


    for (var i in array) {
        if (array[i].id != 1) {


            document.write("<tr>");
            document.write("<td >");
            document.write(array[i].rank);
            document.write("</td>");
            document.write("<td >");
            document.write(array[i].id);
            document.write("</a></td><td>");
            document.write("<a href=" + array[i].url + " OnMouseOver='MouseIn(" + array[i].id + ");' OnMouseOut='MouseOut(" + array[i].id + ");'>");
            document.write(array[i].name.substring(0, 10));
            document.write("</a></td><td>");
            var pnts = array[i].total_points;
            document.write(pnts.toFixed(1));
            document.write("</td><td>");
            var smt = array[i].similarity * 100;
            document.write(smt.toFixed(1));
            document.write("</td><td>");

            document.write(array[i].creation_time.substring(2, 16));
            document.write("</td>");
            document.write("</tr>");
        }

    }

}

//右のListを並べ替える
function reWrite(array, parameter) {
    SortScore(array, parameter);
    var txt = domRewrite(array);

    document.getElementById("table_list").innerHTML = txt;

    function domRewrite(array) {
        var ttt = [];
        // var ttt = '<table class="pure-table pure-table-horizontal"><thead><tr><th>ID</th><th>name</th><th>point</th><th>diff</th><th>time</th></tr></thead>';

        for (var i in array) {
            if (array[i].id != 1) {


                ttt += "<tr>";
                ttt += "<td>" + array[i].rank + "</td>";

                ttt += "<td>" + array[i].id + "</td>";
                ttt += "<td><a href=" + array[i].url + " OnMouseOver='MouseIn(" + array[i].id + ");' OnMouseOut='MouseOut(" + array[i].id + ");'>" + array[i].name.substring(0, 10) + "</a></td>";
                var pnts = array[i].total_points;
                ttt += "<td>" + pnts.toFixed(1) + "</td>";
                var smt = array[i].similarity * 100;
                ttt += "<td>" + smt.toFixed(1) + "</td>";
                ttt += "<td>" + array[i].creation_time.substring(2, 16) + "</td>";

                ttt += "</tr>";
                ttt += "</td>";
            }
        }

        return ttt;
    }

}

function MouseIn(id) {
    console.log(id);
    var svg = d3.select(".pure-u-19-24");
    svg.selectAll(".node")

        .style('opacity', function (d) {
            if (id == d.id) {
                return 0.8;
            }

        })
        .style('fill', function (d) {
            if (id == d.id) {
                return d3.rgb(223, 206, 58);
            }

        });

}


function MouseOut(id) {
    var svg = d3.select(".pure-u-19-24");
    svg.selectAll(".node")

        .style('opacity', 1)
        .style('fill', function (d) {
            if (id == d.id) {
                return d3.rgb(0, 0, 0);
            }

        });

}

//樹形図の座標設定
function layout_tree(array, geneHi, width, nodeSizeW, nodeSizeH) {
    SortScore(array, "id");

    var max_count = Math.floor(1000 / nodeSizeW);
    var range = [];
    var tr;
    for (var ii in geneHi) {
        tr = Math.ceil(geneHi[ii].length / max_count);

        //各世代の段数を割り出す
        if (max_count < geneHi[ii].length) {
            var ran = tr;
            range.push(ran);
        } else {
            range.push(1);
        }
    }

    for (var i in array) {
        for (var l = 0; l < geneHi.length; l++) {
            var node_y = 0;
            for (var k = 0; k < geneHi[l].length; k++) {
                if (array[i].id == geneHi[l][k][0]) {
                    for (var mm = 0; mm < l; mm++) {
                        if (range[mm] != 1) {

                            node_y += (range[mm] / 2) * 0.5 * (range[mm] );
                        } else {
                            node_y += range[mm];
                        }
                    }

                    if (range[l] != 1) {
                        var each_length = (width - nodeSizeW) / (geneHi[l].length);
                        array[i].x = nodeSizeH / 2 + each_length * (k + 1);

                        var m_tr = k % range[l];
                        node_y += 0.5 * (range[l] / 2) * m_tr;

                    } else {
                        array[i].x = (width / (geneHi[l].length + 1) * (k + 1));

                    }

                    array[i].y = (node_y + 1) * nodeSizeH;
                }
            }

        }
        if (array[i].id == 1) {
            array[i].x = width / 2;
        }
    }
    return array;
}


//樹形図の座標設定
function layout_treeGraphic(array, geneHi, width, nodeSizeW, nodeSizeH) {
    SortScore(array, "id");

    var max_count = Math.floor(width / nodeSizeW);
    var range = [];
    var tr;
    for (var ii in geneHi) {
        tr = Math.ceil(geneHi[ii].length / max_count);

        //各世代の段数を割り出す
        if (max_count < geneHi[ii].length) {
            var ran = tr;
            range.push(ran);
        } else {
            range.push(1);
        }
    }

    for (var i in array) {
        for (var l = 0; l < geneHi.length; l++) {
            var node_y = 0;
            for (var k = 0; k < geneHi[l].length; k++) {
                if (array[i].id == geneHi[l][k][0]) {
                    for (var mm = 0; mm < l; mm++) {
                        if (range[mm] != 1) {

                            node_y += (range[mm] / 2) * 0.5 * (range[mm] + 1);
                        } else {
                            node_y += range[mm];
                        }
                    }

                    if (range[l] != 1) {
                        var each_length = (width - nodeSizeW) / (geneHi[l].length);
                        array[i].x = nodeSizeH / 2 + each_length * (k + 1);

                        var m_tr = k % range[l];
                        node_y += 0.5 * (range[l] / 2) * m_tr;

                    } else {
                        array[i].x = (width / (geneHi[l].length + 1) * (k + 1));

                    }

                    array[i].y = (node_y + 1) * nodeSizeH;
                }
            }

        }
        if (array[i].id == 1) {
            array[i].x = width / 2;
        }
    }
    return array;
}


function cl_size(geneHi, nodeSizeW) {
    var c_count = 0;
    for (var l in geneHi) {
        c_count += 1;
        if (geneHi[l] != 1) {

            c_count += 0.2;
        }
    }

    return c_count;

}

function user_money(array) {
    var user_ar = [];
    //user_archi.push([array[1].architect, array[1].total_points]);

    var user = [];
    var t_points = 0;

    for (var i in array) {
        if (i != 0) {
            user.push(array[i].architect);
            t_points += array[i].total_points;
        }
    }


// 重複を削除したリスト
    var user_only = user.filter(function (x, i, self) {
        return self.indexOf(x) === i;
    });


    for (var k in user_only) {
        var ar = {'user': user_only[k], 'points': 0};

        user_ar.push(ar);

        for (var t in array) {
            if (t != 0) {


                if (user_only[k] == array[t].architect) {
                    user_ar[k].points += array[t].total_points;
                }
            }
        }
    }

    return user_ar;
}

function graph_bar(array) {

    SortScore(array, "points");

    for (var i = 0; i < array.length; i++) {
        var xx = 0;
        var pitch = 30;
        var yy = pitch * i;
        var bar_height = 20;
        array[i].x = xx;
        array[i].y = yy;
    }


    var margin = {top: 20, right: 20, bottom: 70, left: 100},
        width = 600 - margin.left - margin.right,
        height = 1000 - margin.top - margin.bottom;

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

    var svg = d3.select(".pure-u-5-24").append("svg")
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

    g.append("rect")
        .attr("class", "bar")
        .style("fill", d3.rgb(223, 206, 58))
        .attr("x", d.x)
        .attr("y", d.y)
        .attr("height", bar_height)
        .attr("width", function (d) {
            var u_cost = cost_cal(array, d.user);

            return u_cost[1] / 10000;
        })
        .attr("transform", function (d) {
            return "translate(0," + d.y + ")";
        });

    g.append("text")
        .attr("x", function (d) {
            return d.x - 40;
        })
        .attr("y", function (d) {
            var yyy = d.y + bar_height / 2;
            return yyy;
        })
        .attr("dy", ".35em")
        .style("font-size", 10)
        .style("text-anchor", "end")
        .text(function (d) {
            var aaa = d.user;
            return aaa;
        });
    g.append("text")

        .attr("x", function () {
            return d.x;
        })
        .attr("y", function (d) {
            var yyy = d.y + bar_height / 2;
            return yyy;
        })
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .style("font-size", 10)
        .text(function (d) {
            var u_cost = cost_cal(array, d.user);
            return u_cost[0];
        });


}

function cost_cal(list, user) {
    var total_cost = 0;
    var all_cost = 0;

    for (var i in user_list) {
        all_cost += user_list[i].points;
        if (user == user_list[i].user) {
            total_cost = user_list[i].points;
        }

    }
    var user_cost = Math.floor((1000000 / all_cost) * total_cost);

    var user_costNew = user_cost.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

    return [user_costNew, user_cost];

}








