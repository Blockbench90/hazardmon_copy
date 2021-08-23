import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Alert, DatePicker, TimePicker} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";

import {CustomButton} from "../../Button";

import { graphsAC } from "../../../store/branches/graphs/actionCreators";
import {useCurrentSelection} from "../../../hooks/useCurrentSelection";
import {LoadingStatus} from "../../../store/types";

import classes from "../CustomHistoricalGraphs.module.scss";


const SearchBlock: React.FC = () => {
    const dispatch = useDispatch()

    const {device} = useCurrentSelection()

    const [date, setDate] = useState<string>("")
    const [time, setTime] = useState<string>("")
    const dateFormatList = ["YYYY-MM-DD"]
    const format = "HH:mm"


    const onSearch = () => {
        if (!device) {
            dispatch(graphsAC.setGraphsStatusOperation(LoadingStatus.FETCH_GRAPHS_TIME_ERROR))
            return
        }
        const payload = {
            date, time, id: device?.id
        }
        dispatch(graphsAC.fetchCustomGraphsData(payload))
    }

    return (
        <React.Fragment>
            <div className={classes.headerWrap}>
                <div className={classes.headerTitle}>
                    <div className={classes.modalButton}>
                        <DatePicker
                            size="large"
                            className={classes.datePicker}
                            placeholder="Data"
                            inputReadOnly={true}
                            onChange={(date: any, dateString: string) => setDate(dateString)}
                            format={dateFormatList}
                        />

                        <TimePicker format={format}
                                    inputReadOnly={true}
                                    placeholder="Time"
                                    size="large"
                                    className={classes.timePicker}
                                    onChange={(value: any, timeString: string) => setTime(timeString)}
                        />

                        <CustomButton width="81px"
                                      height="40px"
                                      padding="0"
                                      htmlType="button"
                                      disabled={!date || !time}
                                      className={classes.buttonTitle}
                                      onClick={onSearch}
                        >
                            SEARCH
                        </CustomButton>
                    </div>
                </div>

                <div className={classes.alertHistoricalWrap}>
                    {
                        date && time
                        ?
                        <Alert message=""
                               description={`This is a historical snapshots. The data is not live. Snapshots date/time: ${date} ${time}`}
                               className={classes.alertHistorical}
                               type="error"
                               icon={<ExclamationCircleOutlined className={classes.icon}/>}
                               showIcon
                        />
                        :
                        null
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default SearchBlock
