import classNames from "classnames";
import * as React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

// components
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import DashboardBase from "../../components/DashboardBase/DashboardBase";
import ModifyPublishedSchemaModal from "../../components/ModifyPublishedSchemaModal/ModifyPublishedSchemaModal";

// utils
import {hasEditPermissions} from "../../helpers/helperFunctions";
import history from "../../helpers/history";
import {SchemaRoute} from "../../interfaces/schemaRoute";
import urls from "../../constants/urls";

// styles
import "react-tabs/style/react-tabs.css";
import "./SchemaDetails.css";

// images
import {ReactComponent as Edit} from "../../assets/icons/visual_edit.svg";
import {ReactComponent as Copy} from "../../assets/icons/visual_copy.svg";
import {ReactComponent as Delete} from "../../assets/icons/visual_delete.svg";


// constants
import * as schemasConstants from "../../constants/actions/schemasConstants";

// interfaces
import {SchemaDetails, TabInList} from "../../interfaces/schemasReducer";
import {Dropdown, Menu} from "antd";
import {DownOutlined, SettingFilled, ToolFilled} from "@ant-design/icons";
import clsx from "clsx";
import classes from "./components/SettingDropdown/SettingPopup.module.scss";
import TabDetails from "./components/TabDetails/TabDetails";
import {CustomButton} from "../../components/Button";

export interface SchemaDetailsProps extends SchemaRoute {
    getSchemaDetails: (id: string) => void,
    clearSchemaDetails: () => void,
    deleteSchema: (id: number) => void,
    deleteTab: (params: any) => void,
    schemaDetails: SchemaDetails,
    currentLocation: number,
    toggleModifyPublishedModal: (isOpen: boolean, schemaId?: number, siteId?: string, onSubmit?: (response: any) => void) => void,
    cloneTab: (tabId: number) => void,
    schemaNotifications: any[]
    currentUser: any
}

class SchemaDetailsPage extends React.Component<SchemaDetailsProps> {
    protected modalRef: any;
    protected modalAgainRef: any;
    protected confirmationDeleteTabModalRef: any;
    protected confirmationAgainDeleteTabModalRef: any;

    public componentDidMount() {
        const {match: {params: {schemaId}}, getSchemaDetails} = this.props;

        getSchemaDetails(schemaId);
    }

    public componentWillReceiveProps(newProps: SchemaDetailsProps) {
        const {match: {params: {schemaId}}, getSchemaDetails} = this.props;

        if (newProps.match.params.schemaId !== schemaId) {
            getSchemaDetails(newProps.match.params.schemaId);
        }
    }

    public componentWillUnmount() {
        this.props.clearSchemaDetails();
    }

    public renderPageTitle() {
        const {schemaDetails, currentLocation, currentUser, match} = this.props;

        const canEdit = hasEditPermissions(currentUser, parseFloat(match.params.siteId));

        const modifyLink = schemaDetails && schemaDetails.schema_tabs[0] ?
            urls.tabEdit
                .replace(":siteId", `${currentLocation}`)
                .replace(":schemaId", `${schemaDetails && schemaDetails.id}`)
                .replace(":tabId", `${schemaDetails.schema_tabs[0].id}`) :
            urls.tabNew
                .replace(":siteId", `${currentLocation}`)
                .replace(":schemaId", `${schemaDetails && schemaDetails.id}`);

        const menu = <Menu>
            <Menu.Item key="0" icon={<ToolFilled/>}>
                <Link to={urls.schemasList.replace(":siteId", `${currentLocation}`)}>Show versions</Link>
            </Menu.Item>
            <Menu.Divider className={classes.driver}/>

            <Menu.Item key="1" icon={<ToolFilled/>}>
                {schemaDetails && !schemaDetails.is_published && <Link to={modifyLink}>Modify schema</Link>}
            </Menu.Item>
            <Menu.Divider className={classes.driver}/>
            <Menu.Item key="2" icon={<ToolFilled/>}>
                {schemaDetails && !schemaDetails.is_published &&
                <span onClick={this.modalRef && this.modalRef.showModal}>
                    Delete schema
                </span>}
            </Menu.Item>
            <Menu.Divider className={classes.driver}/>
            <Menu.Item key="3" icon={<ToolFilled/>}>
                {schemaDetails && !schemaDetails.is_published && <Link
                    to={urls.tabNew.replace(":siteId", `${currentLocation}`)
                        .replace(":schemaId", `${schemaDetails && schemaDetails.id}`)}>
                    Add tab
                </Link>}
            </Menu.Item>
        </Menu>;

        return (
            <div className="schema-details__title">
                <span>
                    Live View: {schemaDetails ? schemaDetails.name : ""}
                </span>

                {
                    canEdit
                    &&
                    <div className={classes.dropdownWrap}>
                        <SettingFilled className="mar-right-10"/>

                        <Dropdown overlay={menu}
                                  trigger={["click"]}
                                  placement="bottomLeft"
                                  overlayClassName={classes.dropdown}>
                    <span className={clsx("ant-dropdown-link", classes.menuTitle)}
                          onClick={e => e.preventDefault()}
                    >
                        Setting <DownOutlined/>
                    </span>
                        </Dropdown>
                    </div>
                }
            </div>
        );
    }

