enum EventState {
    CREATED = 'CREATED',
}

export default class Event {
    constructor(
        public id: number,
        public title: string,
        public location: string,
        public description: string,
        public startDate: Date,
        public endDate: Date,
        public state: EventState,
        public closingTicketOfficeDate: Date | undefined,
        public mainImage: string,
        public currency: string,
        public country: string,
        public createdAt: Date,
    ) {
    }

    static fromJson(json: any): Event {
        return new Event(
            json.id,
            json.title,
            json.location,
            json.description,
            new Date(json.startDate),
            new Date(json.endDate),
            json.state,
            json.closingTicketOfficeDate,
            json.mainImage,
            json.currency,
            json.country,
            new Date(json.createdAt)
        );
    }

    static fromJsonArray(jsonArray: any[]): Event[] {
        return jsonArray.map(json => Event.fromJson(json));
    }
}
