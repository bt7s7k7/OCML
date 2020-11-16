import { CheckValueChain } from "./checkValue";
import { Entity } from "./Entity";

export class Definition {
    constructor(
        public readonly server: string,
        public readonly label: string,
        public readonly entities: Record<string, Entity> = {},
        public readonly entityList: Entity[] = [],
    ) { }

    static fromSource(source: CheckValueChain) {
        let server = ""
        let label = ""
        let entities = {} as Definition["entities"]
        let entityList = [] as Definition["entityList"]

        source
            .type("object", (v, t) => {
                t.child("server").type("string", v => server = v).throw()
                t.child("label").type("string", v => label = v).throw()
                t.child("entities").type("array", (v, t) => {
                    for (let i = 0, len = v.length; i < len; i++) {
                        const entity = Entity.fromSource(t.child(i))

                        if (entity.name in entities) {
                            throw new Error(`"${t.path}": Entity "${entity.name}" already exists`)
                        }

                        entities[entity.name] = entity
                        entityList.push(entity)
                    }
                }).throw()
            })
            .throw()

        return new Definition(server, label, entities, entityList)
    }
}