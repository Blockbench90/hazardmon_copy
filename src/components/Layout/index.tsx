import React, {useEffect, useState} from "react"
import {Layout} from "antd"
import clsx from "clsx"

import HeaderComponent from "../Header";
import FooterComponent from "../Footer";
import SideBarComponent from "../SideBar";

import classes from "./Layout.module.scss"

const {Content} = Layout

interface LayoutProps {
    children: any
    isTablet: boolean
}

const LayoutComponent: React.FC<LayoutProps> = ({children, isTablet}) => {
    const [collapsed, setCollapsed] = useState<boolean>(true)

    useEffect(() => {
        setCollapsed(isTablet)
    }, [isTablet])


    const toggle = () => {
        setCollapsed(!collapsed)
    }

    return (
        <Layout className={classes.wrap}>
            <SideBarComponent collapsed={collapsed}
                              isTablet={isTablet}
                              toggle={toggle}
            />

            <Layout className={clsx("site-layout", isTablet ? classes.tablet : (collapsed) ? "mr-l-80" : "mr-l-200" )}>
                <HeaderComponent/>

                <Content>
                    <div className={clsx("site-layout-background",
                        classes.contentContainer)}>
                        {children}
                    </div>
                </Content>

                <FooterComponent/>
            </Layout>
        </Layout>
    )
}

export default LayoutComponent
