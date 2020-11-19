import Axios from 'axios'
import { DefinitionProvider } from './DefinitionProvider'

export namespace Bridge {
    export function model(name: string) {
        const definition = DefinitionProvider.definition
        const prefix = definition.server + name + "s"

        return {
            async create(data: any) {
                return await Axios.post<EntityBase>(prefix, data)
            },
            async update(data: any) {
                return await Axios.patch<EntityBase>(prefix + "/" + data.id, data)
            },
            async index() {
                return await Axios.get<EntityBase[]>(prefix)
            },
            async show(id: string) {
                return await Axios.get<EntityBase>(prefix + "/" + id)
            },
            async delete(id: string) {
                return await Axios.delete(prefix + "/" + id)
            }
        }
    }
}

export interface EntityBase {
    id: string,
    [index: string]: any
}