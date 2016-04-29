define( [], function () {
    'use strict';
    var dimensions = {
        uses: "dimensions",
        min: 1,
        max: 1
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
    var multiSeriesGap = {
        ref: "ttl-columnchart-props.multiSeriesGap",
        component: "slider",
        label: "% Gap between measures",
        type: "number",
        min: 0,
        max: 100
    }
    var xAxisTickLabelRotation = {
        ref: "ttl-columnchart-props.xAxisTickLabelRotation",
        component: "slider",
        label: "X Axis Tick Label Rotation (°)",
        type: "number",
        min: 0,
        max: 90
    };
    var customSection = {
        component: "expandable-items",
        label: "Labels & Legend",
        items: {
            chartTile: chartTitle,
            captionText: captionText,
            displayLegend: displayLegend,
            legendPosition: legendPosition
        }
    };
    var appearanceSection = {
            component: "expandable-items",
            label: "Appearance",
            items:{
                multiSeriesGap: multiSeriesGap,
                xAxisTickLabelRotation: xAxisTickLabelRotation
            }
    }
    return {
        type: "items",
        component: "accordion",
        items: {
            dimensions: dimensions,
            measures: measures,
            sorting: sorting,
            customSection: customSection,
            appearanceSection: appearanceSection
        }
    };
})