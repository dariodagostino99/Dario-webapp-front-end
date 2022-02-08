import {Box, Button, Flex, Heading, Image} from "@chakra-ui/react";
import LeftMenu from "../components/LeftMenu/LeftMenu";
import {useRouter} from "next/router";
import useAuthorization from "../hooks/useAuthorization";
import BellIcon from "../icons/BellIcon";

const Layout = ({ children }) => {
    const router = useRouter();
    const user = useAuthorization();
    return (
        <>
            <title>Dario's web app</title>
            <Flex backgroundColor={"#F2ECE7"} overflow={"auto"}>
                <Box backgroundColor={"#647394"} width={"14%"} padding={10} height={"100vh"}>
                    <Flex direction={"column"}>
                        <LeftMenu />
                    </Flex>
                </Box>
                <Box backgroundColor={"#9E496D"} width={"100vw"} height={"125px"} padding={10}>
                    <Flex justifyContent={"space-between"}>
                        <Heading as={"h2"} size={"2xl"} fontFamily={"sans-serif"} color={"#F2ECE7"} fontStyle={"italic"}>Dario Web App</Heading>
                        {user && (
                            <Flex direction={"row"} justifyContent={"space-between"} width={"120px"} alignItems={"center"}>
                                <BellIcon />
                                <Image src={user.profileImage} border={"solid"} borderRadius={"50%"} width={"60px"} height={"60px"} cursor={"pointer"}/>
                            </Flex>
                        )}
                        {!user && (
                            <Button onClick={() => router.push("/sign-in")} _hover={{backgroundColor: "#647394"}}>Sign in</Button>
                        )}
                    </Flex>
                    <Flex justifyContent={"center"} direction={"column"} alignItems={"center"} mt={12}>
                        {children}
                    </Flex>
                </Box>
            </Flex>
        </>
    )
}

export default Layout;
