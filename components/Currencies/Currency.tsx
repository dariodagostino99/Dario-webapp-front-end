import {Box, Flex, Heading, Text} from "@chakra-ui/react";
import {useRouter} from "next/router";
import UpArrowIcon from "../../icons/UpArrowIcon";
import DownArrowIcon from "../../icons/DownArrowIcon";


type Props = {
    values: any;
}

const Currency = ({ values }: Props) => {
    const router = useRouter();
    const { currency } = router.query;
    return (
        <>
            {values === null && (
                <h1>Nothing to show in here!</h1>
            )}
            {values !== null && (
                <Flex direction={"column"}>
                    <Flex direction={"row"} justifyContent={"space-evenly"} width={"500px"} mt={10}>
                        <Heading as={"h1"} size={"4xl"}>{currency ? currency[0].toUpperCase() + currency.slice(1) : "Btc"} </Heading>
                        <Text textAlign={"center"} fontSize={55}>${Math.trunc(values.actualValue*100)/100}</Text>
                    </Flex>
                    {values.actualValue < values.previousValue && (
                        <Flex direction={"row"} justifyContent={"center"}>
                            <Box mt={10}>
                                <DownArrowIcon color={"red"} />
                            </Box>
                            <Text mt={10} fontSize={20} color={"red"}>${(Math.trunc((values.actualValue - values.previousValue) * 100) /100).toString().slice(1)}</Text>
                        </Flex>
                    )}
                    {values.actualValue > values.previousValue && (
                        <Flex direction={"row"} justifyContent={"center"}>
                            <Box mt={10}>
                                <UpArrowIcon color={"Green"} />
                            </Box>
                            <Text mt={10} fontSize={20} color={"green"}>${Math.trunc((values.actualValue - values.previousValue) * 100) /100}</Text>
                        </Flex>
                    )}
                    {values.actualValue === values.previousValue && (
                        <Flex direction={"row"} justifyContent={"center"}>
                            <Text mt={10} fontSize={20} color={"blue"}>${Math.trunc((values.actualValue - values.previousValue) * 100) /100}</Text>
                        </Flex>
                    )}
                </Flex>
            )}
        </>
    )
}

export default Currency;