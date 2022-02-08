import {Box, Button, Flex, Heading, Spinner, Text, useToast} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {Response} from "next/dist/server/web/spec-compliant/response";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
import ReturnIcon from "../icons/ReturnIcon";
import TaskManagerPanel from "../components/TaskManagerPanel";
import ActionButton from "../components/ActionButton";
import AddIcon from "../icons/AddIcon";

const TaskManager = () => {
    const {control, handleSubmit, reset, formState: {errors}} = useForm();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast()
    const [viewMode, setViewMode] = useState({mode: "Read", taskId: null});

    useEffect(() => {
        getTasks();
    }, [])

    const goBack = () => {
        setViewMode({mode: "Read", taskId: null})
    }

    const createTask = (formData: any) => {
        setLoading(true);
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
                    setLoading(false);
                }
                reset({text: ""});
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
            <Flex direction={"row"} justifyContent={"space-between"} alignContent={"center"} alignItems={"center"} >
                <TaskManagerPanel control={control}
                                  controllerName={"text"}
                                  placeholder={"Add a task ..."}
                                  style={"create"}
                                  errors={errors}
                                  required={viewMode.mode === "Read"}
                />
                <Flex>
                    <ActionButton onClick={createTask} style={"create"} handleSubmit={handleSubmit}
                                  children={<AddIcon/>}/>
                </Flex>
            </Flex>
            <>
                <Box borderColor={"black"}
                     border={"dotted"}
                     width={"1000px"}
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
                              width={"50vw"}
                              mb={5}
                              key={i}
                        >
                            {viewMode.mode === "Edit" && viewMode.taskId === t.id && (
                                <Flex>
                                    <TaskManagerPanel control={control}
                                                      controllerName={"textEdit"}
                                                      placeholder={"Edit task ..."}
                                                      errors={errors}
                                                      required={true}
                                    />
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
                                    <Text _hover={{color: "#151FEE"}} cursor={"pointer"} ml={2} fontSize={20}
                                          onClick={() => setViewMode({mode: "Edit", taskId: t.id})}>{t.text}</Text>
                                    <Flex justifyContent={"space-between"}>
                                        <ActionButton onClick={() => deleteTask(t.id)} style={"delete"}
                                                      children={<DeleteIcon/>}/>
                                    </Flex>
                                </>
                            )}
                        </Flex>
                    ))}
                </Flex>
            </>
        </>
    )
}

export default TaskManager;