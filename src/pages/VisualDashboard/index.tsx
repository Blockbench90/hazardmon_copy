import React from "react";
import clsx from "clsx";

import {AddNewBlock} from "../../components/AddNewBlock";
import VisualDachBlock from "./components/VisualDachBlock";
import {customProps} from "./components/columns";
import HeaderVisualDashboard from "./components/HeaderVisualDashaboard";

import classes from "./VisualDashboard.module.scss"
import Visual from "../../visual-dashboard-frontend/src";


const VisualDashboard: React.FC = () => {

    return (
        <div className={clsx("header-link", classes.wrap)}>
            <HeaderVisualDashboard/>

            <div className={"d-flex"}>
                <div className={classes.mapBlock}>
                    {customProps?.map((cart, index) => (
                        <VisualDachBlock title={cart?.title}
                                         isPublished={cart?.isPublished}
                                         userRole={cart?.userRole}
                                         timestamp={cart?.timestamp}
                                         key={`${cart.title}${index}`}/>
                    ))}
                </div>

                <AddNewBlock text="Add New Site"/>
                <div>
                    <Visual/>
                </div>
            </div>
        </div>
    )
}

export default VisualDashboard
