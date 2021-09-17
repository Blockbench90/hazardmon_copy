import classNames from 'classnames';
import * as _ from 'lodash';
import moment from 'moment';
import * as React from 'react';
import {connect} from 'react-redux';

// styles
import './Machine.css';

// images
import flipIcon from '../../assets/img/flip-icon.png';

// action constants
import * as schemasConstants from '../../constants/actions/schemasConstants';

// interfaces
import {AnchorPoint, MachineExtended, MachineSensorPoint, SensorObj} from '../../interfaces/schemasReducer';

interface MachineProps {
    lastTimeInAlarmData: {},
    machine: MachineExtended,
    flip: (machineId: number) => void,
    onMachineClick?: () => void,
    isDetails?: boolean,
}

const machineImagesKeys = {
    alarm: {
        left: 'alarm_left_side_img_thumbs',
        right: 'alarm_right_side_img_thumbs',
    },
    noInfo: {
        left: 'left_side_img_thumbs',
        right: 'right_side_img_thumbs',
    },
    ok: {
        left: 'ok_left_side_img_thumbs',
        right: 'ok_right_side_img_thumbs',
    },
    warning: {
        left: 'warning_left_side_img_thumbs',
        right: 'warning_right_side_img_thumbs',
    },
};

class Machine extends React.Component<MachineProps> {
    public render() {
        const { machine, flip, onMachineClick, isDetails } = this.props;

        const handleFlipClick = () => flip(machine.id);

        const styles = isDetails ? {} : {
            left: machine.x_coord,
            top: machine.y_coord
        };


        let machineStatus = 'noInfo';

        if (_.some(machine.sensors, (sensorObj: SensorObj) => sensorObj.sensor.liveData && sensorObj.sensor.liveData.Alarm)) {
            machineStatus = 'alarm';
        } else if (_.some(machine.sensors, (sensorObj: SensorObj) => sensorObj.sensor.liveData && sensorObj.sensor.liveData.Status === 'WARNING')) {
            machineStatus = 'warning';
        } else if (_.some(machine.sensors, (sensorObj: SensorObj) => sensorObj.sensor.liveData)) {
            machineStatus = 'ok';
        }

        const machineClassNames = classNames({
            'blinking': !['ok', 'noInfo'].includes(machineStatus) && machine.system_state_sensor && machine.system_state_sensor.liveData && machine.system_state_sensor.liveData.Meta.State === 'Running',
            'gray': ['ok', 'noInfo'].includes(machineStatus) && machine.system_state_sensor && machine.system_state_sensor.liveData && machine.system_state_sensor.liveData.Meta.State === 'Stopped',
            'is-details': isDetails,
            'machine': true,
        });

        const imageKeyObj = machineImagesKeys[machineStatus];

        const leftImage = machine.type_of_machine[imageKeyObj.left].large;
        const rightImage = machine.type_of_machine[imageKeyObj.right].large;

        const machineStyles = {
            backgroundImage: `url(${machine.flip ? rightImage : leftImage})`,
            height: machine.type_of_machine.left_side_img_thumbs.large_height * machine.scale,
            width: machine.type_of_machine.left_side_img_thumbs.large_width * machine.scale
        };

        return (
            <div
                className={machineClassNames}
                style={styles}
            >
                <div
                    className="image-wrapper"
                    onClick={onMachineClick}
                    style={machineStyles}
                />
                {!isDetails && this.renderPorts()}
                {this.renderSensors()}
                <button onClick={handleFlipClick} className="flip-icon">
                    <img src={flipIcon} alt="flip"/>
                </button>
                <div className="machine-name">{machine.name}</div>
            </div>
        );
    }

    private renderPorts() {
        const { machine } = this.props;

        return machine.type_of_machine.anchor_points.map((point: AnchorPoint) =>
            <div
                key={`${point.x_coord}_${point.y_coord}`}
                className="anchor_point"
                style={{
                    [machine.flip ? 'right' : 'left']: `${point.x_coord}%`,
                    position: "absolute",
                    top: `${point.y_coord}%`,
                    zIndex: 10,
                }}
            />
        )
    }

    private renderSensors() {
        const {machine, lastTimeInAlarmData, isDetails} = this.props;

        const sensorPoints = machine.flip ? machine.type_of_machine.sensor_points_right : machine.type_of_machine.sensor_points_left;

        return sensorPoints.map((point: MachineSensorPoint) => {
            const sensorDetails = machine.sensors.find((sensor: any) => sensor.sensor_point === point.id);

            let sensorStatus = '';

            if (sensorDetails && sensorDetails.sensor.liveData) {
                sensorStatus = sensorDetails.sensor.liveData.Alarm ? 'Alarm' : sensorDetails.sensor.liveData.Status && sensorDetails.sensor.liveData.Status.replace('/', '');
            }

            const pointClasses = classNames({
                "filled": sensorDetails,
                "sensor_point": true,
                [`${sensorStatus}`]: true
            });

            const sensorLastTimeInAlarmData = sensorDetails && lastTimeInAlarmData && lastTimeInAlarmData[sensorDetails.sensor.id];
            const sensorLastTimeInAlarmEventType = sensorLastTimeInAlarmData && 
            sensorLastTimeInAlarmData.event_type || 'Last time in alarm';
            const sensorLastTimeInAlarm = sensorLastTimeInAlarmData &&
                moment.unix(sensorLastTimeInAlarmData.date_created).format('MM/DD/YYYY hh:mm:ss Z');

            return (
                <React.Fragment key={point.id}>
                    <div
                        className={pointClasses}
                        style={{
                            left: `${point.x_coord}%`,
                            position: "absolute",
                            top: `${point.y_coord}%`,
                            zIndex: 10,
                        }}
                    />
                    {sensorDetails && <div
                        className="sensor-tooltip"
                        style={{
                            left: `calc(${point.x_coord}% + 7px)`,
                            top: `calc(${point.y_coord}% - 10px)`,
                            transform: 'translate(-50%, -100%)',
                            zIndex: 11,
                        }}
                    >
                        {sensorDetails.sensor.name}, {sensorDetails.sensor.group_name} <br/>
                        ({sensorDetails.sensor.device.name})<br/><br/>
                        {isDetails && `${sensorLastTimeInAlarmEventType}: ${sensorLastTimeInAlarm || '–'}`}
                    </div>}
                </React.Fragment>
            )
        });
    }
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        flip: (machineId: number) => {
            if (ownProps.isDetails) {
                dispatch({type: schemasConstants.FLIP_MACHINE_DETAILS})
            } else {
                dispatch({type: schemasConstants.FLIP, payload: machineId})
            }
        }
    }
};

export default connect(null, mapDispatchToProps)(Machine);
