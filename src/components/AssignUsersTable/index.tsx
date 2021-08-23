import React from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Checkbox, Form, Select, Spin, Table} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

import {LoadingStatus} from "../../store/types";
import {AssignUser, SetMemberShip, UpdateMemberShip} from "../../store/branches/sites/stateTypes";
import {tableGenerationAssignUsers} from "./components/TableGeneration";
import {sitesAC} from "../../store/branches/sites/actionCreators";

import classes from "./AssignUsersTable.module.scss";
import {selectSitesState} from "../../store/selectors";

const {Option} = Select;
const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

const AssignUserTable: React.FC<{ users: AssignUser[] }> = ({users}) => {
    const [form] = Form.useForm();
    const {id}: any = useParams();
    const dispatch = useDispatch();
    const {status} = useSelector(selectSitesState);
    const assignUsers = tableGenerationAssignUsers(users, id);

    const onCheckbox = (event: any, record: any) => {
        event.preventDefault();
        event.stopPropagation();

        if (record.membership_id === undefined) {
            const data: SetMemberShip = {
                location: +id,
                user: record.id,
                permission: record.permission || "User",
                has_access: event.target.checked,
            };
            dispatch(sitesAC.setLocationMemberShip(data));
            return;
        }

        const data: UpdateMemberShip = {
            location_id: +id,
            id: record.membership_id,
            permission: record.permission || "User",
            has_access: event.target.checked,
        };
        dispatch(sitesAC.updateLocationMemberShip(data));
    };

    const onSelect = (record: any, value: any) => {
        if (record.membership_id === undefined) {
            const data: SetMemberShip = {
                location: +id,
                user: record.id,
                permission: value,
                has_access: record.hasAccess || false,
            };
            dispatch(sitesAC.setLocationMemberShip(data));
            return;
        }
        const data: UpdateMemberShip = {
            location_id: +id,
            id: record.membership_id,
            permission: value,
            has_access: record.hasAccess || false,
        };
        dispatch(sitesAC.updateLocationMemberShip(data));
    };

    const columns = [
        {
            title: "EMAIL ADDRESS",
            dataIndex: "emailAddress",
            maxWidth: "10%",
        },
        {
            title: "FULL NAME",
            dataIndex: "fullName",
            maxWidth: "10%",
        },
        {
            title: "COMPANY",
            dataIndex: "company",
            maxWidth: "10%",
        },
        {
            title: "ADDRESS",
            dataIndex: "address",
            maxWidth: "10%",
        },
        {
            title: "PHONE NUMBER",
            dataIndex: "phoneNumber",
            maxWidth: "10%",
        },
        {
            title: "HAS ACCESS",
            dataIndex: "hasAccess",
            maxWidth: "10%",
            render: (_: any, record: any) => {
                return (
                    <Checkbox onChange={(event) => onCheckbox(event, record)}
                              checked={record.hasAccess}
                    />
                );
            },
        },
        {
            title: "PERMISSION",
            dataIndex: "permission",
            render: (_: any, record: any) => {
                return (
                    <Select value={record.permission || "User"}
                            style={{width: 120}}
                            onChange={(value) => onSelect(record, value)}
                    >
                        <Option value="User">User</Option>
                        <Option value="Engineer">Engineer</Option>
                        <Option value="Manager">Manager</Option>
                    </Select>
                );
            },
        },
    ];

    const mergedColumnsAssignUsers = columns.map((col) => {
        return {
            ...col,
            onCell: () => ({
                title: col.title,
            }),
        };
    });

    if (status === LoadingStatus.LOADING) {
        return <Spin indicator={antIcon} className={classes.spin}/>;
    }

    return (
        <div className={classes.wrap}>
            <Form form={form} component={false}>
                <Table pagination={false}
                       dataSource={assignUsers}
                       columns={mergedColumnsAssignUsers}
                />
            </Form>
        </div>
    );
};

export default AssignUserTable;
