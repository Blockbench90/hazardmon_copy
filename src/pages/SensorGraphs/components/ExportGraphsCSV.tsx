import React, {useRef, useState} from "react";
import {CSVLink} from "react-csv";
import {Spin} from "antd";

import {ReactComponent as CSV} from "../../../assets/icons/CSV.svg";
import {GraphsApi} from "../../../services/api/graphsApi";
import {FetchGraphs} from "../../../store/branches/graphs/stateTypes";


const ExportGraphsCSV: React.FC<{ payload: FetchGraphs }> = ({payload}) => {
    const [graphsData, setGraphsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const csvLink = useRef();

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
                filename="graphs.csv"
                className="hidden"
                ref={csvLink}
                target="_blank"
            />
        </React.Fragment>
    );
};

export default ExportGraphsCSV;