import { expect } from "chai"
import { fromSnakeCase } from "../../src/vgui-parser/util"
import { describeMember } from "../testUtil/describeMember"

describe("util", () => {
    describeMember(() => fromSnakeCase, () => {
        for (const [source, target] of [["post", "Post"], ["post_page", "Post Page"], ["USER", "User"]]) {
            it(`Should convert "${source}" into "${target}"`, () => {
                expect(fromSnakeCase(source)).to.equal(target)
            })
        }
    })
})