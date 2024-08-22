const getColorsTuple = (hexColor) => {
    return Array.from(
        { length: 10 },
        (_, index) => hexColor,
    );
};

export const EXTENDED_COLOR = {
    accent3a: "#FFD8BF",
    accent4a: "#69C0FF",
    accent5a: "#B7EB8F",
    accent6a: "#FFA39E",
    accent8a: "#D4B106",

    gray1: "#6F6F6F",
    gray2: "#EBEBEB",
    gray3: "#FCFCFC",
    gray4: "#C7C7C7",
    gray5: "#D9D9D9",

    white: "#FFFFFF",
    black: "#212121",

    accent1: "#EDE9FE",
    accent2: "#5746AF",
    accent3: "#FF7A45",
    accent4: "#1890FF",
    accent5: "#52C41A",
    accent6: "#F5222D",
    accent7: "#FFA940",
    accent8: "#FFFB8F",
    accent9: "#FA8C16",

    bluePrimary: "#11629A",
    secondaryBlue: "#CDEBFF",

    limePrimary: "#A0D911",
};

export const extendedColor = {
    accent3a: getColorsTuple(EXTENDED_COLOR.accent3a),
    accent4a: getColorsTuple(EXTENDED_COLOR.accent4a),
    accent5a: getColorsTuple(EXTENDED_COLOR.accent5a),
    accent6a: getColorsTuple(EXTENDED_COLOR.accent6a),
    accent8a: getColorsTuple(EXTENDED_COLOR.accent8a),

    gray1: getColorsTuple(EXTENDED_COLOR.gray1),
    gray2: getColorsTuple(EXTENDED_COLOR.gray2),
    gray3: getColorsTuple(EXTENDED_COLOR.gray3),
    gray4: getColorsTuple(EXTENDED_COLOR.gray4),
    gray5: getColorsTuple(EXTENDED_COLOR.gray5),

    white: getColorsTuple(EXTENDED_COLOR.white),
    black: getColorsTuple(EXTENDED_COLOR.black),

    accent1: getColorsTuple(EXTENDED_COLOR.secondaryBlue),
    accent2: getColorsTuple(EXTENDED_COLOR.bluePrimary),
    accent3: getColorsTuple(EXTENDED_COLOR.accent3),
    accent4: getColorsTuple(EXTENDED_COLOR.accent4),
    accent5: getColorsTuple(EXTENDED_COLOR.accent5),
    accent6: getColorsTuple(EXTENDED_COLOR.accent6),
    accent7: getColorsTuple(EXTENDED_COLOR.accent7),
    accent8: getColorsTuple(EXTENDED_COLOR.accent8),
    accent9: getColorsTuple(EXTENDED_COLOR.accent9),

    bluePrimary: getColorsTuple(EXTENDED_COLOR.bluePrimary),
    secondaryBlue: getColorsTuple(EXTENDED_COLOR.secondaryBlue),

    limePrimary: getColorsTuple(EXTENDED_COLOR.limePrimary),
}

const labelInputStyles = {
    styles: {
        label: {
            fontWeight: "normal",
            marginBottom: "8px",
            color: EXTENDED_COLOR.black,
        },
    },
};

export const mantineProviderProps = {
    theme: {
        components: {
            PasswordInput: labelInputStyles,
            Select: labelInputStyles,
            TextInput: labelInputStyles,
            MultiSelect: labelInputStyles,
            Textarea: labelInputStyles,
            DatePickerInput: labelInputStyles,
            TimeInput: labelInputStyles,
            Button: {
                defaultProps: {
                    fw: "normal",
                    color: "bluePrimary",
                },
            },
        },
        colors: extendedColor,
        fontFamily: "Roboto, sans-serif",
        headings: { fontFamily: "Roboto, sans-serif" },
    },
};