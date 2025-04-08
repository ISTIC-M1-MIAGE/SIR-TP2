enum EventState {
    CREATED = 'CREATED',
}

export default class Event {
    constructor(
        public id: number,
        public title: string,
        public location: string,
        public description: string,
        public startDate: string,
        public endDate: string,
        public state: EventState,
        public closingTicketOfficeDate: string | null,
        public mainImage: string,
        public currency: string,
        public country: string,
        public createdAt: string,
    ) {
    }

    static fromJson(json: any): Event {
        return new Event(
            json.id,
            json.title,
            json.location,
            json.description,
            json.startDate,
            json.endDate,
            json.state,
            json.closingTicketOfficeDate,
            json.mainImage,
            json.currency,
            json.country,
            json.createdAt
        );
    }

    static fromJsonArray(jsonArray: any[]): Event[] {
        return jsonArray.map(json => Event.fromJson(json));
    }

    getFormattedStartDate(): string {
        return new Date(this.startDate).toLocaleDateString();
    }
}
