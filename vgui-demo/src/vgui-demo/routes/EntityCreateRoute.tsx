import { computed, defineComponent, ref, watch } from '@vue/composition-api';
import { AttributeView } from '../components/AttributeView';
import { DefinitionProvider } from '../DefinitionProvider';

export const EntityCreateRoute = defineComponent({
    props: {
        entity: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const entity = computed(() => DefinitionProvider.definition.entities[props.entity])

        const data = ref<Record<string, any>>({})
        watch(() => entity.value, () => {
            data.value = entity.value.createDefault()
        }, { immediate: true })
        return () => (
            <div class={["flex-fill", "d-flex", "flex-column", "m-2"]}>
                <b-row class={["flex-fill"]}>
                    <b-col>
                        {entity.value.attributeList.map(attribute => (
                            <AttributeView attribute={attribute} data={data} key={attribute.name} />
                        ))}
                        <pre>{JSON.stringify(data.value, undefined, 4)}</pre>
                    </b-col>
                </b-row>
                <b-row>
                    <b-btn variant="success">Create</b-btn>
                    <b-btn variant="secondary" class={["ml-2"]}>Cancel</b-btn>
                </b-row>
            </div>
        )
    }
})