define( [
    "css!./css/TTL-Branded-d3-Column-Chart.css",
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
                var hc = layout.qHyperCube, self = this;
                if ( !this.table ) {
                    this.table = qlik.table( this );
                }
                $element.empty();
                var _data = [], _labels = [];
                for (var i = 0 ; i < this.table.rows[0].measures.length ; i++ ){
                    _data.push([]);
                    for(var j = 0 ; j < this.table.rows.length ; j++ ){
                        _data[i].push({name: this.table.rows[j].dimensions[0].qText, value: this.table.rows[j].measures[i].qNum});
                    }
                    _labels.push(this.table.rows[0].measures[i].qMeasureInfo.qFallbackTitle);
                }
                charts.drawColumnChart(_data, _labels, 'd3-column-chart', $element, layout);
                $element.find('rect.column').on('qv-activate', function(e) {
                    if(this.hasAttribute("data-value")) {
                        var value = parseInt(this.getAttribute("data-qelemnumber"), 10), dim = 0;
                        self.selectValues(dim, [value], true);
                    }
                });
            },
        };
    } );