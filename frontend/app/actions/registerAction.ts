'use server'

import apiClient from "@/app/api/apiClient";
import {HttpStatusCode} from "axios";
import ActionHelper from "@/app/helpers/actionHelper";

export async function registerAction(prevState: any, formData: FormData) {
    // Validate the form data
    //const validatedFields = Schema.safeParse({token})

    // Handle validation errors
    //if (!validatedFields.success) {
    //  return ActionHelper.invalidFieldsResponse(validatedFields.error.flatten().fieldErrors)
    //}
    //remove password_confirm from formDat

    // Now make the API call
    const response = await apiClient.register(formData);

    if (response.status === HttpStatusCode.Ok) {
        return ActionHelper.successResponse({title: "Inscription réussie"}, response.data);
    } else {
        return ActionHelper.defaultResponse({title: "Echec de l'inscription"});
    }
}