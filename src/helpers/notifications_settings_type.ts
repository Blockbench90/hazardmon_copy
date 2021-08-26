export const NOTIFICATION_SETTING_TYPES = {
    "alarm": "Alarm Changed",
    "warning": "Warning Changed",
    "online_status": "Device Online Status Changed",
    "sn2_status_change": "SN2 Status Change",
    "maintenance": "Maintenance",
    "power_up": "Device Power Up",
    "test": "Test Email",
    "device_administration": "Device administration",
    "site_administration": "Site administration",
};
export const emailNotificationsTypeMap = new Map(Object.entries(NOTIFICATION_SETTING_TYPES))

export const ContactWhen = {
    "0": "As Alert happens",
    "2": "Notify if the alarm is not cleared after X minutes",
    "3": "Notify every X hours if the alarm is not cleared",
};

export const contactWhenType = new Map(Object.entries(ContactWhen))

export const getCurrentContactYou = (value: string, x: number) => {
    if(value === "2"){
        return `Notify if the alarm is not cleared after ${x} minutes`
    }
    if(value === "3"){
        return `Notify every ${x} hours if the alarm is not cleared`
    }
    return "As Alert happens"
}