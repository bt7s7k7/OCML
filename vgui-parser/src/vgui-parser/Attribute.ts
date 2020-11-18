import { CheckValueChain } from "./checkValue";
import { Entity } from "./Entity";
import { fromSnakeCase } from "./util";

export abstract class Attribute {
    public abstract makeDefault(): any

    constructor(
        public readonly name: string,
        public readonly label: string
    ) { }

    static fromSource(name: string, source: CheckValueChain) {
        let label = ""
        let ret: Attribute

        const parseType = (t: CheckValueChain) => {
            for (const [key, value] of Object.entries(Attribute.Types)) {
                if (value == Attribute.Types.Relation) break
                let ret = null as Attribute | null
                t = t.equal(key.replace(/^./, v => v.toLowerCase()), (v) => {
                    ret = new (value as typeof Attribute.Types.String)(name, label)
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
                    ret = new (value as typeof Attribute.Types.Relation.BelongsTo)(name, label, relatedName)
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
        export class String extends Attribute {
            public makeDefault() { return "" }
        }
        export class Number extends Attribute {
            public makeDefault() { return 0 }
        }
        export class Boolean extends Attribute {
            public makeDefault() { return false }
        }
        export class Code extends Attribute {
            public makeDefault() { return "" }
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
                public readonly relatesToName: string
            ) {
                super(name, label)
            }
        }

        export namespace Relation {
            export class BelongsTo extends Relation { }
        }
    }
}