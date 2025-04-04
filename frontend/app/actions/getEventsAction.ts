'use server'

import {z} from 'zod'
import apiClient from "@/app/api/apiClient";
import {HttpStatusCode} from "axios";
import ActionHelper from "@/app/helpers/actionHelper";

// Define a schema for form validation
const Schema = z.object({
    token: z.string({message: "Le token d'authentification est requis"}),
})

export async function getEventsAction(token: string) {
    // Validate the form data
    const validatedFields = Schema.safeParse({token})

    // Handle validation errors
    if (!validatedFields.success) {
        return ActionHelper.invalidFieldsResponse(validatedFields.error.flatten().fieldErrors)
    }

    // Now make the API call
    const response = await apiClient.getEvents(validatedFields.data.token);

    switch (response.status) {
        case HttpStatusCode.Ok:
            // Return success response
            return ActionHelper.successResponse({title: "Les évènements ont bien été récupérées"}, response.data);
        default: // case HttpStatusCode.Forbidden:
            return ActionHelper.defaultResponse({title: response.data.message});
    }
}