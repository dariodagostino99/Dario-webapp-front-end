import {Box, Flex, Heading, Input, Text, Textarea, useToast} from "@chakra-ui/react";
import {Controller, useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import ActionButton from "../../components/Buttons/ActionButton";
import AddIcon from "../../icons/AddIcon";
import ReturnIcon from "../../icons/ReturnIcon";

const Articles = () => {
    const {control, handleSubmit, reset, formState: {errors}} = useForm();
    const toast = useToast();

    const onReset = () => {
       reset({body: "", title: "", author: "", file: ""});
    }

    const onCreate = (formData: any) => {
        const options = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        fetch("http://localhost:8080/v1/articles", options).then((response: Response) => {
            if (response.ok){
                toast({
                    title: "Article Created!",
                    description: "The article was created successfully!",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right"
                })
                onReset();
            } else {
                toast({
                    title: "Internal server error!",
                    description: "The article was not created, try again later.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top-right"
                })
            }
        })
    }

    return(
        <>
            <Flex direction={"column"} justifyContent={"center"} alignContent={"center"} alignItems={"center"}>
                <Heading as={"h2"} size={"xl"}>Articles</Heading>
                <Text mt={10} fontSize={20}>Create your own articles. Select a topic of your taste, a picture and let us know about it.</Text>
            </Flex>
            <>
                <Flex justifyContent={"flex-start"} direction={"column"} width={"1000px"} mt={8}>
                    <Text fontSize={25} ml={2} mb={5}>Title</Text>
                    <Controller
                        control={control}
                        name={"title"}
                        rules={{
                            required: { value: true, message: 'This field is required*' },
                        }}
                        render={({
                                     field: {onChange, onBlur, value, name},
                                 }) => (
                            <Input placeholder={"Title ..."}
                                   value={value}
                                   onChange={onChange}
                                   name={name}
                                   required={true}
                                   backgroundColor={"white"}
                            />
                        )}
                    />
                </Flex>
                <Text color={"red"} ml={1}>
                    <ErrorMessage
                        errors={errors}
                        name={"title"}
                        render={({ message }) => <p>{message}</p>}
                    />
                </Text>
            </>
            <>
                <Flex justifyContent={"flex-start"} direction={"column"} width={"1000px"} mt={8}>
                    <Text fontSize={25} ml={2} mb={5}>Body</Text>
                    <Controller
                        control={control}
                        name={"body"}
                        rules={{
                            required: { value: true, message: 'This field is required*' },
                        }}
                        render={({
                                     field: {onChange, onBlur, value, name},
                                 }) => (
                            <Textarea placeholder={"Add article body ..."}
                                      value={value}
                                      onChange={onChange}
                                      name={name}
                                      required={true}
                                      backgroundColor={"white"}
                                      height={"300px"}
                            />
                        )}
                    />
                </Flex>
                <Text color={"red"} ml={1}>
                    <ErrorMessage
                        errors={errors}
                        name={"body"}
                        render={({ message }) => <p>{message}</p>}
                    />
                </Text>
            </>
            <>
                <Flex justifyContent={"flex-start"} direction={"column"} width={"1000px"} mt={8}>
                    <Text fontSize={25} ml={2} mb={5}>Author</Text>
                    <Controller
                        control={control}
                        name={"author"}
                        rules={{
                            required: { value: true, message: 'This field is required*' },
                        }}
                        render={({
                                     field: {onChange, onBlur, value, name},
                                 }) => (
                            <Input placeholder={"Author name ..."}
                                   value={value}
                                   onChange={onChange}
                                   name={name}
                                   required={true}
                                   backgroundColor={"white"}
                            />
                        )}
                    />
                </Flex>
                <Text color={"red"} ml={1}>
                    <ErrorMessage
                        errors={errors}
                        name={"author"}
                        render={({ message }) => <p>{message}</p>}
                    />
                </Text>
            </>
            <Flex justifyContent={"flex-start"} direction={"column"} width={"1000px"} mt={8}>
                <Text fontSize={25} ml={2} mb={5}>Article picture</Text>
                <Controller
                    control={control}
                    name={"picture"}
                    rules={{
                        required: { value: true, message: 'This field is required*' },
                    }}
                    render={({
                                 field: {onChange, onBlur, value, name},
                             }) => (
                        <Box ml={-4}>
                            <Input value={value}
                                   onChange={onChange}
                                   name={name}
                                   required={true}
                                   type={"file"}
                                   accept={".png"}
                            />
                        </Box>
                    )}
                />
            </Flex>
            <Flex direction={"row"} justifyContent={"flex-start"} mt={5} mb={10}>
                <Box mr={10}>
                    <ActionButton handleSubmit={handleSubmit} onClick={onCreate} style={"create"} children={<AddIcon />}/>
                </Box>
                <Box>
                    <ActionButton onClick={onReset} style={"return"} children={<ReturnIcon />}/>
                </Box>
            </Flex>
        </>
    )
}

export default Articles;


