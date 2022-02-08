import {Box, Button, Flex, Heading, Input, Link, Text, useToast} from "@chakra-ui/react";
import {Controller, useForm} from "react-hook-form";

const BASE_URL = process.env.LOCAL_HOST_URL;

const SignIn = () => {
    const toast = useToast();
    const {control, handleSubmit, reset} = useForm();
    const onSignIn = (formData: any) => {
        const options = {
            method: "POST",
            body: JSON.stringify({username: formData.username, password: formData.password, email: formData.email}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        fetch(`http://localhost:8080/v1/users`, options).then((data) => {
            if (data.ok){
                toast({
                    title: "Signed up!",
                    description: "You signed up successfully!",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right"
                })
                reset({username: "", password: "", email: ""});
            } else {
                toast({
                    title: "Internal Server error!",
                    description: "An error occurred. Please try again later.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top-right"
                })
            }
        })
    }
    return(
        <>
            <Box width={"50%"} padding={10} border={"solid"} borderColor={"black"} backgroundColor={"#ABB09E"} mt={5} >
                <>
                    <Heading as={"h2"} size={"lg"} >Username</Heading>
                    <Controller
                        control={control}
                        name={"username"}
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
                                   mb={5}
                            />
                        )}
                    />
                </>
                <>
                    <Heading as={"h2"} size={"lg"}>Email</Heading>
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
                                   mb={5}
                            />
                        )}
                    />
                </>
                <>
                    <Heading as={"h2"} size={"lg"}>Password</Heading>
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
                                   mb={5}
                                   type={"password"}
                            />
                        )}
                    />
                </>
                <Button onClick={handleSubmit(onSignIn)} type={"submit"}>Sign in!</Button>
            </Box>
            <Flex direction={"row"} padding={5}>
                <Text mr={5} fontSize={20}>Already have an account?</Text>
                <Link href={"/log-in"} fontSize={20}>Log In!</Link>
            </Flex>
        </>
    )
}

export default SignIn;