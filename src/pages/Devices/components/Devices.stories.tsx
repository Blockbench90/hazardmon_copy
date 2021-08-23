import React from "react";
import {Story} from "@storybook/react";
import DevicesBlock from "./DevicesBlock";
import {Device} from "../../../store/branches/devices/stateTypes";

export default {
    title: "HazardMon/Devices",
    component: DevicesBlock
}

const Template: Story<Device> = (args) => <DevicesBlock {...args} />;

export const Devices = Template.bind({});

Devices.args = {
    title: "E-Mond",
    is_online: true,
};


