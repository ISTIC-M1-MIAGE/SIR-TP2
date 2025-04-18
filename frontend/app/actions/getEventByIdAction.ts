'use server'

import {z} from 'zod'
import apiClient from "@/app/api/apiClient";
import {HttpStatusCode} from "axios";
import ActionHelper from "@/app/utils/helpers/actionHelper";

// Define a schema for form validation
const Schema = z.object({
    token: z.string({message: "Le token d'authentification est requis"}),
})

export async function getEventByIdAction(id: any) {
    // Validate the form data
    //const validatedFields = Schema.safeParse({token})

    // Handle validation errors
    //if (!validatedFields.success) {
    //  return ActionHelper.invalidFieldsResponse(validatedFields.error.flatten().fieldErrors)
    //}

    // Now make the API call
    const response = await apiClient.getEventById(id);

    switch (response.status) {
        case HttpStatusCode.Ok:
            // Return success response
            return ActionHelper.successResponse({title: "L' évènement a bien été récupéré"}, response.data);
        default: // case HttpStatusCode.Forbidden:
            return ActionHelper.defaultResponse({title: response.data.message});
    }
}