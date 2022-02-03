import { Box, Flex, Heading } from "@chakra-ui/react";
import LeftMenu from "../components/LeftMenu/LeftMenu";

const Layout = ({ children }) => {
    return (
        <>
            <title>Dario's web app</title>
            <Flex direction={"row"} backgroundColor={"#DFEBDC"} overflow={"auto"}>
                <Box width={"100%"} height="auto" minHeight={"1008px"} backgroundColor={"#7ECEEC"}>
                    <Flex mt={135} ml={5}>
                        <LeftMenu />
                    </Flex>
                </Box>
                <Flex direction={"column"} alignItems={"center"}>
                    <Box width={"1700px"} height={"100px"} backgroundColor={"#95EC7E"}>
                        <Heading as={"h2"} size={"2xl"} ml={10} mt={5}>Dario's Web App</Heading>
                    </Box>
                    <Box mt={10}>
                        {children}
                    </Box>
                </Flex>
            </Flex>
        </>
    )
}

export default Layout;
