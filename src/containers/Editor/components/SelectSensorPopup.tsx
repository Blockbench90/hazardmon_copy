import classNames from "classnames";
import * as _ from "lodash";
import * as React from "react";
import * as Modal from "react-modal";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {modalStyles, parentSelector} from "../../../constants/modalStyles";

// icons
import closeIcon from "../../../assets/img/close-icon.png";
import * as schemasConstants from "../../../constants/actions/schemasConstants";
import {SchemaRoute} from "../../../interfaces/schemaRoute";
import {Application} from "./Application";

// interfaces
import {Location, SchemaDetails, SelectedSensorInfo, TabDetails} from "../../../interfaces/schemasReducer";

// constants
const sensorGroups = [
    {
        label: "IE Node NTC",
        value: "ntc",
    },
    {
        label: "Cli",
        value: "cli",
    },
    {
        label: "Pulse",
        value: "pulse",
    },
    {
        label: "System",
        value: "system",
    },
    {
        label: "Speed",
        value: "speed",
    },
    {
        label: "Temperature",
        value: "tmp",
    },
    {
        label: "Alignment:Head",
        value: "head",
    },
    {
        label: "Alignment:Tail",
        value: "tail",
    },
    {
        label: "Expansion 1",
        value: "exp1",
    },
    {
        label: "Expansion 2",
        value: "exp2",
    },
    {
        label: "Plug",
        value: "plug",
    },
    {
        label: "Pulley",
        value: "pull",
    },
];

export interface SelectSensorPopupProps extends SchemaRoute {
    tabDetails: TabDetails
    app: Application
    selectedSensorInfo: SelectedSensorInfo
    closeSuggestionsBlock: () => void
    searchSensors: (e: any) => void
    suggestionsInputValue: string
    sensorSuggestions: any
    toggleSensor: (sensorId: number) => void
    schemaDetails: SchemaDetails
    onTabSensors: number[]
    locations: Location[]
    currentLocationId: number
    tabName: string
}

export interface SelectSensorPopupState {
    excludeGroup: any
    excludeDevices: any
}

class SelectSensorPopup extends React.Component<SelectSensorPopupProps, SelectSensorPopupState> {
    constructor(props: SelectSensorPopupProps) {
        super(props);

        this.state = {
            excludeDevices: [],
            excludeGroup: [],
        };
    }

