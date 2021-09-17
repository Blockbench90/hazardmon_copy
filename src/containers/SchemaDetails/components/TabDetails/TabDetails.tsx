import * as React from 'react';
import {connect} from 'react-redux';

import LoadingComponent from '../../../../components/LoadingComponent/LoadingComponent';
import Machine from '../../../../components/Machine/Machine';

import * as labelConstants from '../../../../components/LabelNode/LabelNodeConstants';
import * as schemasConstants from '../../../../constants/actions/schemasConstants';

import history from '../../../../helpers/history';
import urls from '../../../../constants/urls';
import { AnchorPoint, Connector, ConnectorAdditionalPoint,
    MachineExtended, SchemaDetails, TabDetails, TabInList,} from '../../../../interfaces/schemasReducer';
import "../../SchemaDetails.css";


export interface TabDetailsProps {
    getTabDetails: (id: string) => void
    tabDetails: TabDetails
    tabDetailsLoading: boolean
    tabId: string
    schemaDetails: SchemaDetails
    currentLocation: number
    toggleTabSocket: (isOpen: boolean, tabId: string) => void
}

class TabDetailsPage extends React.Component<TabDetailsProps> {
    public componentWillMount() {
        const { tabId, getTabDetails, toggleTabSocket, schemaDetails, currentLocation } = this.props;

        if (schemaDetails.schema_tabs.some((tabObj: TabInList) => tabObj.id.toString() === tabId)) {
            getTabDetails(tabId);
            toggleTabSocket(true, tabId);
        } else {
            history.push(urls.schemaDetails.replace(':siteId', `${currentLocation}`).replace(':schemaId', `${schemaDetails.id}`).replace(':tabId', `${schemaDetails.schema_tabs[0].id}`));
        }
    }

    public componentWillReceiveProps(newProps: TabDetailsProps) {
        const { tabId, getTabDetails, toggleTabSocket } = this.props;

        if (newProps.tabId !== tabId) {
            getTabDetails(newProps.tabId);
            toggleTabSocket(false, tabId);
            toggleTabSocket(true, newProps.tabId);

        }
    }

    public componentWillUnmount() {
        const { tabId, toggleTabSocket } = this.props;
        toggleTabSocket(false, tabId);
    }

