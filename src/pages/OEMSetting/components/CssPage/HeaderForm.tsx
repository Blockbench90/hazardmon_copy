import React from "react";
import clsx from "clsx";
import {Form, Typography} from "antd";
import {CustomButton} from "../../../../components/Button";

const {Title} = Typography;

interface HeaderFormProps {
    onCancel: () => void
    onSubmit: () => void
}

const HeaderForm: React.FC<HeaderFormProps> = ({onCancel, onSubmit}) => {
    return (
        <div className={clsx("d-flex", "d-flex-w")}>
            <div>
                <Title level={2}>Custom Styles</Title>
            </div>

            <div className="d-flex">
                <div>
                    <Form.Item>
                        <CustomButton width="94px"
                                      height="40px"
                                      padding="2px 2px"
                                      fontSize="13px"
                                      className="mar-right-10"
                                      htmlType="button"
                                      onClick={onSubmit}
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

export default HeaderForm;