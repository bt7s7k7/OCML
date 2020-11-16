export function fromSnakeCase(source: string) {
    return source.toLowerCase().replace(/^.|_./g, (s) => (s.length == 1 ? s : " " + s[1]).toUpperCase())
}