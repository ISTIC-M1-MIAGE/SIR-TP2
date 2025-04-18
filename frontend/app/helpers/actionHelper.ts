import {ActionResponse} from "@/app/utils/interfaces";

export default abstract class ActionHelper {
    static invalidFieldsResponse(errors: any): ActionResponse {
        return {
            success: false,
            message: {
                title: 'Certains champs sont invalides'
            },
            errors: errors,
        } as ActionResponse;
    }

    static notFoundResponse(message: { title: string; }): ActionResponse {
        return {
            success: false,
            message: message,
        } as ActionResponse;
    }

    static successResponse(message: { title: string; }, data: any): ActionResponse {
        return {
            success: true,
            message: message,
            data: data,
        } as ActionResponse;
    }

    static defaultResponse(message: { title: string; }): ActionResponse {
        return {
            success: false,
            message: message,
        } as ActionResponse;
    }
}