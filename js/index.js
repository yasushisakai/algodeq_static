function treeDiagram() {
    var modelGene = impData[0];


    var nodeSizeW = 100,
        nodeSizeH = 100,
        mxDiv = width / nodeSizeW;

    var width = 1200,
        height = 600,
        scl = 1.2;

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

    var cluster_sizeH = nodeSizeH * 2 * geneMax;

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
    //console.log(geneHi);


    //樹形図領域生成
    cluster = d3.layout.tree()
        .size([width, cluster_sizeH]);

    var diagonal = d3.svg.diagonal()

        .projection(function (d) {
            return [d.x, d.y];
        });

    var dx = (width * scl - width) * 0.5;
    var dy = (height * scl - height) * 0.5;

    //DOM svgのフィールドを作成
    var svg = d3.select(".pure-u-19-24").append("svg")
        .attr("width", width * scl)
        .attr("height", cluster_sizeH * scl)
        .append("g")
        .attr("transform", "translate(" + dx + "," + dy + ")");

    netnode(modelGene);

    //樹形図を作成する
    function netnode(json) {
        var nodes = cluster.nodes(json),
            links = cluster.links(nodes);


        var ar = [0];
        var link = svg.selectAll(".link")
            .data(links)
            .enter().append("path")
            .attr("class", "link")

            .attr("d", diagonal)
            .style("stroke-width", function (d) {
                //console.log(d);
                var wd;
                var wid = d.target.similarity;
                if (wid == 0) {
                    wd = 1;
                } else {
                    wd = (wid) * 4;
                }

                return wd;
            });

        var array_node = [];
        var node = svg.selectAll(".node")
            .data(nodes)
            .enter().append("g")
            .attr("class", "node")

            .attr("transform", function (d) {
                var yy = d.y;
                if (d.y > 400) {
                    yy = d.y;// + Math.random() * 50;
                }
                //console.log(d.id + "::"+d.y);
                return "translate(" + d.x + "," + yy + ")";
            });

        var arr = [];
        node.append("circle")
            .attr("r", nodeSizeW / 2 + 5)

            .style("stroke", "none")
            .style("stroke-width", 1)
            .style('opacity', 0.5)
            .attr("transform", function (d) {

                var t_x = pos_trance(d, arr);
                return "translate(" + t_x[0] + "," + t_x[1] + ")";
            });


        //各サムネイルを入れ込む
        var array_image = [];
        node.append("svg:image")
            .attr("xlink:href", function (d) {
                var name = d.name;
                var ch = d.paID;
                var tm = d.time;
                return "/media/plans/img_" + d.name + ".png";
                //return "/media/plans/img_tokyo_0.png";

            })
            .attr("x", -nodeSizeW / 2)
            .attr("y", -nodeSizeH / 2)
            .attr("width", nodeSizeW)
            .attr("height", nodeSizeH)
            .attr("transform", function (d) {

                var t_x = pos_trance(d, array_image);
                return "translate(" + t_x[0] + "," + t_x[1] + ")";
            });

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


        //console.log(arr);
//        var a_text = [];
//        node.append("text")
//            .attr("dy", -nodeSizeH / 2 + 20)
//            .style("text-anchor", "middle")
//
//            .text(function (d) {
//                return d.name;
//            })
//            .attr("transform", function (d) {
//
//                var t_x = pos_trance(d, a_text);
//                return "translate(" + t_x[0] + "," + t_x[1] + ")";
//           });

        //テキストの基準座標 [x,y,height]
        var textPos = [10, -10, 10];

        //ID
        a_text = [];
        node.append("text")
            .attr("dx", -nodeSizeW / 2 + textPos[0])
            .attr("dy", nodeSizeH / 2 + textPos[1])
            .style("text-anchor", "start")
            .text(function (d) {
                return "id: " + d.id;
            })
            .attr("transform", function (d) {

                var t_x = pos_trance(d, a_text);
                return "translate(" + t_x[0] + "," + t_x[1] + ")";
            });

        //name
        a_text = [];
        node.append("text")
            .attr("dx", -nodeSizeW / 2 + textPos[0])
            .attr("dy", nodeSizeH / 2 + textPos[1] + 10)
            .style("text-anchor", "start")
            .text(function (d) {
                return "name: " + d.name;
            })
            .attr("transform", function (d) {

                var t_x = pos_trance(d, a_text);
                return "translate(" + t_x[0] + "," + t_x[1] + ")";
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
            })
            .attr("transform", function (d) {

                var t_x = pos_trance(d, a_text);
                return "translate(" + t_x[0] + "," + t_x[1] + ")";
            });

        //diff
        a_text = [];
        node.append("text")

            .attr("dy", -nodeSizeH / 2 + 20)
            .style("text-anchor", "middle")

            .text(function (d) {

                var sim = d.similarity * 100;

                return sim.toFixed(1) + "%";
            })
            .attr("transform", function (d) {

                var t_x = pos_trance(d, a_text);
                return "translate(" + t_x[0] + "," + t_x[1] + ")";
            });


        //point
        a_text = [];
        node.append("text")

            .attr("dx", -nodeSizeH / 2 + 20)
            .attr("dy", -nodeSizeH / 2 + 40)
            .style("text-anchor", "end")

            .style("font-size", function (d) {
                var pnt = d.total_points;
                var clr = 10;
                SortScore(nodes, "total_points");

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
                SortScore(nodes, "total_points");

                for (var i = 1; i < 6; i++) {
                    if (nodes[i].id == d.id) {
                        clr = (255 / 5) * (5 - i);

                    }
                }

                return d3.rgb(Math.round(clr), 0, 0);

            })
            .style("font-weight", function (d) {
                SortScore(nodes, "total_points");
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
            })
            .attr("transform", function (d) {

                var t_x = pos_trance(d, a_text);
                return "translate(" + t_x[0] + "," + t_x[1] + ")";
            });

        //rank
        a_text = [];
        node.append("text")

            .attr("dx", -nodeSizeH / 2 + 10)
            .attr("dy", nodeSizeH / 2 + textPos[1] - 10)
            .style("text-anchor", "start")
            .attr("transform", function (d) {

                var t_x = pos_trance(d, a_text);
                return "translate(" + t_x[0] + "," + t_x[1] + ")";
            })

            .text(function (d) {

                var rank = Lst_sort();
                var rk;
                for (var i in rank) {
                    if (d.id == rank[i].id) {
                        rk = rank[i].rank;
                    }
                }

                return "rank:" + rk;
            })
        ;

//        arr = [];
//        node.append("circle")
//            .attr("r", nodeSizeW / 2 + 5)
//
//            .style("fill","none")
//            .style("stroke", d3.rgb(255,0,0))
//            .style("stroke-width", 1)
//            .style('opacity', function (d) {
//                SortScore(nodes, "total_points");
//                var sty = 0;
//
//                for (var i = 1; i < 6; i++) {
//                    if (nodes[i].id == d.id) {
//                        sty  =  (6 - i)/6;
//                    }
//                }
//                ;
//
//                return sty;
//            })
//            .attr("transform", function (d) {
//
//                var t_x = pos_trance(d, arr);
//                return "translate(" + t_x[0] + "," + t_x[1] + ")";
//            });


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
                console.log(k + "::" + pn + "::" + IDD);
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
        var counter = 0;
        for (var l in rank) {
            counter += 1;
            if (node[i].id == rank[l]) {
                node[i]["rank"] = counter;
            }
        }

    }

    return node;

}

