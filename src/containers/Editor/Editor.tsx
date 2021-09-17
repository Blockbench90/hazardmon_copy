import arrayMove from "array-move";
import * as React from "react";
import {connect} from "react-redux";
import {Prompt, Redirect} from "react-router";
import {Link} from "react-router-dom";
import {SortableContainer, SortableElement} from "react-sortable-hoc";
import {DiagramWidget} from "storm-react-diagrams";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

// utils
import Notification from "../../components/Notification/Notification";
import {hasEditPermissions} from "../../helpers/helperFunctions";
import urls from "../../constants/urls";

// styles
import "storm-react-diagrams/dist/style.min.css";
import "./Editor.css";

// constants
import * as schemasConstants from "../../constants/actions/schemasConstants";

// interfaces
import {SchemaRoute} from "../../interfaces/schemaRoute";
import {
    Connector,
    MachineType,
    SchemaDetails,
    SelectedSensorInfo,
    TabDetails,
    TabInList,
} from "../../interfaces/schemasReducer";

// components
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import CustomNodeModel from "../../components/CustomNode/CustomNodeModel";
import DashboardBase from "../../components/DashboardBase/DashboardBase";
import {Application} from "./components/Application";
import SelectSensorPopup from "./components/SelectSensorPopup";
import {TrayItemWidget} from "./components/TrayItemWidget";

import {SHAPE_TYPES} from "../../components/ShapesNode/ShapesNodeConstants";
import ShapesNodeModel from "../../components/ShapesNode/ShapesNodeModel";

import LabelNodeModel from "../../components/LabelNode/LabelNodeModel";

// images
import editIcon from "../../assets/img/edit-icon-green.png";
import tabIcon from "../../assets/img/tab-icon.png";

export interface SchemaEditorState {
    name: string
    schemaName: string
    showSchemaNameForm: boolean
    height: number
    width: number
    schemaTabs: TabInList[]
}

export interface SchemaEditorProps extends SchemaRoute {
    saveForm: (schemaName: string, name: string, app: any, dimensions: any) => void
    getTabDetails: (id: string) => void
    getSchemaDetails: (id: string) => void
    tabDetails: TabDetails
    tabDetailsLoading: boolean
    clearTabDetails: () => void
    app: Application
    machineTypesList: MachineType[]
    getMachineTypesList: any
    selectedSensorInfo: SelectedSensorInfo
    updateFlag: string
    schemaDetails: SchemaDetails
    schemaDetailsLoading: boolean
    showEditorPromt: boolean
    toggleShowEditorPromt: () => void
    changeTabsOrder: (orderArray: any) => void
    onTabSensors: number[]
    currentUser: any
}

class Editor extends React.Component<SchemaEditorProps, SchemaEditorState> {
    public SortableItem = SortableElement((props: any) => {
        const {tabDetails, match, schemaDetails} = this.props;
        const {name} = this.state;

        return ((tabDetails && tabDetails.id !== props.tab.id) || !tabDetails) ? (
            <Link
                to={urls.tabEdit.replace(":siteId", `${match.params.siteId}`).replace(":schemaId", `${schemaDetails.id}`).replace(":tabId", `${props.tab.id}`)}
                key={props.index}
                className="schema-tab"
            >
                <img src={tabIcon} className="schema-tab__icon"/>
                <div className="schema-tab__body">
                    <div>
                        {props.tab.name}
                    </div>
                </div>
            </Link>
        ) : tabDetails && (
            <div className="schema-tab selected" key={props.index}>
                <img src={tabIcon} className="schema-tab__icon"/>
                <input type="text" name="name" value={name ? name : ""} onChange={this.handleNameInputChange}/>
            </div>
        );

    });

