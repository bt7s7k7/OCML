import { CheckValueChain } from "./checkValue";
import { Entity } from "./Entity";
import { fromSnakeCase } from "./util";

export abstract class Attribute {
    public abstract makeDefault(): any

    constructor(
        public readonly name: string,
        public readonly label: string,
        public readonly defaultValue: any,
        public readonly isColumn: boolean
    ) { }

    static fromSource(name: string, source: CheckValueChain) {
        let label = ""
        let ret: Attribute
        let defaultValue = null as null | any
        let isColumn = false

        const parseType = (t: CheckValueChain) => {
            for (const [key, value] of Object.entries(Attribute.Types)) {
                if (value == Attribute.Types.Relation) break
                let ret = null as Attribute | null
                t = t.equal(key.replace(/^./, v => v.toLowerCase()), (v) => {
                    ret = new (value as typeof Attribute.Types.String)(name, label, defaultValue, isColumn)
                })

                if (ret) return ret
            }

            throw t.throw()
        }

        const parseRelation = (relatedName: string, t: CheckValueChain) => {
            for (const [key, value] of Object.entries(Attribute.Types.Relation)) {
                if (key[0] != key[0].toUpperCase()) break
                let ret = null as Attribute | null
                t = t.equal(key.replace(/^./, v => v.toLowerCase()), (v) => {
                    ret = new (value as typeof Attribute.Types.Relation.BelongsTo)(name, label, defaultValue, isColumn, relatedName)
                })

                if (ret) return ret
            }

            throw t.throw()
        }

        source
            .type("string", (v, t) => {
                label = fromSnakeCase(name)
                ret = parseType(t)
            })
            .type("object", (v, t) => {
                t.child("label").type("string", v => label = v).fallback(() => label = fromSnakeCase(name))
                t.child("defaultValue").type("string", v => defaultValue = v)
                t.child("isColumn").type("boolean", v => isColumn = v)
                t.child("type")
                    .type("string", (v, t) => {
                        ret = parseType(t)
                    })
                    .type("object", (v, t) => {
                        let relatedName = ""
                        t.child("with").type("string", v => relatedName = v).throw()
                        ret = parseRelation(relatedName, t.child("relation"))
                    })
                    .throw()
            })
            .throw()

        if (!ret!) throw new Error("Exiting fromSource without a return value set, we should have thrown before this")
        return ret!
    }
}


export namespace Attribute {
    export namespace Types {
        export class ID extends Attribute {
            public makeDefault() { return "N/A" }
        }
        export class String extends Attribute {
            public makeDefault() { return typeof this.defaultValue == "string" ? this.defaultValue : "" }
        }
        export class Number extends Attribute {
            public makeDefault() { return typeof this.defaultValue == "number" ? this.defaultValue : 0 }
        }
        export class Boolean extends Attribute {
            public makeDefault() { return typeof this.defaultValue == "boolean" ? this.defaultValue : false }
        }
        export class Code extends Attribute {
            public makeDefault() { return typeof this.defaultValue == "string" ? this.defaultValue : "" }
        }

        export abstract class Relation extends Attribute {
            public get relatesTo() {
                if (this.relatesToRef) return this.relatesToRef
                else throw new Error("Relation was not initialized yet")
            }

            public init(relatesTo: Entity) {
                this.relatesToRef = relatesTo
                this.init = () => { throw new Error("Relation was initialized already") }
            }

            public makeDefault() {
                return null
            }

            protected relatesToRef: Entity | null = null

            constructor(
                name: string,
                label: string,
                defaultValue: any,
                isColumn: boolean,
                public readonly relatesToName: string,
                public readonly fieldName: string = name + "_id"
            ) {
                super(name, label, defaultValue, isColumn)
            }
        }

        export namespace Relation {
            export class BelongsTo extends Relation { }
        }
    }
}