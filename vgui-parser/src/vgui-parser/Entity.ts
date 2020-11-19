import { Attribute } from "./Attribute";
import { CheckValueChain } from "./checkValue";
import { fromSnakeCase } from "./util";

export class Entity {

    public createDefault() {
        const ret = {} as Record<string, any>

        for (const attribute of this.attributeList) {
            ret[attribute.name] = attribute.makeDefault()
        }

        return ret
    }

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

        {
            const idAttribute = new Attribute.Types.ID("id", "ID", null, true)
            attributes["id"] = idAttribute
            attributeList.push(idAttribute)
        }

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