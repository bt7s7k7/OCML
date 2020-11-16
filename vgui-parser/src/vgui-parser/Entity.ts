import { Attribute } from "./Attribute";
import { CheckValueChain } from "./checkValue";
import { fromSnakeCase } from "./util";

export class Entity {



    constructor(
        public readonly name: string,
        public readonly label: string,
        public readonly attributes: Record<string, Attribute> = {},
        public readonly attributeList: Attribute[] = [],
    ) { }

    static fromSource(source: CheckValueChain) {
        let name = ""
        let label = ""
        let attributes = {} as Entity["attributes"]
        let attributeList = [] as Entity["attributeList"]

        source.type("object", (v, t) => {
            t.child("name").type("string", v => name = v).throw()
            t.child("label").type("string", v => label = v).fallback(() => label = fromSnakeCase(name))
            t.child("attributes").type("object", (v, t) => {
                for (const attributeName of Object.keys(v)) {
                    const attribute = Attribute.fromSource(attributeName, t.child(attributeName))

                    if (attribute.name in attributes) {
                        throw new Error(`"${t.path}": Attribute "${attribute.name}" already exists`)
                    }

                    attributes[attribute.name] = attribute
                    attributeList.push(attribute)
                }
            }).throw()
        }).throw()

        return new Entity(name, label, attributes, attributeList)
    }
}