import clsx from "clsx"

import classes from "../Historical.module.scss"

// const handleChangeCollum = (event: React.MouseEvent<HTMLElement>, id: number) => {
//     event.preventDefault()
//     event.stopPropagation()
//     console.log("change user:" ,id)
// }

export const columns = [
    {
        title: "DATE",
        dataIndex: "date",
        maxWidth: "8%"
    },
    {
        title: "TIME",
        dataIndex: "time",
        maxWidth: "13%"
    },
    {
        title: "ALARMED",
        dataIndex: "alarmed",
        maxWidth: "13%"
    },
]

export const mergedColumns = columns.map((col) => {
    return {
        ...col,
        onCell: () => ({
            title: col.title,
            className: clsx(classes.sitesRow, col.title === "TIME" && classes.siteRowCompany, col.title === "ALARMED" && classes.alarmed),
        }),
    }
})

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        id: i,
        key:  `EdwardKing${i}`,
        date:  "18 Mar 2021",
        time: "10:05:56 CDT",
        alarmed: "OK",
    });
}


export const tableGeneration = (data: any = []) => {
    const historicalTableData: any = []
    data.forEach((el: any) => {
        historicalTableData.push({
            id: el.id,
            key: el.id,
            date: el.date,
            time: el.time,
            alarmed: el.alarmed,
            // id: el.id,
            // key: el.id.toString(),
            // date: el.phone,
            // time: el.number,
            // alarmed: el.email,
        })
    })
    return historicalTableData
}
