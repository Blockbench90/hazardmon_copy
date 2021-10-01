import React from "react";
import {Typography} from "antd";
import {BookOutlined, BulbOutlined, PieChartOutlined} from "@ant-design/icons";
import {useHistory} from "react-router-dom";

import {
    OEM_PAGE_CSS,
    OEM_SETTING_CONTACTS,
    OEM_SETTING_RSS_EDIT,
} from "../../components/PrivateRoute/components/constants";
import {CustomButton} from "../../components/Button";
import BlockWrap from "./components/RSSEdit/BlockWrap";

import classes from "./OEMSetting.module.scss";

const {Title} = Typography;


const OEMSetting: React.FC = () => {
    const history = useHistory()

    const handleEditFields = () => {
        history.push(OEM_SETTING_RSS_EDIT)
    };

    const handleSupportContacts = () => {
        history.push(OEM_SETTING_CONTACTS)
    };
    const handlePageCss = () => {
        history.push(OEM_PAGE_CSS)
    };

    return (
        <div className={classes.wrapper}>
            <Title level={2}>OEM Setting</Title>
            <Title level={4}>Configure OEM Settings for the whole site.</Title>

            <div className={classes.container}>

                <BlockWrap title="RSS Feeds"
                           description="Add an RSS feed, which everyone can view on the sidebar"
                           node={
                               <CustomButton width="150px"
                                             padding="0"
                                             height="40px"
                                             htmlType="button"
                                             onClick={handleEditFields}
                               >
                                   <PieChartOutlined/> Edit Fields
                               </CustomButton>
                           }
                />

                <BlockWrap title="Static Pages and CSS"
                           description="Add static pages the site. Links to these pages are added at the bottom of the page"
                           node={
                               <CustomButton width="250px"
                                             padding="0"
                                             height="40px"
                                             htmlType="button"
                                             onClick={handlePageCss}
                               >
                                   <BookOutlined/> Static Pages and CSS Settings
                               </CustomButton>
                           }
                />

                <BlockWrap title="Support Contacts"
                           description="Change support phone number, email address or postal address."
                           node={
                               <CustomButton width="150px"
                                             padding="0"
                                             height="40px"
                                             htmlType="button"
                                             onClick={handleSupportContacts}
                               >
                                   <BulbOutlined/> Contact Settings
                               </CustomButton>
                           }
                />
            </div>
        </div>
    );
};
export default OEMSetting;
