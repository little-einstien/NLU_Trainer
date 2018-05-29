import { Entity } from "./entity";

export class Text {
    value : string;
    entities : Array<Entity>;
    created_date : Date;
    updated_date : Date;
    constructor(value : string,
        entities : Array<Entity>,
        created_date : Date,
        updated_date : Date){
            this.value = value;
            this.entities  = entities;
            this.created_date = created_date;
            this.updated_date  = updated_date
    }

}
