import { defineComponent } from '@vue/composition-api';

export const HelloWorld = defineComponent({
    props: {
        msg: { type: String, required: true }
    },
    setup({ msg }) {
        return () => (
            <div>{msg}</div>
        )
    }
})