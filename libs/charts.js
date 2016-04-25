function drawColumnChart(data, target, container){
    var colors = [
        '#1f78b4','#33a02c','#e31a1c','#ff7f00','#6a3d9a','#b15928',
        '#62a3d0','#72bf5b','#ef5a5a','#fe9f37','#9a77b8','#d8ac60',
        '#a6cee3','#b2df8a','#fb9a99','#fdbf6f','#cab2d6','#ffff99'
    ];  
    var width = container.width(),
        height = container.height();

    var y = d3.scale.linear()
        .range([height, 0]);
    y.domain([0, d3.max(data)]);

    var containerSelection = d3.select(container[0]);

    var chart = containerSelection.append("svg")
        .attr("width", width)
        .attr("height", height)
        .html("")
        .attr("class", target);
        
    var barWidth = width / data.length;
    var bar = chart.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function(d, i) {
            return "translate(" + i * barWidth + ",0)"; 
        });
        
    bar.append("rect")
        .attr("y", function(d) { 
            return y(d); 
            })
        .attr("height", function(d) {
            return height - y(d); 
            })
        .attr("width", barWidth - 1)
        .attr("fill", function(d, i){
            return colors[i%colors.length];
        });
}