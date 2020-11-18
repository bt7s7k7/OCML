import { defineComponent } from '@vue/composition-api';

export const HomeRoute = defineComponent({
    setup() {
        return () => (
            <div>Select entity from the navbar</div>
        )
    }
})