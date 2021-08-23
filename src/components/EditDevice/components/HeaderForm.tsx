import React from "react";
import clsx from "clsx";
import {Form, Typography} from "antd";
import {CustomButton} from "../../Button";
import {DeleteFilled} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {selectDevicesState} from "../../../store/selectors";

const {Title} = Typography;

interface HeaderFormProps {
    onCancel: () => void
    onDeactivateDevice: () => void
    onRemoveDevice: () => void
}

const HeaderFormEditDevice: React.FC<HeaderFormProps> = ({onCancel, onDeactivateDevice, onRemoveDevice}) => {
    const { current_device } = useSelector(selectDevicesState) || {}

    return (
        <div className={clsx("d-flex", "d-flex-w")}>
            <div>
                <Title level={2}>{current_device?.title} - Edit Device</Title>
            </div>

            <div className="d-flex">
                <div>
                    <CustomButton width="180px"
                                  height="40px"
                                  padding="0"
                                  color="gray"
                                  htmlType="button"
                                  onClick={onDeactivateDevice}
                                  className="mar-right-10">
                        {current_device?.is_suspended ? <span>REACTIVATE DEVICE</span> : <span>DEACTIVATE DEVICE</span>}

                    </CustomButton>
                    <CustomButton width="170px"
                                  height="40px"
                                  padding="0"
                                  htmlType="button"
                                  onClick={onRemoveDevice}
                                  className="mar-right-10"
                                  color="red">
                        <DeleteFilled className="mar-right-5"/>
                        <span>REMOVE DEVICE</span>
                    </CustomButton>
                </div>
                <div>
                    <Form.Item>
                        <CustomButton width="94px"
                                      height="40px"
                                      padding="2px 2px"
                                      fontSize="13px"
                                      className="mar-right-10"
                                      htmlType="submit"
                        >
                            <span>SAVE</span>
                        </CustomButton>
                    </Form.Item>
                </div>

                <div>
                    <Form.Item>
                        <CustomButton width="94px"
                                      height="40px"
                                      padding="2px 2px"
                                      color="gray"
                                      fontSize="13px"
                                      htmlType="button"
                                      onClick={onCancel}
                        >
                            <span>CANCEL</span>
                        </CustomButton>
                    </Form.Item>
                </div>
            </div>
        </div>
    )
}

export default HeaderFormEditDevice
