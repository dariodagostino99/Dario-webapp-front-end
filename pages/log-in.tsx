import { Box, Button, Flex, Heading, Input, Link, Text } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import useAuthorization from "../hooks/useAuthorization";
import {useRouter} from "next/router";

const LogIn = () => {
    const { control, handleSubmit, formState: {errors} } = useForm();
    const { user, onLogIn, onRefreshPage } = useAuthorization();
    const router = useRouter();

    const onResponsiveLogIn = (formData: any) => {
        onLogIn(formData);
    }

    return(
        <>
            <Box width={"50%"} padding={10} border={"solid"} borderColor={"black"} backgroundColor={"#ABB09E"} mt={5}>
                <Box mb={5}>
                    <Heading as={"h2"} size={"lg"} >Email</Heading>
                    <Controller
                        control={control}
                        name={"email"}
                        rules={{
                            required: { value: true, message: 'This field is required*' },
                        }}
                        render={({
                                     field: {onChange, onBlur, value, name},
                                 }) => (
                            <Input value={value}
                                   onChange={onChange}
                                   name={name}
                                   required={true}
                                   backgroundColor={"white"}
                            />
                        )}
                    />
                    <Text color={"red"} ml={1}>
                        <ErrorMessage
                            errors={errors}
                            name={"email"}
                            render={({ message }) => <p>{message}</p>}
                        />
                    </Text>
                </Box>
                <Box mb={5}>
                    <Heading as={"h2"} size={"lg"} >Password</Heading>
                    <Controller
                        control={control}
                        name={"password"}
                        rules={{
                            required: { value: true, message: 'This field is required*' },
                        }}
                        render={({
                                     field: {onChange, onBlur, value, name},
                                 }) => (
                            <Input value={value}
                                   onChange={onChange}
                                   name={name}
                                   required={true}
                                   backgroundColor={"white"}
                                   type={"password"}
                            />
                        )}
                    />
                    <Text color={"red"} ml={1}>
                        <ErrorMessage
                            errors={errors}
                            name={"password"}
                            render={({ message }) => <p>{message}</p>}
                        />
                    </Text>
                </Box>
                <Button onClick={handleSubmit(onResponsiveLogIn)}>Log in!</Button>
            </Box>
            <Flex direction={"row"} padding={5}>
                <Text mr={5} fontSize={20}>Do not have an account?</Text>
                <Link href={"/sign-in"} fontSize={20}>Sign In!</Link>
            </Flex>
        </>
    )
}

export default LogIn;