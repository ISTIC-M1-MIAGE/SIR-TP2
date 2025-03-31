import axios, {AxiosResponse, HttpStatusCode} from 'axios';

class ApiClient {
    private readonly host = "http://localhost:8080";
    private readonly defaultTimeout = 5000;
    private readonly serverErrorResponse = {
        status: 500,
        statusText: "Failed API call",
        data: {
            message: "Une erreur est survenue"
        },
        headers: {},
        config: {},
    } as AxiosResponse;

    /**
     * Send login request to the backend.
     * @param payload
     */
    async login(payload: { email: string; motDePasse: string; }): Promise<AxiosResponse> {
        try {
            const response = await axios.post(`${this.host}/auth/login`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: this.defaultTimeout,
            });

            console.debug("login response", response.data);
            return response;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("login error", error);

                switch (error.response?.status) {
                    case HttpStatusCode.NotAcceptable:
                        return error.response;
                    default:
                        return this.serverErrorResponse;
                }
            } else {
                console.error("Une erreur inattendue s'est produite", error);
                return this.serverErrorResponse;
            }
        }
    }

    async getEvents(token: string): Promise<AxiosResponse> {
        try {
            const response = await axios.get(`${this.host}/utilisateur`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                timeout: this.defaultTimeout,
            });

            console.debug("getUserInfos response =", response.data);
            return response;
        } catch (error) {
            console.error("getUserInfos error =", error);
            return this.serverErrorResponse;
        }
    }
}

/**
 * Single API client for the entire app.
 */
export default new ApiClient();
