import React, {useRef, useState} from "react";
import {CSVLink} from "react-csv";
import {Spin} from "antd";

import {ReactComponent as CSV} from "../../../assets/icons/CSV.svg";
import {GraphsApi} from "../../../services/api/graphsApi";
import {FetchGraphs} from "../../../store/branches/graphs/stateTypes";
import {useCurrentSelection} from "../../../hooks/useCurrentSelection";


const ExportGraphsCSV: React.FC<{ payload: FetchGraphs }> = ({payload}) => {
    const {device} = useCurrentSelection()
    const [graphsData, setGraphsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const csvLink = useRef();

    const exportNameFile = device ? `sensor_names_${device?.device_type}_${device?.id}.csv` : "graphs.csv"
    const getGraphsData = async () => {
        setLoading(true);
        await GraphsApi.exportCSV(payload)
            .then((r) => {
                // @ts-ignore
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
        <React.Fragment>
            {
                loading ? <Spin/> : <CSV onClick={getGraphsData}/>
            }
            <CSVLink
                data={graphsData}
                filename={exportNameFile}
                className="hidden"
                ref={csvLink}
                target="_blank"
            />
        </React.Fragment>
    );
};

export default ExportGraphsCSV;