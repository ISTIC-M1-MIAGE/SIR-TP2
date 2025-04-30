
export default class Pass{
    constructor(
        public id: number,
        public name: string,
        public eventId: number,
        public price: number,
        public advantages: string,
    ) {
    }

    static fromJson(json: any): Pass {
        return new Pass(
            json.id,
            json.name,
            json.eventId,
            json.price,
            json.advantages,
        );
    }

    static fromJsonArray(jsonArray: any[]): Pass[] {
        return jsonArray.map(json => Pass.fromJson(json));
    }
}