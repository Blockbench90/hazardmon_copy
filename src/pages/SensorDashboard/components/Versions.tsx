import React from "react";
import {Collapse} from "antd";
import {CaretRightOutlined} from "@ant-design/icons";

import classes from "../SensorDashboard.module.scss"

interface VersionsProps {
    versions?: string | {}
}

const {Panel} = Collapse;


const Versions: React.FC<VersionsProps> = ({
                                               versions,
                                           }) => {

    const text = versions &&
        ((typeof versions === "string")
            ?
            <div>
                {versions}
            </div>
            :
            <div>
                {Object.entries(versions).map((item, index) => (
                    <div key={item[0]}>
                        <span style={{marginRight: "5px"}}>{item[0]}:</span>
                        <span>{item[1]}</span>
                    </div>
                ))}
            </div>);

    return (
        <div style={{display: "flex"}}>
            <Collapse bordered={false}
                      ghost
                      expandIconPosition={"right"}
                      expandIcon={({ isActive }) => <CaretRightOutlined style={{color: "#27AE60", fontSize: "18px"}} rotate={isActive ? 90 : 0} />}>
                <Panel header="Versions" key="Versions" className={classes.panel}>
                    <p>{text}</p>
                </Panel>
            </Collapse>
        </div>
    );
};
export default Versions;
