import {Box, Flex, Heading, Text} from "@chakra-ui/react";


const TaskManager = () => {
    return(
        <>
            <Flex justifyContent={"center"} mb={10}>
                <Heading >Task Manager</Heading>
            </Flex>
            <Flex>
                <Text>The task manager is a list where you can place all the tasks you have to do. It lets you also mark a task as done and finally delete it</Text>
            </Flex>
        </>
    )
}

export default TaskManager;