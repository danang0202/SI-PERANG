// utils/notificationHelper.js

import { notifications } from '@mantine/notifications';

export function showSuccesNotification(message, color = 'green', position = 'top-right', delay = 300) {
    setTimeout(() => {
        notifications.show({
            position: position,
            title: "Tindakan Berhasil",
            message: message,
            color: color,
        });
    }, delay);
}


export function showFailNotification(message, color = 'red', position = 'top-right', delay = 300) {
    setTimeout(() => {
        notifications.show({
            position: position,
            title: "Tindakan Gagal",
            message: message,
            color: color,
        });
    }, delay);
}

