export interface ActionResponse {
    success: boolean,
    message: {
        title: string,
        content?: string,
    },
    data?: any,
    errors?: any,
}