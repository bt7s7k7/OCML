import { expect } from "chai"
import { readFileSync } from "fs"
import { join } from "path"
import { Definition } from "../../src/vgui-parser/Definition"

it("Should be able to parse a definition", () => {
    const definitionJSON = JSON.parse(readFileSync(join(__dirname, "definition.json")).toString())

    const definition = new Definition(definitionJSON)

    expect(definition.label).to.equal("Blog")
    expect(definition.server).to.equal("/api/v1/")

    expect(definition.entityList).lengthOf(2)
    expect(definition.entities).to.have.keys(["page", "post"])

    expect(definition.entities["post"].name).to.equal("post")
    expect(definition.entities["post"].label).to.equal("Post")

    expect(definition.entities["page"].name).to.equal("page")
    expect(definition.entities["page"].label).to.equal("Post Page")
})