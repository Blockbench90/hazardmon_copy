export const getCorrectDate = (date: string) => {
    const dataArray = new Date(date).toUTCString().split(" ");

    return `${dataArray[1]} ${dataArray[2]} ${dataArray[3]}`;
};
