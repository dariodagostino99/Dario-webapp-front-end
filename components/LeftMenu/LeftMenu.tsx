import {Box, Flex, ListIcon, ListItem, Text, UnorderedList, useStyles} from "@chakra-ui/react";
import {useRouter} from "next/router";
import HomeIcon from "../../icons/HomeIcon";
import TaskIcon from "../../icons/TaskIcon";
import ReturnIcon from "../../icons/ReturnIcon";
import NewspaperIcon from "../../icons/NewspaperIcon";
import {useState} from "react";

const LeftMenu = () => {
    const router = useRouter();
    const [selected, setSelected] = useState(1);
    const onClick = (route: string) => {
        router.push(route);
    }
    const onSelected = (id: number) => {
        setSelected(id);
    }
    return (
        <Flex direction={"column"}>
            <Flex justifyContent={"space-between"}
                  alignItems={"center"}
                  alignContent={"center"}
                  width={"100px"}
                  _hover={{color: "black"}}
                  color={selected === 1 ? "black" : "white"}
                  cursor={"pointer"}
                  onClick={() => {
                      onSelected(1);
                      onClick("http://localhost:3000");
                  }}
            >
                <HomeIcon selected={selected === 1}/>
                <Text fontSize={20}>Home</Text>
            </Flex>
            <Flex justifyContent={"space-between"}
                  mt={10}
                  alignItems={"center"}
                  alignContent={"center"}
                  width={"125px"}
                  _hover={{color: "black"}}
                  color={selected === 2 ? "black" : "white"}
                  cursor={"pointer"}
                  onClick={() => {
                      onSelected(2);
                      onClick("http://localhost:3000/task-manager");
                  }}
            >
                <TaskIcon selected={selected === 2}/>
                <Text fontSize={20}>Todo List</Text>
            </Flex>
        </Flex>
    )
}

export default LeftMenu;