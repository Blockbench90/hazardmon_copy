import * as moment from 'moment';
import * as React from 'react';
import {FaChevronRight} from 'react-icons/fa';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';

// components
import DashboardBase from '../../components/DashboardBase/DashboardBase';
import Machine from '../../components/Machine/Machine';
import {hasEditPermissions} from '../../helpers/helperFunctions';
import MachineSensors from './components/MachineSensors/MachineSensors';

// utils
import {SchemaRoute} from '../../interfaces/schemaRoute';
import urls from '../../constants/urls';

// styles
import './MachineDetails.css';

// constants
import * as schemasConstants from '../../constants/actions/schemasConstants';

// interfaces
import {MachineExtended} from '../../interfaces/schemasReducer';
import SensorGraph from './components/SensorGraph/SensorGraph';

interface MachineDetailsProps extends SchemaRoute {
    getMachineDetails: () => void;
    getMachineLastTimeInAlarm: () => void;
    getMachineNotifications: () => void;
    getMachineMaintenance: () => void;
    clearMachineDetails: () => void;
    toggleMachineSocket: (isOpen: boolean) => void;
    machineDetails: MachineExtended;
    machineDetailsLastTimeInAlarm: {}
    machineDetailsNotifications: any[]
    machineDetailsMaintenance: any[]
    currentUser: any
}

class MachineDetails extends React.Component<MachineDetailsProps> {
    public componentDidMount() {
        const { 
            getMachineDetails,
            getMachineLastTimeInAlarm,
            getMachineNotifications,
            toggleMachineSocket,
            getMachineMaintenance
        } = this.props;

        getMachineDetails();
        getMachineLastTimeInAlarm();
        getMachineMaintenance();
        getMachineNotifications();
        toggleMachineSocket(true);
    }

    public componentWillUnmount() {
        const { clearMachineDetails, toggleMachineSocket } = this.props;
        clearMachineDetails();
        toggleMachineSocket(false);
    }

    public renderSidebar() {
        const { match } = this.props;
        return (
            <Link to={urls.schemaDetails.replace(':siteId', match.params.siteId).replace(':schemaId', match.params.schemaId).replace(':tabId', match.params.tabId)} className="btn small">{'<'} Back</Link>
        );
    }

    public render() {
        const { 
            machineDetails,
            machineDetailsNotifications,
            machineDetailsLastTimeInAlarm,
            machineDetailsMaintenance,
            match,
            currentUser
        } = this.props;

        const canEdit = hasEditPermissions(currentUser, parseFloat(match.params.siteId));

        return (
            <DashboardBase
                pageTitle="Live View: Detailed View"
                className="machine-details"
                sidebar={this.renderSidebar()}
            >
                {machineDetails &&
                <div className="breadcrumbs">
                    {canEdit &&
                    <Link
                        to={urls.schemasList
                            .replace(':siteId', `${machineDetails.schema.location.id}`)
                        }
                    >{machineDetails.schema.location.title}</Link> || <span>{machineDetails.schema.location.title}</span>
                    }
                    <FaChevronRight className="icon"/>
                    <Link
                        to={urls.schemaDetails
                            .replace(':siteId', `${machineDetails.schema.location.id}`)
                            .replace(':schemaId', `${machineDetails.schema.id}`)
                            .replace(':tabId', `${machineDetails.schema_tab.id}`)
                        }
                    >{machineDetails.schema.name}</Link>
                    <FaChevronRight className="icon"/>
                    <Link
                        to={urls.schemaDetails
                            .replace(':siteId', `${machineDetails.schema.location.id}`)
                            .replace(':schemaId', `${machineDetails.schema.id}`)
                            .replace(':tabId', `${machineDetails.schema_tab.id}`)
                        }
                    >{machineDetails.schema_tab.name}</Link>
                    <FaChevronRight className="icon"/>
                    <span>{machineDetails.name} Detailed View</span>
                </div>
                }
                {machineDetails &&
                <div className="details-wrapper">

                    <div className="row">
                        <div className="machine-info">
                            <Machine
                                machine={machineDetails}
                                lastTimeInAlarmData={machineDetailsLastTimeInAlarm}
                                isDetails={true}
                            />
                        </div>
                        <div className="widget alarms">
                            <Tabs className="alarms-maintenance-tabs">
                                <TabList>
                                    <Tab>Active Alarms</Tab>
                                    <Tab>Maintenance</Tab>
                                </TabList>

                                <TabPanel>
                                    <div className="widget__body">
                                        {machineDetailsNotifications.map((notification: any) =>
                                            <div className={`${notification.event_type.toLowerCase().replace(' ', '-')} log-body`} key={notification.id}>
                                                {moment.unix(notification.date_created).format('MMM. DD, YYYY hh:mm:ss Z')}<br/>
                                                {notification.event_type}<br/>
                                                {notification.sensor_name} ({notification.device_name})<br/>
                                                {notification.content}
                                            </div>
                                        )}
                                        <span className="view-all-block">
                                            <a href="/devices/notifications/">View all {'>'}</a>
                                        </span>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="widget maintenance">
                                        <div className="widget__body">
                                            {machineDetailsMaintenance.map((maintenance: any) => <div className="info" key={maintenance.id}>
                                                {moment.unix(maintenance.date_created).format('MMM. DD, YYYY hh:mm:ss Z')}<br/>
                                                {maintenance.content}<br/>
                                                {maintenance.device_name}
                                            </div>)}
                                            <span className="view-all-block">
                                                <a href="/devices/notifications/?type=maintenance">View all {'>'}</a>
                                            </span>
                                        </div>
                                    </div>
                                </TabPanel>
                            </Tabs>
                        </div>
                    </div>
                    <div className="row">
                        <MachineSensors/>
                        <SensorGraph machineId={machineDetails.id}/>
                    </div>
                </div>
                }
            </DashboardBase>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        currentUser: state.authReducer.currentUser,
        machineDetails: state.schemasReducer.machineDetails,
        machineDetailsLastTimeInAlarm: state.schemasReducer.machineDetailsLastTimeInAlarm,
        machineDetailsMaintenance: state.schemasReducer.machineDetailsMaintenance,
        machineDetailsNotifications: state.schemasReducer.machineDetailsNotifications
    };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        clearMachineDetails: () => {
            dispatch({type: schemasConstants.CLEAR_MACHINE_DETAILS});
        },
        getMachineDetails: () => {
            dispatch({type: schemasConstants.GET_MACHINE_DETAILS, payload: ownProps.match.params.machineId});
        },
        getMachineLastTimeInAlarm: () => {
            dispatch({type: schemasConstants.GET_MACHINE_LAST_TIME_IN_ALARM, payload: ownProps.match.params.machineId});
        },
        getMachineMaintenance: () => {
            dispatch({type: schemasConstants.GET_MACHINE_MAINTENANCE, payload: ownProps.match.params.machineId});
        },
        getMachineNotifications: () => {
            dispatch({type: schemasConstants.GET_MACHINE_NOTIFICATIONS, payload: ownProps.match.params.machineId});
        },
        toggleMachineSocket: (isOpen: boolean) => {
            dispatch({
                payload: {
                    isOpen,
                    machineId: ownProps.match.params.machineId
                },
                type: schemasConstants.TOGGLE_MACHINE_SOCKET
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MachineDetails);
