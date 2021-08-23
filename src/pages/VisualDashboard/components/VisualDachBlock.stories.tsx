import React, { ReactNode } from "react";
import {Story} from "@storybook/react";
import VisualDashboard from "../index";



export default {
    title: "HazardMon/VisualDashboard",
    component: VisualDashboard
}
interface VisualDashboardProps {
    title?: string
    timestamp?: string
    userRole?: string
    isPublished?: boolean
    children?: ReactNode
}

const Template: Story<VisualDashboardProps> = (args) => <VisualDashboard {...args} />;

export const VisualDashboardBlock = Template.bind({});

VisualDashboardBlock.args = {
    title: "4B Demo",
    timestamp: "10/12/2013 17:34:53",
    userRole: "admin",
    isPublished: false
};


