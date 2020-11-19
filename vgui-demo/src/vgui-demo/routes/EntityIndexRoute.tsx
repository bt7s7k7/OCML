import { computed, defineComponent } from '@vue/composition-api';
import { Bridge } from '../Bridge';
import { DefinitionProvider } from '../DefinitionProvider';

export const EntityIndexRoute = defineComponent({
    props: {
        entity: {
            type: String,
            required: true
        }
    },
    setup(props, ctx) {
        const entity = computed(() => DefinitionProvider.definition.entities[props.entity])


        return () => (
            <div class={["flex-fill", "d-flex", "flex-column", "m-2"]}>
                <b-row class={["flex-fill"]}>
                    <b-col>
                        <b-table
                            fields={entity.value.attributeList.filter(v => v.isColumn).map(v => ({ key: v.name, label: v.label, sortable: true }))}
                            items={async () => Bridge.model(entity.value.name).index().then(v => v.data)}
                            primary-key="id"
                            hover
                            show-empty
                            on-row-clicked={({ id }: { id: string }) => ctx.root.$router.push(`/entity/${entity.value.name}/update/${id}`)}
                        />
                    </b-col>
                </b-row>
                <b-row>
                    <b-btn variant="success" to={`/entity/${props.entity}/create`}>Create</b-btn>
                </b-row>
            </div>
        )
    }
})