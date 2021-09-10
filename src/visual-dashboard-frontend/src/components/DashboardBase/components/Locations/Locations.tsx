import classNames from 'classnames';
import _ from 'lodash';
import * as React from 'react';
import Collapsible from 'react-collapsible';
import {FaPlus} from 'react-icons/fa';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import './Locations.scss';

// actions
import * as schemasConstants from '../../../../constants/actions/schemasConstants';

// interfaces
import {Location, TabInList} from '../../../../interfaces/schemasReducer';

// utils
import urls from '../../../../urls';
import LoadingComponent from '../../../LoadingComponent/LoadingComponent';

export interface LocationsProps {
    getLocations: () => void,
    locations: Location[],
    locationsLoading: boolean,
    currentLocation: number,
    currentTabId: number,
    getCurrentUserNotifications: () => void,
    toggleCurrentUserSocket: (isOpen: boolean) => void,
    currentUserNotifications: any
}

class Locations extends React.Component<LocationsProps> {
    public componentDidMount() {
        const { toggleCurrentUserSocket, getCurrentUserNotifications, getLocations } = this.props;
        getCurrentUserNotifications();
        toggleCurrentUserSocket(true);
        getLocations();
    }

    public componentWillUnmount() {
        const { toggleCurrentUserSocket } = this.props;
        toggleCurrentUserSocket(false);
    }

    public render() {
        const { currentLocation, currentTabId, locations, currentUserNotifications, locationsLoading } = this.props;

        return (
            <div className="locations sidenav">
                {locationsLoading && <LoadingComponent/>}
                <ul className="nav">
                    {locations.map((location: Location) => {
                        const hasNotification = location.published_schema && location.published_schema.schema_tabs.some((tab: TabInList) => {
                            const notificationsForThisTab = currentUserNotifications.filter((notification: any) => _.some(tab.sensors_ids, (sensorIdObj: any) => {
                                return _.some(sensorIdObj, (obj: any, sensorId: string) => notification.full_sensor_id === sensorId);
                            }));
                            const hasWarning = notificationsForThisTab.some((notification: any) => ['Warning Detected', 'Warning Changed'].includes(notification.event_type));
                            const hasAlarm = notificationsForThisTab.some((notification: any) => ['Alarm Detected', 'Alarm Changed'].includes(notification.event_type));

                            return hasAlarm || hasWarning;
                        });

                        return (
                            <li key={location.id}>
                                <Collapsible
                                    trigger={this.renderTrigger(location)}
                                    transitionTime={200}
                                    open={currentLocation === location.id || hasNotification}
                                >
                                    {location.published_schema && location.published_schema.schema_tabs.map((tab: TabInList) => {
                                        const notificationsForThisTab = currentUserNotifications.filter((notification: any) => _.some(tab.sensors_ids, (sensorIdObj: any) => {
                                            return _.some(sensorIdObj, (obj: any, sensorId: string) => notification.full_sensor_id === sensorId);
                                        }));

                                        const hasWarning = notificationsForThisTab.some((notification: any) => ['Warning Detected', 'Warning Changed'].includes(notification.event_type));
                                        const hasAlarm = notificationsForThisTab.some((notification: any) => ['Alarm Detected', 'Alarm Changed'].includes(notification.event_type));

                                        const tabClassNames = classNames({
                                            alarm: hasAlarm,
                                            selected: currentTabId === tab.id,
                                            tab: true,
                                            warning: hasWarning && !hasAlarm,

                                        });
                                        return (
                                            <Link
                                                key={tab.id}
                                                className={tabClassNames}
                                                to={
                                                    urls.schemaDetails
                                                        .replace(':siteId', `${location.id}`)
                                                        .replace(':schemaId', `${location.published_schema.id}`)
                                                        .replace(':tabId', `${tab.id}`)
                                                }
                                            >
                                                {tab.name}
                                            </Link>
                                        )
                                    })}
                                </Collapsible>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }

    private renderTrigger(location: Location) {
        return (
            <React.Fragment>
                <a>{location.title}</a>
                {location.published_schema && <FaPlus/>}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: any) => ({
    currentLocation: state.schemasReducer.currentLocation,
    currentTabId: state.schemasReducer.tabDetails && state.schemasReducer.tabDetails.id,
    currentUserNotifications: state.schemasReducer.currentUserNotifications,
    locations: state.schemasReducer.locations,
    locationsLoading: state.schemasReducer.locationsLoading
});

const mapDispatchToProps = (dispatch: any) => ({
    getCurrentUserNotifications: () => {
        dispatch({
            type: schemasConstants.GET_CURRENT_USER_NOTIFICATIONS
        })
    },
    getLocations: () => {
        dispatch({type: schemasConstants.GET_LOCATIONS_LIST})
    },
    toggleCurrentUserSocket: (isOpen: boolean) => {
        dispatch({
            payload: isOpen,
            type: schemasConstants.TOGGLE_CURRENT_USER_SOCKET
        });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Locations);