import * as moment from "moment";
import * as React from "react";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";

// utils
import Notification from "../../components/Notification/Notification";
import {hasEditPermissions} from "../../helpers/helperFunctions";
import urls from "../../constants/urls";

// components
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import DashboardBase from "../../components/DashboardBase/DashboardBase";
import ModifyPublishedSchemaModal from "../../components/ModifyPublishedSchemaModal/ModifyPublishedSchemaModal";
import * as schemasConstants from "../../constants/actions/schemasConstants";
import PublishModal from "./components/PublishModal/PublishModal";

// styles
import "./SchemasList.css";

// interfaces
import {SchemaRoute} from "../../interfaces/schemaRoute";
import {Schema} from "../../interfaces/schemasReducer";
import {AddNewBlock} from "../../components/AddNewBlock";
import VisualDachBlock from "../../pages/VisualDashboard/components/VisualDachBlock";

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
            <div>
                <Link to={urls.newSchema.replace(':siteId', match.params.siteId)}>
                    <AddNewBlock text="Add new schema"/>
                </Link>
            </div>
        )
    }

    public render() {
        const { schemasList, togglePublishModal, deleteSchema, match, toggleModifyPublishedModal, currentUser } = this.props;

        const canEdit = hasEditPermissions(currentUser, parseFloat(match.params.siteId));

        if (!canEdit) {
            Notification.error('You are not allowed to visit this page');

            return (
                <Redirect to={urls.schemasList}/>
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
            <DashboardBase className="schemas-list-page" sidebar={this.renderSidebar()} isSchemaList={true}>
                <PublishModal siteId={match.params.siteId}/>
                <ConfirmationModal ref={confirmationModalRef} handleConfirm={handleDeleteSchema} message="Are you sure you want to delete this schema?"/>
                <ConfirmationModal ref={confirmationAgainModalRef} handleConfirm={handleConfirmDeleteSchema} message="This action can't be undone. Do you want to continue?"/>
                <ModifyPublishedSchemaModal title="Do you realy want to clone this schema?" />
                    {schemasList.map((schema: Schema, index: number) => {
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
                            <VisualDachBlock title={schema?.name}
                                             isPublished={schema.is_published}
                                             modifyBy={`${schema.modified_by.first_name} ${schema.modified_by.last_name}`}
                                             comment={schema.comment}
                                             timestamp={moment.unix(parseInt(schema.update_dt, 10)).format("DD/MM/YYYY HH:mm:ss")}
                                             siteId={match.params.siteId}
                                             schema={schema}
                                             key={`${schema.name}${index}`}
                                             onCloneClick={handleCloneClick}
                                             onDeleteClick={handleDeleteClick}
                                             onPublish={handleOpenModal}
                                             match={match}
                            />
                        )
                    })}
            </DashboardBase>
        );
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
