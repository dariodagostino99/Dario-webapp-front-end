import {Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/table";
import {useEffect, useState} from "react";
import NumericHelper from "../helpers/NumericHelper";

const SnakeLeaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(false);
    const getLeaderboard = () => {
        setLoading(true);
        const options = {
            method: "GET",
        }
        fetch("http://localhost:8080/v1/snakeGame", options)
            .then((response) => response.json())
            .then((data) => {
                setLeaderboard([...data]);
                setLoading(true);
        })
    }

    useEffect(() => {
        getLeaderboard();
    }, []);

    return(
        <>
            <Table variant="striped" colorScheme="blackAlpha">
                <Thead>
                    <Tr>
                        <Th>Place</Th>
                        <Th>Username</Th>
                        <Th>Score</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {leaderboard && leaderboard.map((s, i) => (
                        <Tr>
                            <Td>{`${NumericHelper.getOrdinalValue(i+1)}`}</Td>
                            <Td>{s.user.username}</Td>
                            <Td>{s.score}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </>
    )
}

export default SnakeLeaderboard;