import { expect } from "chai"
import { readFileSync } from "fs"
import { join } from "path"
import { Attribute } from "../../src/vgui-parser/Attribute"
import { checkValue } from "../../src/vgui-parser/checkValue"
import { Definition } from "../../src/vgui-parser/Definition"
import { Entity } from "../../src/vgui-parser/Entity"
import { describeMember } from "../testUtil/describeMember"


describe("parsing", () => {
    let definition!: Definition
    before(() => {
        const definitionJSON = JSON.parse(readFileSync(join(__dirname, "definition.json")).toString())
        definition = Definition.fromSource(checkValue(definitionJSON))
    })

    describeMember(() => Definition, () => {
        it("Should have the correct label", () => {
            expect(definition.label).to.equal("Blog")
        })

        it("Should have the correct server", () => {
            expect(definition.server).to.equal("/api/v1/")
        })

        it("Should have the right entities", () => {
            expect(definition.entityList).lengthOf(2)
            expect(definition.entities).to.have.keys(["page", "post"])
        })
    })

    const entityChecks: { name: string, label: string, attributes: string[] }[] = [
        {
            name: "post",
            label: "Post",
            attributes: ["author_name", "label"]
        }, {
            name: "page",
            label: "Post Page",
            attributes: ["post", "position", "label", "content"]
        }
    ]

    describeMember(() => Entity, () => {
        for (const { name, label, attributes } of entityChecks) {
            it(`${name}: Should have the correct name`, () => {
                expect(definition.entities[name].name).to.equal(name)
            })

            it(`${name}: Should have the correct label`, () => {
                expect(definition.entities[name].label).to.equal(label)
            })

            it(`${name}: Should have the correct attributes`, () => {
                expect(definition.entities[name].attributeList).to.have.length(attributes.length)
                expect(definition.entities[name].attributes).to.have.keys(attributes)
            })
        }
    })

    const attributeChecks: { entity: string, name: string, label: string, type: Function, relatesTo?: () => Entity }[] = [
        {
            entity: "post",
            name: "author_name",
            label: "Author Name",
            type: Attribute.Types.String
        },
        {
            entity: "post",
            name: "label",
            label: "Label",
            type: Attribute.Types.String
        },
        {
            entity: "page",
            name: "position",
            label: "Position",
            type: Attribute.Types.Number
        },
        {
            entity: "page",
            name: "post",
            label: "Post",
            type: Attribute.Types.Relation.BelongsTo,
            relatesTo: () => definition.entities["post"]
        },
    ]

    describeMember(() => Attribute, () => {
        for (const { entity, name, label, type, relatesTo } of attributeChecks) {
            it(`${entity}/${name}: It should have the correct name`, () => {
                expect(definition.entities[entity].attributes[name].name).to.equal(name)
            })

            it(`${entity}/${name}: It should have the correct label`, () => {
                expect(definition.entities[entity].attributes[name].label).to.equal(label)
            })

            it(`${entity}/${name}: It should have the correct type`, () => {
                expect(definition.entities[entity].attributes[name]).be.an.instanceof(type)
            })

            if (relatesTo) {
                it(`${entity}/${name}: It should have the correct relatesToName`, () => {
                    expect((definition.entities[entity].attributes[name] as Attribute.Types.Relation).relatesToName).be.equal(relatesTo().name)
                })

                it(`${entity}/${name}: It should have the correct relatesTo`)
            }
        }
    })
})

type ConstructorResult<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;