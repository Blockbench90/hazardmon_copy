import React from "react";
import {Typography} from "antd";

import classes from "../../OEMSetting.module.scss";


interface BlockWrapProps {
    title: string,
    description: string,
    subDescription?: string,
    node: React.ReactNode
}
const {Title} = Typography;

const BlockWrap: React.FC<BlockWrapProps> = ({
                                                 description,
                                                 node,
                                                 title,
                                                 subDescription,
                                                 children,
                                             }) => {
    return (
        <React.Fragment>
            <div className={classes.title}>
                <Title level={3}>{title}</Title>
            </div>
            <div className={classes.description}>
                <p>
                    {description}
                    {subDescription}
                </p>
            </div>
            <div className={classes.nodeWrap}>
                {node}
            </div>
        </React.Fragment>

    );
};
export default BlockWrap;