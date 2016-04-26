define( [], function () {
    'use strict';
    var dimensions = {
        uses: "dimensions"
    };
    var measures = {
        uses: "measures"
    };
    var sorting = {
        uses: "sorting"
    };
    var chartTitle = {
        ref: "ttl-columnchart-props.chartTitle",
        label: "Chart Title",
        type: "string"
    };
    var captionText = {
        ref: "ttl-columnchart-props.captionText",
        label: "Caption Text",
        type: "string",
        component: "textarea"
    };
    var displayLegend = {
        ref: "ttl-columnchart-props.displayLegend",
        label: "Display Legend?",
        type: "boolean",
        defaultValue: false
    }
    var legendPosition = {
        ref: "ttl-columnchart-props.legendPosition",
        component: "dropdown",
        label: "Legend Position",
        type: "string",
        options: [{
                value: "e",
                label: "East"
            },{
                value: "w",
                label: "West"
            }],
    };    
    var customSection = {
        component: "expandable-items",
        label: "Labels",
        items: {
            chartTile: chartTitle,
            captionText: captionText,
            displayLegend: displayLegend,
            legendPosition: legendPosition
        }
    };
    return {
        type: "items",
        component: "accordion",
        items: {
            dimensions: dimensions,
            measures: measures,
            sorting: sorting,
            customSection: customSection
        }
    };
})