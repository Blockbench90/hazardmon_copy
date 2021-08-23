import React from "react";
import {Story} from "@storybook/react";
import {AddNewBlock} from "./index";
import {action} from "@storybook/addon-actions";

export default {
    title: "HazardMon/Add New Site",
    component: AddNewBlock
}

interface AddNewBlockProps {
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
    text?: string
}

const Template: Story<AddNewBlockProps> = (args) => <AddNewBlock {...args} />;

const props = {
    onClick: action("button clicked"),
    text: "Add New Site"
}

export const AddNew = Template.bind({});

AddNew.args = {
    ...props,
};