    public render() {
        const {
            schemaDetails,
            deleteTab,
            match,
            currentLocation,
            deleteSchema,
            toggleModifyPublishedModal,
            cloneTab,
            // schemaNotifications,
            currentUser,
        } = this.props;

        const canEdit = hasEditPermissions(currentUser, parseFloat(match.params.siteId));

        const confirmationDeleteTabModalRef = (ref: any) => this.confirmationDeleteTabModalRef = ref;
        const confirmationAgainDeleteTabModalRef = (ref: any) => this.confirmationAgainDeleteTabModalRef = ref;

        const handleDeleteSchemaClick = () => {
            this.modalAgainRef.showModal();
        };

        const handleConfirmDeleteSchema = () => {
            deleteSchema(schemaDetails.id);
        };

        const handleConfirmDeleteTab = (tabId: number) => {
            this.confirmationAgainDeleteTabModalRef.showModal({
                nextTabId: `${tabId}` === match.params.tabId && schemaDetails.schema_tabs[0].id,
                tabId,
            });
        };

        const modalRef = (ref: any) => this.modalRef = ref;
        const modalAgainRef = (ref: any) => this.modalAgainRef = ref;

        const handleNewTabClick = () => {
            if (schemaDetails.is_published) {
                toggleModifyPublishedModal(
                    true,
                    schemaDetails.id,
                    match.params.siteId,
                    (response: any) => {
                        history.push(urls.tabNew.replace(":siteId", `${currentLocation}`).replace(":schemaId", `${response.id}`));
                    });
            } else {
                history.push(urls.tabNew.replace(":siteId", `${currentLocation}`).replace(":schemaId", `${schemaDetails.id}`));
            }
        };

        return (
            <DashboardBase pageTitle={this.renderPageTitle()} className="schema-details" isDetails={true}>
                {schemaDetails &&
                <div className="notifications-wrapper">
                    <div className="schema-wrapper">
                        <div className="schema-tabs-container">
                            <div className="schema-tabs">
                                {schemaDetails.schema_tabs.map((tab: TabInList, index: number) => {
                                    const handleDeleteClick = () => {
                                        if (this.confirmationDeleteTabModalRef) {
                                            this.confirmationDeleteTabModalRef.showModal(tab.id);
                                        }
                                    };

                                    const handleCloneClick = () => {
                                        if (schemaDetails.is_published) {
                                            toggleModifyPublishedModal(
                                                true,
                                                schemaDetails.id,
                                                match.params.siteId,
                                                (response: any) => {
                                                    cloneTab(response.schema_tabs[index].id);
                                                },
                                            );
                                        } else {
                                            cloneTab(tab.id);
                                        }
                                    };

                                    const handleEditClick = () => {
                                        if (schemaDetails.is_published) {
                                            toggleModifyPublishedModal(
                                                true,
                                                schemaDetails.id,
                                                match.params.siteId,
                                                (response: any) => {
                                                    history.push(urls.tabEdit.replace(":siteId", `${currentLocation}`)
                                                        .replace(":schemaId", `${response.id}`)
                                                        .replace(":tabId", `${response.schema_tabs[index].id}`));
                                                });
                                        } else {
                                            history.push(urls.tabEdit.replace(":siteId", `${currentLocation}`)
                                                .replace(":schemaId", `${schemaDetails.id}`)
                                                .replace(":tabId", `${tab.id}`));
                                        }
                                    };

                                    const tabClassNames = classNames({
                                        "schema-tabs-wrap": true,

                                        // change color tabs with selected
                                        // "schema-tab": true,
                                        // selected: `${tab.id}` === match.params.tabId,
                                    });

                                    // const notificationsForThisTab = schemaNotifications.filter((notification: any) => _.some(tab.sensors_ids, (sensorIdObj: any) => {
                                    //     return _.some(sensorIdObj, (obj: any, sensorId: string) => notification.full_sensor_id === sensorId);
                                    // }));

                                    // let TabIconImg = () => <img src={tabIcon} className="schema-tab__icon" alt={"schema"}/>;
                                    //
                                    // if (_.some(notificationsForThisTab, (notification: any) => ["Alarm Detected", "Alarm Changed"].includes(notification.event_type))) {
                                    //     TabIconImg = () => <img src={alarmIcon} className="schema-tab__icon" alt={"schema"}/>;
                                    // } else if (_.some(notificationsForThisTab, (notification: any) => ["Warning Detected", "Warning Changed"].includes(notification.event_type))) {
                                    //     TabIconImg = () => <IoIosWarning className="schema-tab__icon" color="#fffeb2"
                                    //                                      size="15"/>;
                                    // }


                                    return (
                                        <div key={tab.id} className={tabClassNames}>

                                            {/*apply with design*/}
                                            {/*<TabIconImg/>*/}

                                            <div className="schema-tab__body d-flex">
                                                <div className="name">
                                                    <Link
                                                        to={urls.schemaDetails.replace(":siteId", `${currentLocation}`)
                                                            .replace(":schemaId", `${schemaDetails.id}`)
                                                            .replace(":tabId", `${tab.id}`)}
                                                        className="title">
                                                        {tab.name}
                                                    </Link>
                                                </div>
                                                {
                                                    canEdit
                                                    &&
                                                    <div className="d-flex">
                                                        <div onClick={handleEditClick} className="schema-tab__button mar-right-10">
                                                            <Edit/>
                                                        </div>
                                                        <div className="schema-tab__button mar-right-10" onClick={handleCloneClick}>
                                                            <Copy/>
                                                        </div>
                                                        {Boolean(schemaDetails.schema_tabs.length) && !schemaDetails.is_published &&
                                                        <div className="schema-tab__button mar-right-10" onClick={handleDeleteClick}>
                                                            <Delete/>
                                                        </div>
                                                        }
                                                    </div>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {
                                canEdit
                                &&
                                <CustomButton onClick={handleNewTabClick}
                                              width="181px"
                                              height="40px"
                                              padding="0"
                                              className="custom-button"
                                              htmlType="button"
                                >
                                    ADD NEW SCHEMA
                                </CustomButton>
                            }
                        </div>
                        <TabDetails tabId={match.params.tabId} schemaDetails={schemaDetails}/>
                    </div>
                </div>
                }
                <ConfirmationModal ref={confirmationDeleteTabModalRef}
                                   handleConfirm={handleConfirmDeleteTab}
                                   message="Are you sure you want to delete this tab?"/>
                <ConfirmationModal ref={confirmationAgainDeleteTabModalRef} handleConfirm={deleteTab}
                                   message="This action can't be undone. Do you want to continue?"/>
                <ConfirmationModal ref={modalRef} handleConfirm={handleDeleteSchemaClick}
                                   message="Are you sure you want to delete this schema?"/>
                <ConfirmationModal ref={modalAgainRef} handleConfirm={handleConfirmDeleteSchema}
                                   message="This action can't be undone. Do you want to continue?"/>
                <ModifyPublishedSchemaModal title="It's not allowed to modify published schema!"/>
            </DashboardBase>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        currentLocation: state.schemasReducer.currentLocation,
        currentUser: state.authReducer.currentUser,
        schemaDetails: state.schemasReducer.schemaDetails,
        schemaNotifications: state.schemasReducer.schemaNotifications,
    };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        clearSchemaDetails: () => {
            dispatch({type: schemasConstants.CLEAR_SCHEMA_DETAILS});
        },
        cloneTab: (tabId: number) => {
            dispatch({
                payload: {
                    schemaId: ownProps.match.params.schemaId,
                    siteId: ownProps.match.params.siteId,
                    tabId,
                },
                type: schemasConstants.CLONE_TAB,
            });
        },
        deleteSchema: (id: number) => {
            dispatch({
                payload: {
                    id,
                    siteId: ownProps.match.params.siteId,
                },
                type: schemasConstants.DELETE_SCHEMA,
            });
        },
        deleteTab: ({nextTabId, tabId}: any) => {
            dispatch({
                payload: {
                    nextTabId,
                    schemaId: ownProps.match.params.schemaId,
                    siteId: ownProps.match.params.siteId,
                    tabId,
                },
                type: schemasConstants.DELETE_TAB,
            });
        },
        getSchemaDetails: (id: string) => {
            dispatch({type: schemasConstants.GET_SCHEMA_DETAILS, payload: id});
        },
        toggleModifyPublishedModal: (isOpen: boolean, schemaId: number, siteId: string, onSuccess: (response: any) => void) => {
            dispatch({
                payload: {
                    isOpen,
                    onSuccess,
                    schemaId,
                    siteId,
                },
                type: schemasConstants.TOGGLE_MODIFY_PUBLISHED_MODAL,
            });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SchemaDetailsPage);
