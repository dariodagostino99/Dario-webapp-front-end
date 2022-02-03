import {Box, Flex, Heading, Input, Spinner, Text, Textarea, useToast} from "@chakra-ui/react";
import {Controller, useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import ActionButton from "../../components/ActionButton";
import AddIcon from "../../icons/AddIcon";
import ReturnIcon from "../../icons/ReturnIcon";
import {responseSymbol} from "next/dist/server/web/spec-compliant/fetch-event";
import {useEffect, useState} from "react";

export async function getServerSideProps(context) {
    const {id} = context.query
    return {
        props: {id}
    }
}

type Props = {
    id: number;
}

const ArticleId = ({ id }: Props) => {
    const [loading, setLoading] = useState(false);
    const [article, setArticle] = useState({id: null, title: null, body: null, author: null, picture: null});

    useEffect(() => {
        getArticleById(id);
    }, []);

    const getArticleById = (id: number) => {
        setLoading(true);
        const options = {
            method: "GET"
        }
        fetch(`http://localhost:8080/v1/articles/${id}`, options).then((response: Response) => response.json()).then((data) => {
            setArticle(data);
            setLoading(false);
        })

    }

    return(
        <>
            {loading && <Spinner />}
            {!loading && article.id !== null && (
                <Flex direction={"column"} alignItems={"flex-start"} ml={10}>
                    <Heading as={"h2"} size={"xl"} mb={10}>{article.title}</Heading>
                    <Text fontSize={30} mb={10} ml={10}>{article.body}</Text>
                    <Box mb={10} ml={10}>
                        <img src={article.picture} alt={"Error! The image could not be loaded :("} />
                    </Box>
                    <Text fontSize={30}>{article.author}</Text>
                </Flex>
            )}
        </>
    )
}

export default ArticleId;


