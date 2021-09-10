import * as React from 'react';
import { toast } from 'react-toastify';

import './Notification.scss';

class Notification {
    public success(text: string, icon?: any) {
        this.show(text, 'success', icon);
    }

    public error(data: any, icon?: any) {
        this.show(data, 'error', icon);
    }

    public show(text: string, type: string, icon: any) {
        toast(this.render(text, icon), {
            className: `notification ${type}`,
            closeOnClick: false,
            hideProgressBar: true,
            position: 'top-center',
        });
    }

    public locationAlert(notification: any) {
        toast(this.renderLocationAlert(notification), {
            autoClose: 5000,
            className: `alert ${notification.color}`,
            closeOnClick: false,
            hideProgressBar: true,
            position: 'bottom-right',
        });
    }

    public render(text: string, icon: any) {
        return (
            <div className="notification-body">
                {icon && <img src={icon} />}
                {text}
            </div>
        );
    }

    public renderLocationAlert(notification: any) {
        return (
            <div>
                <a href={notification.url}>{notification.notification_time} - {notification.device} - {notification.event_type}</a>
                <br />
                {notification.sensor_name} {notification.content}
            </div>
        );
    }
}

export default new Notification();