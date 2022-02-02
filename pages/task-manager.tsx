import {Box, Button, Checkbox, Flex, Heading, Input, Spinner, Text, useToast} from "@chakra-ui/react";
import {Controller, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {Response} from "next/dist/server/web/spec-compliant/response";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
import AddIcon from "../icons/AddIcon";
import ReturnIcon from "../icons/ReturnIcon";

const TaskManager = () => {
    const {control, handleSubmit, reset} = useForm();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast()
    const [viewMode, setViewMode] = useState({mode: "Read", taskId: null});

    useEffect(() => {
        setLoading(true);
        getTasks();
        setLoading(false);
    }, [])

    const goBack = () => {
        setViewMode({mode: "Read", taskId: null})
    }

    const createTask = (formData: any) => {
        const options = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        fetch("http://localhost:8080/v1/tasks", options)
            .then((response: Response) => {
                if (response.ok) {
                    getTasks();
                }
                reset();
            })
    }

    const getTasks = () => {
        setLoading(true);
        const options = {
            method: "GET",
        }
        fetch("http://localhost:8080/v1/tasks", options)
            .then((response: Response) => response.json()).then((data) => {
            setTasks(data);
            setLoading(false);
        })
    }

    const editTask = (formData: any) => {
        setLoading(true);
        const options = {
            method: "PUT",
            body: JSON.stringify({text: formData.textEdit}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        fetch(`http://localhost:8080/v1/tasks/${viewMode.taskId}`, options)
            .then((response: Response) => {
                if (response.ok) {
                    getTasks();
                    setLoading(false);
                    setViewMode({mode: "Read", taskId: null})
                }
                reset();
            })
    }

    const deleteTask = (id: number) => {
        setLoading(true);
        const options = {
            method: "DELETE",
        }
        fetch(`http://localhost:8080/v1/tasks/${id}`, options)
            .then((response: Response) => {
                if (response.ok) {
                    toast({
                        title: "Task deleted!",
                        description: "The task was deleted successfully!",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "top-right"
                    })
                    getTasks();
                } else {
                    toast({
                        title: "Internal server error!",
                        description: "The task was not deleted, try again later.",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                        position: "top-right"
                    })
                }
                setLoading(false);
            })
    }

    return (
        <>
            <Flex justifyContent={"center"}
                  mb={10}
            >
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
                        name="text"
                        render={({
                                     field: {onChange, onBlur, value, name},
                                 }) => (
                            <Input placeholder={"Add a task ..."}
                                   value={value}
                                   onChange={onChange}
                                   name={name}
                                   required={true}
                                   backgroundColor={"white"}
                            />
                        )}
                    />
                </>
                <Flex ml={5}>
                    <Button backgroundColor={"#9DF58E"} _hover={{backgroundColor: "#47F527", color: "white"}}
                            type={"submit"} onClick={handleSubmit(createTask)}><AddIcon/></Button>
                </Flex>
            </Flex>
            <Box borderColor={"black"}
                 border={"dotted"}
                 width={"1000px"}
                 mt={10}
            />
            <Flex justifyContent={"center"}
                  mt={5}
                  direction={"column"}
            >
                {loading && <Spinner/>}
                {!loading && tasks.length === 0 && <Text>There are no tasks yet! Go add one!</Text>}
                {!loading && tasks.length !== 0 && tasks.map((t, i) => (
                    <Flex direction={"row"}
                          justifyContent={"space-between"}
                          width={"100%"}
                          mb={5}
                          key={i}
                    >
                        {viewMode.mode === "Edit" && viewMode.taskId === t.id && (
                            <Flex>
                                <>
                                    <Controller
                                        control={control}
                                        name="textEdit"
                                        render={({
                                                     field: {onChange, onBlur, value, name},
                                                 }) => (
                                            <Input placeholder={"Edit task ..."}
                                                   value={value}
                                                   onChange={onChange}
                                                   name={name}
                                                   required={true}
                                                   backgroundColor={"white"}
                                                   width={"860px"}
                                            />
                                        )}
                                    />
                                </>
                                <Flex ml={5} justifyContent={"space-between"} width={"120px"}>
                                    <Button backgroundColor={"#7278EC"}
                                            _hover={{backgroundColor: "#151FEE", color: "white"}}
                                            type={"submit"} onClick={handleSubmit(editTask)}><EditIcon/></Button>
                                    <Button backgroundColor={"#7278EC"}
                                            _hover={{backgroundColor: "#151FEE", color: "white"}}
                                            type={"submit"} onClick={goBack}><ReturnIcon/></Button>
                                </Flex>
                            </Flex>
                        )}
                        {viewMode.taskId !== t.id && (
                            <>
                                <Text _hover={{color: "#151FEE"}} cursor={"pointer"} ml={2}
                                      onClick={() => setViewMode({mode: "Edit", taskId: t.id})}>{t.text}</Text>
                                <Flex justifyContent={"space-between"}>
                                    <Button backgroundColor={"#F07171"}
                                            _hover={{background: "#F10C0C"}}
                                            onClick={() => {
                                                deleteTask(t.id)
                                            }}
                                    >
                                        <DeleteIcon/>
                                    </Button>
                                </Flex>
                            </>
                        )}
                    </Flex>
                ))}
            </Flex>
        </>
    )
}

export default TaskManager;