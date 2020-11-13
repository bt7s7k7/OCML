import { defineComponent } from '@vue/composition-api';

export const Home = defineComponent({
    setup({ msg }) {
        return () => (
            <div>{msg}</div>
        )
    }
})