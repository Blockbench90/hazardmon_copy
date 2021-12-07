import React, {useState} from "react";
import {CustomButton} from "../Button";
import {Input, Modal} from "antd";

import classes from "./MaintenanceModal.module.scss";
import {ConfirmStatus} from "../../store/branches/sensors/stateTypes";

interface ModalProps {
    isModal: boolean
    status: ConfirmStatus
    onSubmit: (message: string) => void
}

const {TextArea} = Input;

const MaintenanceModal: React.FC<ModalProps> = ({
                                                    isModal,
                                                    status,
                                                    onSubmit,
                                                }) => {

    const [value, setValue] = useState<string>();

    const handleConfirm = () => {
        onSubmit(value);
        setValue("");
    };

    const handleCancel = () => {
        console.log("cancel ==>")
    }

    const onChange = e => {
        setValue(e.target.value);
    };

    return (
        <React.Fragment>
            <Modal
                wrapClassName={classes.modalWrap}
                footer={null}
                title={
                    <div>
                        <span className={classes.modalTitle}>
                            {(status === ConfirmStatus.success) && "Test finished successfully"}
                            {(status === ConfirmStatus.failed) && "Test failed"}
                            {(status === ConfirmStatus.cancel) && "Confirm Cancel"}
                        </span>
                    </div>
                }
                centered
                closable={false}
                visible={isModal}
            >
                <div className={classes.modalSubTitleWrap}>
                    <span className={classes.modalSubTitle}>Please add a comment and submit the result</span>
                </div>

                <div>
                    <TextArea placeholder="Comment" allowClear autoSize={{maxRows: 6, minRows: 4}} onChange={onChange}
                              value={value}/>
                </div>

                <div className={classes.modalButton}>
                    {
                        (status === ConfirmStatus.success)
                            ?
                            <div className={classes.modalButtonsSuccess}>
                                <div>

                                    <CustomButton width="81px"
                                                  height="40px"
                                                  padding="0"
                                                  margin="0 15px 0 0"
                                                  htmlType="button"
                                                  disabled={!value}
                                                  className={classes.buttonTitle}
                                                  onClick={handleConfirm}
                                    >
                                        SUBMIT
                                    </CustomButton>
                                </div>
                                <div>
                                    <CustomButton width="81px"
                                                  height="40px"
                                                  padding="0"
                                                  htmlType="button"
                                                  className={classes.buttonTitle}
                                                  onClick={handleCancel}
                                    >
                                        CANCEL
                                    </CustomButton>
                                </div>
                            </div>
                            :
                            <React.Fragment>
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
                                        SUBMIT
                                    </CustomButton>
                                </div>
                            </React.Fragment>
                    }
                </div>
            </Modal>
        </React.Fragment>
    );
};

export default MaintenanceModal;