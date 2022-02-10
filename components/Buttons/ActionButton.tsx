import {Button, Flex, Input} from "@chakra-ui/react";
import ButtonStylePicker from "../../helpers/ButtonStylePicker";

type Props = {
    children: any;
    handleSubmit?: any;
    onClick: any;
    style: "create" | "edit" | "delete" | "return";
    type?: "button" | "submit" | "reset";
    size?: "small" | "regular" | "large";
}

const ActionButton = ({ children, handleSubmit, onClick, style, type, size } : Props) => {
    const format = ButtonStylePicker.pickStyle(style);
    const width = ButtonStylePicker.choseSize(size);
    return (
        <Button width={width} backgroundColor={format.backgroundColor} _hover={{backgroundColor: format.hoverBackgroundColor, color: format.hoverColor}}
                type={type} onClick={handleSubmit ? handleSubmit(onClick) : onClick}>{children}</Button>
    )
}

export default ActionButton;