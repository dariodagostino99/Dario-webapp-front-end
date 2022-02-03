import {Controller} from "react-hook-form";
import {Flex, Input, Text} from "@chakra-ui/react";
import { ErrorMessage} from "@hookform/error-message";
import ActionButton from "./ActionButton";
import {FormError} from "@chakra-ui/theme/components";

type Props = {
    children?: any;
    errors: any;
    control: any;
    controllerName: string;
    placeholder: string;
    button: boolean;
    handleSubmit?: any;
    onClick?: any;
    style?: "create" | "edit" | "delete" | "return";
    type?: "button" | "submit" | "reset";
}

const TaskManagerPanel = ({ children, handleSubmit, onClick, control, controllerName, placeholder, style, type, button, errors } : Props) => {
    return (
        <Flex direction={"column"}>
            <Flex mt={style === "create" && 10}>
                <>
                    <Controller
                        control={control}
                        name={controllerName}
                        rules={{
                            required: { value: true, message: 'This field is required*' },
                        }}
                        render={({
                                     field: {onChange, onBlur, value, name},
                                 }) => (
                            <Input placeholder={placeholder}
                                   value={value}
                                   onChange={onChange}
                                   name={name}
                                   required={true}
                                   backgroundColor={"white"}
                                   width={style === "create" ? "925px" : "860px"}
                            />
                        )}
                    />
                </>
                {button && (
                    <Flex ml={5}>
                        <ActionButton handleSubmit={handleSubmit} onClick={onClick} children={children} style={style} type={type}/>
                    </Flex>
                )}
            </Flex>
            <Text color={"red"} ml={1}>
                <ErrorMessage
                    errors={errors}
                    name={controllerName}
                    render={({ message }) => <p>{message}</p>}
                />
            </Text>
        </Flex>
    )
}

export default TaskManagerPanel;