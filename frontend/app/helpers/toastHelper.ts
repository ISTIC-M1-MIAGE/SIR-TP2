import {addToast} from "@heroui/toast";

export default abstract class ToastHelper {
    static successToast(message: string) {
        addToast({
            title: "Succès",
            description: message,
            color: "success",
        });
    }

    static infoToast(message: string) {
        addToast({
            title: "Infos",
            description: message,
            color: "default",
        });
    }

    static errorToast(message: string) {
        addToast({
            title: "Erreur",
            description: message,
            color: "danger",
        });
    }
}