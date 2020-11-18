import { computed, defineComponent } from '@vue/composition-api';
import { DefinitionProvider } from '../DefinitionProvider';

export const Navbar = defineComponent({
    setup(props, context) {
        const definition = computed(() => DefinitionProvider.definition)
        const currentRoute = computed(() => context.root.$route)

        return () => (
            <b-navbar type="dark" variant="dark">
                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        {definition.value.entityList.map(entity => {
                            const route = `/entity/${entity.name}`;
                            return <b-nav-item to={route} key={entity.name} active={currentRoute.value.fullPath == route}>{entity.label}</b-nav-item>
                        })}
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        )
    }
})