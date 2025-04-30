import apiClient from "@/app/api/apiClient";
import {HttpStatusCode} from "axios";
import ActionHelper from "@/app/helpers/actionHelper";

export async function getPassesByEventAction(eventId: any) {
    // Now make the API call
    const response = await apiClient.getPassesByEvent(eventId);

    if (response.status === HttpStatusCode.Ok) {
        return ActionHelper.successResponse({title: "Les passes ont bien été récupérées"}, response.data);
    } else {
        return ActionHelper.defaultResponse({title: response.data.message});
    }
}