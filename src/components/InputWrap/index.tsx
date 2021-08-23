import React from "react";

import classes from "./InputWrap.module.scss";
import clsx from "clsx"


interface EditProps {
    title?: string
    children?: any
    className?: any
    classNameTitle?: any
}


const InputWrap: React.FC<EditProps> = ({title, children, className, classNameTitle}) => {
    return (
        <div className={classes.block}>
            <div className={clsx(classes.title, classNameTitle)}>
                {title}
            </div>

            <div className={clsx(classes.input, className)}>
                {children}
            </div>
        </div>
    )
}
export default InputWrap