    public render() {
        const {
            selectedSensorInfo, suggestionsInputValue, sensorSuggestions, app, closeSuggestionsBlock,
            toggleSensor, schemaDetails, tabDetails, onTabSensors, locations, match, tabName,
        } = this.props;
        const {excludeDevices, excludeGroup} = this.state;

        const availableDevices = locations.find((location: Location) => location.id === parseFloat(match.params.siteId)).devices;

        const handleSelectSensor = (sensor: any) => {
            const appData = app.serialize();
            const searchNode = appData.nodes.find((nodeObj: any) => nodeObj.id === selectedSensorInfo.frontendId);
            if (selectedSensorInfo.isStateSensor) {
                if (sensor && searchNode.extras.system_state_sensor) {
                    toggleSensor(searchNode.extras.system_state_sensor.id);
                }
                toggleSensor(sensor ? sensor.id : searchNode.extras.system_state_sensor.id);
                searchNode.extras.system_state_sensor = sensor;
            } else {
                const existingSensorIndex = _.findIndex(searchNode.extras.sensors, (sensorObj: any) => sensorObj.sensor_point === selectedSensorInfo.pointId);
                if (existingSensorIndex === -1 && sensor) {
                    searchNode.extras.sensors.push({sensor, sensor_point: selectedSensorInfo.pointId});
                    toggleSensor(sensor.id);
                } else if (existingSensorIndex !== -1 && sensor) {
                    toggleSensor(searchNode.extras.sensors[existingSensorIndex].sensor.id);
                    searchNode.extras.sensors[existingSensorIndex] = {sensor, sensor_point: selectedSensorInfo.pointId};
                    toggleSensor(sensor.id);
                } else if (existingSensorIndex !== -1 && !sensor) {
                    toggleSensor(searchNode.extras.sensors[existingSensorIndex].sensor.id);
                    searchNode.extras.sensors.splice(existingSensorIndex, 1);
                }
            }
            closeSuggestionsBlock();
            app.deSerialize(appData);
            this.forceUpdate();
        };

        const handleClearSensor = () => {
            handleSelectSensor(null);
        };

        const handleInputChange = (e: any) => this.search(e.target.value);

        return (
            // @ts-ignore
            <Modal
                className="sensors-suggest-block"
                isOpen={!!selectedSensorInfo}
                style={modalStyles}
                parentSelector={parentSelector}
                onRequestClose={closeSuggestionsBlock}
            >
                <h5>Select Sensors for {selectedSensorInfo.pointLabel} ({selectedSensorInfo.deviceName})</h5>
                <div className="wrapper">
                    <button onClick={closeSuggestionsBlock} className="close-button">
                        <img src={closeIcon} alt="close"/>
                    </button>
                    <div className="results-wrapper">
                        <input type="text" onChange={handleInputChange} value={suggestionsInputValue}/>
                        <div className="results">
                            {sensorSuggestions.map((sensor: any) => {
                                let schemaTabFiltered = schemaDetails ? schemaDetails.schema_tabs.slice() : [];

                                if (tabDetails) {
                                    schemaTabFiltered = schemaDetails.schema_tabs.filter((tabObj: any) => tabObj.id !== tabDetails.id);
                                }

                                const usedOnTabObj = schemaTabFiltered.find((tabObj: any) => sensor.tabs.includes(tabObj.id));
                                const isUsedOnCurrentTab = onTabSensors.includes(sensor.id);

                                let machineName = "";

                                if (usedOnTabObj) {
                                    const onOtherTabSensorInfo = usedOnTabObj && usedOnTabObj.sensors_ids.find((sensorObj: any) => sensorObj[sensor.id]);

                                    machineName = onOtherTabSensorInfo && onOtherTabSensorInfo[sensor.id].machine_name;
                                } else if (isUsedOnCurrentTab) {
                                    const node = app.serialize().nodes.find((nodeObj: any) => nodeObj.extras.sensors.find((sensorObj: any) => sensorObj.sensor.id === sensor.id) || nodeObj.extras.system_state_sensor && (nodeObj.extras.system_state_sensor.id === sensor.id));

                                    machineName = node.extras.machineName;
                                }

                                const disabled = usedOnTabObj || isUsedOnCurrentTab;

                                const usedOn = usedOnTabObj && usedOnTabObj.name || isUsedOnCurrentTab && tabName;
                                const handleSensorClick = disabled ? undefined : () => handleSelectSensor(sensor);
                                const resultClassName = classNames({
                                    disabled,
                                    result: true,
                                });

                                return (
                                    <div key={sensor.id} className={resultClassName} onClick={handleSensorClick}>
                                        <div>{sensor.name}, {sensor.group_name} [{sensor.device.name}]</div>
                                        {disabled && <div className="already-in-use">(Already in use
                                            at {usedOn ? usedOn : "Current tab"} [{machineName ? machineName : "Untitled machine"}])</div>}
                                    </div>
                                );
                            })}
                        </div>
                        {(selectedSensorInfo && selectedSensorInfo.sensor) &&
                        <button className="btn btn-danger small"
                                onClick={handleClearSensor}>Remove {selectedSensorInfo.sensor.name}</button>
                        }
                    </div>
                    <div className="select-sensor-filters">
                        <div className="filter-wrapper">
                            <h6>Sensor Type</h6>
                            <ul>
                                <li>
                                    <label>
                                        <input type="checkbox" name="excludeGroup" onChange={this.toggleFilterAll}
                                               checked={!excludeGroup.length}/>
                                        <div>Select All</div>
                                    </label>
                                </li>
                                {sensorGroups.map((groupObj: any) => {
                                    return (
                                        <li key={groupObj.value}>
                                            <label>
                                                <input type="checkbox" value={groupObj.value} name="excludeGroup"
                                                       onChange={this.handleFilterChange}
                                                       checked={!excludeGroup.includes(groupObj.value)}/>
                                                <div>{groupObj.label}</div>
                                            </label>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="filter-wrapper">
                            <h6>Devices</h6>
                            <ul>
                                <li>
                                    <label>
                                        <input type="checkbox" name="excludeDevices" onChange={this.toggleFilterAll}
                                               checked={!excludeDevices.length}/>
                                        <div>Select All</div>
                                    </label>
                                </li>
                                {availableDevices.map((device: any) =>
                                    <li key={device.id}>
                                        <label>
                                            <input type="checkbox" value={device.id} name="excludeDevices"
                                                   onChange={this.handleFilterChange}
                                                   checked={!excludeDevices.includes(device.id.toString())}/>
                                            <div>{device.name}</div>
                                        </label>
                                    </li>,
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }

    private search = (q: string) => {
        const {excludeDevices, excludeGroup} = this.state;

        this.props.searchSensors({
            "exclude_devices": excludeDevices,
            "exclude_group_name": excludeGroup,
            q,
        });
    };

    private handleFilterChange = (e: any) => {
        const {suggestionsInputValue} = this.props;
        const fieldName = e.target.name;
        const currentArrayValue = this.state[fieldName].slice();

        const newValue = e.target.value;

        if (e.target.checked) {
            const currentValueIndex = currentArrayValue.findIndex((value: any) => value === newValue);
            currentArrayValue.splice(currentValueIndex, 1);
        } else {
            currentArrayValue.push(newValue);
        }

        this.setState({
            [fieldName]: currentArrayValue,
        } as Pick<SelectSensorPopupState, keyof SelectSensorPopupState>, () => {
            this.search(suggestionsInputValue);
        });
    };

    private toggleFilterAll = (e: any) => {
        const {suggestionsInputValue, match, locations} = this.props;
        const availableDevices = locations.find((location: Location) => location.id === parseFloat(match.params.siteId)).devices;
        const fieldName = e.target.name;
        let newFieldValue = [];

        if (!e.target.checked) {
            if (fieldName === "excludeGroup") {
                newFieldValue = sensorGroups.map((groupObj: any) => groupObj.value);
            } else if (fieldName === "excludeDevices") {
                newFieldValue = availableDevices.map((device: any) => device.id.toString());
            }
        }

        this.setState({
            [fieldName]: newFieldValue,
        } as Pick<SelectSensorPopupState, keyof SelectSensorPopupState>, () => {
            this.search(suggestionsInputValue);
        });
    };
}


const mapStateToProps = (state: any) => {
    return {
        app: state.schemasReducer.app,
        locations: state.schemasReducer.locations,
        onTabSensors: state.schemasReducer.onTabSensors,
        schemaDetails: state.schemasReducer.schemaDetails,
        selectedSensorInfo: state.schemasReducer.selectedSensorInfo,
        sensorSuggestions: state.schemasReducer.sensorSuggestions,
        suggestionsInputValue: state.schemasReducer.suggestionsInputValue,
        tabDetails: state.schemasReducer.tabDetails,
    };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        closeSuggestionsBlock: () => {
            dispatch({type: schemasConstants.SELECT_SENSOR_PORT});
        },
        searchSensors: (params: any) => {
            dispatch({
                payload: {
                    location: ownProps.match.params.siteId,
                    ...params,
                },
                type: schemasConstants.SEARCH_SENSORS,
            });
        },
        toggleSensor: (sensorId: number) => {
            dispatch({type: schemasConstants.TOGGLE_SENSOR, payload: sensorId});
        },
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SelectSensorPopup));
