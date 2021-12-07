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
import * as schemasConstants from "../../../../constants/actions/schemasConstants";
import {modalStyles, parentSelector} from "../../../../constants/modalStyles";

// styles {
import "./PublishModal.css";
import {CustomButton} from "../../../../components/Button";

// interfaces
interface PublishModalProps extends InjectedFormProps {
    togglePublishModal: (isOpen: boolean, schemaId?: number) => void,
    showPublishModal: boolean,
    siteId: string,
}

class PublishModal extends React.Component<PublishModalProps> {
    public render() {
        const {showPublishModal, togglePublishModal, handleSubmit} = this.props;

        const handleCloseModal = () => {
            togglePublishModal(false);
        };

        return (
            // @ts-ignore
            <Modal
                isOpen={showPublishModal}
                onRequestClose={handleCloseModal}
                style={modalStyles}
                parentSelector={parentSelector}
            >
                <button className="close-icon" onClick={handleCloseModal} type="button">&#215;</button>
                <form onSubmit={handleSubmit} className="publish-modal">
                    <label>Comment:</label>
                    <Field component="textarea" name="comment" required={true}/>
                    <div className="buttons-container">
                        <CustomButton width="181px"
                                      height="40px"
                                      padding="0"
                                      color="green"
                                      className="custom-button"
                                      htmlType="submit"
                        >
                            PUBLISH
                        </CustomButton>
                        {/*<button type="submit">Publish</button>*/}
                    </div>
                </form>
            </Modal>
        );

    }
}

const mapStateToProps = (state: any) => {
    return {
        schemaId: state.schemasReducer.schemaToPublishId,
        showPublishModal: state.schemasReducer.showPublishModal,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSubmit: (data: any, action: any, props: any) => {
            dispatch({
                payload: {
                    data,
                    schemaId: props.schemaId,
                    siteId: props.siteId,
                },
                type: schemasConstants.PUBLISH_SCHEMA,
            });
        },
        togglePublishModal: (isOpen: boolean, schemaId: number) => {
            dispatch({
                payload: {
                    isOpen,
                    schemaId,
                },
                type: schemasConstants.TOGGLE_PUBLISH_MODAL,
            });

            if (!isOpen) {
                dispatch(reset("publishSchema"));
            }
        },
    };
};


const PublishModalContainer = reduxForm<any, any>({
    form: "publishSchema",
})(PublishModal);

export default connect(mapStateToProps, mapDispatchToProps)(PublishModalContainer);