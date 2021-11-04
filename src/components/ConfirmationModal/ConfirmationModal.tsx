import * as React from "react";
import * as Modal from "react-modal";

// constants
import {modalStyles, parentSelector} from "../../constants/modalStyles";

// styles {
import "./ConfirmationModal.css";

// interfaces
interface ConfirmationModalProps {
    handleConfirm?: (params?: any) => void;
    message: string
}

interface ConfirmationModalState {
    params?: any
    showModal: boolean
}

class ConfirmationModal extends React.Component<ConfirmationModalProps, ConfirmationModalState> {
    constructor(props: ConfirmationModalProps) {
        super(props);

        this.state = {
            params: null,
            showModal: false,
        };

        this.showModal = this.showModal.bind(this);
    }

    public showModal(params?: any) {
        this.setState({
            params,
            showModal: true,
        });
    }

    public render() {
        const {handleConfirm, message} = this.props;
        const {params, showModal} = this.state;

        const handleCloseModal = () => {
            this.setState({
                params: null,
                showModal: false,
            });
        };

        const handleConfirmClick = () => {
            handleConfirm(params);
            handleCloseModal();
        };

        return (
            // @ts-ignore
            <Modal
                isOpen={showModal}
                onRequestClose={handleCloseModal}
                style={modalStyles}
                className="confirmation-modal"
                parentSelector={parentSelector}
            >
                <button className="close-icon" onClick={handleCloseModal} type="button">&#215;</button>
                <div className="body">{message}</div>
                <div className="buttons-container">
                    <button className="btn small" type="submit" onClick={handleCloseModal}>No</button>
                    <button type="submit" onClick={handleConfirmClick}>Yes</button>
                </div>
            </Modal>
        );

    }
}

export default ConfirmationModal;