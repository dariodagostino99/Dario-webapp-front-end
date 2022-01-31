import {Box, Flex, Heading, ListItem, Text, UnorderedList} from "@chakra-ui/react";
import LeftMenu from "../components/LeftMenu/LeftMenu";

const Layout = ({ children }) => {
    return (
        <>
            <title>Dario's web app</title>
            <Flex direction={"row"} backgroundColor={"#DFEBDC"}>
                <Box width={"350px"} height="1007px" backgroundColor="#7ECEEC">
                    <Flex mt={135} ml={10}>
                        <LeftMenu />
                    </Flex>
                </Box>
                <Flex direction={"column"} alignItems={"center"}>
                    <Box width={"1700px"} height={"100px"} backgroundColor={"#95EC7E"}>
                        <Heading as={"h2"} size={"2xl"} ml={10} mt={5}>Dario's Web App</Heading>
                    </Box>
                    <Box>
                        {children}
                    </Box>
                </Flex>
            </Flex>
        </>
    )
}

export default Layout;
