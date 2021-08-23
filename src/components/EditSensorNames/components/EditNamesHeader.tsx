import React, {useRef, useState} from "react";
import {Spin} from "antd";
import {CSVLink} from "react-csv";

import {ReactComponent as ImportLink} from "../../../assets/icons/import_link.svg";
import {ReactComponent as ExportLink} from "../../../assets/icons/export_sensor_names.svg";

import {useCurrentSelection} from "../../../hooks/useCurrentSelection";
import {SensorsApi} from "../../../services/api/sensorsApi";

import classes from "../EditSensorsNames.module.scss";

interface HeaderProps {
    deviceTitle?: string
}

const EditNamesHeader: React.FC<HeaderProps> = ({deviceTitle}) => {
    const {device} = useCurrentSelection()
    const [graphsData, setGraphsData] = useState([]);
    const [loading, setLoading] = useState(false);

    const csvLink = useRef();

    const getGraphsData = async () => {
        setLoading(true);
        await SensorsApi.exportCSV(device.id)
            .then((r: any) => {
                setGraphsData(r);
                setLoading(false);
            }).catch((e) => {
                console.log(e);
                setLoading(false);
            });
        // @ts-ignore
        csvLink?.current?.link.click();
    };

    return (
        <div className={classes.sensorsTitle}>
            <div className={classes.sensorsSub}>
                <div/>
                <div>
                    <span>{deviceTitle}</span>
                </div>
            </div>

            <div className={classes.sensorsButtons}>
                <div className={classes.button}>
                    <ImportLink />
                </div>
                <div className={classes.button}>
                        {
                            loading ? <Spin/> : <ExportLink onClick={getGraphsData}/>
                        }
                    <CSVLink
                        data={graphsData}
                        filename="graphs.csv"
                        className="hidden"
                        ref={csvLink}
                        target="_blank"
                    />
                </div>
            </div>
        </div>
    );
};

export default EditNamesHeader;