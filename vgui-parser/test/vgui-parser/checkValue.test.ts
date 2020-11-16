import { fail } from "assert"
import { expect } from "chai"
import { checkValue, CheckValueError } from "../../src/vgui-parser/checkValue"
import { tracker } from "../testUtil/tracker"

describe("checkValue()", () => {
    it("Should trigger the correct type callback", () => {
        const triggerTracker = tracker("triggerTracker")
        checkValue("foo")
            .type("object", () => fail("Wrong callback triggered"))
            .type("string", (v) => {
                expect(v).to.equal("foo")
                triggerTracker.trigger()
            })
            .type("number", () => fail("Wrong callback triggered"))
            .throw()

        triggerTracker.check()
    })

    it("Should throw an error on wrong type", () => {
        expect(() => {
            checkValue("foo")
                .type("object", () => fail("Wrong callback triggered"))
                .type("number", () => fail("Wrong callback triggered"))
                .throw()
        }).to.throw(CheckValueError)
    })

    it("Should throw an error when getting child of not object", () => {
        expect(() => {
            checkValue(null)
                .child("name")
        }).to.throw(CheckValueError)
    })

    it("Should throw an error when a child does not exist", () => {
        expect(() => {
            checkValue({ label: "Foo" })
                .child("name")
                .throw()
        }).to.throw(CheckValueError)
    })

    it("Should be able to check the type of the child", () => {
        const triggerTracker = tracker("triggerTracker")

        checkValue({ name: "Foo" })
            .child("name")
            .type("string", v => {
                expect(v).to.equal("Foo")
                triggerTracker.trigger()
            }).throw()

        triggerTracker.check()
    })
})