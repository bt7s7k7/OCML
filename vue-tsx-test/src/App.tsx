import { Component, Vue } from "vue-property-decorator";
import { HelloWorld } from "./components/HelloWorld";

@Component
export class App extends Vue {
    protected render() {
        return (
            <div id="app">
                <img alt="Vue logo" src="./assets/logo.png" />
                <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
            </div>
        )
    }
}