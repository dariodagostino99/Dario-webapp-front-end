import {Button, Flex, Input} from "@chakra-ui/react";
import ButtonStylePicker from "../helpers/ButtonStylePicker";

type Props = {
    children: any;
    handleSubmit?: any;
    onClick: any;
    style: "create" | "edit" | "delete" | "return";
    type?: "button" | "submit" | "reset";
}

const ActionButton = ({ children, handleSubmit, onClick, style, type } : Props) => {
    const format = ButtonStylePicker.pickStyle(style);
    return (
        <Button backgroundColor={format.backgroundColor} _hover={{backgroundColor: format.hoverBackgroundColor, color: format.hoverColor}}
                type={type} onClick={handleSubmit ? handleSubmit(onClick) : onClick}>{children}</Button>
    )
}

export default ActionButton;