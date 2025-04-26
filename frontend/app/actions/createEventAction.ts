'use server'

import apiClient from "@/app/api/apiClient";
import {HttpStatusCode} from "axios";
import ActionHelper from "@/app/helpers/actionHelper";

export async function createEventAction(prevState: any, formData: FormData) {

    // Get city forom his id
    //add location to payload
    const adresse = formData.get("adresse") as string;
    const cp = formData.get("postal") as string;
    const ville = formData.get("ville") as string;
    formData.set("location", `${adresse}, ${cp} ${ville}`);
    formData.delete("adresse");
    formData.delete("postal");
    formData.delete("ville");

    // Validate the form data
    //const validatedFields = Schema.safeParse({token})

    // Handle validation errors
    //if (!validatedFields.success) {
    //  return ActionHelper.invalidFieldsResponse(validatedFields.error.flatten().fieldErrors)
    //}
    // Now make the API call
    const response = await apiClient.createEvent(formData);

    if (response.status === HttpStatusCode.Created) {
        return ActionHelper.successResponse({title: "L'évènement a bien été créé"}, response.data);
    } else {
        return ActionHelper.defaultResponse({title: response.data.message});
    }
}