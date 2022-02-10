import useAuthorization from "../../hooks/useAuthorization";
import {Box, Button, Flex, Heading, Image, Input, Select, SelectField, Text, useToast} from "@chakra-ui/react";
import {useRouter} from "next/router";
import FacebookIcon from "../../icons/FacebookIcon";
import InstagramIcon from "../../icons/InstagramIcon";
import TwitchIcon from "../../icons/TwitchIcon";
import TwitterIcon from "../../icons/TwitterIcon";
import EditIcon from "../../icons/EditIcon";
import LogOutIcon from "../../icons/LogOutIcon";
import ActionButton from "../../components/Buttons/ActionButton";
import {useEffect, useState} from "react";
import ReturnIcon from "../../icons/ReturnIcon";
import {Controller, useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import DeleteIcon from "../../icons/DeleteIcon";
import InputFormPanel from "../../components/Commons/InputFormPanel";

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
    const {control, watch, handleSubmit, formState: {errors}, reset} = useForm();
    const {user, onLogOut, onRefreshPage, authToken} = useAuthorization();
    const router = useRouter();
    const [viewType, setViewType] = useState({mode: "VIEW"});
    const [socialMediaList, setSocialMediaList] = useState([]);
    const watchSelect = watch("socialMedia");
    const [isUsernameRequired, setIsUsernameRequired] = useState(false);
    const watchUsername = watch("username");
    const [isDescriptionRequired, setIsDescriptionRequired] = useState(false);
    const watchDescription = watch("description");

    useEffect(() => {
        setViewType({mode: "VIEW"})
    }, [])

    useEffect(() => {
        if (["TWITTER", "TWITCH", "FACEBOOK", "INSTAGRAM"].includes(watchSelect)) {
            setSocialMediaList(prev => [...prev, { socialMediaType: watchSelect }])
        }
    }, [watchSelect])

    useEffect(() => {
        if (watchUsername !== user?.username){
            setIsUsernameRequired(true);
        } else {
            setIsUsernameRequired(false);
        }
    }, [watchUsername])

    useEffect(() => {
        if (watchDescription !== user?.userProfile?.description){
            setIsDescriptionRequired(true);
        } else {
            setIsDescriptionRequired(false);
        }
    }, [watchDescription])


    const logOut = () => {
        onLogOut().then(() => onRefreshPage("/"));
    }

    const setProfileUrl = (socialMedia: any[], formData: any) => {
        const media = [];
        socialMedia.map((m) => {
            switch (m.socialMediaType){
                case "TWITTER":
                    media.push({... m, profileUrl: formData.twitter});
                    break;
                case "TWITCH":
                    media.push({... m, profileUrl: formData.twitch});
                    break;
                case "FACEBOOK":
                    media.push({... m, profileUrl: formData.facebook});
                    break;
                case "INSTAGRAM":
                    media.push({... m, profileUrl: formData.instagram});
                    break;
            }
        })
        return media;
    }

    const onUpdateProfile = async (formData: any) => {
        const socialMedia = setProfileUrl(socialMediaList, formData);
        const options = {
            method: "PUT",
            body: JSON.stringify({description: formData.description, username: formData.username, socialMediaList: socialMedia}),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : authToken || ""
            }
        }
        const data = await fetch("http://localhost:8080/v1/users/profile", options).then((response) => response.json());
        localStorage.setItem("user", JSON.stringify(data));
        setViewType({mode: "VIEW"})
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
                               src={user?.userProfile?.profileImageUrl}
                               backgroundColor={"white"}
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
                        {user?.userProfile?.socialMediaList?.length > 0 && (
                            <Flex direction={"row"} justifyContent={"space-between"} alignItems={"center"} mb={5} width={"300px"}
                                  height={"60px"}>
                                {user?.userProfile?.socialMediaList.map((m, i) => (
                                    <Flex key={i} _hover={{
                                        width: "60px",
                                        height: "60px",
                                        border: "solid",
                                        borderColor: "#4867AA",
                                        borderRadius: "50%"
                                    }} justifyContent={"center"} alignItems={"center"} cursor={"pointer"} onClick={() => router.push(m.profileUrl)}>
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
                            {user?.userProfile?.description}
                        </Text>
                        {user?.username === username && (
                            <Flex direction={"row"}
                                  justifyContent={"space-between"}
                                  width={"250px"}
                                  mt={10}
                            >
                                <Button backgroundColor={"#647394"}
                                        _hover={{backgroundColor: "#445271"}}
                                        onClick={() => {
                                            setViewType({mode: "EDIT"});
                                            setSocialMediaList(user?.userProfile?.socialMediaList)
                                        }}
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
                            <Heading mb={5} as={"h2"} size={"lg"}>Description</Heading>
                            <Controller
                                control={control}
                                name={"description"}
                                rules={{
                                    required: {value: isDescriptionRequired, message: 'This field is required*'},
                                }}
                                render={({
                                             field: {onChange, onBlur, value, name},
                                         }) => (
                                    <Input value={value}
                                           onChange={onChange}
                                           name={name}
                                           required={true}
                                           backgroundColor={"white"}
                                           placeholder={"Description ..."}
                                           // defaultValue={user?.userProfile.description}
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
                        <Box mb={5} width={"50%"}>
                            <Heading as={"h2"} size={"lg"} mb={5}>Username</Heading>
                            <Controller
                                control={control}
                                name={"username"}
                                rules={{
                                    required: {value: isUsernameRequired, message: 'This field is required*'},
                                }}
                                render={({
                                             field: {onChange, onBlur, value, name},
                                         }) => (
                                    <Input value={value}
                                           onChange={onChange}
                                           name={name}
                                           required={true}
                                           backgroundColor={"white"}
                                           placeholder={"Username ..."}
                                           // defaultValue={user?.username}
                                    />
                                )}
                            />
                            <Text color={"red"} ml={1}>
                                <ErrorMessage
                                    errors={errors}
                                    name={"username"}
                                    render={({message}) => <p>{message}</p>}
                                />
                            </Text>
                        </Box>
                        <Box mb={5} width={"50%"}>
                            <Heading as={"h2"} size={"lg"} mb={5}>Social Media</Heading>
                            <Controller
                                control={control}
                                name={"socialMedia"}
                                render={({
                                             field: {onChange, onBlur, value, name},
                                         }) => (
                                    <Select value={value}
                                            onChange={onChange}
                                            name={name}
                                            backgroundColor={"white"}
                                            placeholder={"Select a social media ..."}
                                    >
                                        {socialMediaList.filter((m) => m.socialMediaType === "TWITTER").length === 0 && (
                                            <option value={"TWITTER"}>Twitter</option>
                                        )}
                                        {socialMediaList.filter((m) => m.socialMediaType === "FACEBOOK").length === 0 && (
                                            <option value={"FACEBOOK"}>Facebook</option>
                                        )}
                                        {socialMediaList.filter((m) => m.socialMediaType === "TWITCH").length === 0 && (
                                            <option value={"TWITCH"}>Twitch</option>
                                        )}
                                        {socialMediaList.filter((m) => m.socialMediaType === "INSTAGRAM").length === 0 && (
                                            <option value={"INSTAGRAM"}>Instagram</option>
                                        )}
                                    </Select>
                                )}
                            />
                            <Flex direction={"column"} mt={10}>
                                {socialMediaList.length > 0 && socialMediaList.map(m => (
                                    <Box mb={10}>
                                        {m.socialMediaType === "FACEBOOK" && (
                                            <Flex alignItems={"center"} justifyContent={"space-between"}>
                                                <FacebookIcon/>
                                                <InputFormPanel width={"700px"} errors={errors} control={control} controllerName={"facebook"} placeholder={"Add profile url"} />
                                                <ActionButton onClick={() => setSocialMediaList(socialMediaList.filter((t) => t.socialMediaType !== m.socialMediaType))}
                                                              style={"delete"}
                                                              children={<DeleteIcon />}
                                                />
                                            </Flex>
                                        )}
                                        {m.socialMediaType === "INSTAGRAM" && (
                                            <Flex alignItems={"center"} justifyContent={"space-between"}>
                                                <InstagramIcon/>
                                                <InputFormPanel width={"700px"} errors={errors} control={control} controllerName={"instagram"} placeholder={"Add profile url"} />
                                                <ActionButton onClick={() => setSocialMediaList(socialMediaList.filter((t) => t.socialMediaType !== m.socialMediaType))}
                                                              style={"delete"}
                                                              children={<DeleteIcon />}
                                                />
                                            </Flex>
                                        )}
                                        {m.socialMediaType === "TWITCH" && (
                                            <Flex alignItems={"center"} justifyContent={"space-between"}>
                                                <TwitchIcon/>
                                                <InputFormPanel width={"700px"} errors={errors} control={control} controllerName={"twitch"} placeholder={"Add profile url"} />
                                                <ActionButton onClick={() => setSocialMediaList(socialMediaList.filter((t) => t.socialMediaType !== m.socialMediaType))}
                                                              style={"delete"}
                                                              children={<DeleteIcon />}
                                                />
                                            </Flex>
                                        )}
                                        {m.socialMediaType === "TWITTER" && (
                                            <Flex alignItems={"center"} justifyContent={"space-between"}>
                                                <TwitterIcon />
                                                <InputFormPanel width={"700px"} errors={errors} control={control} controllerName={"twitter"} placeholder={"Add profile url"} />
                                                <ActionButton onClick={() => setSocialMediaList(socialMediaList.filter((t) => t.socialMediaType !== m.socialMediaType))}
                                                              style={"delete"}
                                                              children={<DeleteIcon />}
                                                />
                                            </Flex>
                                        )}
                                    </Box>
                                ))}
                            </Flex>
                        </Box>
                        <Flex direction={"row"} justifyContent={"space-between"} width={"25%"}>
                            <ActionButton onClick={() => {
                                setViewType({mode: "VIEW"});
                                reset();
                            }} style={"return"}
                                          children={<ReturnIcon/>}/>
                            <ActionButton onClick={handleSubmit(onUpdateProfile)} style={"create"}
                                          children={<EditIcon/>}/>
                        </Flex>
                    </>
                )}
            </>
        );
    }
}

export default Profile;