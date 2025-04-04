// Define the EventState enum
enum EventState {
    CREATED = 'CREATED',
    // Add other states as needed
}

// Event model
interface Event {
    id: number;
    title: string;
    location: string;
    description: string;
    startDate: string; // ISO format date string
    endDate: string; // ISO format date string
    state: EventState;
    closingTicketOfficeDate: string | null; // Optional date
    mainImage: string;
    currency: string;
    country: string;
    createdAt: string; // ISO format date string
}