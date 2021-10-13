import React, {MutableRefObject, useState} from "react";
import {Divider, Spin} from "antd";

import ExportGraphsCSV from "../../pages/SensorGraphs/components/ExportGraphsCSV";
import {useCurrentSelection} from "../../hooks/useCurrentSelection";
import {ReactComponent as PNG} from "../../assets/icons/PNG.svg";
import {exportComponentAsPNG} from "react-component-export-image";

import classes from "./SensorGraphHeader.module.scss";
import {WinStorage} from "../../services/AuthSrorage";

interface SensorGraphHeaderProps {
    device_type: string
    chartRef: MutableRefObject<any>
    sensorId: number
}

const SensorGraphHeader: React.FC<SensorGraphHeaderProps> = ({
                                                                 device_type,
                                                                 chartRef,
                                                                 sensorId,
                                                             }) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const timeScale = WinStorage.getTimescale();
    const {device} = useCurrentSelection();

    const exportPNG = async (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            setLoading(true);
            await exportComponentAsPNG(chartRef);
            setLoading(false);
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    };

    return (
        <div>
            <div className={classes.sensorHeaderWrap}>
                <div>
                    <h4 className={classes.headerTitle}>{device_type}</h4>
                </div>
                <div className={classes.buttonWrap}>
                    <div className={classes.button} onClick={(event) => exportPNG(event)}>
                        {isLoading ? <Spin/> : <PNG/>}
                    </div>
                    <div className={classes.button}>
                        <ExportGraphsCSV payload={{device_id: +device?.id, timescale: timeScale || "day", sensor_id: sensorId}}/>
                    </div>
                </div>
            </div>

            <Divider className={classes.divider}/>
        </div>
    );
};


export default SensorGraphHeader;
