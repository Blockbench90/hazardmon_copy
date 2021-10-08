import React, {useMemo, useRef} from "react";
import classes from "../../../components/GraphsChart/SensorGraph.module.scss";
import SensorGraphHeader from "../../../components/GraphsChartHeader/SensorGraphHeader";
// @ts-ignore
import ReactHighstock from "react-highcharts/ReactHighstock";
import moment from "moment";
import _ from "lodash";

interface RenderGraphProps {
    sensorGraphDataInitial: any,
    groupName: string,
    sensorGraphDataArray: any,
    isLivePage?: boolean
    isLostComms: any,
    defaultOptions: any,
    sensorId: number
}

const RenderGraph: React.FC<RenderGraphProps> = ({
                                                     sensorGraphDataInitial,
                                                     groupName,
                                                     sensorGraphDataArray,
                                                     isLostComms,
                                                     defaultOptions,
                                                     sensorId,
                                                     isLivePage,
                                                 }) => {
    const chartRef = useRef();


    const insertEmptySlots = (sensorGraphData: any, maxPeriodParam: number) => {
        return _.map(sensorGraphData, (graphObj: any) => {
            const isBooleanGraph = ["BOOL", "ENUM"].indexOf(graphObj.sensor_type) !== -1;

            const maxPeriod = maxPeriodParam * 60 * 1.15 * 1000;  // To timestamp delta (in ms)
            const newData: any = [];
            graphObj.data.forEach((dataArray: any, index: number) => {
                newData.push(dataArray);
                if (graphObj.data[index + 1] && graphObj.data[index + 1][0] - graphObj.data[index][0] > maxPeriod) {
                    _.times(Math.round(graphObj.data[index + 1][0] / dataArray[0] + 1), (emptyIndex: number) => {
                        const x = dataArray[0] + (maxPeriod - 4000) * (emptyIndex + 1);
                        let emptyDataEntry = [x, null, true];

                        // edit entry for Contact graphs
                        if (isBooleanGraph) {
                            emptyDataEntry = emptyDataEntry.slice(0, -1).concat([false, "Disabled"]);
                        }

                        newData.push(emptyDataEntry);
                    });
                }
            });

            return {
                ...graphObj,
                data: newData,
            };
        });
    };

    const sensorGraphData = insertEmptySlots(sensorGraphDataInitial, 12);

    const sensorWithValueLabel = sensorGraphData.find((graphObj: any) => graphObj.sensor_type === "NUMERIC");
    const sensorWithBooleanLabel = sensorGraphData.find((graphObj: any) => ["ENUM", "BOOL"].indexOf(graphObj.sensor_type) !== -1);

    const valueLabel = sensorWithValueLabel && sensorWithValueLabel.value_label;

    const series = useMemo(() => {
        return sensorGraphData.map((graphData: any) => {
            const seriesParams: any = {};

            const isBooleanGraph = ["BOOL", "ENUM"].indexOf(graphData.sensor_type) !== -1;

            const seriesData = graphData.data.map((dataArray: any) => {
                const objToReturn = {
                    state: dataArray[3],
                    status: dataArray[2] ? "Alarm" : "OK",
                    x: dataArray[0],
                    y: dataArray[1],
                };

                const state = objToReturn.state;

                if (isBooleanGraph) {
                    objToReturn.y = objToReturn.status === "Alarm" ? 1 : -1;
                    seriesParams.type = "area";
                    seriesParams.yAxis = sensorWithValueLabel && 1;

                    if (objToReturn.y > 1 || objToReturn.y < -1) {
                        objToReturn.y = null;
                    }

                }

                if (isLostComms(state)) {
                    objToReturn.y = null;
                }

                return objToReturn;
            }).sort((a: any, b: any) => a.x - b.x);


            return {
                ...seriesParams,
                data: seriesData,
                name: graphData.name,
            };
        });
    }, [isLostComms, sensorGraphData, sensorWithValueLabel]);

    const yAxis = [];

    if (sensorWithValueLabel) {
        yAxis.push({
            allowDecimals: false,
            // height: sensorWithBooleanLabel && 200,
            lineWidth: 2,
            minTickInterval: 1,
            plotLines: [{
                color: "#808080",
                value: 0,
                width: 1,
            }],
            title: {
                text: `${groupName} (${valueLabel})`,
            },
        });
    }

    if (sensorWithBooleanLabel) {
        yAxis.push({
            allowDecimals: false,
            bottom: 50,
            contactAxis: true,
            gridLineWidth: 0,
            height: 90,
            labels: {
                enabled: false,
            },
            lineWidth: 2,
            max: 2,
            min: -2,
            offset: 0,
            plotBands: [
                { // OK
                    color: "rgba(68, 213, 170, 0.1)",
                    from: -1,
                    label: {
                        align: "right",
                        style: {
                            color: "#000",
                        },
                        text: "OK",
                        x: -10,
                    },
                    to: 0,
                },
                { // ALARM
                    color: "rgba(255, 150, 68, 0.2)",
                    from: 0,
                    label: {
                        align: "right",
                        style: {
                            color: "#606060",
                        },
                        text: "Alarm",
                        x: -10,
                    },
                    to: 1,
                },
            ],
            title: {
                text: "Contact",
            },
            top: sensorWithValueLabel && sensorWithBooleanLabel && 260,
        });
    }
    const responsive_width = window.innerWidth - 300;

    const config: any = {
        ...defaultOptions,
        chart: {
            ...defaultOptions.chart,
            height: (sensorWithValueLabel && sensorWithBooleanLabel) ? 460 : sensorWithBooleanLabel && 210,
            width: responsive_width,
        },
        series,
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 1200,
                },
                chartOptions: {
                    legend: {
                        layout: "vertical",
                        align: "right",
                        verticalAlign: "middle",
                    },
                },
            }],
        },
        title: {
            text: groupName,
        },
        tooltip: ({
            formatter(): any {

                let res = moment(this.x).format("D MMM YYYY, HH:mm:ss");

                this.points.forEach((item: any) => {

                    const formatters = {
                        "Minutes": (value: any) => `${Math.floor(value / 60)}h:${value % 60}m`,
                    };

                    // eslint-disable-next-line no-useless-concat
                    res += "<span style=\"color:" + item.point.series.color + "\">" + " " + item.point.series.name + "</span>: <b>";

                    // get formatting function or return unchached
                    // @ts-ignore
                    const fmt = formatters[valueLabel] ? formatters[valueLabel] : (value: any, label: any) => `${value} ${label}`;

                    if (item.point.series.yAxis.userOptions.contactAxis) {
                        item.point.status = item.point.status || fmt(item.point.y, valueLabel);
                        res += item.point.status + "</b><br/>";
                    } else {
                        res += fmt(item.point.y, valueLabel) + "</b> " + item.point.status + "<br/>";
                    }
                });

                return res;
            },
        } as any),
        xAxis: {
            labels: ({
                formatter(): any {
                    return moment(this.value).format("HH:mm");
                },
            } as any),
            ordinal: false,
        },
        yAxis,
    };

    return (
        <React.Fragment>
            <div className={classes.graphsBlockWrap}>
                <SensorGraphHeader
                    device_type={`${sensorGraphDataArray.units} ${sensorGraphDataArray.value_label}`}
                    chartRef={chartRef}
                    sensorId={sensorId}
                />

                <ReactHighstock ref={chartRef} config={config} key={groupName}/>

            </div>
        </React.Fragment>
    );
};

export default RenderGraph;