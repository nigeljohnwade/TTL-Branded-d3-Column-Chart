define([
    "./legend"
    ],
    function(
    legend
    ){  
    return{
        drawColumnChart: function(data, labels, target, container, layout){
            var props = layout["ttl-columnchart-props"];
            var colors = [
                '#1f78b4','#33a02c','#e31a1c','#ff7f00','#6a3d9a','#b15928',
                '#62a3d0','#72bf5b','#ef5a5a','#fe9f37','#9a77b8','#d8ac60',
                '#a6cee3','#b2df8a','#fb9a99','#fdbf6f','#cab2d6','#ffff99'
            ];  
            var width = container.width(),
                height = container.height(),
                legendWidth = 0,
                chartTitleHeight = 0,
                captionTextHeight = 0,
                topPadding = 20,
                bottomPadding = 20;

            if(props.displayLegend){
                legend.drawLegend(data, labels, colors, container, layout);
                legendWidth = $('.legend', container).width();
            }
            
            var containerSelection = d3.select(container[0]);

            var chart = containerSelection.append("svg")
                .attr("width", width - legendWidth)
                .attr("height", height)
                .html("")
                .attr("class", target);
            
            if(props.chartTitle && props.chartTitle.length > 0){
                var chartTitle = chart.append("text")
                    .classed("chart-title", true)
                    .text(function(d, i){
                        return props.chartTitle
                    })
                    .attr("y", function(d, i){
                        return this.offsetHeight;
                    });
                chartTitleHeight = chartTitle[0][0].offsetHeight;
            }
            if(props.captionText && props.captionText.length > 0){
                var captionText = chart.append("text")
                    .classed("caption-text", true)
                    .text(function(d, i){
                        return props.captionText;
                    })
                    .attr("y", function(d, i){
                        return this.offsetHeight + chartTitleHeight;
                    });
                captionTextHeight = captionText[0][0].offsetHeight;
            }
        
            var gap = props.multiSeriesGap;
            var plotHeight = height - chartTitleHeight - captionTextHeight - topPadding - bottomPadding;
            var y = d3.scale.linear()
                .range([plotHeight, 0]);
            
            var _dataCollate = {max:[], length:[]};
            $.each(data, function(idx, elem){
                _dataCollate.max.push(d3.max(elem.map(function(elem2){ return elem2.value})));
                _dataCollate.length.push(elem.length)
            });
            y.domain([0, d3.max(_dataCollate.max)]);
            var barWidth = (width / d3.max(_dataCollate.length))/data.length;
            var seriesWidth = width / d3.max(_dataCollate.length);
            console.log(d3.max(_dataCollate.length));
            for(var i = 0 ; i < data.length ; i++){             
                
                var bar = [];
                bar[i] = chart.selectAll(".series")
                    .data(data[i])
                    .enter()
                    .append("g")
                    .attr("transform", function(d, idx) {
                        return "translate(" + ((idx * seriesWidth) + (barWidth * ((100 - gap)/100) * i)) + ",0)"; 
                    });
                    
                bar[i].append("rect")
                    .attr("y", function(d) { 
                        return y(d.value) + chartTitleHeight + captionTextHeight + topPadding; 
                        })
                    .attr("height", function(d) {
                        return plotHeight - y(d.value); 
                        })
                    .attr("width", barWidth * (100 - gap)/100)
                    .attr("fill", function(d, idx){
                        return colors[i];
                    });
                    
                bar[i].append("title")
                    .text(function(d, idx){
                        return [d.name, ": ", d.value, "(", labels[i], ")"].join('');
                    });
            }
            if(props.displayLegend && props.legendPosition === 'w'){
                chart.style("transform", "translateX(" + legendWidth + "px)");
            }
        }
    }
    }
);