    public SortableList = SortableContainer(() => {
        const {schemaTabs, name} = this.state;
        const {tabDetails} = this.props;
        console.log("tabDetails ===>", tabDetails, "<=== done");
        console.log("schemaTabs, name ===>", schemaTabs, name, "<=== done");

        return (
            <div className="schema-tabs">
                {schemaTabs.map((tab: TabInList, index: number) => (
                    <this.SortableItem key={`item-${index}`} index={index} tab={tab} disabled={!tabDetails}/>
                ))}
                {!tabDetails &&
                <div className="schema-tab selected">
                    <img src={tabIcon} className="schema-tab__icon"/>
                    <input type="text" name="name" value={name ? name : ""} onChange={this.handleNameInputChange}/>
                </div>
                }
            </div>
        );
    });

    protected suggestionBlockRefer: any;
    protected confirmationSaveModalRef: any;

    constructor(props: any) {
        super(props);

        this.state = {
            height: 600,
            name: "",
            schemaName: props.schemaDetails && props.match.params.schemaId ? props.schemaDetails.name : "",
            schemaTabs: props.schemaDetails ? props.schemaDetails.schema_tabs.slice() : [],
            showSchemaNameForm: !Boolean(props.match.params.schemaId),
            width: 800,
        };

        this.handleNameInputChange = this.handleNameInputChange.bind(this);
        this.handleSchemaNameInputChange = this.handleSchemaNameInputChange.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onEditSchemaNameClick = this.onEditSchemaNameClick.bind(this);
    }

    public componentDidMount() {
        const {
            match,
            getTabDetails,
            getSchemaDetails,
            getMachineTypesList,
            clearTabDetails,
            toggleShowEditorPromt,
        } = this.props;

        if (match.params.tabId) {
            getTabDetails(match.params.tabId);
        } else {
            clearTabDetails();
        }

        if (match.params.schemaId) {
            getSchemaDetails(match.params.schemaId);
        }

        getMachineTypesList();
        toggleShowEditorPromt();
    }

    public componentWillReceiveProps(newProps: any) {
        const {tabDetails, schemaDetails, updateFlag, match, getTabDetails, clearTabDetails} = this.props;
        if (newProps.tabDetails && (newProps.tabDetails !== tabDetails) && match.params.tabId) {
            this.setState({
                height: newProps.tabDetails.height || 600,
                name: newProps.tabDetails.name,
                schemaName: newProps.tabDetails.schema.name,
                width: newProps.tabDetails.width || 970,
            });
        }

        if (newProps.schemaDetails && (schemaDetails !== newProps.schemaDetails)) {
            this.setState({
                schemaName: newProps.schemaDetails.name,
                schemaTabs: newProps.schemaDetails.schema_tabs.slice(),
            });
        }

        if (updateFlag !== newProps.updateFlag) {
            setTimeout(() => {
                this.forceUpdate();
            });
        }

        if (match.params.tabId !== newProps.match.params.tabId) {
            getTabDetails(newProps.match.params.tabId);
        }

        if (newProps.tabDetails && !match.params.tabId) {
            clearTabDetails();
        }
    }

    public componentDidUpdate() {
        if (this.props.showEditorPromt) {
            window.onbeforeunload = () => true;
        } else {
            // @ts-ignore
            window.onbeforeunload = () => undefined;
        }
    }

    public componentWillUnmount() {
        this.props.clearTabDetails();
    }

    public renderSidebar() {
        const {machineTypesList} = this.props;
        return (
            <div>
                <div className="machines-types">
                    <div className="machines-types__title">
                        <h4>Type of Machines:</h4>
                    </div>
                    {machineTypesList.map((widget: any) =>
                        <TrayItemWidget
                            key={widget.id}
                            model={{...widget, type: "custom"}}
                            name={widget.name}
                        />,
                    )}
                    <TrayItemWidget
                        model={{type: "shape", shape: SHAPE_TYPES.LINE}}
                        name="Line"
                    />
                    <TrayItemWidget
                        model={{type: "shape", shape: SHAPE_TYPES.RECTANGLE}}
                        name="Rectangle"
                    />
                    <TrayItemWidget
                        model={{type: "shape", shape: SHAPE_TYPES.CIRCLE}}
                        name="Circle"
                    />
                    <TrayItemWidget
                        model={{type: "label"}}
                        name="Label"
                    />
                </div>
            </div>

        );
    }

