import {EmailDevice, EmailNotification} from "../../../store/branches/user/stateTypes";

export const mapEmailNotificationsData = (table: EmailNotification[] = []) => {
    const emailNotificationsData: any = [];
    table && table.forEach(el => {
        const devices: string[] = [];
        el.devices.forEach((device: EmailDevice) => {
            devices.push(device.title)
        });
        emailNotificationsData.push({
            id: el.id,
            key: el.id.toString(),
            delivery_method: el.delivery_method,
            event_type: el.event_type,
            contact_when: el.contact_when,
            devices: devices,
            all_devices: el.all_devices,
            send_to_alternative: el.send_to_alternative,
            alternative_contact: el.alternative_contact,
            x: el.x

        });
    });
    return emailNotificationsData;
};