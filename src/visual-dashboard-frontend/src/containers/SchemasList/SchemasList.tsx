import * as moment from 'moment'
import * as React from 'react';
import { FaClone, FaEye, FaTrashAlt } from 'react-icons/fa';
import { MdPublish } from 'react-icons/md';
import { connect } from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

// utils
import Notification from '../../components/Notification/Notification';
import {hasEditPermissions} from '../../helperFunctions';
import urls from '../../urls';

// components
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import DashboardBase from '../../components/DashboardBase/DashboardBase';
import ModifyPublishedSchemaModal from '../../components/ModifyPublishedSchemaModal/ModifyPublishedSchemaModal';
import * as schemasConstants from '../../constants/actions/schemasConstants';
import PublishModal from './components/PublishModal/PublishModal';

// styles
import './SchemasList.scss';

// interfaces
import {SchemaRoute} from '../../interfaces/schemaRoute';
import {Schema} from '../../interfaces/schemasReducer';

interface SchemasListProps extends SchemaRoute {
    getVersionsList: (orderBy?: string[]) => void,
    togglePublishModal: (isOpen: boolean, schemaId?: number) => void,
    toggleModifyPublishedModal: (isOpen: boolean, schemaId?: number, siteId?: string) => void,
    cloneSchema: (schemaId?: number) => void,
    deleteSchema: (schemaId?: number) => void,
    schemasList: Schema[],
    currentUser: boolean
}

interface SchemasListState {
    orderBy: string[]
}

class SchemasList extends React.Component<SchemasListProps, SchemasListState> {
    protected confirmationModalRef: any;
    protected confirmationAgainModalRef: any;

    constructor(props: SchemasListProps) {
        super(props);

        this.state = {
            orderBy: []
        }
    }

    public componentDidMount() {
        this.props.getVersionsList();
    }

    public renderSidebar() {
        const { match } = this.props;
        return (
            <div className="sidebar">
                <Link to={urls.newSchema.replace(':siteId', match.params.siteId)} className="btn btn-success small">Create schema</Link>
            </div>
        )
    }

