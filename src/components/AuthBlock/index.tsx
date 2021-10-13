import React, {useState} from "react"
import {Tabs} from "antd"

import {ReactComponent as Register} from "../../assets/icons/register.svg"
import {ReactComponent as Login} from "../../assets/icons/login.svg"

import RegisterForm from "../RegisterBlock"
import LoginForm from "../LoginBlock"

import classes from "./AuthBlock.module.scss"

const {TabPane} = Tabs

interface AuthProps {
    isRegister: boolean
    onRegister: (isRegister: boolean) => void
}

const AuthBlock: React.FC<AuthProps> = ({isRegister, onRegister}) => {
    const [active, setActive] = useState<boolean>(true)

    const onChangeTab = () => {
        setActive(!active)
        onRegister(!isRegister)
    }

    return (
        <div className={classes.wrap}>
            <Tabs activeKey={isRegister ? "2" : "1"}
                  className={classes.tabs}
                  onChange={onChangeTab}
            >
                <TabPane className={classes.tab}
                         tab={
                             <div className={classes.tabTitleWrap}>
                                 <Register/>
                                 <span className={classes.title}>Register</span>
                             </div>
                         }
                         key="1"
                >
                    <RegisterForm/>
                </TabPane>

                <TabPane className={classes.tab}
                         tab={
                             <div className={classes.tabTitleWrap}>
                                 <Login/>
                                 <span className={classes.title}>Login</span>
                             </div>
                         }
                         key="2"
                >
                    <LoginForm/>
                </TabPane>
            </Tabs>
        </div>
    )
}
export default AuthBlock
