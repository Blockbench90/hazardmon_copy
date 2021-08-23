import React from "react"
import clsx from "clsx"

import styles from "./Button.module.scss"

const colors = {
    green: styles.buttonGreen,
    gray: styles.buttonGray,
    red: styles.buttonRed,
    client: styles.buttonGrayClient
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
    borderRadius?: string
    htmlType?: "submit" | "button" | "reset"
}

export const CustomButton: React.FC<ButtonProps> = ({
                                                        children,
                                                        disabled,
                                                        color,
                                                        onClick,
                                                        className,
                                                        fontSize,
                                                        height = "50px",
                                                        width = "150px",
                                                        padding,
                                                        borderRadius,
                                                        htmlType = "submit"
                                                    }) => {
    return (
        <button
            onClick={onClick}
            type={htmlType}
            style={{
                width: `${width}`,
                height: `${height}`,
                padding: `${padding}`,
                fontSize: `${fontSize}`,
                borderRadius: `${borderRadius}`
            }}
            className={clsx(className, styles.button, colors[color])}
            disabled={disabled}>
            {children}
        </button>
    )
}
