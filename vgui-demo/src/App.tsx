import { Component, Vue } from "vue-property-decorator";

@Component
export class App extends Vue {
    protected render() {
        return (
            <div id="app">
                <div id="nav">
                    <router-link to="/">Home</router-link>
                    <router-link to="/about">About</router-link>
                </div>
                <router-view />
            </div>
        )
    }
}