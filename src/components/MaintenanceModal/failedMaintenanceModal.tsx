import React, {useEffect, useState} from "react";
import {CustomButton} from "../Button";
import {Input, Modal} from "antd";

import classes from "./MaintenanceModal.module.scss";
import {sensorsAC} from "../../store/branches/sensors/actionCreators";
import {useDispatch} from "react-redux";

interface ModalProps {
    isShow: true,
    device_id: number,
    event_type: string,
    sensor_id: string,
    current_sensor_id: string,
    sensor_name: string,
}

const {TextArea} = Input;

const FailedMaintenanceModal: React.FC<ModalProps> = ({
                                                          isShow,
                                                          device_id,
                                                          event_type,
                                                          sensor_id,
                                                          current_sensor_id,
                                                          sensor_name,
                                                      }) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState<string>();
    const [isModal, setModal] = useState<boolean>(false);
    const handleConfirm = () => {
        dispatch(sensorsAC.stopSensorMaintenance({
            device_id: device_id,
            event_type: event_type,
            sensor_id: sensor_id,
            sensor_name: sensor_name,
            comment: value,
            maintenance_time: new Date().getTime(),
        }));
        setValue("");
        setModal(false);
    };

    const onChange = e => {
        setValue(e.target.value);
    };

    useEffect(() => {
        setModal(isShow);
    }, [isShow, isModal]);

    return (
        <React.Fragment>
            <Modal
                wrapClassName={classes.modalWrap}
                footer={null}
                title={
                    <div>
                        <span className={classes.modalTitle}>Test Failed</span>
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
                </div>
            </Modal>
        </React.Fragment>
    );
};

export default FailedMaintenanceModal;