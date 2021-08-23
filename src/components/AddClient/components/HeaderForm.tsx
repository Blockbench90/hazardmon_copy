import React from "react"
import clsx from "clsx"
import {Form, Typography} from "antd"
import {CustomButton} from "../../Button"
import {DeleteFilled} from "@ant-design/icons"

const {Title} = Typography

interface HeaderFormProps {
    onCancel: () => void
    currentClient: any
    onRemoveClient: () => void
}

const HeaderFormAddClient: React.FC<HeaderFormProps> = ({onCancel, currentClient, onRemoveClient}) => {
    return (
        <div className={clsx("d-flex", "d-flex-w")}>
            <div>
                <Title level={2}>
                    {currentClient ? "Update a client" : "Add a client"}
                </Title>
            </div>

            <div className="d-flex">
                <div>
                    {
                        currentClient
                        &&
                        <CustomButton width="170px"
                                      height="40px"
                                      padding="0"
                                      htmlType="button"
                                      className="mar-right-10"
                                      onClick={onRemoveClient}
                                      color="red">
                            <DeleteFilled className="mar-right-5"/>
                            <span>REMOVE CLIENT</span>
                        </CustomButton>
                    }
                </div>
                <div>
                    {
                        currentClient
                            ?
                            <Form.Item>
                                <CustomButton width="120px"
                                              height="40px"
                                              padding="2px 2px"
                                              fontSize="13px"
                                              className="mar-right-10"
                                              htmlType="submit"
                                >
                                    <span>UPDATE CLIENT</span>
                                </CustomButton>
                            </Form.Item>
                            :
                            <Form.Item>
                                <CustomButton width="105px"
                                              height="40px"
                                              padding="2px 2px"
                                              fontSize="13px"
                                              className="mar-right-10"
                                              htmlType="submit"
                                >
                                    <span>ADD CLIENT</span>
                                </CustomButton>
                            </Form.Item>
                    }

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

export default HeaderFormAddClient