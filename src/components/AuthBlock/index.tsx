import React, {useState} from "react";
import {Tabs} from "antd";

import {ReactComponent as Register} from "../../assets/icons/register.svg";
import {ReactComponent as Login} from "../../assets/icons/login.svg";

import RegisterForm from "../RegisterBlock";
import LoginForm from "../LoginBlock";

import classes from "./AuthBlock.module.scss";

const {TabPane} = Tabs;

interface AuthProps {
    isRegister: boolean
    onRegister: (isRegister: boolean) => void
}

const AuthBlock: React.FC<AuthProps> = ({isRegister, onRegister}) => {
    const [active, setActive] = useState<boolean>(true);

    const onChangeTab = () => {
        setActive(!active);
        onRegister(!isRegister);
    };

    return (
        <div className={classes.authBlockWrap}>
            <Tabs activeKey={isRegister ? "2" : "1"}
                  className={classes.authBlockTabs}
                  onChange={onChangeTab}
            >
                <TabPane className={classes.authBlockTab}
                         tab={
                             <div className={classes.authBlockTabTitleWrap}>
                                 <Register/>
                                 <span className={classes.authBlockTabTitle}>Register</span>
                             </div>
                         }
                         key="1"
                >
                    <div className={classes.authBlockFormWrap}>
                        <RegisterForm/>
                    </div>
                </TabPane>

                <TabPane className={classes.authBlockTab}
                         tab={
                             <div className={classes.authBlockTabTitleWrap}>
                                 <Login/>
                                 <span className={classes.authBlockTabTitle}>Login</span>
                             </div>
                         }
                         key="2"
                >
                    <div className={classes.authBlockFormWrap}>
                        <LoginForm/>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    );
};
export default AuthBlock;