    public onHeightChange = (e: any) => {
        this.setState({height: e.target.value && parseFloat(e.target.value)});
    };

    public onWidthChange = (e: any) => {
        this.setState({width: e.target.value && parseFloat(e.target.value)});
    };

    public mouseOnEditor = () => {
        document.body.style.overflow = "hidden";
    };

    public mouseOffEditor = () => {
        document.body.style.overflow = "visible";
    };

    public render() {
        const {
            saveForm,
            app,
            selectedSensorInfo,
            showEditorPromt,
            schemaDetails,
            schemaDetailsLoading,
            tabDetails,
            tabDetailsLoading,
            match,
            currentUser,
        } = this.props;
        const {name, schemaName, height, width, schemaTabs} = this.state;

        const canEdit = hasEditPermissions(currentUser, parseFloat(match.params.siteId));

        if (!canEdit) {
            Notification.error("You are not allowed to visit this page");

            return (
                <Redirect to={urls.schemasList}/>
            );
        }

        const confirmationSaveModalRef = (ref: any) => this.confirmationSaveModalRef = ref;

        const handleSaveForm = () => saveForm(schemaName, name, app, {height, width});

        const handleSavePress = () => {
            if (schemaDetails && schemaDetails.is_published) {
                this.confirmationSaveModalRef.showModal();
            } else {
                handleSaveForm();
            }
        };

        let cancelLink = schemaDetails ? urls.schemaDetails.replace(":siteId", `${match.params.siteId}`).replace(":schemaId", `${schemaDetails.id}`) : urls.schemasList.replace(":siteId", `${match.params.siteId}`);

        if (tabDetails) {
            cancelLink = cancelLink.replace(":tabId", `${tabDetails.id}`);
        } else {
            cancelLink = cancelLink.replace(":tabId", `${schemaDetails && schemaTabs[0].id}`);
        }

        return (
            <React.Fragment>
                <Prompt
                    when={showEditorPromt}
                    message="Are you sure you want to continue without saving?"
                />
                <DashboardBase
                    pageTitle={this.renderTitle()}
                    sidebar={this.renderSidebar()}
                    isEditor={true}
                    className="tab-editor"
                >
                    {(schemaDetailsLoading || tabDetailsLoading) ? <LoadingComponent/> :
                        <div
                            className="diagram-layer"
                            onDrop={this.onDrop}
                            onDragOver={this.onDragOver}
                        >
                            {/*<this.SortableList onSortEnd={this.onSortEnd} axis="x" pressDelay={100}*/}
                            {/*                   helperClass="dragging"/>*/}
                            {/*<div className="dimensions">*/}
                            {/*    <div>*/}
                            {/*        <label htmlFor="inputHeight">Height</label>*/}
                            {/*        <input type="number" id="inputHeight" value={height}*/}
                            {/*               onChange={this.onHeightChange}/>*/}
                            {/*    </div>*/}
                            {/*    <div>*/}
                            {/*        <label htmlFor="inputWidth">Width</label>*/}
                            {/*        <input type="number" id="inputWidth" value={width} onChange={this.onWidthChange}/>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className="canvas-wrapper">
                                <div className="size-controller" style={{height, width}}
                                     onMouseEnter={this.mouseOnEditor} onMouseLeave={this.mouseOffEditor}>
                                    <DiagramWidget className="srd-demo-canvas" diagramEngine={app.getDiagramEngine()}/>
                                </div>
                                {selectedSensorInfo && <SelectSensorPopup tabName={name}/>}
                            </div>
                            <div className="save-button-container">
                                <Link to={cancelLink} className="btn small">Cancel</Link>
                                <button onClick={handleSavePress} className="btn btn-success small">Save</button>
                            </div>
                        </div>
                    }
                    <ConfirmationModal ref={confirmationSaveModalRef} handleConfirm={handleSaveForm}
                                       message="This schema is currently published and can’t be edited. A separate copy of this schema will be created instead. Do you want to continue?"/>
                </DashboardBase>
            </React.Fragment>
        );
    }

    private renderTitle() {
        const {match, schemaDetails} = this.props;
        const {schemaName, showSchemaNameForm, height, width} = this.state;

        return match.params.schemaId ? (
            <div>
                <div className="editor-title">
                    <span>
                        Editor: Edit
                    </span>
                    {showSchemaNameForm &&
                    <input type="text" value={schemaName ? schemaName : ""} onChange={this.handleSchemaNameInputChange}
                           placeholder="Schema name"/> ||
                    <React.Fragment>
                    <span>
                        {schemaName}
                    </span>
                        <button onClick={this.onEditSchemaNameClick}>
                            <img src={editIcon} alt="edit"/>
                        </button>
                    </React.Fragment>
                    }
                </div>
                {schemaDetails && schemaDetails.is_published && <div className="will-copy-descr">
                    Note: This schema is currently published and can’t be edited. A separate copy of this schema will be
                    created instead
                </div>}
            </div>
        ) : (
            <div className="editor-title">
                <div>
                    <span className="editor-title__editor">
                        Editor: Create
                    </span>
                    <input type="text" value={schemaName ? schemaName : ""} onChange={this.handleSchemaNameInputChange} />
                </div>

                {/*<this.SortableList onSortEnd={this.onSortEnd} axis="x" pressDelay={100} helperClass="dragging"/>*/}

                <div className="dimensions">
                    <div>
                        <label htmlFor="inputHeight" className="dimensions-input__title">Height</label>
                        <input type="number" id="inputHeight" value={height}
                               onChange={this.onHeightChange}/>
                    </div>
                    <div>
                        <label htmlFor="inputWidth" className="dimensions-input__title">Width</label>
                        <input type="number" id="inputWidth" value={width} onChange={this.onWidthChange}/>
                    </div>
                </div>
            </div>
        );
    }

    private onEditSchemaNameClick() {
        this.setState({showSchemaNameForm: true});
    }

    private onDragOver(event: any) {
        event.preventDefault();
    }

    private onDrop(event: any) {
        if (event.dataTransfer.getData("storm-diagram-node")) {
            const data = JSON.parse(event.dataTransfer.getData("storm-diagram-node"));

            const node = data.type === "custom" && new CustomNodeModel(data.anchor_points) ||
                data.type === "shape" && new ShapesNodeModel(data.shape) ||
                data.type === "label" && new LabelNodeModel();

            node.extras = {...node.extras, ...data, sensors: [], scale: 1};
            const points = this.props.app.getDiagramEngine().getRelativeMousePoint(event);
            node.x = points.x;
            node.y = points.y;

            this.props.app
                .getDiagramEngine()
                .getDiagramModel()
                .addNode(node);
            this.forceUpdate();
        }
    }

    private handleNameInputChange(e: any) {
        this.setState({
            name: e.target.value,
        });
    }

    private handleSchemaNameInputChange(e: any) {
        this.setState({
            schemaName: e.target.value,
        });
    }

    private onSortEnd = (props: any) => {
        const {changeTabsOrder} = this.props;
        this.setState(({schemaTabs}) => ({
            schemaTabs: arrayMove(schemaTabs, props.oldIndex, props.newIndex),
        }), () => {
            changeTabsOrder(this.state.schemaTabs.map((tab: TabInList, index: number) => ({id: tab.id, order: index})));
        });
    };
}

const mapStateToProps = (state: any) => {
    return {
        app: state.schemasReducer.app,
        currentUser: state.authReducer.currentUser,
        machineTypesList: state.schemasReducer.machineTypesList,
        onTabSensors: state.schemasReducer.onTabSensors,
        schemaDetails: state.schemasReducer.schemaDetails,
        schemaDetailsLoading: state.schemasReducer.schemaDetailsLoading,
        selectedSensorInfo: state.schemasReducer.selectedSensorInfo,
        showEditorPromt: state.schemasReducer.showEditorPromt,
        tabDetails: state.schemasReducer.tabDetails,
        tabDetailsLoading: state.schemasReducer.tabDetailsLoading,
        updateFlag: state.schemasReducer.updateFlag,
    };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        changeTabsOrder: (orderArray: any) => {
            dispatch({
                payload: orderArray,
                type: schemasConstants.CHANGE_TABS_ORDER,
            });
        },
        clearTabDetails: () => {
            dispatch({type: schemasConstants.CLEAR_TAB_DETAILS});
        },
        getMachineTypesList: () => {
            dispatch({type: schemasConstants.GET_MACHINE_TYPES_LIST});
        },
        getSchemaDetails: (id: string) => {
            dispatch({type: schemasConstants.GET_SCHEMA_DETAILS, payload: id});
        },
        getTabDetails: (id: string) => {
            dispatch({type: schemasConstants.GET_TAB_DETAILS, payload: id});
        },
        saveForm: (schemaName: string, name: string, app: any, dimensions: any) => {
            const serializedApp = app.serialize();
            const formData: TabDetails = {
                connectors: [],
                height: dimensions.height,
                id: ownProps.match.params.tabId ? ownProps.match.params.tabId : undefined,
                location: ownProps.match.params.siteId,
                machines: [],
                name,
                offset_x: serializedApp.offsetX,
                offset_y: serializedApp.offsetY,
                schema: ownProps.match.params.schemaId ? ownProps.match.params.schemaId : null,
                schema_name: schemaName,
                shapes: [],
                text_elements: [],
                width: dimensions.width,
                zoom: serializedApp.zoom,
            };

            serializedApp.nodes.forEach((node: any) => {
                switch (node.type) {
                    case "shapes":
                        formData.shapes.push(node);
                        break;
                    case "label":
                        formData.text_elements.push(node);
                        break;
                    case "custom":
                        const sensors = node.extras.sensors ? node.extras.sensors.map((sensorObj: any) => ({
                            ...sensorObj,
                            sensor: sensorObj.sensor.id,
                        })) : undefined;
                        formData.machines.push({
                            flip: node.extras.flip,
                            frontend_id: node.id,
                            id: node.extras.machineId,
                            name: node.extras.machineName,
                            scale: node.extras.scale,
                            sensors,
                            system_state_sensor: node.extras.system_state_sensor && node.extras.system_state_sensor.id,
                            type_of_machine: node.extras.id,
                            x_coord: Math.round(node.x),
                            y_coord: Math.round(node.y),
                        });
                }
            });

            serializedApp.links.forEach((link: any) => {
                const sourceNode = serializedApp.nodes.find((node: any) => node.id === link.source);
                const sourcePort = sourceNode.ports.find((node: any) => node.id === link.sourcePort);
                const targetNode = serializedApp.nodes.find((node: any) => node.id === link.target);
                const additionalPoints = link.points.slice();
                additionalPoints.shift();
                let connector: Connector = {
                    start_anchor_point: sourcePort.portId,
                    start_m_fe_id: sourceNode.id,
                    start_machine: sourceNode.extras.machineId,
                };

                if (targetNode) {
                    const targetPort = targetNode.ports.find((node: any) => node.id === link.targetPort);
                    connector = {
                        ...connector,
                        end_anchor_point: targetPort.portId,
                        end_m_fe_id: targetNode.id,
                        end_machine: targetNode.extras.machineId,
                    };

                    additionalPoints.pop();
                }

                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                connector.additional_points = additionalPoints.map((point: any) => ({
                    x_coord: point.x,
                    y_coord: point.y,
                })),

                    formData.connectors.push(connector);
            });

            dispatch({
                payload: {
                    formData,
                    siteId: ownProps.match.params.siteId,
                },
                type: schemasConstants.SAVE_TAB_FORM,
            });
        },
        toggleShowEditorPromt: () => {
            dispatch({
                payload: true,
                type: schemasConstants.TOGGLE_SHOW_EDITOR_PROMT,
            });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
