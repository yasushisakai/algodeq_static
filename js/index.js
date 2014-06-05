function treeDiagram() {
    var data = impData[0];
    console.log(data);

    var width = 500,
        height = 500,
        scl = 1.2;

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

    netnode(data);

    //樹形図を作成する
    function netnode(json) {
        var nodes = cluster.nodes(json),
            links = cluster.links(nodes);

        var link = svg.selectAll(".link")
            .data(links)
            .enter().append("path")
            .attr("class", "link")
            .attr("d", diagonal);

        var node = svg.selectAll(".node")
            .data(nodes)
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
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
            .attr("x", "-50px")
            .attr("y", "-70px")
            .attr("width", "100px")
            .attr("height", "100px");

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
                return d.children ? -8 : 8;
            })
            .attr("dy", 3)
            .style("text-anchor", function (d) {
                return d.children ? "end" : "start";
            })
            .text(function (d) {
                return d.name;
            });
    }

    d3.select(self.frameElement).style("width", width + "py");

    function gotoView(modelName) {

        var link = "plan/"+modelName;
        location.href = link;

    }
}
