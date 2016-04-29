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
                bottomPadding = 20,
                leftPadding = 0,
                rightPadding = 20,
                xAxisHeight = 0,
                yAxisWidth = 0;

            var _dataCollate = {max:[], length:[]};
            $.each(data, function(idx, elem){
                _dataCollate.max.push(d3.max(elem.map(function(elem2){ return elem2.value})));
                _dataCollate.length.push(elem.length)
            });
            
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
            
            var xDomain = data[0].map(function(elem){return elem.name})
            var x = d3.scale.ordinal()
                .rangeRoundBands([0, width - legendWidth - leftPadding - rightPadding], 0, 0);
            x.domain(xDomain);
            var x_axis = d3.svg.axis().scale(x);
            var axis_x = d3.select("svg")
                .append("g")
                .attr("class", "x axis")
                .call(x_axis)
                .selectAll("text")	
                    .style("text-anchor", "end")
                    .attr("dx", "-.8em")
                    .attr("dy", ".15em")
                    .attr("transform", function(d) {
                        return "rotate(-" + props.xAxisTickLabelRotation + ")" 
                });;
            xAxisHeight = d3.select('g.x.axis')[0][0].getBBox().height; 
            
            var plotHeight = height - chartTitleHeight - captionTextHeight - topPadding - bottomPadding - xAxisHeight;
            
            var y = d3.scale.linear()
                .range([plotHeight, 0]);
            y.domain([0, d3.max(_dataCollate.max)]);
            var y_axis = d3.svg.axis().scale(y).orient("left").tickFormat(d3.format("s"));
            var axis_y = d3.select("svg")
                .append("g")
                .attr("class", "y axis")
                .call(y_axis);
            yAxisWidth = axis_y[0][0].getBBox().width; 
            d3.select('g.x.axis').remove();            
            
            x = d3.scale.ordinal()
                .rangeRoundBands([0, width - legendWidth - yAxisWidth - leftPadding - rightPadding], 0, 0);
            x.domain(xDomain);
            x_axis = d3.svg.axis().scale(x);
            axis_x = d3.select("svg")
                .append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(" + yAxisWidth + leftPadding + "," + (height - bottomPadding - xAxisHeight) + ")")
                .call(x_axis)
                .selectAll("text")	
                    .style("text-anchor", "end")
                    .attr("dx", "-.8em")
                    .attr("dy", ".15em")
                    .attr("transform", function(d) {
                        return "rotate(-" + props.xAxisTickLabelRotation + ")" 
                });
                
            axis_y.attr("transform", "translate(" + yAxisWidth + leftPadding + ", "  + (chartTitleHeight + captionTextHeight + topPadding) + ")");
            
            var plotWidth = width - yAxisWidth - leftPadding - rightPadding;
            
            var barWidth = x.rangeBand()/data.length;
            var seriesWidth = x.rangeBand();
            var gap = props.multiSeriesGap * 0.01 * barWidth;
            
            for(var i = 0 ; i < data.length ; i++){             
                
                var bar = [];
                bar[i] = chart.selectAll(".series")
                    .data(data[i])
                    .enter()
                    .append("g")
                    .attr("transform", function(d, idx) {
                        return "translate(" + ((yAxisWidth + leftPadding) + (x(d.name) + ((barWidth - gap) * i)) + gap) + ",0)"; 
                    });
                    
                bar[i].append("rect")
                    .classed("column", true)
                    .attr("data-qelemnumber", function(d, idx){
                        return layout.qHyperCube.qDataPages[0].qMatrix[idx][0].qElemNumber;
                    })
                    .attr("data-name", function(d){
                        return d.name;
                    })
                    .attr("data-value", function(d){
                        return d.value;
                    })                 
                    .attr("data-series", function(d){
                        return labels[i];
                    })       
                    .attr("y", function(d) { 
                        return y(d.value) + chartTitleHeight + captionTextHeight + topPadding; 
                        })
                    .attr("height", function(d) {
                        return plotHeight - y(d.value); 
                        })
                    .attr("width", barWidth - gap)
                    .attr("fill", function(d, idx){
                        return colors[i];
                    });
                    
                bar[i].append("title")
                    .text(function(d, idx){
                        return [d.name, ": ", d.value, " (", labels[i], ")"].join('');
                    });
                
            }
            if(props.displayLegend && props.legendPosition === 'w'){
                chart.style("transform", "translateX(" + legendWidth + "px)");
            }
        }
    }
    }
);