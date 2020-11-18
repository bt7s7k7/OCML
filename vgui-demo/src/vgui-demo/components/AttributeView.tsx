import { Attribute } from '@/vgui-parser/Attribute'
import { defineComponent, PropType, Ref } from '@vue/composition-api'

const viewByType = new Map<Function, (attribute: Attribute, data: Ref<any>) => JSX.Element>([
    [Attribute.Types.String, (attribute, data) => {
        return (
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
        return (
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
        return (
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
    }]
])

export const AttributeView = defineComponent({
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
        return () => (
            viewByType.get(props.attribute.constructor)?.(props.attribute, props.data)
            ?? <pre>[<b>ERR</b>] View for type {props.attribute.constructor.name} not defined</pre>
        )
    }
})