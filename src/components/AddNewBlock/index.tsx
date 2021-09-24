import React from "react";

import {PlusOutlined} from "@ant-design/icons";

import classes from "./AddNewBlock.module.scss";

interface AddNewBlockProps {
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
    text?: string
}


export const AddNewBlock: React.FC<AddNewBlockProps> = ({
                                                            onClick,
                                                            text,
                                                        }) => {

    return (
        <div className={classes.wrap}>
            <div className={classes.container} onClick={onClick}>
                <div className={classes.icon}>
                    <PlusOutlined/>
                </div>
                <div className={classes.text}>
                    <p>{text}</p>
                </div>
            </div>
        </div>
    );
};

