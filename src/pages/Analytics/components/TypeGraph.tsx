import React from "react";
import ReactHighcharts from "react-highcharts";
import Highcharts from "highcharts";
import _ from "lodash";

import classes from "../Analytics.module.scss";


interface TypeGraphProps {
    typeGraphDataInitial: any,
    from: string
    to: string
    chartRef: any

}

const TypeGraph: React.FC<TypeGraphProps> = ({
                                                 typeGraphDataInitial,
                                                 from,
                                                 to,
                                                 chartRef,
                                             }) => {


    const getSeries = function (result: any) {
        let series = [];
        let total = result[0];
        let data = result[1];
        data?.forEach((item, i) => {
            const newItem = {name: item.name}
            switch (item.name) {
                case "Alarm":
                    newItem["name"] = "Underspeed Alarm";
                    newItem["y"] = item.y / total;
                    series.push(newItem);
                    break;
                case "Contact Sensor Open / OFF":
                case "Contact Sensor Closed / ON":
                    let index = _.findIndex(series, {name: "Contact Changed"});
                    if (index > -1) {
                        series[index].y += item.y / total;
                    } else {
                        let contactChangedData = {y: item.y / total, name: "Contact Changed"};
                        series.push(contactChangedData);
                    }
                    break;

                default:
                    newItem["y"] = item.y / total;
                    series.push(newItem);
                    break;
            }

        });
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
                return "<b>" + this.point.name + "</b>: " + Highcharts.numberFormat(this.y * 100, 2, ".") + " %";
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
                        return "<b>" + this.point.name + "</b>: " + Highcharts.numberFormat(this.y * 100, 2, ".") + " %";
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

                <ReactHighcharts config={config} ref={chartRef}/>
            </div>
        </React.Fragment>
    );
};

export default TypeGraph;