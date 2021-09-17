import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import ReactHighcharts from 'react-highcharts';
import {connect} from 'react-redux';
import LoadingComponent from '../../../../components/LoadingComponent/LoadingComponent';

import * as schemasConstants from '../../../../constants/actions/schemasConstants';
import typesOrder from '../../../../constants/typesOrder';

// interfaces
interface SensorGraphProps {
    sensorsGraphData: any
    sensorsGraphDataLoading: boolean
    getSensorsGraph: (machineId: number) => void
    machineId: number
}

const defaultOptions = {
    chart: {
        animation: {
            duration: 1940,   // As close to interval as possible.
            easing: 'linear'  // Important: this makes it smooth
        },
    },
    credits: {
        enabled: false
    },
    legend: {
        enabled: true
    },
    plotOptions: {
        line: {
            turboThreshold: 10000
        },
        marker: {
            enabled: false
        },
        series: {
            showInNavigator: true,
            turboThreshold: 0
        },
        shadow: false,
    },
    rangeSelector: {
        enabled: false,
        selected: 1,
    },
    scrollbar: {
        liveRedraw: false
    }
};

class SensorGraph extends React.Component<SensorGraphProps> {
    public componentDidMount() {
        const { machineId, getSensorsGraph } = this.props;

        getSensorsGraph(machineId);
    }

    public render() {
        const {sensorsGraphDataLoading, sensorsGraphData} = this.props;

        const groupedByDevice = _.groupBy(sensorsGraphData, (graphObj: any) => graphObj.device_name);

        return sensorsGraphDataLoading ? <LoadingComponent/> : <div className="widget graphs-widget">
            <h2>24 Hours Graphs</h2>
            <div className="widget__body">
                {_.map(groupedByDevice, (sensorGraphDataArray: any, deviceName: string) => {
                    const groupedByType = _.groupBy(sensorGraphDataArray, (graphObj: any) => {
                        const nameArray = graphObj.name.split(':');
                        nameArray.pop();
                        return nameArray.join(':');
                    });

                    const sortedByType = {};

                    typesOrder.forEach(type => {
                        if (groupedByType[type]) {
                            sortedByType[type] = groupedByType[type]
                        }
                    });

                    return (
                        <div className="device-block" key={deviceName}>
                            <h4 className="device-name">{deviceName}</h4>
                            {_.map(sortedByType, (sensorGraphData: any, groupName: string) => <div key={groupName}>
                                {this.renderGraph(sensorGraphData, groupName)}
                                <br/>
                            </div>)}
                        </div>
                    );
                })}
            </div>
        </div>
    }

    private renderGraph(sensorGraphDataInitial: any, groupName: string) {
        const sensorGraphData = this.insertEmptySlots(sensorGraphDataInitial, 12);

        const sensorWithValueLabel = sensorGraphData.find((graphObj: any) => graphObj.sensor_type === 'NUMERIC');
        const sensorWithBooleanLabel = sensorGraphData.find((graphObj: any) => ['ENUM', 'BOOL'].indexOf(graphObj.sensor_type) !== -1);

        const valueLabel = sensorWithValueLabel && sensorWithValueLabel.value_label;

        const series = sensorGraphData.map((graphData: any) => {
            const seriesParams: any = {};

            const isBooleanGraph = ['BOOL', 'ENUM'].indexOf(graphData.sensor_type) !== -1;

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

                if (this.isLostComms(state)) {
                    objToReturn.y = null;
                }

                return objToReturn;
            });

            return {
                ...seriesParams,
                data: seriesData,
                name: graphData.name
            }
        });

        const yAxis = [];

        if (sensorWithValueLabel) {
            yAxis.push({
                allowDecimals: false,
                height: sensorWithBooleanLabel && 200,
                lineWidth: 2,
                minTickInterval: 1,
                plotLines: [{
                    color: '#808080',
                    value: 0,
                    width: 1,
                }],
                title: {
                    text: `${groupName} (${valueLabel})`
                }
            })
        }

        if (sensorWithBooleanLabel) {
            yAxis.push({
                allowDecimals: false,
                bottom: 50,
                contactAxis: true,
                gridLineWidth: 0,
                height: 90,
                labels: {
                    enabled: false
                },
                lineWidth: 2,
                max: 2,
                min: -2,
                offset: 0,
                plotBands: [
                    { // OK
                        color: 'rgba(68, 213, 170, 0.1)',
                        from: -1,
                        label: {
                            align: 'right',
                            style: {
                                color: '#000'
                            },
                            text: 'OK',
                            x: -10
                        },
                        to: 0,
                    },
                    { // ALARM
                        color: 'rgba(255, 150, 68, 0.2)',
                        from: 0,
                        label: {
                            align: 'right',
                            style: {
                                color: '#606060'
                            },
                            text: 'Alarm',
                            x: -10
                        },
                        to: 1,
                    }
                ],
                title: {
                    text: "Contact"
                },
                top: sensorWithValueLabel && sensorWithBooleanLabel && 260
            })
        }

        const config: any = {
            ...defaultOptions,
            chart: {
                ...defaultOptions.chart,
                height: (sensorWithValueLabel && sensorWithBooleanLabel) ? 460 : sensorWithBooleanLabel && 210
            },
            series,
            title: {
                text: groupName
            },
            tooltip: ({
                formatter(): any {
                    let res = moment(this.x).format("D MMM YYYY, HH:mm:ss") + ' ' + '<br/>';

                    const formatters = {
                        'Minutes': (value: any) => `${Math.floor(value / 60)}h:${value % 60}m`
                    };

                    res += '<span style="color:' + this.point.series.color + '">' + this.point.series.name + '</span>: <b>';

                    // get formatting function or return unchached
                    const fmt = formatters[valueLabel] ? formatters[valueLabel] : (value: any, label: any) => `${value} ${label}`;

                    if (this.point.series.yAxis.userOptions.contactAxis) {
                        this.point.status = this.point.status || fmt(this.point.y, valueLabel);
                        res += this.point.status + '</b><br/>';
                    } else {
                        res += fmt(this.point.y, valueLabel) + '</b> ' + this.point.status + '<br/>';
                    }
                    return res
                }
            } as any),
            xAxis: {
                labels: ({
                    formatter(): any {
                        return moment(this.value).format('HH:mm');
                    }
                } as any),
                ordinal: false
            },
            yAxis
        };

        return (
            <ReactHighcharts config={config} key={groupName} />
        );
    }

    private insertEmptySlots(sensorGraphData: any, maxPeriodParam: number) {
        return _.map(sensorGraphData, (graphObj: any) => {
            const isBooleanGraph = ['BOOL', 'ENUM'].indexOf(graphObj.sensor_type) !== -1;

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
                            emptyDataEntry = emptyDataEntry.slice(0, -1).concat([false, 'Disabled']);
                        }

                        newData.push(emptyDataEntry);
                    });
                }
            });

            return {
                ...graphObj,
                data: newData
            };
        });
    }

    private isLostComms(state: string) {
        return state === "Lost Communication Between T500 and node" || state === "Sensor Not Scanned by T500" || state === "Disabled";
    }
}

const mapStateToProps = (state: any) => ({
    sensorsGraphData: state.schemasReducer.sensorsGraphData,
    sensorsGraphDataLoading: state.schemasReducer.sensorsGraphDataLoading
});

const mapDispatchToProps = (dispatch: any) => ({
    getSensorsGraph: (machineId: number) => {
        dispatch({type: schemasConstants.GET_SENSORS_GRAPH, payload: machineId});
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SensorGraph);
