import {Flex, Link, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const baseUrl = "http://localhost:3000/articles"

    useEffect(() => {
        getAllArticles();
    }, [])

    const getAllArticles = () => {
        setLoading(true);
        const options = {
            method: "GET"
        }
        fetch("http://localhost:8080/v1/articles", options)
            .then((response: Response) => response.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
    }

    return(
        <Flex direction={"column"}>
            {data.length === 0 && (
                <Text fontSize={20}>There are no articles yet. Go ahead and create one!</Text>
            )}
            {data.length > 0 && data.map((a) => (
                <Flex justifyContent={"space-between"} width={"1000px"}>
                    <Link mb={10} fontSize={30} href={`${baseUrl}/${a.id}`}>{`${baseUrl}/${a.id}`}</Link>
                    <Text fontSize={30}> ....................................................................... </Text>
                    <Text fontSize={30}>{a.author}</Text>
                </Flex>
            ))}
        </Flex>
    )
}
