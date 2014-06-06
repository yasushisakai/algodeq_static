function treeDiagram() {
    var modelGene = impData[0];


    var width = 500,
        height = 500,
        scl = 1.2;

    var nodeSizeW = 100,
        nodeSizeH = 100,
        mxDiv = width / nodeSizeW;


    var cluster = d3.layout.tree()
        .size([width, height]);

    var diagonal = d3.svg.diagonal()

        .projection(function (d) {
            return [d.x, d.y];
        });

    var dx = (width * scl - width) * 0.5;
    var dy = (height * scl - height) * 0.5;

    //DOM svgのフィールドを作成
    var svg = d3.select("body").append("svg")
        .attr("width", width * scl)
        .attr("height", height * scl)
        .append("g")
        .attr("transform", "translate(" + dx + "," + dy + ")");

    netnode(modelGene);

    //樹形図を作成する
    function netnode(json) {
        var nodes = cluster.nodes(json),
            links = cluster.links(nodes);
        var my = array_count_values(nodes);
        console.log(my);
        //console.log(nodes[0].children.length);


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
            })

        //各サムネイルを入れ込む
        node.append("svg:image")
            .attr("xlink:href", function (d) {
                var name = d.name;
                var ch = d.paID;
                var tm = d.time;
                //return "http://lmnarchitecture.com/thumbnail/" + name + "_" + ch + "_" + tm + "_s.png";
                return "http://www.lmnarchitecture.com/thumbnail/woodWall_17_20120518100934_s.png";
            })
            .attr("x", -nodeSizeW / 2)
            .attr("y", -nodeSizeH / 2)
            .attr("width", nodeSizeW)
            .attr("height", nodeSizeH);

        svg.selectAll(".node")
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

                gotoView(d.name);
            });

        node.append("circle")
            .attr("r", 4.5);

        node.append("text")
            .attr("dx", function (d) {
                return d.children ? -20 : 20;
            })
            .attr("dy", 3)
            .style("text-anchor", function (d) {
                return d.children ? "end" : "start";
            })
            .text(function (d) {
                return d.name;
            });
        var ar = [0];
        var link = svg.selectAll(".link")
            .data(links)
            .enter().append("path")
            .attr("class", "link")
            .attr("transform", function (d) {

                if(ar.indexOf(d.target.id)!=1){

                    d.target.y -= nodeSizeH / 2;
                    ar.push(d.target.id);
                    console.log(ar);
                    console.log(d.target.id);
                }

                //console.log(ar);
                //d.target.y -=nodeSizeH/2;
                return "translate(0,0)";
            })
            .attr("d", diagonal);

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

}
