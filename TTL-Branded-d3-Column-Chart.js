define( [
    "css!./css/TTL-Branded-d3-Line-Chart.css",
    "./libs/d3.min",
    "./libs/charts",
    "./properties",
    "qlik"
    ],
    function (
        cssContent,
        d3,
        charts,
        props,
        qlik
        ) {
        'use strict';

        return {
            definition: props,
            initialProperties: {
                qHyperCubeDef: {
                    qDimensions: [],
                    qMeasures: [],
                    qInitialDataFetch: [
                        {
                            qWidth: 10,
                            qHeight: 50
                        }
                    ]
                }
            },
            paint: function ( $element, layout ) {
                var hc = layout.qHyperCube;
                if ( !this.table ) {
                    this.table = qlik.table( this );
                }
                $element.empty();
                var _data = [], _labels = [];
                for (var i = 0 ; i < this.table.rows[0].measures.length ; i++ ){
                    var _tmp = this.table.rows.map(function(elem){
                        return elem.measures[i].qNum;
                    });
                    _data.push(_tmp);
                }
                for (var i = 0 ; i < this.table.rows[0].measures.length ; i++ ){
                    _labels.push(this.table.rows[0].measures[i].qMeasureInfo.qFallbackTitle);
                }                      
                charts.drawColumnChart(_data, _labels, 'd3-column-chart', $element, layout);
            },
        };
    } );