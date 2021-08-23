import React, {useState} from "react"
import {DatePicker, TimePicker} from "antd"
import Modal from "antd/lib/modal"

import {ReactComponent as HistoricalG} from "../../assets/icons/historical_green.svg"
import {CustomButton} from "../Button"

import classes from "../TabsSensorDashboard/TabsSensorDashboard.module.scss"
import {WinStorage} from "../../services/AuthSrorage";

interface ModalProps {
    is_modal: boolean
    onCancel: () => void
    onHandleSearch: ({date, time}: { date: string, time: string }) => void
}

const DataModal: React.FC<ModalProps> = ({
                                             is_modal,
                                             onCancel,
                                             onHandleSearch
                                         }) => {
    const [date, setDate] = useState<string>();
    const [time, setTime] = useState<string>();
    const dateFormatList = ["YYYY-MM-DD"];
    const format = "HH:mm";

    const onSearch = () => {
        const data = {date, time};
        WinStorage.setLocalTime(data)
        onHandleSearch(data);
    };


    return (
        <React.Fragment>
            <Modal
                wrapClassName={classes.modalWrap}
                footer={null}
                title={
                    <div>
                        <HistoricalG/><span className={classes.modalTitle}>Historical Data</span>
                    </div>
                }
                centered
                visible={is_modal}
                onCancel={() => onCancel()}
            >
                <div className={classes.modalSubTitleWrap}>
                    <span className={classes.modalSubTitle}>Please select Data and Time</span>
                </div>

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
            </Modal>
        </React.Fragment>
    )
}

export default DataModal