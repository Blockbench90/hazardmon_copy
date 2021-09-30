import React from "react";
import Modal from "antd/lib/modal";
import {CustomButton} from "../Button";

import classes from "../TabsSensorDashboard/modal.module.scss";

interface ModalProps {
    is_modal: boolean
    message: string
    title: string
    onCancel: () => void
    onApply: () => void
}

const CustomConfirmationModal: React.FC<ModalProps> = ({
                                                           is_modal,
                                                           onCancel,
                                                           onApply,
                                                           message,
                                                           title,
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
                        <span className={classes.modalTitle}>{title}</span>
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