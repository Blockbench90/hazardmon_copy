import classNames from 'classnames';
import _ from 'lodash';
import * as React from 'react';
import { FaPlus } from 'react-icons/fa';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

// components
import DashboardBase from '../../components/DashboardBase/DashboardBase';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import ModifyPublishedSchemaModal from '../../components/ModifyPublishedSchemaModal/ModifyPublishedSchemaModal';

// interfaces
import {Location, TabInList} from '../../interfaces/schemasReducer';

// utils
import {hasEditPermissions} from '../../helpers/helperFunctions';
import history from '../../helpers/history';
import urls from '../../constants/urls';

// styles
import './Home.css';

// actions
import * as schemasConstants from '../../constants/actions/schemasConstants';

export interface HomeProps {
    locations: Location[],
    locationsLoading: boolean,
    toggleModifyPublishedModal: (isOpen: boolean, schemaId: number, siteId: number) => void;
    currentUser: any
    currentUserNotifications: any
}

class Home extends React.Component<HomeProps> {
    public renderAddTabButton(location: Location) {
        const { toggleModifyPublishedModal } = this.props;
        const onClick = () => {
            if (location.published_schema) {
                toggleModifyPublishedModal(true, location.published_schema.id, location.id);
            } else {
                history.push(urls.newSchema.replace(':siteId', `${location.id}`));
            }
        };

        return (
            <div className="tab add-button" onClick={onClick}>
                <div className="tab-block"><FaPlus/></div>
                <span className="tab-name">{location.published_schema ? 'Add new tab' : 'Add new schema'}</span>
            </div>
        )
    }

    public render() {
        const { locations, locationsLoading, currentUser, currentUserNotifications } = this.props;

        return (
            <DashboardBase pageTitle="Visual dashboard" className="home">
                <div className="home-locations">
                    {locationsLoading && <LoadingComponent/>}
                    {locations.map((location: Location) => {
                        const canEdit = hasEditPermissions(currentUser, location.id);
                        return (
                            <div key={location.id} className="location">
                                <div className="location-title">
                                    <h2>{location.title}</h2>
                                    {canEdit && <Link to={urls.schemasList.replace(':siteId', `${location.id}`)}>(All versions)</Link>}
                                </div>
                                <div className="tabs">
                                    {location.published_schema && location.published_schema.schema_tabs.map((tab: TabInList) => {
                                        const notificationsForThisTab = currentUserNotifications.filter((notification: any) => _.some(tab.sensors_ids, (sensorIdObj: any) => {
                                            return _.some(sensorIdObj, (obj: any, sensorId: string) => notification.full_sensor_id === sensorId);
                                        }));

                                        const hasWarning = notificationsForThisTab.some((notification: any) => ['Warning Detected', 'Warning Changed'].includes(notification.event_type));
                                        const hasAlarm = notificationsForThisTab.some((notification: any) => ['Alarm Detected', 'Alarm Changed'].includes(notification.event_type));

                                        const tabClassNames = classNames({
                                            alarm: hasAlarm,
                                            tab: true,
                                            warning: hasWarning && !hasAlarm,
                                        });

                                        return (
                                            <Link
                                                to={
                                                    urls.schemaDetails
                                                        .replace(':siteId', `${location.id}`)
                                                        .replace(':schemaId', `${location.published_schema.id}`)
                                                        .replace(':tabId', `${tab.id}`)
                                                }
                                                key={tab.id}
                                                className={tabClassNames}
                                            >
                                                <div className="tab-block"/>
                                                <span className="tab-name">{tab.name}</span>
                                            </Link>
                                        )
                                    }) || !canEdit && <div className="no-published-schema">There is no published schema for this site</div>
                                    }
                                    {canEdit && this.renderAddTabButton(location)}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <ModifyPublishedSchemaModal title="It's not allowed to modify published schema!"/>
            </DashboardBase>
        )
    }
}

const mapStateToProps = (state: any) => ({
    currentUser: state.authReducer.currentUser,
    currentUserNotifications: state.schemasReducer.currentUserNotifications,
    locations: state.schemasReducer.locations,
    locationsLoading: state.schemasReducer.locationsLoading
});

const mapDispatchToProps = (dispatch: any) => ({
    toggleModifyPublishedModal: (isOpen: boolean, schemaId: number, siteId: number) => {
        dispatch({
            payload: {
                isOpen,
                schemaId,
                siteId
            },
            type: schemasConstants.TOGGLE_MODIFY_PUBLISHED_MODAL
        });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);