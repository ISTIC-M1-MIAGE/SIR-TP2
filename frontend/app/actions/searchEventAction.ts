'use server'

import apiClient from "@/app/api/apiClient";
import {HttpStatusCode} from "axios";
import ActionHelper from "@/app/helpers/actionHelper";

export async function searchEventAction(prevState: any, formData: FormData) {
    // Validate the form data
    //const validatedFields = Schema.safeParse({token})

    // Handle validation errors
    //if (!validatedFields.success) {
    //  return ActionHelper.invalidFieldsResponse(validatedFields.error.flatten().fieldErrors)
    //}
    // Now make the API call
    const response = await apiClient.searchEvents(formData);

    if (response.status === HttpStatusCode.Ok) {
        return ActionHelper.successResponse({title: "Voici les résultats de la recherche"}, response.data);
    } else {
        return ActionHelper.defaultResponse({title: response.data.message});
    }
}