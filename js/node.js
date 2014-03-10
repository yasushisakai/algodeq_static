

//樹形図作成js
var myJSONObject = {};//モデルデータ一覧
var modelGene = [];//世代を記録する配列


var JYUKEI = [];
//樹形図の階層を探る


for (var ii = 0; ii < modelParentId.length; ii++) {
    //var idss = modelIds[ii];
    var idss = modelIds.indexOf(ii+1);
    //console.log(ii+":"+idss);
    var pID = modelParentId[idss];
    var currentpID = pID;
    var cou = 0;
    var chi = [];
    var ob = {"name":modelNames[idss], "ID":modelIds[idss], "children":chi, "paID":pID, "ipt":modelInitialPoints[idss], "apt":modelAdditionalPoints[idss], "cost":modelCosts[idss], "mpd":modelParentDifference[idss], "time":modelCreationTime[idss]};
    JYUKEI.push(ob);

    while (currentpID != 0) {
        currentpID = ID(currentpID);
        cou += 1;
    }
    modelGene.push(cou);
}
console.log(JYUKEI);

var mx = Math.max.apply(null, modelGene);

var my = array_count_values(modelGene);


//自分の子供データをインポート
for (var k = JYUKEI.length - 1; k >= 0; k--) {
    var pn = JYUKEI[k].paID;//modelParentId[k];
    if (pn > 0) {
        var IDD = pn-1;//modelIds.indexOf(pn);
        console.log(k+"::"+pn+"::"+IDD);
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

//キャンバスサイズ
//var width = mx * 200;//1280,
//var height = my * 150;//768;

var width = 1280;
var height =768;

var hc = height/2/100;

//drag用の設定(polymap)
var po = org.polymaps;

// Create the map object, add it to #map…
var map = po.map()
    .container(d3.select("#map").append("svg:svg").node())
    .center({lat:hc+2, lon:12})
    .zoom(6)
    .zoomRange([5, 7])
    .add(po.interact());


// Add the compass control on top.
//map.add(po.compass()
//    .pan("none"));

//d3初期設定
var cluster = d3.layout.tree()
    .size([height, -width - 160]);

var diagonal = d3.svg.diagonal()
    .projection(function (d) {

        d = map.pointLocation({x:d.y, y:d.x});

        var ll = -d.lon;// + 20;
        var la = d.lat;// + 3;

        return [ll * 50, la * 50];

        //return [d.y, d.x];
    });

var layer = d3.select("#map svg")
    //.insert("svg:g", ".compass")
    .insert("svg:g")
    .attr("width", width)
    .attr("height", height);


//樹形図描画
var nodes = cluster.nodes(myJSONObject);

//
var link = layer.selectAll("g")
    //.insert("svg:g")
    .data(cluster.links(nodes))
    .enter().append("path")
    .attr("class", "link")
    .attr("d", diagonal)

    .style("stroke-width", function (d) {
        return Math.round(d.target.mpd * 5);
    });

var node = layer.selectAll("g")
    .data(nodes)
    .enter().append("svg:g")
    .attr("class", "node")

    .attr("transform", transform);


node.append("svg:image")
    .attr("xlink:href", function (d) {
        var name = d.name;
        var ch = d.paID;
        var tm = d.time;
        return "http://lmnarchitecture.com/thumbnail/" + name + "_" + ch + "_" + tm + "_s.png";
    })
    .attr("x", "-50px")
    .attr("y", "-70px")
    .attr("width", "100px")
    .attr("height", "100px");


var xDis = 30;
var yDis = -40;

layer.selectAll("g")
    .on("mouseover", function (d, i) {
        d3.select(this)
            .style('opacity', 0.8)
            .style('fill', d3.rgb(0, 0, 255));
    })
    .on("mouseout", function (d, i) {
        d3.select(this)
            .style("fill", d3.rgb(0, 0, 0))
            .style('opacity', 1);

    })
    .on("click", function (d, i) {
        d3.select(this)
            .style("fill", d3.rgb(255, 0, 0));

        //link設定
        gotoView(d.ID, d.paID);
    });

node.append("text")
    .attr("dx", -40)
    .attr("dy", 7)
    .attr("text-anchor", "left")
    .style("font", "7px  sans-serif")
    .text(function (d) {
        return "ID: ";
    });

node.append("text")
    .attr("dx", -40)
    .attr("dy", 20)
    .attr("text-anchor", "left")
    .style("font", "15px sans-serif")
    .text(function (d) {
        return d.ID;
    });

node.append("text")
    .attr("dx", xDis)
    .attr("dy", yDis - 10)
    .attr("text-anchor", "left")
    .style("font", "7px  sans-serif")
    .text(function (d) {
        return "モデル名";
    });

node.append("text")
    .attr("dx", xDis)
    .attr("dy", yDis)
    .attr("text-anchor", "left")
    .text(function (d) {
        return d.name;
    });
//
//node.append("text")
//    .attr("dx", xDis)
//    .attr("dy", yDis + 5)
//    .attr("text-anchor", "left")
//    .style("font","7px  sans-serif")
//    .text(function (d) {
//        return "------------------";
//    });

node.append("text")
    .attr("dx", xDis)
    .attr("dy", yDis + 15)
    .attr("text-anchor", "left")
    .text(function (d) {
        return "親ID: " + d.paID;
    });

node.append("text")
    .attr("dx", xDis)
    .attr("dy", yDis + 25)
    .attr("text-anchor", "left")
    .text(function (d) {
        return "dif: " + Math.floor(d.mpd * 10000) / 100 + "%";
    });


//node.append("text")
//    .attr("dx", xDis)
//    .attr("dy", yDis + 40)
//    .attr("text-anchor", "left")
//    .text(function (d) {
//        return "i:" + d.ipt +"pts +"+"a:" + d.apt +"pts";
//    });

node.append("text")
    .attr("dx", xDis)
    .attr("dy", yDis + 50)
    .attr("text-anchor", "left")
    .text(function (d) {
        var sum = d.ipt + d.apt;
        return sum + "pts";
    });

node.append("text")
    .attr("dx", xDis)
    .attr("dy", yDis + 60)
    .attr("text-anchor", "left")
    .text(function (d) {
        return d.cost + "万円";
    });


map.on("move", function () {
    layer.selectAll("g").attr("transform", transform);
    layer.selectAll("g path").attr("d", diagonal);
});

//マウスドラッグ関数

function transform(d) {
    var xxx, yyy;
    var name;
    if (d.x == undefined) {
        xxx = d.source.x;
        yyy = d.source.y;
    } else {
        xxx = d.x;
        yyy = d.y;//console.log(d.x);
    }
    var x = xxx;
    var y = yyy;

    d = map.pointLocation({x:y, y:x});

    var ll = -d.lon;
    var la = d.lat;

    return "translate(" + ll * 50 + "," + la * 50 + ")";

}

//オブジェクトのページへのリンク

function gotoView(modelId, modelParentId) {
    var form = document.createElement("form");
    document.body.appendChild(form);

    var modelIdInput = document.createElement("input");
    modelIdInput.setAttribute("type", "hidden");
    modelIdInput.setAttribute("name", "modelId");
    modelIdInput.setAttribute("value", modelId);
    form.appendChild(modelIdInput);


    var modelParentId = document.createElement("input");
    modelParentId.setAttribute("type", "hidden");
    modelParentId.setAttribute("name", "modelParentId");
    modelParentId.setAttribute("value", modelParentId);
    form.appendChild(modelIdInput);

    form.setAttribute("action", "view.php");
    form.setAttribute("method", "post");
    form.submit();
}
//配列内の最も多い要素の数を調べる
function array_count_values(array) {

    var tmp_arr = {},
        key = '',
        t = '';

    var __getType = function (obj) {
        // Objects are php associative arrays.
        var t = typeof obj;
        t = t.toLowerCase();
        if (t === "object") {
            t = "array";
        }
        return t;
    };

    var __countValue = function (value) {
        switch (typeof(value)) {
            case "number":
                if (Math.floor(value) !== value) {
                    return;
                }
            // Fall-through
            case "string":
                if (value in this && this.hasOwnProperty(value)) {
                    ++this[value];
                } else {
                    this[value] = 1;
                }
        }
    };

    t = __getType(array);
    if (t === 'array') {
        for (key in array) {
            if (array.hasOwnProperty(key)) {
                __countValue.call(tmp_arr, array[key]);
            }
        }
    }
    //return tmp_arr;

    var countArray = [];
    for (var i in  tmp_arr) {
        countArray.push(tmp_arr[i]);
    }
    var maxCount = Math.max.apply(null, countArray);

    return maxCount;
}







