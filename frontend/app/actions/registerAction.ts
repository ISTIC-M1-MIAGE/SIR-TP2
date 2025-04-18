'use server'

import apiClient from "@/app/api/apiClient";
import {HttpStatusCode} from "axios";
import ActionHelper from "@/app/utils/helpers/actionHelper";

export async function registerAction() {
    // Validate the form data
    //const validatedFields = Schema.safeParse({token})

    // Handle validation errors
    //if (!validatedFields.success) {
    //  return ActionHelper.invalidFieldsResponse(validatedFields.error.flatten().fieldErrors)
    //}

    // Now make the API call
    const response = await apiClient.getEvents();

    switch (response.status) {
        case HttpStatusCode.Ok:
            // Return success response
            return ActionHelper.successResponse({title: "Les évènements ont bien été récupérées"}, response.data);
        default: // case HttpStatusCode.Forbidden:
            return ActionHelper.defaultResponse({title: response.data.message});
    }
}