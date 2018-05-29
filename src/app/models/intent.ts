import { Entity } from "./entity";

export class Intent {
    intent: string;
    texts: Array<Text>;
    responses: Array<Response>;
    created_date: Date;
    updated_date: Date;
    constructor(name: string, entities: Array<Text>,responses:Array<Response>, created_date: Date,
        updated_date: Date) {
        this.intent = name;
        this.texts = this.texts;
        this.responses  = responses;
        this.created_date = created_date;
        this.updated_date = updated_date;
    }
}
