define( ['jquery', 'highstock'], function($) {

	// standard styles

	// TODO extract these from LESS
	var sansFontFamily = 'Arial, "Helvetica Neue", Helvetica, sans-serif';
 	var serifFontFamily = 'Georgia, serif';
	var monoFontFamily = 'Inconsolata, Consolas, monospace';
	var brandFontFamily = '"ge-inspira", Arial, "Helvetica Neue", Helvetica, sans-serif';

	var white = '#fff';
	var grayLighter = '#e1e2e5';
	var gray = '#999c9f';
	var grayDarker = '#313337';
	var blue = '#3b73b9';
	var blueDarker = '#22436b';

	var textColor = grayDarker;

	var gridLineColor = '#d6d5d5';

	var colors = [
		'#08A5E1', '#ED8000', '#76B900', '#711371', '#EE3324',
		'#6BC9ED', '#F4B366', '#ADD566', '#AA71AA', '#F5857C',
		'#056083', '#CA4D00', '#446B00', '#420B42', '#8A1E15',
	];

	// Theme: styles that apply globally to highcharts
	var theme = {
		// chart colors - highcharts will rotate through these
		colors: colors,
		lang: {
			rangeSelectorZoom: ''
		},
		chart: {
			borderWidth: 0,
			plotBackgroundColor: null,
			backgroundColor: null,
			plotShadow: false,
			plotBorderWidth: 0,
			// margin: 0,
			// marginLeft: 0,
			// marginTop: 0,
			// marginRight: 0,
			// marginBottom: 0,
			spacingTop: 0,
			spacingLeft: 0,
			spacingRight: 0,
			spacingBottom: 1,
			borderRadius: 0
		},
		title: {
			text: ' ', // an empty title makes the spacing correct
			x: 0,
			y: 20,
			align: 'left',
			margin: 40,
			style: {
				// same as CSS '.subtitle'
				color: textColor,
				fontFamily: sansFontFamily,
				fontWeight: 'bold',
				fontSize: '14px'
				// fontFamily: brandFontFamily,
				// fontWeight: 'bold',
				// fontSize: '16pt'
			}
		},
		subtitle: {
			x: 0,
			y: 37,
			align: 'left',
			style: {
				color: textColor,
				fontFamily: sansFontFamily,
				fontWeight: 'normal',
				fontSize: '10pt'
			}
		},
		xAxis: {
			gridLineWidth: 0,
			tickWidth: 0,
			lineWidth: 0,
			offset: 10,
			labels: {
				style: {
					color: textColor,
					fontFamily: monoFontFamily,
					fontSize: '10pt'
				}
			},
			title: {
				margin: 20,
				style: {
					color: textColor,
					fontFamily: sansFontFamily,
					fontWeight: 'normal',
					fontSize: '10pt'
				}
			}
		},
		yAxis: {
			gridLineWidth: 1,
			gridLineColor: gridLineColor,
			lineWidth: 0,
			tickWidth: 0,
			offset: 10,
			labels: {
				align: 'right',
				style: {
					color: textColor,
					fontFamily: monoFontFamily,
					fontSize: '10pt'
				}
			},
			title: {
				margin: 20,
				style: {
					color: textColor,
					fontFamily: sansFontFamily,
					fontWeight: 'normal',
					fontSize: '10pt'
				}
			}
		},
		legend: {
			borderWidth: 0,
			align: 'right',
			verticalAlign: 'top',
			floating: true,
			y: 3,
			itemStyle: {
				color: textColor,
				fontFamily: sansFontFamily,
				fontWeight: 'normal',
				fontSize: '10pt'
			},
			// itemHoverStyle: {
			// 	color: '#FFF'
			// },
			// itemHiddenStyle: {
			// 	color: '#333'
			// }
		},
		labels: {
			style: {
				color: textColor,
				fontFamily: sansFontFamily,
				fontWeight: 'normal',
				fontSize: '10pt'
			}
		},
		
		tooltip: {
			backgroundColor: 'rgba(247, 248, 250, 0.85)',
			borderWidth: 1,
			borderColor: grayLighter,
			borderRadius: 3,
			shadow: false,
			// shared: true,
			style: {
				color: grayDarker,
				fontFamily: sansFontFamily,
				fontWeight: 'normal',
				fontSize: '10pt'
			},
			headerFormat: '<span>{point.key}</span><br/>',
			pointFormat: '<span style="color:{series.color}">{series.name}: {point.y}</span><br/>',
		},

		plotOptions: {
			// series options apply globally
			series: {
				animation: false,
                marker: {
					radius: 5
                },
                dataLabels: {
                	style: {
	                	color: textColor,
	                	fontFamily: monoFontFamily,
	                	fontWeight: 'normal',
	                	fontSize: '10pt'
                	}
                },
				shadow: false
			},
			area: {
				marker: {
					enabled: false
				}
			},
			line: {
				marker: {
					enabled: false,
					lineWidth: 1,
					lineColor: '#fff'
				},
				lineWidth: 3
			},
			pie: {
				allowPointSelect: true,
				dataLabels: {
					softConnector: false,
					connectorColor: grayDarker,
					formatter: function() {
						return '<b>'+ this.point.name +'</b>: '+ Highcharts.numberFormat(this.percentage, 2, '.') +'%';
					}
				},
				tooltip: {
					headerFormat: '<span>{point.key}</span><br/>',
					pointFormat: '<span style="color:{point.color}">{point.percentage}</span><br/>',
					percentageDecimals: 2,
					percentageSuffix: '%'
				}
			},
			spline: {
				marker: {
					enabled: false
				}
			},
			scatter: {
				marker: {
					enabled: true
				}
			},
			candlestick: {
				// lineColor: 'white'
			}
		},

		// navigation and exporting are used in right-click tools

		navigation: {
			buttonOptions: {
				backgroundColor: {
					linearGradient: [0, 0, 0, 20],
					stops: [
						[0.4, '#606060'],
						[0.6, '#333333']
					]
				},
				borderColor: '#000000',
				symbolStroke: '#C0C0C0',
				hoverSymbolStroke: '#FFFFFF'
			}
		},

		exporting: {
			buttons: {
				exportButton: {
					symbolFill: '#55BE3B'
				},
				printButton: {
					symbolFill: '#7797BE'
				}
			}
		},

		// range buttons on HighStock charts
		rangeSelector: {
			inputEnabled: false,
			labelStyle: {
				fontFamily: sansFontFamily,
				color: textColor,
				fontSize: '10pt'
			},
         	buttonSpacing: 5,
			buttonTheme: {
	         stroke: 'none',
	         fill: {
	            linearGradient: [0, 19, 0, 19.0001],
	            stops: [
	               [0, white],
	               [1, gray]
	            ]
	         },
	         style: {
	         	color: textColor,
	         	fontFamily: sansFontFamily,
	         	fontSize: '10pt'
	         },
         	padding: 2,
	         states: {
	            hover: {
			         stroke: 'none',
			         fill: {
			            linearGradient: [0, 19, 0, 19.0001],
			            stops: [
			               [0, white],
			               [1, gray]
			            ]
			         },
			         style: {
			         	color: textColor,
			         	fontFamily: sansFontFamily,
			         	fontSize: '10pt'
			         },
	            },
	            select: {
			         stroke: 'none',
			         fill: {
			            linearGradient: [0, 17, 0, 17.0001],
			            stops: [
			               [0, white],
			               [1, blue]
			            ]
			         },
			         style: {
			         	color: textColor,
			         	fontFamily: sansFontFamily,
			         	fontSize: '10pt'
			         },
			     }
		        }
			}
		},

		navigator: {
			handles: {
				backgroundColor: white,
				borderColor: grayDarker
			},
			outlineColor: grayDarker,
			maskFill: 'rgba(255, 255, 255, 0.8)',
			series: {
				color: 'transparent',
				lineColor: blue,
				lineWidth: 2
			},
			xAxis: {
				opposite: true,
				tickWidth: 0,
				gridLineWidth: 0,
				labels: {
					y: 15,
					align: 'center',
					style: {
						color: gray,
						fontFamily: monoFontFamily,
						fontSize: '8pt'
					}
				}
			},
			yAxis: {
				opposite: true,
				tickWidth: 0,
				gridLineWidth: 0,
				labels: {
					x: 15,
					// align: 'center',
					style: {
						color: textColor,
						fontFamily: monoFontFamily,
						fontSize: '10pt'
					}
				}
			}

		},

		scrollbar: {
			barBackgroundColor: {
				linearGradient: [0, 0, 0, 16],
				stops: [
					[0, white],
					[1, grayLighter]
				]
			},
			barBorderColor: grayDarker,
			buttonArrowColor: grayDarker,
			buttonBackgroundColor: {
				linearGradient: [0, 0, 0, 16],
				stops: [
					[0, white],
					[1, grayLighter]
				]
			},
			buttonBorderColor: grayDarker,
			rifleColor: grayDarker,
			trackBackgroundColor: grayLighter,
			trackBorderWidth: 0
		},
		credits: {
			enabled: false
		}
	};

	// Apply the theme
	Highcharts.setOptions(theme);
});
