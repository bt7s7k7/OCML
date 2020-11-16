export interface TypeNames {
    string: string,
    number: number,
    object: Record<string, any>,
    array: any[]
}

export interface CheckValueChain {
    type<T extends keyof TypeNames>(type: T, callback: (value: TypeNames[T], expect: CheckValueChain) => void): CheckValueChain
    child(key: string | number): CheckValueChain
    throw(): void
    fallback(callback: () => void): CheckValueChain
    equal<T>(value: T, callback: (value: T) => void): CheckValueChain
    path: string,
    final: boolean
}

function finishedChain(path: string): CheckValueChain {
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
        equal() {
            return this
        },
        path,
        final: true
    }
}

export class CheckValueError extends Error { }

export function checkValue(value: any, path = "", expect = ""): CheckValueChain {
    return {
        type(type, callback) {
            if (type == "string") {
                if (typeof value == "string") {
                    (callback as (value: string, expect: CheckValueChain) => void)(value, this)
                    return finishedChain(path)
                }
            } else if (type == "array") {
                if (value instanceof Array) {
                    (callback as (value: any[], expect: CheckValueChain) => void)(value, this)
                    return finishedChain(path)
                }
            } else if (type == "object") {
                if (value instanceof Object && !(value instanceof Array)) {
                    (callback as (value: Record<string, any>, expect: CheckValueChain) => void)(value, this)
                    return finishedChain(path)
                }
            } else if (type == "number") {
                if (typeof value == "number") {
                    (callback as (value: number, expect: CheckValueChain) => void)(value, this)
                    return finishedChain(path)
                }
            }

            return checkValue(value, path, expect ? expect + " | " + type : type)
        },
        child(key): CheckValueChain {
            if (value instanceof Object) {
                return checkValue(value[key], path + (typeof key == "number" ? `[${key}]` : `.${key}`))
            } else {
                throw new CheckValueError(`"${path}": Unexpected type of value, expected an object ${expect ? ` or ${expect}` : ""}`)
            }
        },
        throw() {
            throw new CheckValueError(`"${path}": Unexpected type of value, expected: ${expect}`)
        },
        fallback(callback) {
            callback()
            return finishedChain(path)
        },
        equal(equalValue, callback) {
            if (value == equalValue) {
                callback(value)
                return finishedChain(path)
            } else {
                const type = JSON.stringify(equalValue)
                return checkValue(value, path, expect ? expect + " | " + type : type)
            }
        },
        path,
        final: false
    }
}