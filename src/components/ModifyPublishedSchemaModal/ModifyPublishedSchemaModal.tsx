import * as React from "react";
import * as Modal from "react-modal";
import {connect} from "react-redux";
import {
    Field,
    InjectedFormProps,
    reduxForm,
    reset,
} from "redux-form";

// constants
import * as schemasConstants from "../../constants/actions/schemasConstants";
import {modalStyles, parentSelector} from "../../constants/modalStyles";

// styles {
import "./ModifyPublishedSchemaModal.css";
import {CustomButton} from "../Button";
import classes from "../MaintenanceModal/MaintenanceModal.module.scss";

// interfaces
interface PublishModalProps extends InjectedFormProps {
    toggleModifyPublishedModal: (isOpen: boolean, schemaId?: number, siteId?: number) => void,
    showModifyPublishedModal: boolean,
    schemaId: number,
    siteId: number,
    onSuccess: any,
    title: string
}

class ModifyPublishedSchemaModal extends React.Component<PublishModalProps> {
    public render() {
        const {showModifyPublishedModal, toggleModifyPublishedModal, handleSubmit, title} = this.props;

        const handleCloseModal = () => {
            toggleModifyPublishedModal(false);
        };

        return (
            // @ts-ignore
            <Modal
                isOpen={showModifyPublishedModal}
                onRequestClose={handleCloseModal}
                style={modalStyles}
                className="confirmation-modal"
                parentSelector={parentSelector}
            >
                <button className="close-icon" onClick={handleCloseModal} type="button">&#215;</button>
                <form onSubmit={handleSubmit} className="modify-published-modal">
                    <h3 className={classes.modalTitle}>{title}</h3>
                    <h4 className={classes.modalTitle}>Do you want to clone current schema with the new name and continue editing?</h4>
                    <label>New name:</label>
                    <Field component="input" name="new_name" required={true}/>
                    <div className="buttons-container">
                        <CustomButton color="gray"
                                      htmlType="submit"
                                      className="mar-right-10"
                                      width="90px"
                                      height="40px"
                                      padding="0"
                                      onClick={handleCloseModal}
                        >
                            CANCEL
                        </CustomButton>

                        <CustomButton htmlType="submit"
                                      color="green"
                                      width="120px"
                                      height="40px"
                                      padding="0"
                        >
                            CONTINUE
                        </CustomButton>
                        {/*<button className="btn small" type="submit" onClick={handleCloseModal}>Cancel</button>*/}
                        {/*<button type="submit">Continue</button>*/}
                    </div>
                </form>
            </Modal>
        );

    }
}

const mapStateToProps = (state: any) => {
    return {
        onSuccess: state.schemasReducer.onSuccessModifyPublishedModal,
        schemaId: state.schemasReducer.schemaToCloneId,
        showModifyPublishedModal: state.schemasReducer.showModifyPublishedModal,
        siteId: state.schemasReducer.siteToCloneId,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSubmit: (formData: any, actions: any, props: any) => {
            dispatch({
                payload: {
                    name: formData.new_name,
                    onSuccess: props.onSuccess,
                    schemaId: props.schemaId,
                    siteId: props.siteId,
                },
                type: schemasConstants.CLONE_SCHEMA,
            });
        },
        toggleModifyPublishedModal: (isOpen: boolean, schemaId: number, siteId: number) => {
            dispatch({
                payload: {
                    isOpen,
                    schemaId,
                    siteId,
                },
                type: schemasConstants.TOGGLE_MODIFY_PUBLISHED_MODAL,
            });

            if (!isOpen) {
                dispatch(reset("modifyPublishedSchema"));
            }
        },
    };
};


const ModifyPublishedSchemaModalContainer = reduxForm<any, any>({
    form: "modifyPublishedSchema",
})(ModifyPublishedSchemaModal);

export default connect(mapStateToProps, mapDispatchToProps)(ModifyPublishedSchemaModalContainer);