//配列をソート
function SortScore(array, parameter) {

    array.sort(function (a, b) {
        var aa = eval("a." + parameter);
        var bb = eval("b." + parameter);
        if (parameter == "rank") {
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
        ranker.push(array[i].id);
    }
    return ranker;
}


//List DOMを生成

function domMaker(array) {


    for (var i in array) {


        document.write("<tr>");
        document.write("<td >");
        document.write(array[i].rank);
        document.write("</td>");
        document.write("<td >");
        document.write(array[i].id);
        document.write("</a></td><td>");
        document.write("<a href=" + array[i].url + " OnMouseOver='MouseIn("+array[i].id+");' OnMouseOut='MouseOut("+array[i].id+");'>");
        document.write(array[i].name);
        document.write("</a></td><td>");
        var pnts = array[i].total_points;
        document.write(pnts.toFixed(1));
        document.write("</td><td>");
        var smt = array[i].similarity * 100;
        document.write(smt.toFixed(1));
        document.write("</td><td>");
        document.write(array[i].creation_time);
        document.write("</td>");
        document.write("</tr>");

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
            ttt += "<tr>";
            ttt += "<td>" + array[i].rank + "</td>";

            ttt += "<td>" + array[i].id + "</td>";
            ttt += "<td><a href=" + array[i].url + " OnMouseOver='MouseIn("+array[i].id+");' OnMouseOut='MouseOut("+array[i].id+");'>" + array[i].name + "</a></td>";
            var pnts = array[i].total_points;
            ttt += "<td>" + pnts.toFixed(1) + "</td>";
            var smt = array[i].similarity * 100;
            ttt += "<td>" + smt.toFixed(1) + "</td>";
            ttt += "<td>" + array[i].creation_time + "</td>";

            ttt += "</tr>";
            ttt += "</td>";
        }

        return ttt;
    }

}

function MouseIn(id) {
    var svg = d3.select(".pure-u-19-24");
    svg.selectAll(".node")

        .style('opacity', 0.8)
        .style('fill', function (d) {
            if (id == d.id) {
                return d3.rgb(223, 206, 58);
            }

        });

}

function MouseOut(id) {
    var svg = d3.select(".pure-u-19-24");
    svg.selectAll(".node")

        .style('opacity', 0.8)
        .style('fill', function (d) {
            if (id == d.id) {
                return d3.rgb(0, 0, 0);
            }

        });

}







