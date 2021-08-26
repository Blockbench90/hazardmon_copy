import React from "react";
import {Table} from "antd";
import {useSelector} from "react-redux";

import {emailNotificationsTypeMap, getCurrentContactYou} from "../../../helpers/notifications_settings_type";
import {EmailNotification} from "../../../store/branches/user/stateTypes";
import {selectUserState} from "../../../store/selectors";
import {CustomButton} from "../../Button";

import classes from "../../../pages/Clients/Clients.module.scss";

interface TableProps {
    onChangeClient?: (event: React.MouseEvent<HTMLElement>, id: number) => void
    notificationsData?: EmailNotification[]
}

const EmailNotificationsTable: React.FC<TableProps> = ({
                                                           notificationsData,
                                                           onChangeClient,
                                                       }) => {
    const {userData} = useSelector(selectUserState);

    const handleChangeClient = (event: React.MouseEvent<HTMLElement>, id: number) => {
        onChangeClient(event, id);
    };

    const columns = [
        {
            title: "DELIVERY METHOD",
            dataIndex: "delivery_method",
            maxWidth: "10%",
            render: (_: any, record: EmailNotification) => {
                return (
                    <div style={{color: "rgba(0, 0, 0, 0.85)"}}>
                        <p>{record.delivery_method}</p>
                        <p>{record.send_to_alternative ? record.alternative_contact : userData.email}</p>
                    </div>
                );
            },
        },
        {
            title: "TYPE",
            dataIndex: "event_type",
            maxWidth: "20%",
            render: (_: any, record: EmailNotification) => {
                const valueByKey = emailNotificationsTypeMap.get(record.event_type);
                return (
                    <div>
                        <p>{valueByKey}</p>
                    </div>
                );
            },
        },
        {
            title: "CONTACT YOU",
            dataIndex: "contact_when",
            maxWidth: "15%",
            render: (_: any, record: EmailNotification) => {
                const value = getCurrentContactYou(record.contact_when, record.x);
                return (
                    <div>
                        <p>{value}</p>
                    </div>
                );
            },
        },
        {
            title: "DEVICES",
            dataIndex: "devices",
            maxWidth: "15%",
            render: (_: any, record: EmailNotification) => {
                const devices = record?.devices?.map((item: any, index: number) => <div
                    key={item + index}>{item}</div>);
                return (
                    <div>
                        {record.all_devices ? "All Devices" : devices}
                    </div>
                );
            },
        },
        {
            maxWidth: "5%",
            render: (_: any, record: any) => {
                return (
                    <CustomButton color={"client"}
                                  height={"30px"}
                                  width={"70px"}
                                  padding={"0"}
                                  className={classes.changeClient}
                                  onClick={(event) => handleChangeClient(event, record.id)}>
                        Change
                    </CustomButton>
                );
            },
        },
    ];


    return (
        <React.Fragment>
            <Table bordered
                   rowKey={record => record.id}
                   rowClassName={classes.row}
                   dataSource={notificationsData}
                   columns={columns}
                   pagination={false}
            />
        </React.Fragment>
    );
};

export default EmailNotificationsTable;
