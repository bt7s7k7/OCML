export interface TypeNames {
    string: string,
    number: number,
    object: Record<string, any>,
    array: any[]
}

export interface TypeExpect {
    type<T extends keyof TypeNames>(type: T, callback: (value: TypeNames[T], expect: TypeExpect) => void): TypeExpect
    child(key: string | number): TypeExpect
    throw(): void,
    fallback(callback: () => void): TypeExpect
    path: string
}

function finishedChain(path: string): TypeExpect {
    return {
        type() {
            return this
        },
        child() {
            return this
        },
        throw() {
            return this
        },
        fallback() {
            return this
        },
        path
    }
}

export class CheckValueError extends Error { }

export function checkValue(value: any, path = "", expect = ""): TypeExpect {
    return {
        type(type, callback) {
            if (type == "string") {
                if (typeof value == "string") {
                    (callback as (value: string, expect: TypeExpect) => void)(value, this)
                    return finishedChain(path)
                }
            } else if (type == "array") {
                if (value instanceof Array) {
                    (callback as (value: any[], expect: TypeExpect) => void)(value, this)
                    return finishedChain(path)
                }
            } else if (type == "object") {
                if (value instanceof Object && !(value instanceof Array)) {
                    (callback as (value: Record<string, any>, expect: TypeExpect) => void)(value, this)
                    return finishedChain(path)
                }
            } else if (type == "number") {
                if (typeof value == "number") {
                    (callback as (value: number, expect: TypeExpect) => void)(value, this)
                    return finishedChain(path)
                }
            }

            return checkValue(value, path, expect ? expect + " | " + type : type)
        },
        child(key): TypeExpect {
            if (value instanceof Object) {
                return checkValue(value[key], path + (typeof key == "number" ? `[${key}]` : `.${key}`))
            } else {
                throw new CheckValueError(`"${path}": Invalid type, expected an object ${expect ? ` or ${expect}` : ""}`)
            }
        },
        throw() {
            throw new CheckValueError(`"${path}": Invalid type, expected: ${expect}`)
        },
        fallback(callback) {
            callback()
            return finishedChain(path)
        },
        path
    }
}