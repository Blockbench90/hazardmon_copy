import clsx from "clsx"
import React from "react"
import {Table} from "antd"

import classes from "../Clients.module.scss"
import {CustomButton} from "../../../components/Button"

interface TableProps {
    clients: any
    clientsData: any
    onSelectSites: (id: string) => void
    onChangeClient: (event: React.MouseEvent<HTMLElement>, id: number) => void
    onPagesChange: (page: number, pageSize: number) => void
    pageNumber: any
}

const TableClients: React.FC<TableProps> = ({
                                                clients,
                                                clientsData,
                                                pageNumber,
                                                onChangeClient,
                                                onPagesChange,
                                                onSelectSites,
                                            }) => {

    const handleSelectSites = (id: string) => {
        onSelectSites(id)
    }

    const handleChangeClient = (event: React.MouseEvent<HTMLElement>, id: number) => {
        onChangeClient(event, id)
    }

    const handlePagesChange = (page: number, pageSize: number) => {
        onPagesChange(page, pageSize)
    }

    const columns = [
        {
            title: "ACCOUNT",
            dataIndex: "account",
            maxWidth: "10%",
            editable: true,
        },
        {
            title: "EMAIL ADDRESS",
            dataIndex: "emailAddress",
            maxWidth: "20%",
            editable: true,
        },
        {
            title: "FULL NAME",
            dataIndex: "fullName",
            maxWidth: "15%",
            editable: true,
        },
        {
            title: "COMPANY",
            dataIndex: "company",
            maxWidth: "15%",
            editable: true,
        },
        {
            title: "ADDRESS",
            dataIndex: "address",
            maxWidth: "20%",
            editable: true,
        },
        {
            title: "PHONE NUMBER",
            dataIndex: "phoneNumber",
            maxWidth: "20%",
            editable: true,
        },
        {
            title: "EDIT",
            dataIndex: "operation",
            render: (_: any, record: any) => {
                return (
                    <CustomButton color={"client"}
                                  height={"30px"}
                                  width={"70px"}
                                  padding={"0"}
                                  className={classes.changeClient}
                                  onClick={(event) => handleChangeClient(event, record.key)}>
                        Change
                    </CustomButton>
                )
            },
        },
    ]

    const mergedColumns = columns.map((col) => {
        return {
            ...col,
            onCell: () => ({
                title: col.title,
                className: clsx(classes.sitesRow, col.title === "COMPANY" && classes.siteRowCompany),
            }),
        }
    })


    return (
        <React.Fragment>
            <Table bordered
                   rowClassName={classes.row}
                   onRow={(collum) => {
                       return {
                           onClick: () => {
                               handleSelectSites(collum.key)
                           },
                       }
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
    )
}

export default TableClients
