import { defineComponent } from '@vue/composition-api';
import { Navbar } from './components/Navbar';

export const App = defineComponent({
    setup() {
        return () => (
            <div>
                <Navbar />
                <b-container>
                    <router-view />
                </b-container>
            </div>
        )
    }
})