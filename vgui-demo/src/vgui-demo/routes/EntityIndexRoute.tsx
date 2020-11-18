import { computed, defineComponent } from '@vue/composition-api';
import { DefinitionProvider } from '../DefinitionProvider';

export const EntityIndexRoute = defineComponent({
    props: {
        entity: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const entity = computed(() => DefinitionProvider.definition.entities[props.entity])

        return () => (
            <div class={["flex-fill", "d-flex", "flex-column", "m-2"]}>
                <b-row class={["flex-fill"]}>
                    <b-col>
                        WIP
                        </b-col>
                </b-row>
                <b-row>
                    <b-btn variant="success" to={`/entity/${props.entity}/create`}>Create</b-btn>
                </b-row>
            </div>
        )
    }
})