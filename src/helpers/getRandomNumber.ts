export const randomInteger = (min: number, max: number) => {
    // random number after min before (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}
