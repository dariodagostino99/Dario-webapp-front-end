import {Box, Button, Flex, Heading, Image, Spinner, Text} from "@chakra-ui/react";
import RockIcon from "../icons/RockIcon";
import PaperIcon from "../icons/PaperIcon";
import ScissorsIcon from "../icons/ScissorsIcon";
import ComputerIcon from "../icons/ComputerIcon";
import {useState} from "react";
import RockPaperScissorsHelper from "../helpers/RockPaperScissorsHelper";
import ActionButton from "../components/ActionButton";
import ReturnIcon from "../icons/ReturnIcon";


const RockPaperScissors = () => {
    const [loading, setLoading] = useState(false);
    const [userPick, setUserPick] = useState("");
    const [cpuPick, setCpuPick] = useState("");
    const [winner, setWinner] = useState({header: null, color: null});

    const getRandomArbitrary = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const onDecideWinner = (userDecision: string) => {
        setLoading(true);
        setTimeout(() => {
            const cpuDecision = getRandomArbitrary(1, 4);
            const translateDecision = RockPaperScissorsHelper.translateDecisions(cpuDecision);
            const winner = RockPaperScissorsHelper.calculateResult(userDecision, translateDecision);
            setWinner(winner);
            setUserPick(userDecision);
            setCpuPick(translateDecision);
            setLoading(false);
        }, 1000)
    }

    const reset = () => {
        setWinner({header: null, color: null});
        setUserPick("");
        setCpuPick("");
    }

    return (
        <Box>
            {loading && (
                <Flex justifyContent={"center"} direction={"column"} alignContent={"center"} alignItems={"center"}>
                    <Spinner/>
                    <Text mt={5}>CPU is picking ....</Text>
                </Flex>
            )}
            {!loading && winner.header === null && (
                <Flex direction={"row"}>
                    <Flex direction={"column"} justifyContent={"space-between"} mt={10} alignItems={"center"}
                          height={"300px"}>
                        <Box onClick={() => {
                            onDecideWinner("rock");
                        }} cursor={"pointer"}>
                            <RockIcon/>
                        </Box>
                        <Box onClick={() => {
                            onDecideWinner("paper");
                        }} cursor={"pointer"}>
                            <PaperIcon/>
                        </Box>
                        <Box onClick={() => {
                            onDecideWinner("scissors");
                        }} cursor={"pointer"}>
                            <ScissorsIcon/>
                        </Box>
                    </Flex>
                    <Flex mt={40} ml={40}>
                        <Text fontSize={30}>VS.</Text>
                    </Flex>
                    <Flex mt={40} ml={40}>
                        <ComputerIcon/>
                    </Flex>
                </Flex>
            )}
            {!loading && winner.header !== null && (
                <Flex justifyContent={"center"} direction={"column"} alignContent={"center"} alignItems={"center"}>
                    <Flex justifyContent={"space-between"} width={"400px"}>
                        <Text fontSize={15}>User</Text>
                        {userPick === "paper" && <PaperIcon />}
                        {userPick === "rock" && <RockIcon />}
                        {userPick === "scissors" && <ScissorsIcon />}
                        <Text fontSize={20}>VS.</Text>
                        {cpuPick === "paper" && <PaperIcon />}
                        {cpuPick === "rock" && <RockIcon />}
                        {cpuPick === "scissors" && <ScissorsIcon />}
                        <Text fontSize={15}>CPU</Text>
                    </Flex>
                    <Flex direction={"column"} justifyContent={"center"} mt={10} alignItems={"center"}>
                        <Heading mb={10} color={winner.color}>{winner.header}</Heading>
                        <ActionButton onClick={reset} style={"return"} size={"small"} children={<ReturnIcon />}></ActionButton>
                    </Flex>
                </Flex>
            )}
        </Box>
    )
}

export default RockPaperScissors;