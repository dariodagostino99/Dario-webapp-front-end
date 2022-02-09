import useAuthorization from "../../hooks/useAuthorization";
import {Box, Button, Flex, Heading, Image, Input, Text, useToast} from "@chakra-ui/react";
import {useRouter} from "next/router";
import FacebookIcon from "../../icons/FacebookIcon";
import InstagramIcon from "../../icons/InstagramIcon";
import TwitchIcon from "../../icons/TwitchIcon";
import TwitterIcon from "../../icons/TwitterIcon";
import EditIcon from "../../icons/EditIcon";
import LogOutIcon from "../../icons/LogOutIcon";
import ActionButton from "../../components/ActionButton";
import {useState} from "react";
import ReturnIcon from "../../icons/ReturnIcon";
import {Controller, useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";

export async function getServerSideProps(context) {
    const {username} = context.query;
    return {
        props: {username}
    }
}

type Props = {
    username: string;
}

const Profile = ({username}: Props) => {
    const {control, handleSubmit, formState: {errors}} = useForm();
    const {user, onLogOut, onRefreshPage } = useAuthorization();
    const router = useRouter();
    const [viewType, setViewType] = useState({mode: "VIEW"});
    const toast = useToast()

    const logOut = () => {
        onLogOut().then(() => onRefreshPage("/"));
    }

    if (user === null) {
        return (
            <>
                <Text mr={5}>Want to have a profile? <Button onClick={() => router.push("/sign-in")}>Sign
                    up!</Button></Text>
            </>
        );
    } else {
        return (
            <>
                {viewType.mode === "VIEW" && (
                    <Flex direction={"column"}
                          justifyContent={"center"}
                          alignContent={"center"}
                          alignItems={"center"}
                    >
                        <Image mb={5}
                               borderRadius={"50%"}
                               src={user.profileImage}
                               height={"300px"}
                               width={"300px"}
                               borderColor={"black"}
                               border={"solid"}
                        />
                        <Text fontSize={30}
                              mb={5}
                        >
                            {user.username}
                        </Text>
                        {user?.socialMedia?.length > 0 && (
                            <Flex direction={"row"} justifyContent={"space-between"} mb={5} width={"300px"}
                                  height={"60px"}>
                                {user.socialMedia.map((m, i) => (
                                    <Flex key={i} _hover={{
                                        width: "60px",
                                        height: "60px",
                                        border: "solid",
                                        borderColor: "#4867AA",
                                        borderRadius: "50%"
                                    }} justifyContent={"center"} alignItems={"center"} cursor={"pointer"}>
                                        {m.socialMediaType === "FACEBOOK" && <FacebookIcon/>}
                                        {m.socialMediaType === "INSTAGRAM" && <InstagramIcon/>}
                                        {m.socialMediaType === "TWITCH" && <TwitchIcon/>}
                                        {m.socialMediaType === "TWITTER" && <TwitterIcon/>}
                                    </Flex>
                                ))}
                            </Flex>
                        )}
                        <Text fontSize={20}
                        >
                            {user.description}
                        </Text>
                        {user?.username === username && (
                            <Flex direction={"row"}
                                  justifyContent={"space-between"}
                                  width={"250px"}
                                  mt={10}
                            >
                                <Button backgroundColor={"#647394"}
                                        _hover={{backgroundColor: "#445271"}}
                                        onClick={() => setViewType({mode: "EDIT"})}
                                >
                                    <EditIcon/>
                                </Button>
                                <Button onClick={logOut}
                                        backgroundColor={"#9E496D"}
                                        _hover={{backgroundColor: "#6D2142"}}
                                >
                                    <LogOutIcon/>
                                </Button>
                            </Flex>
                        )}
                    </Flex>
                )}
                {viewType.mode === "EDIT" && (
                    <>
                        <Box mb={5} width={"50%"}>
                            <Heading as={"h2"} size={"lg"}>Description</Heading>
                            <Controller
                                control={control}
                                name={"description"}
                                rules={{
                                    required: {value: true, message: 'This field is required*'},
                                }}
                                render={({
                                             field: {onChange, onBlur, value, name},
                                         }) => (
                                    <Input value={value}
                                           onChange={onChange}
                                           name={name}
                                           required={true}
                                           backgroundColor={"white"}
                                    />
                                )}
                            />
                            <Text color={"red"} ml={1}>
                                <ErrorMessage
                                    errors={errors}
                                    name={"description"}
                                    render={({message}) => <p>{message}</p>}
                                />
                            </Text>
                        </Box>
                        <Flex direction={"row"} justifyContent={"space-between"} width={"25%"}>
                            <ActionButton onClick={() => setViewType({mode: "VIEW"})} style={"return"}
                                          children={<ReturnIcon/>}/>
                            <ActionButton onClick={handleSubmit(() => {})} style={"create"}
                                          children={<EditIcon/>}/>
                        </Flex>
                    </>
                )}
            </>
        );
    }
}

export default Profile;