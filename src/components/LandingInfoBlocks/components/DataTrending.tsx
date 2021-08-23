import React from "react"
import {Typography} from "antd"
import clsx from "clsx"

import optimization from "../../../assets/icons/optimization.svg"
import tools from "../../../assets/icons/tools.svg"
import group_3 from "../../../assets/img/group_3.png"

import classes from "../LandingInfoBlocks.module.scss"


const {Title, Paragraph} = Typography

interface DataTrendingProps {
    dataTrendingRef?: any
}

const DataTrending: React.FC<DataTrendingProps> = ({dataTrendingRef}) => {
    return (
        <div className={clsx("d-flex", classes.info)} ref={dataTrendingRef}>
            <div className={clsx(classes.wrap, "pr-20")}>

                <div>
                    <Title className={classes.title}>Data Trending and Analytics</Title>
                    <Paragraph className={classes.description}>
                        Find out how many belt misalignments you have had on your receiving leg with the click of a
                        button.
                    </Paragraph>
                </div>

                <div className={clsx("d-flex", classes.infoFlex)}>

                    <div className={classes.infoBlock}>
                        <img src={optimization} alt="PC" className={classes.infoImg}/>

                        <Paragraph className={classes.infoDescription}>
                            On the same graph you can see which bearings have heated above the normal operating range.
                        </Paragraph>
                    </div>

                    <div className={classes.infoBlock}>
                        <img src={tools} alt="auto" className={classes.infoImg}/>

                        <Paragraph className={classes.infoDescription}>
                            Using these tools, you can analyze the alarms and pinpoint equipment that requires
                            maintenance to keep your plant running smoothly.
                        </Paragraph>
                    </div>

                </div>
            </div>

            <div className={classes.pageBlock}>
                <img src={group_3} alt="group_1" className={classes.group_3}/>
            </div>


        </div>
    )
}
export default DataTrending
