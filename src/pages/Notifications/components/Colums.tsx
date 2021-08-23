import {UserState} from "../../../store/branches/user/stateTypes";

export const generationDate = (date: string) => {
    if (date) {
        const dateArray = new Date(date).toDateString().split(" ");
        return `${dateArray[1]}. ${dateArray[2]}, ${dateArray[3]}`;
    }
    return null;
};

export const generationTime = (time: string) => {
    if (time) {
        const dateArray = time.split(" ");
        return `${dateArray[1]}  CST`;
    }
    return null;
};

export const mapNotificationsData = (table: UserState["notifications"]["results"] = [], isActive: boolean) => {
    return table.map((el, index) => ({
        id: el.id,
        key: index.toString(),
        date_created: generationDate(el?.date_created),
        time: generationTime(el?.date_created),
        location: el?.location?.title,
        device: el?.device?.title,
        sensor: el?.sensor_name,
        event_type: el?.event_type,
        message: el?.content,
        in_alarm: isActive ? (el.is_active ? "On" : "Off") : el?.duration,
    }));
};
