import {Controller} from "react-hook-form";
import {Flex, Input, Text} from "@chakra-ui/react";
import { ErrorMessage} from "@hookform/error-message";

type Props = {
    errors: any;
    control: any;
    controllerName: string;
    placeholder: string;
    style?: "create" | "edit" | "delete" | "return";
    required? : boolean;
}

const TaskManagerPanel = ({ control, controllerName, placeholder, style, errors, required } : Props) => {
    return (
        <Flex direction={"column"} height={style === "create" && "120px"}>
            <Flex mt={style === "create" && 10}>
                <>
                    <Controller
                        control={control}
                        name={controllerName}
                        rules={{
                            required: { value: required, message: 'This field is required*' },
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