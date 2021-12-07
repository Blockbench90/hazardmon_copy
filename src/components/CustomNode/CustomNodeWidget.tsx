import classNames from 'classnames';
import * as _ from "lodash";
import * as React from "react";
import {connect} from "react-redux";
import { Rnd } from 'react-rnd';
import { PortWidget } from 'storm-react-diagrams';

import CustomNodeModel from "./CustomNodeModel";

// action constants
import * as schemasConstants from "../../constants/actions/schemasConstants";

// styles
import {SelectedSensorInfo} from "../../interfaces/schemasReducer";
import './CustomNode.css';

import {Application} from "../../containers/Editor/components/Application";

// images
import flipIcon from '../../assets/img/flip-icon.png';
import resizeIcon from '../../assets/img/resize-icon.png';
import { withRouter } from 'react-router-dom';

export interface CustomNodeWidgetProps {
    node: CustomNodeModel;
    size?: number;
    selectSensorPort: (selectedSensorInfo: SelectedSensorInfo) => void;
    app: Application,
    updateForm: () => void
}

interface CustomNodeWidgetState {
    height: string,
    width: string
    machineName: string
}

class CustomNodeWidget extends React.Component<CustomNodeWidgetProps, CustomNodeWidgetState> {
    protected initialHeight: number;
    protected initialWidth: number;

    constructor(props: CustomNodeWidgetProps) {
        super(props);

        this.initialHeight = props.node.extras.left_side_img_thumbs.large_height;
        this.initialWidth = props.node.extras.left_side_img_thumbs.large_width;

        this.state = {
            height: `${props.node.extras.scale * this.initialHeight}px`,
            machineName: props.node.extras.machineName ? props.node.extras.machineName : '',
            width: `${props.node.extras.scale * this.initialWidth}px`,
        };

        this.flip = this.flip.bind(this);
        this.onResize = this.onResize.bind(this);
        this.onResize = this.onResizeStop.bind(this);
    }

    public onResize(ref: any) {
        this.setState({
            height: ref.style.height,
            width: ref.style.width
        });
    };


    public onResizeStop(ref: any) {
        this.setState({
            height: ref.style.height,
            width: ref.style.width
        });
        const { node, app, updateForm } = this.props;
        node.extras.scale = parseInt(ref.style.height, 10) / this.initialHeight;
        app.recalculatePortsVisually();
        updateForm();
        this.forceUpdate();

    };

    public render() {
        const { node, app, updateForm } = this.props;
        const { width, height } = this.state;

        const {left_side_img, right_side_img, flip} = node.extras;

        const onResize = (e: any, direction: any, ref: any) => {
            this.onResize(ref);
        };

        const onResizeStop = (e: any, direction: any, ref: any) => {
            this.onResizeStop(ref);
        };

        const removeNode = () => {
            app.removeNode(node);
            updateForm();
            this.forceUpdate();
        };

        return (
            <Rnd
                className="custom-node"
                onResize={onResize}
                onResizeStop={onResizeStop}
                size={{ width, height }}
                lockAspectRatio={true}
                disableDragging={true}
                enableResizing={{
                    bottom: false,
                    bottomLeft: false,
                    bottomRight: true,
                    left: false,
                    right: false,
                    top: false,
                    topLeft: false,
                    topRight: false,
                }}
            >
                <div className="image-wrapper">
                    <img src={flip ? right_side_img : left_side_img} height={height} width={width} alt="right-site"/>
                </div>

                {this.renderPorts()}
                {this.renderSensors()}
                <button onClick={this.flip} className="flip-icon">
                    <img src={flipIcon} alt="flip"/>
                </button>
                <div className="drag-box">
                    <img src={resizeIcon} alt="resize" />
                </div>
                <button onClick={removeNode} className="remove-button">&#215;</button>
                {this.renderMachineName()}
                {this.renderRunningStateSensor()}
            </Rnd>
        );
    }

    private renderMachineName() {
        const { app, node } = this.props;
        const { machineName } = this.state;

        const onFocus = () => {
            app.clearSelection();
            app.getActiveDiagram().locked = true;
        };

        const onBlur = () => {
            app.getActiveDiagram().locked = false;
        };

        const onInputChange = (e: any) => {
            const newValue = e.target.value;
            this.setState({
                machineName: newValue
            });
            node.extras.machineName = newValue;
        };

        return (
            <input
                type="text"
                className="machine-name"
                placeholder="Machine name"
                onFocus={onFocus}
                onBlur={onBlur}
                onClick={onFocus}
                value={machineName}
                onChange={onInputChange}
                onMouseDown={onFocus}
            />
        )
    }

