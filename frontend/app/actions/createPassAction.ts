import apiClient from "@/app/api/apiClient";
import {HttpStatusCode} from "axios";
import ActionHelper from "@/app/helpers/actionHelper";

export async function createPassAction(prevState: any, formData: FormData) {

    // Validate the form data
    // const validatedFields = Schema.safeParse({token})
    // Handle validation errors
    // if (!validatedFields.success) {
    //  return ActionHelper.invalidFieldsResponse(validatedFields.error.flatten().fieldErrors)
    // }
    // Now make the API call
    const response = await apiClient.createPass(formData);

    if (response.status === HttpStatusCode.Created) {
        return ActionHelper.successResponse({title: "Le ticket a bien été créé"}, response.data);
    } else {
        return ActionHelper.defaultResponse({title: response.data.message});
    }
}