    public render() {
        const { schemasList, togglePublishModal, deleteSchema, match, toggleModifyPublishedModal, currentUser } = this.props;
        const { orderBy } = this.state;

        const canEdit = hasEditPermissions(currentUser, parseFloat(match.params.siteId));

        if (!canEdit) {
            Notification.error('You are not allowed to visit this page');

            return (
                <Redirect to={urls.home}/>
            )
        }

        const handleDeleteSchema = (schemaId: number) => {
            if (this.confirmationAgainModalRef) {
                this.confirmationAgainModalRef.showModal(schemaId);
            }
        };

        const handleConfirmDeleteSchema = (schemaId: number) => {
            deleteSchema(schemaId)
        };

        const confirmationModalRef = (ref: any) => this.confirmationModalRef = ref;
        const confirmationAgainModalRef = (ref: any) => this.confirmationAgainModalRef = ref;

        return (
            <DashboardBase pageTitle="Schemas list" className="schemas-list-page" sidebar={this.renderSidebar()}>
                <PublishModal siteId={match.params.siteId}/>
                <ConfirmationModal ref={confirmationModalRef} handleConfirm={handleDeleteSchema} message="Are you sure you want to delete this schema?"/>
                <ConfirmationModal ref={confirmationAgainModalRef} handleConfirm={handleConfirmDeleteSchema} message="This action can't be undone. Do you want to continue?"/>
                <ModifyPublishedSchemaModal title="Do you realy want to clone this schema?" />
                <table>
                    <thead>
                    <tr>
                        <th data-name="name" onClick={this.onOrderClick} className="can-order">
                            Schema name
                            {orderBy.includes('name') && ' ↓'}
                            {orderBy.includes('-name') && ' ↑'}
                        </th>
                        <th>State</th>
                        <th data-name="update_dt" onClick={this.onOrderClick} className="can-order">
                            Time Stamp (updated at)
                            {orderBy.includes('update_dt') && ' ↓'}
                            {orderBy.includes('-update_dt') && ' ↑'}
                        </th>
                        <th data-name="modified_by" onClick={this.onOrderClick} className="can-order">
                            Modified by
                            {orderBy.includes('modified_by') && ' ↓'}
                            {orderBy.includes('-modified_by') && ' ↑'}
                        </th>
                        <th>Comment</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {schemasList.map((schema: Schema) => {
                        const handleOpenModal = () => {
                            togglePublishModal(true, schema.id);
                        };

                        const handleCloneClick = () => {
                            toggleModifyPublishedModal(true, schema.id, match.params.siteId);
                        };

                        const handleDeleteClick = () => {
                            if (this.confirmationModalRef) {
                                this.confirmationModalRef.showModal(schema.id);
                            }
                        };

                        return (
                            <tr key={schema.id}>
                                <td>{schema.name}</td>
                                <td>{schema.is_published ? 'Published' : 'Saved'}</td>
                                <td>{moment.unix(parseInt(schema.update_dt, 10)).format('DD/MM/YYYY HH:mm:ss')}</td>
                                <td>{schema.modified_by.first_name} {schema.modified_by.last_name}</td>
                                <td>{schema.comment}</td>
                                <td className="action-buttons">
                                    {Boolean(schema.schema_tabs.length) &&
                                    <Link
                                        to={
                                            urls.schemaDetails
                                                .replace(':siteId', `${match.params.siteId}`)
                                                .replace(':schemaId', `${schema.id}`)
                                                .replace(':tabId', `${schema.schema_tabs[0].id}`)
                                        }
                                        className="btn small"
                                    >
                                        <FaEye />
                                    </Link>
                                    }
                                    <button onClick={handleCloneClick} className="btn small">
                                        <FaClone/>
                                    </button>
                                    {!schema.is_published &&
                                    <React.Fragment>
                                        <button onClick={handleDeleteClick} className="btn small">
                                            <FaTrashAlt/>
                                        </button>
                                        <button onClick={handleOpenModal} className="btn btn-success small">
                                            <MdPublish/>
                                        </button>
                                    </React.Fragment>
                                    }
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </DashboardBase>
        );
    }

    private onOrderClick = (e: any) => {
        const { getVersionsList } = this.props;
        const orderBy:string[] =  this.state.orderBy.slice();
        const fieldName = e.target.dataset.name;
        const fieldNameIndex = orderBy.indexOf(fieldName);
        const oppositeFieldName = `-${fieldName}`;

        if (fieldNameIndex === -1) {
            const oppositeFieldNameIndex = orderBy.indexOf(oppositeFieldName);
            if (oppositeFieldNameIndex === -1) {
                orderBy.push(fieldName);
            } else {
                orderBy.splice(oppositeFieldNameIndex, 1);
            }
        } else {
            orderBy.splice(fieldNameIndex, 1, oppositeFieldName);
        }

        this.setState({orderBy}, () => getVersionsList(orderBy));
    }
}

const mapStateToProps = (state: any) => {
    return {
        currentUser: state.authReducer.currentUser,
        schemasList: state.schemasReducer.schemasList
    }
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        cloneSchema: (schemaId: number) => {
            dispatch({
                payload: {
                    schemaId,
                    siteId: ownProps.match.params.siteId
                },
                type: schemasConstants.CLONE_SCHEMA,
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
        getVersionsList: (orderBy: string[]) => {
            dispatch({
                payload: {
                    location: ownProps.match.params.siteId,
                    order_by: orderBy
                },
                type: schemasConstants.GET_SCHEMAS_LIST
            });
        },
        toggleModifyPublishedModal: (isOpen: boolean, schemaId: number, siteId: string) => {
            dispatch({
                payload: {
                    isOpen,
                    schemaId,
                    siteId
                },
                type: schemasConstants.TOGGLE_MODIFY_PUBLISHED_MODAL
            });
        },
        togglePublishModal: (isOpen: boolean, schemaId: number) => {
            dispatch({
                payload: {
                    isOpen,
                    schemaId
                },
                type: schemasConstants.TOGGLE_PUBLISH_MODAL
            });
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SchemasList);
