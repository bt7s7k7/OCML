import { computed, defineComponent } from '@vue/composition-api';
import { DefinitionProvider } from '../DefinitionProvider';

export const EntityRoute = defineComponent({
    props: {
        entity: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const entity = computed(() => DefinitionProvider.definition.entities[props.entity])

        return () => (
            <div>{entity.value.label}</div>
        )
    }
})