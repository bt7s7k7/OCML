import { checkValue } from '@/vgui-parser/checkValue'
import { Definition } from '@/vgui-parser/Definition'
import definitionJSON from "@/vgui-parser/definition.json"

export namespace DefinitionProvider {
    export let definition: Definition = Definition.fromSource(checkValue(definitionJSON))
}