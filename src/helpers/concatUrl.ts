const removeEmpty = (obj: {}) => {
    return Object.entries(obj)
        .filter(([_, v]) => v != null)
        .filter(([_, v]) => v !== "")
        .reduce((acc, [k, v]) => ({...acc, [k]: v}), {});
};


export const concatUrl = (obj: {}) => {
    const clear = removeEmpty(obj);
    const url = [];
    for (let key in clear) {
        if (obj.hasOwnProperty(key)) {
            // @ts-ignore
            url.push(`${key}=${obj[key]}&`);
        }
    }
    return url.join("").slice(0, -1);
};

const removeEmptyValues = (obj: {}) => {
    return Object.entries(obj).filter(([_, v]) => v != null)
        .filter(([_, v]) => v !== undefined)
        .filter(([_, v]) => v !== "")
        .reduce((acc, [k, v]) => ({...acc, [k]: v}), {});
};

export const concatIds = (obj: {}) => {
    const clear = removeEmptyValues(obj);
    const ids = [];
    for (let key in clear) {
        ids.push(`${clear[key]}.`);
    }
    const uniq = Array.from(new Set(ids));
    return uniq.join("").slice(0, -1);
};