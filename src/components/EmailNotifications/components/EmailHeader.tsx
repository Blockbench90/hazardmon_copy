import React from "react";
import clsx from "clsx";
import {Typography} from "antd";
import { CustomButton } from "../../Button";
import {useHistory} from "react-router-dom";



const {Title} = Typography;


const EmailHeader: React.FC = () => {
    const history = useHistory()


    const onAddEmailNotification = () => {
        history.push("/user/setting/add/notification")
    }


    return (
        <div className={clsx("d-flex", "d-flex-w")}>
            <div>
                <Title level={2}>Settings - E-mail Notifications</Title>
            </div>

            <div className="d-flex">
                <CustomButton width="94px"
                              height="40px"
                              padding="2px 2px"
                              fontSize="13px"
                              className="mar-right-10"
                              htmlType="button"
                              onClick={onAddEmailNotification}
                >
                    <span>+ ADD</span>
                </CustomButton>
            </div>
        </div>
    );
};

export default EmailHeader;