    public render() {
        const { tabDetails, schemaDetails, currentLocation, tabDetailsLoading } = this.props;

        const scale = tabDetails ? tabDetails.zoom / 100 : 1;
        const top = tabDetails ? `${tabDetails.offset_y}px` : 0;
        const left = tabDetails ? `${tabDetails.offset_x}px` : 0;

        return (
            <div className="schema-details">
                <div className="details-wrapper">
                    <div className="size-controller" style={{height: tabDetails && tabDetails.height || 600, width: tabDetails && tabDetails.width || 776}}>
                        <div className="scale-block" style={{
                            left,
                            top,
                            transform: `scale(${scale})`,
                        }}>
                            {tabDetailsLoading && <LoadingComponent/>}
                            {tabDetails && tabDetails.machines.map((machine: MachineExtended) => {
                                const onMachineClick = () => history.push(urls.machineDetails.replace(':siteId', `${currentLocation}`).replace(':schemaId', `${schemaDetails.id}`).replace(':tabId', `${tabDetails.id}`).replace(':machineId', `${machine.id}`));
                                return (
                                    <Machine
                                        machine={machine}
                                        onMachineClick={onMachineClick}
                                        key={machine.id}
                                    />
                                )
                            })}
                            {tabDetails && this.renderConnections()}
                            {tabDetails && this.renderShapes()}
                            {tabDetails && this.renderLabels()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private renderConnections() {
        const { tabDetails: {connectors, machines} } = this.props;

        return (
            <svg className="links">
                {connectors && connectors.map((connector: Connector) => {
                    const points: any = [];

                    const startMachine = machines.find((machine: MachineExtended) => machine.id === connector.start_machine);
                    const startMachineAnchorPoint = startMachine.type_of_machine.anchor_points.find((point: AnchorPoint) => point.id === connector.start_anchor_point);
                    const startMachineAnchorXCoord = startMachine.flip ? 100 - startMachineAnchorPoint.x_coord : startMachineAnchorPoint.x_coord;
                    let startX = startMachine.x_coord + startMachine.type_of_machine.left_side_img_thumbs.large_width * startMachineAnchorXCoord / 100 * startMachine.scale;
                    if (startMachine.flip) {
                        startX -= 8;
                    } else {
                        startX += 8;
                    }
                    const startY = startMachine.y_coord + startMachine.type_of_machine.left_side_img_thumbs.large_height * startMachineAnchorPoint.y_coord / 100 * startMachine.scale + 8;

                    points.push(`${startX},${startY}`);

                    connector.additional_points.forEach((point: ConnectorAdditionalPoint) => points.push(`${point.x_coord},${point.y_coord}`));

                    const endMachine = machines.find((machine: MachineExtended) => machine.id === connector.end_machine);

                    if (endMachine) {
                        const endMachineAnchorPoint = endMachine.type_of_machine.anchor_points.find((point: AnchorPoint) => point.id === connector.end_anchor_point);
                        const endMachineAnchorXCoord = endMachine.flip ? 100 - endMachineAnchorPoint.x_coord : endMachineAnchorPoint.x_coord;
                        let endX = endMachine.x_coord + endMachine.type_of_machine.left_side_img_thumbs.large_width * endMachineAnchorXCoord / 100 * endMachine.scale;
                        if (endMachine.flip) {
                            endX -= 8;
                        } else {
                            endX += 8;
                        }
                        const endY = endMachine.y_coord + endMachine.type_of_machine.left_side_img_thumbs.large_height * endMachineAnchorPoint.y_coord / 100 * endMachine.scale + 8;

                        points.push(`${endX},${endY}`);
                    }

                    return (
                        <React.Fragment key={connector.id}>
                            <polyline
                                points={points.join(' ')}
                                className="connection-line"
                            />
                            {connector.additional_points.map((point: ConnectorAdditionalPoint, index: number) =>
                                <circle
                                    key={index}
                                    cx={point.x_coord}
                                    cy={point.y_coord}
                                    className="connection-point"
                                    r="5"
                                />
                            )}
                        </React.Fragment>
                    );
                })}
            </svg>
        );
    }

    private renderShapes() {
        const { tabDetails: { shapes } } = this.props;

        return shapes && shapes.map((shape: any) => (
            <div
                className={`vd-shape ${shape.extras.shape}`}
                key={shape.id}
                style={{
                    height: shape.extras.height,
                    left: shape.x + shape.extras.offsetLeft,
                    position: "absolute",
                    top: shape.y + shape.extras.offsetTop,
                    transform: `rotate(${shape.extras.rotateAngle || 0}deg)`,
                    width: shape.extras.width,
                    zIndex: 10
                }}
            />
        ));
    }

    private renderLabels() {
        const { tabDetails: { text_elements } } = this.props;

        return text_elements && text_elements.map((label: any) =>
            <span
                className="vd-label"
                key={label.id}
                style={{
                    cursor: 'initial',
                    fontSize: `${label.extras.fontSize}${labelConstants.FONT_UNIT}`,
                    left: `${label.x}px`,
                    position: "absolute",
                    top: `${label.y}px`,
                    zIndex: 10
                }}
            >
                {label.extras.value}
            </span>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        currentLocation: state.schemasReducer.currentLocation,
        tabDetails: state.schemasReducer.tabDetails,
        tabDetailsLoading: state.schemasReducer.tabDetailsLoading,
    }
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        getTabDetails: (id: string) => {
            dispatch({
                payload: id,
                type: schemasConstants.GET_TAB_DETAILS
            });
        },
        toggleTabSocket: (isOpen: boolean, tabId: string) => {
            dispatch({
                payload: {
                    isOpen,
                    tabId
                },
                type: schemasConstants.TOGGLE_TAB_SOCKET
            });
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TabDetailsPage);
