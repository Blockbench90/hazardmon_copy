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

export const concatIds = (obj: {}) => {
    const clear = removeEmpty(obj);
    const url = [];
    for (let key in clear) {
        url.push(`${clear[key]}.`);
    }
    return url.join("").slice(0, -1);
};