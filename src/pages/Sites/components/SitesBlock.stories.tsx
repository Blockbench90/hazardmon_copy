import React from "react";
import {Story} from "@storybook/react";
import SitesBlock from "./SitesBlock";
import {Site} from "../../../store/branches/sites/stateTypes";


export default {
    title: "HazardMon/Sites",
    component: SitesBlock
}

const Template: Story<Site> = (args) => <SitesBlock {...args} />;

export const Sites = Template.bind({});

Sites.args = {
    title: "Crain Terminal",
    address: "09 W. Main Street State Center IA 50247 United States"
};


