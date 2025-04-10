import {addToast} from "@heroui/toast";

export const ToastHelper = {
    successToast(message: string) {
        addToast({
            title: "Succès",
            description: message,
            color: "success",
        });
    },
    infoToast(message: string) {
        addToast({
            title: "Infos",
            description: message,
            color: "default",
        });
    },
    errorToast(message: string) {
        addToast({
            title: "Erreur",
            description: message,
            color: "danger",
        });
    }
}