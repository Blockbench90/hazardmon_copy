import React from "react";
import {Typography} from "antd";

import classes from "./ModifyHomepage.module.scss";

import {CustomButton} from "../Button";
import {CloudUploadOutlined} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";

const {Title} = Typography;

const BlockWrap: React.FC<{ url?: string, node: React.ReactNode }> = ({
                                                                          node,
                                                                          url,
                                                                          children,
                                                                      }) => {
    return (
        <React.Fragment>
            <div className={classes.title}>
                <Title level={4}>Image*</Title>
                <Title level={5}>Currently:</Title>
            </div>
            <div className={classes.description}>
                <img src={url} alt=""/>
            </div>
            <div className={classes.nodeWrap}>
                Change: {node}
            </div>
            <div className={classes.textArea}>
                <div>
                    <p>Description*:</p>
                </div>
                <div>
                    <TextArea autoSize={{minRows: 6, maxRows: 6}}/>
                </div>
            </div>
        </React.Fragment>

    );
};

const ModifyHomepage: React.FC = () => {


    return (
        <div className={classes.wrapper}>

            <div className={classes.container}>
                <div className="d-flex">
                    <div>
                        <Title level={2} className="header-link">Modify Homepage</Title>
                    </div>
                    <div>
                        <CustomButton width="150px"
                                      padding="0"
                                      height="40px"
                                      color="red"
                                      className={classes.button}
                        >
                            Remove Sideshow
                        </CustomButton>
                    </div>
                </div>

                <BlockWrap
                    url={"https://picsum.photos/800/300"}
                    node={
                        <CustomButton width="150px"
                                      padding="0"
                                      height="40px"
                        >
                            <CloudUploadOutlined/> Upload Images
                        </CustomButton>
                    }
                />

                <BlockWrap
                    url={"https://picsum.photos/800/300"}
                    node={
                        <CustomButton width="150px"
                                      padding="0"
                                      height="40px"
                        >
                            <CloudUploadOutlined/> Upload Images
                        </CustomButton>
                    }
                />

                <BlockWrap
                    url={"https://picsum.photos/800/300"}
                    node={
                        <CustomButton width="150px"
                                      padding="0"
                                      height="40px"
                        >
                            <CloudUploadOutlined/> Upload Images
                        </CustomButton>
                    }
                />

                <BlockWrap
                    url={"https://picsum.photos/800/300"}
                    node={
                        <CustomButton width="150px"
                                      padding="0"
                                      height="40px"
                        >
                            <CloudUploadOutlined/> Upload Images
                        </CustomButton>
                    }
                />


            </div>
        </div>
    );
};
export default ModifyHomepage;
