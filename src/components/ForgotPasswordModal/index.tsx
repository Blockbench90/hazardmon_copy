import React, {useState} from "react";
import {CustomButton} from "../Button";
import {Input, Modal} from "antd";

import classes from "../MaintenanceModal/MaintenanceModal.module.scss";

interface ModalProps {
    isModal: boolean
    onSubmit: (message: string) => void
    onCancel: () => void
}

const ForgotPassword: React.FC<ModalProps> = ({
                                                  isModal,
                                                  onSubmit,
                                                  onCancel
                                              }) => {

    const [value, setValue] = useState<string>();

    const handleConfirm = () => {
        onSubmit(value);
        setValue("");
    };

    const onChange = e => {
        setValue(e.target.value);
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <React.Fragment>
            <Modal
                wrapClassName={classes.modalWrap}
                footer={null}
                title={
                    <div>
                        <span className={classes.modalTitle}>Reset password</span>
                    </div>
                }
                centered
                closable={true}
                onCancel={handleCancel}
                visible={isModal}
            >
                <div className={classes.modalSubTitleWrap}>
                    <span className={classes.modalSubTitle}>Instructions will be sent to your email address</span>
                </div>

                <div>
                    <Input placeholder="Email address" allowClear onChange={onChange} value={value}/>
                </div>

                <div className={classes.modalButton}>
                    <div/>
                    <div>
                        <CustomButton width="81px"
                                      height="40px"
                                      padding="0"
                                      htmlType="button"
                                      disabled={!value}
                                      className={classes.buttonTitle}
                                      onClick={handleConfirm}
                        >
                            RESET
                        </CustomButton>
                    </div>
                </div>
            </Modal>
        </React.Fragment>
    );
};

export default ForgotPassword;