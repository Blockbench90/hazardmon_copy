import React from "react";
import clsx from "clsx";
import {Form, Typography} from "antd";
import {CustomButton} from "../../Button";
import {useHistory, useParams} from "react-router-dom";

const {Title} = Typography;

interface HeaderEmailNotificationProps {
    onRemoveEmailNotification: () => void
}


const HeaderFormAddEmailNotification: React.FC<HeaderEmailNotificationProps> = ({onRemoveEmailNotification}) => {
    const history = useHistory();
    const {id}: any = useParams();


    const onCancel = () => {
        history.push("/user/setting/notification");
    };

    return (
        <div className={clsx("d-flex", "d-flex-w")}>
            <div>
                {
                    id
                        ?
                        <Title level={2}>
                            Edit E-mail Notifications
                        </Title>
                        :
                        <Title level={2}>
                            Add E-mail Notifications
                        </Title>
                }
            </div>

            <div className="d-flex">
                {
                    id
                    &&
                    <div>
                        <Form.Item>
                            <CustomButton width="90px"
                                          height="40px"
                                          padding="2px 2px"
                                          fontSize="13px"
                                          className="mar-right-10"
                                          htmlType="button"
                                          color="red"
                                          onClick={onRemoveEmailNotification}
                            >
                                <span>REMOVE</span>
                            </CustomButton>
                        </Form.Item>
                    </div>
                }

                <div>
                    <Form.Item>
                        <CustomButton width="90px"
                                      height="40px"
                                      padding="2px 2px"
                                      fontSize="13px"
                                      className="mar-right-10"
                                      htmlType="submit"
                        >
                            <span>{id ? "UPDATE" : "SAVE"}</span>
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