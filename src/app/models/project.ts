import { JsonObject, JsonProperty } from "json2typescript";
export class Project {
  @JsonProperty("name", String)
  name: string;
  @JsonProperty("created_date", Date)
  created_date: Date;
  @JsonProperty("updated_date", Date)
  updated_date: Date;
  @JsonProperty("status", Number)
  status: number;
  @JsonProperty("id", String)
  id: string;
  constructor(name: string,
    status: number,
    id: string,
    created_date?: Date,
    updated_date?: Date
    ) {
    this.name = name;
    this.created_date = created_date;
    this.updated_date = updated_date;
    this.status = status;
    this.id = id;
  }
}
