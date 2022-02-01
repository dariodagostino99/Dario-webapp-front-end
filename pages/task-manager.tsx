import {Box, Button, Checkbox, Flex, Heading, Input, Spinner, Text} from "@chakra-ui/react";
import {Controller, useController, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {Response} from "next/dist/server/web/spec-compliant/response";


const TaskManager = () => {
    const {control} = useForm();
    const [tasks, setTasks] = useState<>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getTasks();
        setLoading(false);
    }, [])

    const getTasks = () => {
        const options = {
            method: "GET",
        }
        fetch("http://localhost:8080/v1/tasks", options)
            .then((response: Response) => response.json()).then((data) => {
            setTasks((prev) => [...prev, data]);
        })
    }

    return (
        <>
            <Flex justifyContent={"center"} mb={10}>
                <Heading>Task Manager</Heading>
            </Flex>
            <Flex>
                <Text>The task manager is a list where you can place all the tasks you have to do. It lets you also mark
                    a task as completed and finally delete it</Text>
            </Flex>
            <Flex mt={10}>
                <>
                    <Controller
                        control={control}
                        name="test"
                        render={({
                                     field: { onChange, onBlur, value, name },
                                 }) => (
                            <Input placeholder={"Add a task ..."} value={value} onChange={onChange} name={name} backgroundColor={"white"} />
                        )}
                    />
                </>
                <Flex ml={5}>
                    <Button backgroundColor={"#9DF58E"} _hover={{backgroundColor: "#47F527", color: "white"}} onClick={getTasks}>Add Task!</Button>
                </Flex>
            </Flex>
            <Box borderColor={"black"} border={"dotted"} width={"1000px"} mt={10} ></Box>
            <Flex justifyContent={"center"} mt={5}>
            {loading && <Spinner />}
            {!loading && tasks.length === 0 && <Text>There are no tasks yet! Go add one!</Text>}
            {!loading && tasks.length > 0 && tasks.map((t) => (
                <>
                    <Text>{t[0].text}</Text>
                </>
            ))}
            </Flex>
        </>
    )
}

export default TaskManager;