    private renderPorts() {
        const { node, app, updateForm } = this.props;
        return _.map(node.ports, (portObj: any, portName: string) => {
            const onDoubleClick = () => {
                app.removePortLinks(portObj);
                portObj.removeAllLinks();
                updateForm();
                this.forceUpdate();
            };

            return (
                <React.Fragment key={portName}>
                    <div
                        style={{
                            [node.extras.flip ? 'right' : 'left']: `${portObj.xPosition}%`,
                            position: "absolute",
                            top: `${portObj.yPosition}%`,
                            zIndex: 10
                        }}
                        className="sensor-connector-port"
                    >
                        <PortWidget name={portName} node={node} />
                    </div>
                    <div
                        className="sensor-tooltip"
                        style={{
                            [node.extras.flip ? 'right' : 'left']: `calc(${portObj.xPosition}% + 7px)`,
                            top: `calc(${portObj.yPosition}% - 5px)`,
                            transform: `translate(${node.extras.flip ? '50%' : '-50%'} , -100%)`,
                            zIndex: 11,
                        }}
                    >
                        <span onClick={onDoubleClick}>Clear connections</span>
                    </div>

                </React.Fragment>
            )
        });
    }

    private renderSensors() {
        const { node, selectSensorPort, app } = this.props;
        const sensorPoints = node.extras.flip ? node.extras.sensor_points_right : node.extras.sensor_points_left;
        return _.map(sensorPoints, (sensorPoint: any) => {

            const sensorDetails = node.extras.sensors.find((sensor: any) => sensor.sensor_point === sensorPoint.id);

            const currentSensorInfo = {
                deviceName: node.extras.name,
                frontendId: node.id,
                pointId: sensorPoint.id,
                pointLabel: sensorPoint.label,
                sensor: sensorDetails && sensorDetails.sensor
            };

            const handlePortClick = () => {
                app.clearSelection();
                selectSensorPort(currentSensorInfo);
            };

            const sensorPortClasses = classNames({
                'filled': sensorDetails,
                'sensor-port': true,
            });

            return (
                <React.Fragment key={sensorPoint.id}>
                    <div
                        className={sensorPortClasses}
                        style={{
                            left: `${sensorPoint.x_coord}%`,
                            position: "absolute",
                            top: `${sensorPoint.y_coord}%`,
                            zIndex: 15
                        }}
                        onClick={handlePortClick}
                    >
                        {sensorDetails && '✓'}
                    </div>
                    {sensorDetails && <div
                        className="sensor-tooltip"
                        style={{
                            'left': `calc(${sensorPoint.x_coord}% + 7px)`,
                            top: `calc(${sensorPoint.y_coord}% - 10px)`,
                            transform: 'translate(-50% , -100%)',
                            zIndex: 11,
                        }}
                    >
                        {sensorDetails.sensor.name}, {sensorDetails.sensor.group_name} <br/>
                        ({sensorDetails.sensor.device.name})
                    </div>}
                </React.Fragment>
            );
        });
    }

    private renderRunningStateSensor() {
        const { node, selectSensorPort, app } = this.props;

        const currentSensorInfo = {
            deviceName: node.extras.name,
            frontendId: node.id,
            isStateSensor: true,
            pointLabel: 'State sensor',
            sensor: node.extras.system_state_sensor
        };

        const handlePortClick = (e: any) => {
            app.clearSelection();
            selectSensorPort(currentSensorInfo);
        };

        const portClassNames = classNames({
            'not-selected': !node.extras.system_state_sensor,
            'running-state': true,
            'sensor-port': true,
        });

        return (
            <>
                <div
                    className={portClassNames}
                    onClick={handlePortClick}
                >
                    {node.extras.system_state_sensor ? `${node.extras.system_state_sensor.name}, ${node.extras.system_state_sensor.group_name} [${node.extras.system_state_sensor.device.name}]` : 'Select state sensor'}
                </div>
                {node.extras.system_state_sensor && <div
                    className="sensor-tooltip"
                    style={{
                        transform: 'translate(50%, -50%)',
                        zIndex: 15,
                    }}
                >
                    {node.extras.system_state_sensor.name}, {node.extras.system_state_sensor.group_name} [{node.extras.system_state_sensor.device.name}]
                </div>}
            </>
        );
    }

    private flip() {
        const { node, app, updateForm } = this.props;
        node.extras.flip = !node.extras.flip;
        app.recalculatePortsVisually();
        updateForm();
        this.forceUpdate();
    }
}

const mapStateToProps = (state: any) => {
    return {
        app: state.schemasReducer.app,
    }
};


const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        selectSensorPort: (selectedSensorInfo: SelectedSensorInfo) => {
            dispatch({
                payload: selectedSensorInfo,
                type: schemasConstants.SELECT_SENSOR_PORT
            });
            dispatch({
                payload: {
                    location: ownProps.match.params.siteId,
                },
                type: schemasConstants.SEARCH_SENSORS,
            })
        },
        updateForm: () => {
            dispatch({type: schemasConstants.UPDATE_FORM});
        }
    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomNodeWidget));
