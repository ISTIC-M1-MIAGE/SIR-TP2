'use server'

import apiClient from "@/app/api/apiClient";
import {HttpStatusCode} from "axios";
import ActionHelper from "@/app/helpers/actionHelper";

export async function getCurrentUserAction() {
    // Validate the form data
    //const validatedFields = Schema.safeParse({token})
    // Handle validation errors
    //if (!validatedFields.success) {
    //  return ActionHelper.invalidFieldsResponse(validatedFields.error.flatten().fieldErrors)
    //}
    //remove password_confirm from formDat

    // Now make the API call
    const response = await apiClient.getCurrentUser();

    if (response.status === HttpStatusCode.Ok) {
        return ActionHelper.successResponse({title: "User fetch réussie"}, response.data);
    } else {
        return ActionHelper.defaultResponse({title: "Echec de la récupération de l'utilisateur"});
    }
}