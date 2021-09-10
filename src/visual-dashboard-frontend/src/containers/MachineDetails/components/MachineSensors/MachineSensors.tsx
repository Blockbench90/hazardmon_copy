// @ts-nocheck
import classNames from 'classnames';
import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';

// styles
import 'react-tabs/style/react-tabs.css';
import './MachineSensors.scss';

// interfaces
import {MachineExtended, SensorObj} from '../../../../interfaces/schemasReducer';

interface SelectedSensorProps {
    machineDetails: MachineExtended;
}

class MachineSensors extends React.Component<SelectedSensorProps> {
    public render() {
        const { machineDetails } = this.props;

        const groupedByDevice = _.groupBy(machineDetails.sensors, (sensorObj: SensorObj) => sensorObj.sensor.device.name);

        return (
            <div className="widget machine-sensors">
                <h2>Machine Sensors</h2>
                <div className="widget__body">
                    {_.map(groupedByDevice, (deviceSensors: SensorObj[], deviceName: string) => {
                        const groupedGroupName = _.groupBy(deviceSensors, (sensorObj: SensorObj) => sensorObj.sensor.group_name);

                        return (
                            <div className="device-block" key={deviceName}>
                                <h4 className="device-name">{deviceName}</h4>
                                {_.map(groupedGroupName, (sensorsArray: SensorObj[], key: string) => {
                                    const hasAlarm = sensorsArray.some((sensorObj: SensorObj) => sensorObj.sensor.liveData && sensorObj.sensor.liveData.Alarm);
                                    const hasWarning = sensorsArray.some((sensorObj: SensorObj) => sensorObj.sensor.liveData && sensorObj.sensor.liveData.Status === 'WARNING');
                                    const groupClasses = classNames({
                                        'Alarm': hasAlarm,
                                        'WARNING':  hasWarning && !hasAlarm,
                                        'sensor-group-name': true,
                                    });
                                    return (
                                        <React.Fragment key={key}>
                                            <div className={groupClasses}>
                                                {key}
                                            </div>
                                            <div className="sensors">
                                                {sensorsArray.map((sensorObj: SensorObj) => {
                                                    if (sensorObj.sensor.liveData) {
                                                        const status = sensorObj.sensor.liveData.Alarm ? 'Alarm' : sensorObj.sensor.liveData.Status;

                                                        const isBoolean = ['BOOL', 'ENUM'].indexOf(sensorObj.sensor.liveData.Type) !== -1;
                                                        let defaultValue = sensorObj.sensor.liveData.Value;
                                                        let defaultUnit = sensorObj.sensor.liveData.Meta.Units;
                                                        const sensorsSettingsKey = 'sensors_settings';
                                                        const sensorsSettings = sensorObj.sensor[sensorsSettingsKey];
                                                        if (sensorsSettings && sensorsSettings.c && sensorsSettings.k) {
                                                            defaultValue = ((sensorsSettings.k * defaultValue) + sensorsSettings.c);
                                                            defaultUnit = sensorsSettings.unit;
                                                        }

                                                        return (
                                                            <div className={`sensor-info ${status}`} key={sensorObj.sensor.id}>
                                                                <div className="sensor-name">{sensorObj.sensor.name}</div>
                                                                <React.Fragment>
                                                                    <div className="status">{sensorObj.sensor.liveData.Meta.State}</div>
                                                                    {!isBoolean && <div className="value">{defaultValue} {defaultUnit}</div>}
                                                                </React.Fragment>
                                                            </div>
                                                        )
                                                    } else {
                                                        return (
                                                            <div className="sensor-info" key={sensorObj.sensor.id}>
                                                                <div className="sensor-name">{sensorObj.sensor.name}</div>
                                                                <div className="status">No data</div>
                                                            </div>
                                                        )
                                                    }
                                                })}
                                            </div>
                                        </React.Fragment>
                                    )
                                })}
                            </div>

                        )
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    machineDetails: state.schemasReducer.machineDetails
});

export default connect(mapStateToProps)(MachineSensors);