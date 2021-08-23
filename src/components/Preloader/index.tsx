import React, {ReactElement} from "react";
import {Spin} from "antd";

import classes from "./Preloader.module.scss";

interface PreloaderProps {
    isLoaded: boolean
    children: ReactElement
}

const Preloader: React.FC<PreloaderProps> = ({isLoaded, children}) => {
    return (
        <React.Fragment>
            {
                isLoaded
                    ?
                    <div className={classes.root}>
                        <Spin tip="Loading..." size="large"/>
                    </div>
                    :
                    children
            }
        </React.Fragment>
    );
};
export default Preloader;
