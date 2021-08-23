import React from "react";
import ReactHighcharts from "react-highcharts";

import classes from "../Analytics.module.scss";


interface TimeGraphProps {
    timeGraphDataInitial: any,
    from: string
    to: string

}

const TimeGraph: React.FC<TimeGraphProps> = ({
                                                     timeGraphDataInitial,
                                                     from,
                                                     to,
                                                 }) => {

    const categories = timeGraphDataInitial?.map((item: any) => item.name);

    const config = {
        chart: {
            plotShadow: false,
            type: 'column'
        },
        credits: {
            enabled: false,
        },
        title: {
            text: 'Time of the Day Alarms'
        },
        subtitle: {
            text: 'Bar Chart Showing the Distribution of Alarm during the Day. From: ' + from +' To: ' + to
        },
        xAxis: {
            categories: categories,
            labels: {
                rotation: -30,
                align: 'center',
                style: {
                    fontSize: '11px',
                    fontFamily: 'Verdana, sans-serif'
                }
            },
            title: {
                text: 'Hours of the Day',
                margin: 20
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of Detected Alarms'
            }
        },
        legend: {
            layout: 'vertical',
            backgroundColor: '#FFFFFF',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: true,
            shadow: true
        },
        tooltip: {
            formatter: function(): string {
                // @ts-ignore
                return ''+ this.x +': '+ this.y +' Alarm(s)';
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: "Time of Day Alarms",
            showInLegend: false,
            type: "column",
            data: timeGraphDataInitial
        }]
    }


    return (
        <React.Fragment>
            <div className={classes.graphsBlockWrap}>

                <ReactHighcharts config={config}/>
            </div>
        </React.Fragment>
    );
};

export default TimeGraph;