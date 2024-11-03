import { ref } from 'vue'

enum NotificationType {
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error'
}

type Notification = {
    message: string,
    type: NotificationType
}


export default function useToast() {
    const notifications = ref<Notification[]>([])
    function pushNotification(notification: Notification) {
        notifications.value.push(notification)

        setTimeout(() => {
            notifications.value.shift()
        }, 5000)
    }

    function success(message: string) {
        pushNotification({
            message,
            type: NotificationType.SUCCESS
        })
    }

    function warning(message: string) {
        pushNotification({
            message,
            type: NotificationType.WARNING
        })
    }

    function error(message: string) {
        pushNotification({
            message,
            type: NotificationType.ERROR
        })
    }

    return {
        notifications,
        success,
        warning,
        error
    }
}