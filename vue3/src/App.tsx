import { defineComponent } from 'vue'
import logo from "./assets/logo.png"
import { HelloWorld } from "./components/HelloWorld"

export const App = defineComponent({
    setup({ }) {
        return () => (
            <>
                <img alt="Vue logo" src={logo} />
                <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
            </>
        )
    }
})