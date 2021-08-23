import React from "react";
import {Button, Table} from "antd";

import classes from "../../../pages/Clients/Clients.module.scss";

interface TableProps {
    onChangeClient?: (event: React.MouseEvent<HTMLElement>, id: number) => void
    clientsData?: any
}

const EmailNotificationsTable: React.FC<TableProps> = ({
                                                clientsData,
                                                onChangeClient,
                                            }) => {
    const handleChangeClient = (event: React.MouseEvent<HTMLElement>, id: number) => {
     onChangeClient(event, id)
    }


    const columns = [
        {
            title: "DELIVERY METHOD",
            dataIndex: "delivery_method",
            maxWidth: "10%",
            editable: true,
        },
        {
            title: "TYPE",
            dataIndex: "type",
            maxWidth: "20%",
            editable: true,
        },
        {
            title: "CONTACT YOU",
            dataIndex: "contact_you",
            maxWidth: "15%",
            editable: true,
        },
        {
            title: "DEVICES",
            dataIndex: "devices",
            maxWidth: "15%",
            editable: true,
        },
        {
            title: "",
            dataIndex: "operation",
            render: (_: any, record: any) => {
                return (
                    <Button type="primary" onClick={(event) => handleChangeClient(event, record.key)}>
                        Change
                    </Button>
                )
            },
        },
    ]

    return (
        <React.Fragment>
            <Table bordered
                   rowClassName={classes.row}
                   dataSource={clientsData}
                   columns={columns}
                   pagination={false}
            />
        </React.Fragment>
    )
}

export default EmailNotificationsTable
