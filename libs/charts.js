define([
    "./legend"
    ],
    function(
    legend
    ){  
    return{
        drawColumnChart: function(data, labels, target, container, layout){
            var colors = [
                '#1f78b4','#33a02c','#e31a1c','#ff7f00','#6a3d9a','#b15928',
                '#62a3d0','#72bf5b','#ef5a5a','#fe9f37','#9a77b8','#d8ac60',
                '#a6cee3','#b2df8a','#fb9a99','#fdbf6f','#cab2d6','#ffff99'
            ];  
            var width = container.width(),
                height = container.height(),
                legendWidth = 0;

            if(layout["ttl-columnchart-props"].displayLegend){
                legend.drawLegend(data, labels, colors, container, layout);
                legendWidth = $('.legend', container).width();
            }
            
            var containerSelection = d3.select(container[0]);

            var chart = containerSelection.append("svg")
                .attr("width", width - legendWidth)
                .attr("height", height)
                .html("")
                .attr("class", target);
            
            var gap = layout["ttl-columnchart-props"].multiSeriesGap;
            
            var y = d3.scale.linear()
                .range([height, 0]);
            
            var _dataCollate = {max:[], length:[]};
            $.each(data, function(idx, elem){
                _dataCollate.max.push(d3.max(elem));
                _dataCollate.length.push(elem.length)
            });
            y.domain([0, d3.max(_dataCollate.max)]);
            var barWidth = (width / d3.max(_dataCollate.length))/data.length;
            for(var i = 0 ; i < data.length ; i++){             
                
                var bar = [];
                bar[i] = chart.selectAll(".series")
                    .data(data[i])
                    .enter().append("g")
                    .attr("transform", function(d, idx) {
                        return "translate(" + ((idx * seriesWidth) + (barWidth * ((100 - gap)/100) * i)) + ",0)"; 
                    });
                    
                bar[i].append("rect")
                    .attr("y", function(d) { 
                        return y(d); 
                        })
                    .attr("height", function(d) {
                        return height - y(d); 
                        })
                    .attr("width", barWidth * (100 - gap)/100)
                    .attr("fill", function(d, idx){
                        return colors[i];
                    });
            }
            if(layout["ttl-columnchart-props"].displayLegend && layout["ttl-columnchart-props"].legendPosition === 'w'){
                chart.style("transform", "translateX(" + legendWidth + "px)");
            }
        }
    }
    }
);