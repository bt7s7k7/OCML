export namespace InputTypes {
    export interface Entity {
        name: string
        label?: string
        attributes: Record<string, Attribute>
    }

    export interface Attribute {
        label?: string
        type: Type
    }

    export type PrimitiveType = "string" | "number" | "boolean" | "code"
    export type Type = PrimitiveType | Relation

    export interface Relation {
        relation: "belongsTo",
        with: string
    }

    export interface Definition {
        server: string,
        entities: Entity[],
        label: string
    }
}