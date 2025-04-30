export default class User {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public phone: string,
        public isAdmin: boolean,
    ) {
    }

    static fromJson(json: any): User {
        return new User(
            json.id,
            json.firstName,
            json.lastName,
            json.email,
            json.phone,
            json.isAdmin,
        );
    }

    static fromJsonArray(jsonArray: any[]): User[] {
        return jsonArray.map(json => User.fromJson(json));
    }
}