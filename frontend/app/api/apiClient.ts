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
     * @param formData The form data to create the event from.
     */
    async createEvent(formData: FormData): Promise<AxiosResponse> {
        // create the right payload
        const payload: any = {
            mainImage: formData.get("mainImage"),
            title: formData.get("title"),
            description: formData.get("description"),
            location: formData.get("location"),
            currency: formData.get("currency"),
            country: formData.get("country"),
            startDate: formData.get("startDate"),
            endDate: formData.get("endDate"),
            organizerId: 1,
            closingTicketOfficeDate: formData.get("closingTicketOfficeDate"),
        }
        console.log("api client payload = ", payload);
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

    /**
     * Get the list of all events.
     */
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

    /**
     * Get one event by its ID.
     * @param id The ID of the event to get.
     */
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

    /**
     * Get the list of all events filtered by search criterias.
     * @param formData The form data to filter the events from.
     */
    async searchEvents(formData: FormData): Promise<AxiosResponse> {
        const searchPath = formData.keys().map(key => `${key}=${formData.get(key)}`).toArray().join("&");
        try {
            const response = await axios.get(`${this.host}/event/search?${searchPath}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: this.defaultTimeout,
            });

            console.debug("searchEvents response =", response.data);
            return response;
        } catch (error) {
            console.log("searchEvents error =", error);
            return this.serverErrorResponse;
        }
    }

    /**
     * Get the list of all cities.
     */
    async getCities(): Promise<AxiosResponse> {
        try {
            const response = await axios.get(`${this.host}/city`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: this.defaultTimeout,
            });

            console.debug("getCities response =", response.data);
            return response;
        } catch (error) {
            console.log("getCities error =", error);
            return this.serverErrorResponse;
        }
    }
}

/**
 * Single API client for the entire app.
 */
export default new ApiClient();
