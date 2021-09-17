import React from "react";
import {Link} from "react-router-dom";
import clsx from "clsx";
import {Dropdown, Menu, Typography} from "antd";

import {ReactComponent as DropIcon} from "../../../assets/icons/drapdown.svg";
import classes from "../../../pages/VisualDashboard/VisualDashboard.module.scss";
import {Schema} from "../../../interfaces/schemasReducer";
import urls from "../../../constants/urls";
import {CustomButton} from "../../../components/Button";

const {Title} = Typography;

interface VisualDashProps {
    title?: string;
    timestamp?: string;
    modifyBy?: string;
    comment?: string;
    schema: Schema;
    match?: any
    isPublished?: boolean;
    siteId?: string;
    onCloneClick: () => void;
    onDeleteClick: () => void;
    onPublish: () => void;
}


const VisualDachBlock: React.FC<VisualDashProps> = ({
                                                        title,
                                                        timestamp,
                                                        modifyBy,
                                                        isPublished,
                                                        comment,
                                                        siteId,
                                                        schema,
                                                        onCloneClick,
                                                        onDeleteClick,
                                                        onPublish,
                                                        match,
                                                    }) => {
    const menu = (
        <Menu>
            <Menu.Item key="1" onClick={onCloneClick} style={{color: "#2D3C43", fontWeight: 800, width: "94px"}}>Clone</Menu.Item>
            {
                !schema.is_published
                &&
                <React.Fragment>
                    <Menu.Divider/>
                    <Menu.Item key="2" onClick={onPublish} style={{color: "#27AE60", fontWeight: 800, width: "94px"}}>Publish</Menu.Item>
                    <Menu.Divider/>
                    <Menu.Item key="3" onClick={onDeleteClick} style={{color: "#7C90B1", fontWeight: 800, width: "94px"}}>Delete</Menu.Item>
                </React.Fragment>
            }
        </Menu>
    );

    return (
        <React.Fragment>
            {Boolean(schema.schema_tabs.length) &&
            <Link className={classes.visualLink}
                  to={
                      urls.schemaDetails
                          .replace(":siteId", `${match.params.siteId}`)
                          .replace(":schemaId", `${schema.id}`)
                          .replace(":tabId", `${schema.schema_tabs[0].id}`)
                  }
            >

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
                                {modifyBy}
                            </div>

                            {/*for design*/}
                            {/*<div className={classes.comments}>*/}
                            {/*    {comment}*/}
                            {/*</div>*/}

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


            </Link>
            }
        </React.Fragment>
    );
};

export default VisualDachBlock;
