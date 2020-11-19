import { Attribute } from '@/vgui-parser/Attribute'
import { defineComponent, PropType, ref, Ref, watch } from '@vue/composition-api'
// @ts-ignore
import { BasicSelect } from "vue-search-select"
import { Bridge, EntityBase } from '../Bridge'

const viewByType = new Map<Function, (attribute: Attribute, data: Ref<any>) => (() => JSX.Element)>([
    [Attribute.Types.ID, (attribute, data) => {
        return () => (
            <b-form-group
                label={attribute.label}
                label-for={attribute.name}
            >
                <b-form-input
                    id={attribute.name}
                    value={data.value[attribute.name]}
                    readonly
                    required
                ></b-form-input>
            </b-form-group>
        )
    }],
    [Attribute.Types.String, (attribute, data) => {
        return () => (
            <b-form-group
                label={attribute.label}
                label-for={attribute.name}
            >
                <b-form-input
                    id={attribute.name}
                    value={data.value[attribute.name]}
                    onInput={(value: string) => data.value[attribute.name] = value}
                    required
                ></b-form-input>
            </b-form-group>
        )
    }],
    [Attribute.Types.Number, (attribute, data) => {
        return () => (
            <b-form-group
                label={attribute.label}
                label-for={attribute.name}
            >
                <b-form-input
                    id={attribute.name}
                    value={data.value[attribute.name]}
                    onInput={(value: string) => data.value[attribute.name] = +value}
                    type="number"
                    required
                ></b-form-input>
            </b-form-group>
        )
    }],
    [Attribute.Types.Code, (attribute, data) => {
        return () => (
            <b-form-group
                label={attribute.label}
                label-for={attribute.name}
            >
                <b-form-textarea
                    id={attribute.name}
                    value={data.value[attribute.name]}
                    onInput={(value: string) => data.value[attribute.name] = value}
                    no-resize
                    rows={3}
                    max-rows={10}
                    class={["text-monospace"]}
                    required
                ></b-form-textarea>
            </b-form-group>
        )
    }],
    [Attribute.Types.Relation.BelongsTo, (attribute, data) => {
        if (!(attribute instanceof Attribute.Types.Relation)) throw new Error()
        const createOption = (entity: EntityBase) => ({ key: entity.id, text: entity.label ?? entity.name ?? entity.id })
        type Option = ReturnType<typeof createOption>
        const selected = ref<Option>(data.value[attribute.name] ? createOption(data.value[attribute.name]) : { key: "", text: "" })
        const options = ref<Option[]>(selected.value ? [selected.value] : [])

        console.log(selected)

        watch(() => data.value[attribute.name], (value) => {
            selected.value = createOption(value)

            options.value.length == 0 && (options.value = [selected.value!])
        })

        Bridge.model(attribute.relatesToName).index().then(entities => {
            options.value = entities.data.map(v => createOption(v))
        })

        return () => (
            <b-form-group
                label={attribute.label}
                label-for={attribute.name}
            >
                <BasicSelect
                    options={options.value}
                    selected-option={selected.value}
                    onSelect={(newSelected: Option) => {
                        selected.value = newSelected
                        data.value[attribute.fieldName] = newSelected.key
                    }}
                />
            </b-form-group>
        )
    }]
])

export const AttributeView = defineComponent({
    name: "AttributeView",
    props: {
        attribute: {
            type: Object as PropType<Attribute>,
            required: true
        },
        data: {
            type: Object as PropType<Ref<any>>,
            required: true
        }
    },
    setup(props, ctx) {
        const view = viewByType.get(props.attribute.constructor)?.(props.attribute, props.data)

        return view ?? (() => (
            <pre>[<span class="text-danger">ERR</span>] View for type {props.attribute.constructor.name} not defined</pre>
        ))
    }
})