import { computed, defineComponent, ref, watch } from '@vue/composition-api';
import { Bridge } from '../Bridge';
import { AttributeView } from '../components/AttributeView';
import { DefinitionProvider } from '../DefinitionProvider';

export const EntityUpdateRoute = defineComponent({
    props: {
        entity: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: false
        }
    },
    setup(props, ctx) {
        const entity = computed(() => DefinitionProvider.definition.entities[props.entity])

        const data = ref<Record<string, any>>({})
        const busy = ref(false)
        const error = ref<null | string>(null)

        watch([props.id, entity.value], async () => {
            if (props.id) {
                busy.value = true
                try {
                    const response = await Bridge.model(entity.value.name).show(props.id)
                    data.value = response.data
                    busy.value = false
                } catch (err) {
                    error.value = err.response.data
                }
            } else {
                data.value = entity.value.createDefault()
            }
        }, { immediate: true })

        const submit = async () => {
            busy.value = true
            try {
                const result = await Bridge.model(entity.value.name).create(data.value)
                ctx.root.$router.push(`/entity/${entity.value.name}/update/${result.data.id}`)
            } catch (err) {
                error.value = err.response.data
            }
        }

        const deleteEntity = async () => {
            busy.value = true
            try {
                const result = await Bridge.model(entity.value.name).delete(props.id!)
                ctx.root.$router.push(`/entity/${entity.value.name}`)
            } catch (err) {
                error.value = err.response.data
            }
        }

        return () => error.value == null ? (
            <b-overlay show={busy.value} class={["flex-fill", "d-flex", "flex-column"]} variant="white">
                <b-form class={["flex-fill", "d-flex", "flex-column", "m-2"]} on-submit={(event: any) => { event.preventDefault(); submit() }}>
                    <b-row class={["flex-fill"]}>
                        <b-col>
                            {entity.value.attributeList.map(attribute => (
                                <AttributeView attribute={attribute} data={data} key={attribute.name} />
                            ))}
                            <pre>{JSON.stringify(data.value, undefined, 4)}</pre>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-btn type="submit" variant="success">{props.id == null ? "Create" : "Update"}</b-btn>
                            <b-btn to={`/entity/${entity.value.name}`} variant="secondary" class={["ml-2"]}>Cancel</b-btn>
                        </b-col>
                        {props.id != null && (
                            <b-col cols="auto">
                                <b-btn variant="light" class={"bg-white"} on-click={() => ctx.root.$bvModal.show("delete-confirm")}>
                                    <b-icon-trash />
                                </b-btn>

                                <b-modal id="delete-confirm" title="Confirm deletion" on-ok={() => deleteEntity()}>
                                    Do you really want to delete this {entity.value.label}?
                                </b-modal>
                            </b-col>
                        )}
                    </b-row>
                </b-form>
            </b-overlay>
        ) : (
                <iframe class={["flex-fill", "border-0"]} srcdoc={error.value} />
            )
    }
})