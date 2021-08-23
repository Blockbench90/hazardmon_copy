import React from "react";
import {Story} from "@storybook/react";
import {CustomButton} from "./index";
import styles from "./Button.module.scss";
import {action} from "@storybook/addon-actions";


export default {
    title: "HazardMon/Button",
    component: CustomButton
}

const colors = {
    green: styles.buttonGreen,
    gray: styles.buttonGray,
    red: styles.buttonRed
}

interface ButtonProps {
    disabled?: boolean
    color?: keyof typeof colors
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    className?: string
    height?: string
    width?: string
    padding?: string
    fontSize?: string
    children?: string
    htmlType?: "submit" | "button" | "reset"
}

const Template: Story<ButtonProps> = (args) => <CustomButton {...args} />;

const props = {
    onClick: action("button clicked"),
    width: "200px",

}

export const PrimaryGreen = Template.bind({});

PrimaryGreen.args = {
    ...props,
    children: "PRIMARY GREEN",
    color: "green"
};

export const PrimaryGray = Template.bind({});

PrimaryGray.args ={
    ...props,
    children: "GRAY",
    color: "gray"
}

export const PrimaryRed = Template.bind({});

PrimaryRed.args ={
    ...props,
    children: "RED",
    color: "red"
}

