
interface Entity {
    name: string
    label?: string
    attributes: Record<string, Attribute>
}

interface Attribute {
    label?: string
    type: Type
}

type PrimitiveType = "string" | "number" | "boolean" | "code"
type Type = PrimitiveType | Relation

interface Relation {
    relation: "belongsTo",
    with: string
}

interface Definition {
    server: string,
    entities: Entity[],
    label: string
}

const def: Definition = {
    label: "Blog",
    server: "/api/v1/",
    entities: [
        {
            name: "post",
            attributes: {
                author_name: {
                    type: "string"
                },
                label: {
                    type: "string"
                }
            }
        },
        {
            name: "page",
            attributes: {
                post: {
                    type: {
                        relation: "belongsTo",
                        with: "post"
                    }
                },
                position: {
                    type: "number"
                },
                label: {
                    type: "string"
                },
                content: {
                    type: "code"
                }
            }
        }
    ]
}

require("fs").writeFileSync("definition.json", JSON.stringify(def, null, 4))