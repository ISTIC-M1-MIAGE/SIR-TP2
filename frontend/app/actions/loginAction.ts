'use server'

import apiClient from "@/app/api/apiClient";
import {HttpStatusCode} from "axios";
import ActionHelper from "@/app/helpers/actionHelper";

export async function loginAction(prevState: any, formData: FormData) {
    // Validate the form data
    //const validatedFields = Schema.safeParse({token})
    // Handle validation errors
    //if (!validatedFields.success) {
    //  return ActionHelper.invalidFieldsResponse(validatedFields.error.flatten().fieldErrors)
    //}
    //remove password_confirm from formDat

    // Now make the API call
    const response = await apiClient.login(formData);

    if (response.status === HttpStatusCode.Ok) {
        // Store token into localStorage
       // const {entity, token } = response.data;
        return ActionHelper.successResponse({title: "Connexion réussie"}, response.data);
    } else {
        return ActionHelper.defaultResponse({title: "Echec de la connexion"});
    }
}