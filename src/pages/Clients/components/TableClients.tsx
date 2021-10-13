import clsx from "clsx";
import React from "react";
import {Table} from "antd";

import classes from "../Clients.module.scss";
import {CustomButton} from "../../../components/Button";

interface TableProps {
    clients: any
    selectedClient: { id: number, company: string, number?: number }
    clientsData: any
    onSelectSites: (id: string) => void
    onChangeClient: (event: React.MouseEvent<HTMLElement>, id: number) => void
    onPagesChange: (page: number, pageSize: number) => void
    pageNumber: any
}

const TableClients: React.FC<TableProps> = ({
                                                clients,
                                                selectedClient,
                                                clientsData,
                                                pageNumber,
                                                onChangeClient,
                                                onPagesChange,
                                                onSelectSites,
                                            }) => {

    const handleSelectSites = (id: string) => {
        onSelectSites(id);
    };

    const handleChangeClient = (event: React.MouseEvent<HTMLElement>, id: number) => {
        onChangeClient(event, id);
    };

    const handlePagesChange = (page: number, pageSize: number) => {
        onPagesChange(page, pageSize);
    };

    const columns = [
        {
            title: "ACCOUNT",
            dataIndex: "account",
            maxWidth: "10%",
            editable: true,
            render: (_: any, record: any) => {
                return <div className={clsx((record.id === selectedClient?.id) && classes.selectedClient,
                    (record.id === selectedClient?.id) && classes.selectedClientLeft)}>{_}</div>;
            },
        },
        {
            title: "EMAIL ADDRESS",
            dataIndex: "emailAddress",
            maxWidth: "20%",
            editable: true,
            render: (_: any, record: any) => {
                return <div className={clsx((record.id === selectedClient?.id) && classes.selectedClient)}>{_}</div>;
            },
        },
        {
            title: "FULL NAME",
            dataIndex: "fullName",
            maxWidth: "15%",
            editable: true,
            render: (_: any, record: any) => {
                return <div className={clsx((record.id === selectedClient?.id) && classes.selectedClient)}>{_}</div>;
            },
        },
        {
            title: "COMPANY",
            dataIndex: "company",
            maxWidth: "15%",
            editable: true,
            render: (_: any, record: any) => {
                return <div className={clsx((record.id === selectedClient?.id) && classes.selectedClient)}>{_}</div>;
            },
        },
        {
            title: "ADDRESS",
            dataIndex: "address",
            maxWidth: "20%",
            editable: true,
            render: (_: any, record: any) => {
                return <div className={clsx((record.id === selectedClient?.id) && classes.selectedClient)}>{_}</div>;
            },
        },
        {
            title: "PHONE NUMBER",
            dataIndex: "phoneNumber",
            maxWidth: "20%",
            editable: true,
            render: (_: any, record: any) => {
                return <div className={clsx((record.id === selectedClient?.id) && classes.selectedClient)}>{_}</div>;
            },
        },
        {
            title: "EDIT",
            dataIndex: "operation",
            render: (_: any, record: any) => {
                return (
                    <div className={clsx((record.id === selectedClient?.id) && classes.selectedClient,
                        (record.id === selectedClient?.id) && classes.selectedClientRight)}>

                        <CustomButton color={"client"}
                                      height={"30px"}
                                      width={"70px"}
                                      padding={"0"}
                                      className={classes.changeClient}
                                      onClick={(event) => handleChangeClient(event, record.key)}>
                            Change
                        </CustomButton>
                    </div>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        return {
            ...col,
            onCell: () => ({
                title: col.title,
                className: clsx(col.title === "COMPANY" && classes.siteRowCompany),
            }),
        };
    });


    return (
        <React.Fragment>
            <Table bordered
                   rowClassName={classes.row}
                //    rowClassName={(record: any, index: number) => {
                //        console.log("record ==>", record);
                //        return clsx(classes.row, (record.id === selectedClient?.id) && classes.selectedClient);
                   onRow={(collum) => {
                       return {
                           onClick: () => {
                               handleSelectSites(collum.key);
                           },
                       };
                   }}
                   dataSource={clients}
                   columns={mergedColumns}
                   pagination={{
                       position: ["bottomCenter"],
                       pageSize: 20,
                       onChange: handlePagesChange,
                       current: pageNumber.current,
                       total: clientsData?.count,
                   }}
            />
        </React.Fragment>
    );
};

export default TableClients;
