import React from "react";
import ReactHighcharts from "react-highcharts";
import Highcharts from "highcharts";

import classes from "../Analytics.module.scss";
import _ from "lodash";


interface TypeGraphProps {
    typeGraphDataInitial: any,
    from: string
    to: string

}

const TypeGraph: React.FC<TypeGraphProps> = ({
                                                 typeGraphDataInitial,
                                                 from,
                                                 to,
                                             }) => {


    const getSeries = function (result: any) {
        let series = [], total = result[0], data = result[1];
        for (let i in data) {
            if (data[i].y > 0) {
                switch (data[i].name) {
                    case "Alarm":
                        data[i].name = "Underspeed Alarm";
                        series.push(data[i]);
                        break;
                    case "Contact Sensor Open / OFF":
                    case "Contact Sensor Closed / ON":
                        let index = _.findIndex(series, {name: "Contact Changed"});
                        if (index > -1) {
                            series[index].y += data[i].y / total;
                        } else {
                            let contactChangedData = {y: data[i].y / total, name: "Contact Changed"};
                            series.push(contactChangedData);
                        }
                        break;

                    default:
                        series.push(data[i]);
                        break;
                }
            }
        }
        return {series, total};
    };
    const series = getSeries(typeGraphDataInitial);

    const config = {
        chart: {
            plotShadow: false,
        },
        credits: {
            enabled: false,
        },
        title: {
            text: "Types of Alarms",
        },
        subtitle: {
            text: "Pie Chart Showing the Distribution Different Alarm Types. From: " + from + " To: " + to,
        },
        tooltip: {
            formatter: function (): string {
                // @ts-ignore
                return "<b>" + this.point.name + "</b>: " + Highcharts.numberFormat(this.y / series.total * 100, 2, ".") + " %";
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                    enabled: true,
                    color: "#000000",
                    connectorColor: "#000000",
                    formatter: function (): string {
                        // @ts-ignore
                        return "<b>" + this.point.name + "</b>: " + Highcharts.numberFormat(this.y / series.total * 100, 2, ".") + " %";
                    },
                },
            },
        },
        series: [{
            type: "pie",
            name: "Browser share",
            data: series.series,
        }],
    };


    return (
        <React.Fragment>
            <div className={classes.graphsBlockWrap}>

                <ReactHighcharts config={config}/>
            </div>
        </React.Fragment>
    );
};

export default TypeGraph;