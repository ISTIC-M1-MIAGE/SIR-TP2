export default class City {
    constructor(
        public id: number,
        public code: number,
        public name: string,
    ) {
    }

    static fromJson(json: any): City {
        return new City(
            json.id,
            json.code,
            json.name,
        );
    }

    static fromJsonArray(jsonArray: any[]): City[] {
        return jsonArray.map(json => City.fromJson(json));
    }
}
