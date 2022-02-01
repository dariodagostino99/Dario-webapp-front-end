import { Box, ListItem, UnorderedList } from "@chakra-ui/react";
import { useRouter } from "next/router";

const LeftMenu = () => {
    const router = useRouter();
    const onClick = (route: string) => {
        router.push(route);
    }
    return (
    <>
        <UnorderedList>
            <Box mb={10}
                 _hover={{color: "white"}}
                 cursor={"pointer"}
                 onClick={() => onClick("http://localhost:3000")}
            >
                <ListItem>Home</ListItem>
            </Box>
            <Box mb={10}
                 _hover={{color: "white"}}
                 cursor={"pointer"}
                 onClick={() => onClick("http://localhost:3000/task-manager")}
            >
                <ListItem>Task Manager</ListItem>
            </Box>
        </UnorderedList>
    </>
    )
}

export default LeftMenu;