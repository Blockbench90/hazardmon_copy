import React from "react";
import Modal from "antd/lib/modal";

import {ReactComponent as HistoricalG} from "../../assets/icons/historical_green.svg";
import {CustomButton} from "../Button";

import classes from "../TabsSensorDashboard/modal.module.scss";

interface ModalProps {
    is_modal: boolean
    message: string
    onCancel: () => void
    onApply: () => void
}

const CustomConfirmationModal: React.FC<ModalProps> = ({
                                                           is_modal,
                                                           onCancel,
                                                           onApply,
                                                           message,
                                                       }) => {

    const handleCloseModal = () => {
        onCancel();
    };

    const handleConfirm = () => {
        onApply();
    };


    return (
        <React.Fragment>
            <Modal
                wrapClassName={classes.modalWrap}
                footer={null}
                title={
                    <div>
                        <HistoricalG/><span className={classes.modalTitle}>Attention!</span>
                    </div>
                }
                centered
                visible={is_modal}
                onCancel={() => onCancel()}
            >
                <div className={classes.modalSubTitleWrap}>
                    <span className={classes.modalSubTitle}>{message}</span>
                </div>

                <div className={classes.modalButton}>
                    <div/>
                    <div>

                        <CustomButton width="81px"
                                      height="40px"
                                      padding="0"
                                      htmlType="button"
                                      color="gray"
                                      className={classes.buttonTitle}
                                      onClick={handleCloseModal}
                        >
                            CANCEL
                        </CustomButton>
                        <CustomButton width="81px"
                                      height="40px"
                                      padding="0"
                                      htmlType="button"
                                      className={classes.buttonTitle}
                                      onClick={handleConfirm}
                        >
                            OK
                        </CustomButton>
                    </div>
                </div>
            </Modal>
        </React.Fragment>
    );
};

export default CustomConfirmationModal;