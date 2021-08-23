import React from "react";
import {Dropdown, Menu, Typography} from "antd";
import clsx from "clsx";

import {CustomButton} from "../../../components/Button";
import {ReactComponent as DropIcon} from "../../../assets/icons/drapdown.svg"
import classes from "../VisualDashboard.module.scss";

const {Title} = Typography;

interface VisualDashProps {
    title?: string
    timestamp?: string
    userRole?: string
    isPublished?: boolean
}

const menu = (
    <Menu>
        <Menu.Item key="1" style={{color: "#2D3C43"}}>Clone</Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="2" style={{color: "#27AE60"}}>Publish</Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="3" style={{color: "#7C90B1"}}>Delete</Menu.Item>
    </Menu>
)

const VisualDachBlock: React.FC<VisualDashProps> = ({
                                                        title,
                                                        timestamp,
                                                        userRole,
                                                        isPublished
                                                    }) => {

    return (
        <div className={clsx(classes.visualDashBlockWrap)}>
            <div>

                <div>
                    <Title level={4}>{title}</Title>
                </div>

                <div className={classes.description}>
                    <div>
                        {timestamp}
                    </div>
                    <div>
                        {userRole}
                    </div>
                </div>

                <CustomButton width="81px"
                              height="20px"
                              color={isPublished ? "gray" : "green"}
                              fontSize="12px"
                              padding="0"
                              borderRadius="100px"
                >
                    {isPublished ? "Saved" : "Published"}
                </CustomButton>
            </div>

            <div className={classes.editButton}>
                <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
                    <DropIcon/>
                </Dropdown>
            </div>
        </div>
    )
}

export default VisualDachBlock
