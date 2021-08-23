import React from "react";
import clsx from "clsx";
import {Form, Typography} from "antd";
import {CustomButton} from "../Button";
import {useForm} from "antd/lib/form/Form";
import {useHistory} from "react-router-dom";

const {Title} = Typography;

const HeaderFormAddEmailNotification: React.FC = () => {
    const [form] = useForm();
    const history = useHistory()

    const onCancel = () => {
        form.resetFields();
        history.push("/clients");
    };

    return (
        <div className={clsx("d-flex", "d-flex-w")}>
            <div>
                <Title level={2}>
                    Add E-mail Notifications
                </Title>
            </div>

            <div className="d-flex">
                <div>
                    <Form.Item>
                        <CustomButton width="90px"
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
    );
};

export default HeaderFormAddEmailNotification;