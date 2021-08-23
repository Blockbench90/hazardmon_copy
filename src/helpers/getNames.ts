export const getFirstName = (full_name: string) => {
    if(full_name === " "){
        return ""
    }
    return full_name.split(" ")[0]
}

export const getLastName = (full_name: string) => {
    if(full_name === " "){
        return ""
    }
    const last_name = full_name.split(" ").slice(1).join(" ")
    return last_name
}