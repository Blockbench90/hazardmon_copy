import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";

import HeaderAnalytics from "./components/HeaderAnalytics";
import SearchBlockAnalytics from "./components/SearchBlockAnalytics";
import AnalyticTabs from "./components/AnalyticTabs";
import AnalyticsAlert from "../../components/Alerts/analytics";
import {useCurrentSelection} from "../../hooks/useCurrentSelection";
import {LoadingStatus} from "../../store/types";
import Preloader from "../../components/Preloader";
import {getCorrectDate} from "../../helpers/getDateAnalytics";
import {selectAnalyticsState} from "../../store/selectors";
import {analyticsAC} from "../../store/branches/analytics/actionCreators";

import classes from "./Analytics.module.scss";

const Analytics: React.FC = () => {
    const [from, setFrom] = useState<string>("");
    const [to, setTo] = useState<string>("");

    const dispatch = useDispatch();
    const {device} = useCurrentSelection();
    const {status, alarm_sensor_data, alarm_time_data, alarm_type_data} = useSelector(selectAnalyticsState);

    const onSelectFrom = useCallback((date: any, dateString: string) => {
        setFrom(dateString);
    }, []);

    const onSelectTo = useCallback((value: any, timeString: string) => {
        setTo(timeString);
    }, []);


    useEffect(() => {
        if (!device) {
            dispatch(analyticsAC.setStatusOperationAnalytics(LoadingStatus.FETCH_ANALYTICS_WITHOUT_DEVICE));
        }

        return () => {
            dispatch(analyticsAC.clearAnalytics());
        };
    }, [dispatch, device]);

    useEffect(() => {
        const from = moment().startOf("month").format("YYYY-MM-DD");
        const to = moment().format("YYYY-MM-DD");

        onSelectFrom("", from);
        onSelectTo("", to);

        const data = {
            from: getCorrectDate(from),
            to: getCorrectDate(to),
            device_id: device?.id,
        };
        dispatch(analyticsAC.fetchAnalytics(data));
    }, [onSelectFrom, onSelectTo, device, dispatch]);


    return (
        <Preloader isLoaded={status === LoadingStatus.LOADING}>
            <div className={classes.wrap}>
                <AnalyticsAlert/>
                <HeaderAnalytics/>
                <SearchBlockAnalytics onSelectFrom={onSelectFrom}
                                      onSelectTo={onSelectTo}
                                      from={from}
                                      to={to}
                />

                <AnalyticTabs alarm_sensor_data={alarm_sensor_data}
                              alarm_time_data={alarm_time_data}
                              alarm_type_data={alarm_type_data}
                              from={from}
                              to={to}
                />
            </div>
        </Preloader>
    );
};

export default Analytics;
