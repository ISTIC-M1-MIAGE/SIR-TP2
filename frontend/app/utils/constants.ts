import {ActionResponse} from "@/app/utils/interfaces";

export const baseFormActionResponse: ActionResponse = {
    success: false,
    message: {
        title: "",
    },
    data: {},
    errors: {},
}