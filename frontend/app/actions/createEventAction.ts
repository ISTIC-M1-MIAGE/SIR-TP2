'use server'

import apiClient from "@/app/api/apiClient";
import {HttpStatusCode} from "axios";
import ActionHelper from "@/app/helpers/actionHelper";

export async function createEventAction(prevState: any, formData: FormData) {
    console.log("action formData = ", formData);
    return ActionHelper.defaultResponse({title: "test"});


    //add location to payload
    // Validate the form data
    //const validatedFields = Schema.safeParse({token})

    // Handle validation errors
    //if (!validatedFields.success) {
    //  return ActionHelper.invalidFieldsResponse(validatedFields.error.flatten().fieldErrors)
    //}
    // Now make the API call
    //const response = await apiClient.createEvent(formData);
/*
    switch (response.status) {
        case HttpStatusCode.Created:
            // Return success response
            return ActionHelper.successResponse({title: "L'évènement a bien été créé"}, response.data);
        default: // case HttpStatusCode.Forbidden:
            return ActionHelper.defaultResponse({title: response.data.message});
    }

 */
}