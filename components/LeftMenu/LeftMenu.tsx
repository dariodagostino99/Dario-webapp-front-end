import {Flex, Text} from "@chakra-ui/react";
import {useRouter} from "next/router";
import HomeIcon from "../../icons/HomeIcon";
import TaskIcon from "../../icons/TaskIcon";
import {useState} from "react";
import GameIcon from "../../icons/GameIcon";
import NewspaperIcon from "../../icons/NewspaperIcon";
import MoneyIcon from "../../icons/MoneyIcon";

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
                  width={"73px"}
                  _hover={{color: "black"}}
                  color={selected === 1 ? "black" : "white"}
                  cursor={"pointer"}
                  onClick={() => {
                      onSelected(1);
                      onClick("http://localhost:3000");
                  }}
            >
                <HomeIcon selected={selected === 1}/>
                <Text fontSize={15}>Home</Text>
            </Flex>
            <Flex justifyContent={"space-between"}
                  mt={10}
                  alignItems={"center"}
                  alignContent={"center"}
                  width={"92px"}
                  _hover={{color: "black"}}
                  color={selected === 2 ? "black" : "white"}
                  cursor={"pointer"}
                  onClick={() => {
                      onSelected(2);
                      onClick("http://localhost:3000/task-manager");
                  }}
            >
                <TaskIcon selected={selected === 2}/>
                <Text fontSize={15}>Todo List</Text>
            </Flex>
            <Flex justifyContent={"space-between"}
                  mt={10}
                  alignItems={"center"}
                  alignContent={"center"}
                  width={"170px"}
                  _hover={{color: "black"}}
                  color={selected === 3 ? "black" : "white"}
                  cursor={"pointer"}
                  onClick={() => {
                      onSelected(3);
                      onClick("http://localhost:3000/rock-paper-scissors");
                  }}
            >
                <GameIcon selected={selected === 3}/>
                <Text fontSize={15}>Rock, Paper, Scissors</Text>
            </Flex>
            <Flex justifyContent={"space-between"}
                  mt={10}
                  alignItems={"center"}
                  alignContent={"center"}
                  width={"75px"}
                  _hover={{color: "black"}}
                  color={selected === 4 ? "black" : "white"}
                  cursor={"pointer"}
                  onClick={() => {
                      onSelected(4);
                      onClick("http://localhost:3000/snake");
                  }}
            >
                <GameIcon selected={selected === 4}/>
                <Text fontSize={15}>Snake</Text>
            </Flex>
            <Flex justifyContent={"space-between"}
                  mt={10}
                  alignItems={"center"}
                  alignContent={"center"}
                  width={"82px"}
                  _hover={{color: "black"}}
                  color={selected === 5 ? "black" : "white"}
                  cursor={"pointer"}
                  onClick={() => {
                      onSelected(5);
                      onClick("http://localhost:3000/articles");
                  }}
            >
                <NewspaperIcon selected={selected === 5}/>
                <Text fontSize={15}>Articles</Text>
            </Flex>
            <Flex justifyContent={"space-between"}
                  mt={10}
                  alignItems={"center"}
                  alignContent={"center"}
                  width={"90px"}
                  _hover={{color: "black"}}
                  color={selected === 6 ? "black" : "white"}
                  cursor={"pointer"}
                  onClick={() => {
                      onSelected(6);
                      onClick("http://localhost:3000/currencies/eth");
                  }}
            >
                <MoneyIcon selected={selected === 6}/>
                <Text fontSize={15}>Currency</Text>
            </Flex>
        </Flex>
    )
}

export default LeftMenu;