import { defineComponent } from '@vue/composition-api';
import { Navbar } from './components/Navbar';

export const App = defineComponent({
    setup() {
        return () => (
            <div class={["vh-100", "d-flex", "flex-column"]}>
                <Navbar />
                <b-container fluid class={["d-flex", "flex-column", "flex-fill"]}>
                    <router-view />
                </b-container>
            </div>
        )
    }
})