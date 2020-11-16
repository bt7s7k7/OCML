import { checkValue } from "./checkValue";
import { Entity } from "./Entity";

export class Definition {
    public server!: string
    public label!: string
    public entities: Record<string, Entity> = {}
    public entityList: Entity[] = []

    constructor(definition: any) {
        checkValue(definition)
            .type("object", (v, t) => {
                t.child("server").type("string", v => this.server = v).throw()
                t.child("label").type("string", v => this.label = v).throw()
                t.child("entities").type("array", (v, t) => {
                    for (let i = 0, len = v.length; i < len; i++) {
                        const entity = new Entity(t.child(i))

                        if (entity.name in this.entities) {
                            throw new Error(`"${t.path}": Entity "${entity.name}" already exists`)
                        }

                        this.entities[entity.name] = entity
                        this.entityList.push(entity)
                    }
                }).throw()
            })
            .throw()
    }
}