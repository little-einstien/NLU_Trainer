export class Entity {
    name: string;
    entity: string;
    created_date: Date;
    updated_date: Date;
    start : number;
    end :number;
    constructor(name: string,
        entity: string,
        created_date: Date,
        updated_date: Date,start : number,
        end :number){
            this.name = name;
            this.entity  = entity;
            this.updated_date = updated_date;
            this.created_date = created_date;
            this.end =end;
            this.start = start;
        }
}
