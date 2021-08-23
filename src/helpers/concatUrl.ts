const removeEmpty = (obj: {}) => {
    return Object.entries(obj)
        .filter(([_, v]) => v != null)
        .reduce((acc, [k, v]) => ({...acc, [k]: v}), {})
}


export const concatUrl = (obj: {}) => {
    const clear = removeEmpty(obj)
    const url = []
    for (let key in clear) {
        if (obj.hasOwnProperty(key)) {
            // @ts-ignore
            url.push(`${key}=${obj[key]}&`)
        }
    }
    return url.join("").slice(0, -1)
}