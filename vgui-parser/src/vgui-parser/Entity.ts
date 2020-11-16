import { TypeExpect } from "./checkValue";
import { fromSnakeCase } from "./util";

export class Entity {
    public name!: string
    public label!: string

    constructor(source: TypeExpect) {
        source.type("object", (v, t) => {
            t.child("name").type("string", v => this.name = v).throw()
            t.child("label").type("string", v => this.label = v).fallback(() => this.label = fromSnakeCase(this.name))
        }).throw()
    }
}