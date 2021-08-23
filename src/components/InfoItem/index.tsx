import React from "react";

import success from "../../assets/icons/success.svg";
import {onScroll} from "../../helpers/scroll";

import classes from "../InfoBlock/InfoBlock.module.scss";

interface InfoItemProps {
    title: string
    refProps?: any
}

const InfoItem: React.FC<InfoItemProps> = ({title, refProps}) => {

    const onScrollToSmallBlock = () => {
        onScroll(refProps)
    }

    return (
        <div className={classes.wrapItem}>
            <p onClick={onScrollToSmallBlock}><img src={success} alt={title}/><span>{title}</span></p>
        </div>
    )
}

export default InfoItem
