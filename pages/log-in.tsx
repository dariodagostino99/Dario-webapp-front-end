import {Box, Button, Flex, Heading, Input, Link, Text, useToast} from "@chakra-ui/react";


const LogIn = () => {
    return(
        <>
            <Box width={"50%"} padding={10} border={"solid"} borderColor={"black"} backgroundColor={"#ABB09E"} mt={5}>
                <>
                    <Heading as={"h2"} size={"lg"}>Email</Heading>
                    <Input backgroundColor={"white"} mb={10}></Input>
                </>
                <>
                    <Heading as={"h2"} size={"lg"}>Password</Heading>
                    <Input backgroundColor={"white"} mb={10}></Input>
                </>
                <Button>Log in!</Button>
            </Box>
            <Flex direction={"row"} padding={5}>
                <Text mr={5} fontSize={20}>Do not have an account?</Text>
                <Link href={"/sign-in"} fontSize={20}>Sign In!</Link>
            </Flex>
        </>
    )
}

export default LogIn;