import React from "react";
import ReactHighcharts from "react-highcharts";

import classes from "../Analytics.module.scss";


interface SensorGraphProps {
    sensorGraphDataInitial: any,
    from: string
    to: string
    chartRef: any
}

const SensorGraph: React.FC<SensorGraphProps> = ({
                                                     sensorGraphDataInitial,
                                                     from,
                                                     to,
                                                     chartRef,
                                                 }) => {

    const categories = sensorGraphDataInitial?.map((item: any) => item.sensor_name);

    const config = {
        chart: {
            plotShadow: false,
        },
        credits: {
            enabled: false,
        },
        title: {
            text: "Sensor Alarms Summary",
        },
        subtitle: {
            text: "Bar Chart Showing Most Alarmed Sensors. From: " + from + " To: " + to,
        },
        xAxis: {
            categories: categories,
            labels: {
                align: "center",
                style: {
                    fontSize: "12px",
                    fontFamily: "Verdana, sans-serif",
                },
            },
            title: {
                text: "Sensors",
                margin: 20,
            },
        },
        yAxis: {
            min: 0,
            title: {
                text: "Number of Detected Alarms",
            },
        },
        legend: {
            layout: "vertical",
            backgroundColor: "#FFFFFF",
            align: "left",
            verticalAlign: "top",
            x: 100,
            y: 70,
            floating: true,
            shadow: true,
        },
        tooltip: {
            formatter: function (): any {
                // @ts-ignore
                return this.point.sensor_name + ": " + this.y + " Alarm(s)";
            },
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
        },
        series: [{
            name: "Number of Alarms",
            showInLegend: false,
            type: "column",
            data: sensorGraphDataInitial,
        }],
    };


    return (
        <React.Fragment>
            <div className={classes.graphsBlockWrap}>

                <ReactHighcharts config={config} ref={chartRef}/>
            </div>
        </React.Fragment>
    );
};

export default SensorGraph;