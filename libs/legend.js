define([],function(){
    return{
        drawLegend: function(data, labels, colors, container, layout){
            var legendContainer = $("<div class='legend'></div>");
            legendContainer.addClass(layout["ttl-columnchart-props"].legendPosition)
            var ul = $("<ul></ul>");
            $.each(labels, function(idx, elem){
                var li = "<li class='legend-item'><span class='legend-indicator' style='background-color: " + colors[idx] + "'></span> " + elem + "</li>";
                ul.append(li);
            });
            legendContainer.append(ul);
            container.append(legendContainer);
        }
    }
});
