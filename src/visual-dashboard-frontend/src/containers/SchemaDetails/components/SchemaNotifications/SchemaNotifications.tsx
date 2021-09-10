import classNames from 'classnames';
import * as moment from "moment";
import * as React from 'react';
import {connect} from 'react-redux';

// constants
import * as schemasConstants from "../../../../constants/actions/schemasConstants";

// styles
import './SchemaNotifications.scss';

interface SchemaNotificationsProps {
    schemaId: number,
    isFullScreen: boolean,
    schemaNotifications: any[],
    getSchemaNotifications: (schemaId: number) => void
}

interface SchemaNotificationsState {
    notificationsHided: boolean
}

class SchemaNotifications extends React.Component<SchemaNotificationsProps, SchemaNotificationsState> {
    constructor(props: SchemaNotificationsProps) {
        super(props);

        this.state = {
            notificationsHided: props.isFullScreen
        }
    }

    public componentDidMount() {
        const {schemaId, getSchemaNotifications} = this.props;

        getSchemaNotifications(schemaId);
    }

    public componentWillReceiveProps(nextProps: any) {
        const {schemaId, getSchemaNotifications} = this.props;

        if (nextProps.schemaId !== schemaId) {
            getSchemaNotifications(nextProps.schemaId);
        }

        if (nextProps.isFullScreen !== this.props.isFullScreen) {
            this.setState({
                notificationsHided: nextProps.isFullScreen
            });
        }
    }

    public render() {
        const { schemaNotifications } = this.props;
        const { notificationsHided } = this.state;

        const handleToggleNotifications = () => this.setState({notificationsHided: !notificationsHided});

        const schemaNotificationsClasses = classNames({
            'notifications-hided': notificationsHided,
            'schema-notifications': true,
        });

        return (
            <div className={schemaNotificationsClasses}>
                <button onClick={handleToggleNotifications} className="extend-sidebar-button">{notificationsHided ? '<' : '>'}</button>
                {!notificationsHided &&
                <React.Fragment>
                    <h3>Active Alarms</h3>
                    <div>
                        {schemaNotifications.map((notification: any) =>
                            <div className={`${notification.event_type.toLowerCase().replace(' ', '-')} log-body`} key={notification.id}>
                                {moment.unix(notification.date_created).format('MMM. DD, YYYY hh:mm:ss Z')}<br/>
                                {notification.event_type}<br/>
                                {notification.sensor_name} ({notification.device_name})<br/>
                                {notification.content}
                            </div>
                        )}
                    </div>
                </React.Fragment>
                }
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    isFullScreen: state.schemasReducer.isFullScreen,
    schemaNotifications: state.schemasReducer.schemaNotifications,
});

const mapDispatchToProps = (dispatch: any) => ({
    getSchemaNotifications: (schemaId: number) => {
        dispatch({type: schemasConstants.GET_SCHEMA_NOTIFICATIONS, payload: schemaId});
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SchemaNotifications);