import React from "react"

import {PlusOutlined} from "@ant-design/icons"
import {Typography} from "antd"

import classes from "./AddNewBlock.module.scss"

interface AddNewBlockProps {
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
    text?: string
}

const {Text} = Typography

export const AddNewBlock: React.FC<AddNewBlockProps> =
    ({onClick, text}) => {

        return (
            <div className={classes.wrap} onClick={onClick}>
                <div className={classes.container}>
                    <div className={classes.icon}>
                        <PlusOutlined/>
                    </div>
                    <div className={classes.text}>
                        <Text>{text}</Text>
                    </div>
                </div>
            </div>
        )
    }

