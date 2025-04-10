import axios, {AxiosResponse, HttpStatusCode} from 'axios';

class ApiClient {
    private readonly host = "http://127.0.0.1:8080";
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

    /**
     * Send register request to the backend.
     * @param payload
     */
    async register(payload: { email: string; motDePasse: string; }): Promise<AxiosResponse> {
        try {
            const response = await axios.post(`${this.host}/auth/register`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: this.defaultTimeout,
            });

            console.debug("register response", response.data);
            return response;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("register error", error);

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

    /**
     * Create a new event.
     */
    async createEvent(payload: {
        mainImage: string,
        title: string,
        description: string,
        location: string,
        currency: string,
        country: string,
        startDate: string,
        endDate: string,
        organizerId: number,
        closingTicketOfficeDate: string
    }): Promise<AxiosResponse> {
        try {
            const response = await axios.post(`${this.host}/event`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: this.defaultTimeout,
            });

            console.debug("createEvent response", response.data);
            return response;
        } catch (error) {
            console.log("createEvent error", error);
            return this.serverErrorResponse;
        }
    }

    async getEvents(): Promise<AxiosResponse> {
        try {
            const response = await axios.get(`${this.host}/event`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: this.defaultTimeout,
            });

            console.debug("getEvents response =", response.data);
            return response;
        } catch (error) {
            console.log("getEvents error =", error);
            return this.serverErrorResponse;
        }
    }

    async getEventById(id: number): Promise<AxiosResponse> {
        try {
            const response = await axios.get(`${this.host}/event/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: this.defaultTimeout,
            });

            console.debug("getEventById response =", response.data);
            return response;
        } catch (error) {
            console.log("getEventById error =", error);
            return this.serverErrorResponse;
        }
    }
}

/**
 * Single API client for the entire app.
 */
export default new ApiClient();
