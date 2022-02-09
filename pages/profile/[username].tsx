import useAuthorization from "../../hooks/useAuthorization";
import {background, Box, Button, Flex, Image, Text} from "@chakra-ui/react";
import {useRouter} from "next/router";
import FacebookIcon from "../../icons/FacebookIcon";
import InstagramIcon from "../../icons/InstagramIcon";
import TwitchIcon from "../../icons/TwitchIcon";
import TwitterIcon from "../../icons/TwitterIcon";
import EditIcon from "../../icons/EditIcon";
import LogOutIcon from "../../icons/LogOutIcon";


const Profile = () => {
    const { user, onLogOut, onRefreshPage, loading } = useAuthorization();
    const router = useRouter();

    const logOut = () => {
        onLogOut();
        onRefreshPage("/");
    }

    if (user === null){
        return(
            <>
                <Text mr={5}>Want to have a profile? <Button onClick={() => router.push("/sign-in")}>Sign up!</Button></Text>
            </>
        );
    } else {
        return(
            <>
                <Flex direction={"column"} justifyContent={"center"} alignContent={"center"} alignItems={"center"}>
                    <Image mb={5} borderRadius={"50%"} src={user.profileImage} height={"300px"} width={"300px"} borderColor={"black"} border={"solid"}/>
                    <Text fontSize={30} mb={5}>{user.username}</Text>
                    <Flex direction={"row"} justifyContent={"space-between"} mb={5} width={"300px"} height={"60px"}>
                        <Flex _hover={{width: "60px", height: "60px", border: "solid", borderColor: "#4867AA", borderRadius: "50%"}} justifyContent={"center"} alignItems={"center"} cursor={"pointer"}>
                            <FacebookIcon />
                        </Flex>
                        <Flex _hover={{width: "60px", height: "60px", border: "solid", borderColor: "#B13878", borderRadius: "50%"}} justifyContent={"center"} alignItems={"center"} cursor={"pointer"}>
                            <InstagramIcon />
                        </Flex>
                        <Flex _hover={{width: "60px", height: "60px", border: "solid", borderColor: "#9146FF", borderRadius: "50%"}} justifyContent={"center"} alignItems={"center"} cursor={"pointer"}>
                            <TwitchIcon />
                        </Flex>
                        <Flex _hover={{width: "60px", height: "60px", border: "solid", borderColor: "#1DA1F2", borderRadius: "50%"}} justifyContent={"center"} alignItems={"center"} cursor={"pointer"}>
                            <TwitterIcon />
                        </Flex>
                    </Flex>
                    <Text fontSize={20}>I am a software developer, enthusiastic about technology. I am always willing to learn new things to grow professionally.</Text>
                    <Flex direction={"row"} justifyContent={"space-between"} width={"250px"} mt={10}>
                        <Button backgroundColor={"#647394"} _hover={{backgroundColor: "#445271"}}><EditIcon /></Button>
                        <Button onClick={logOut} backgroundColor={"#9E496D"} _hover={{backgroundColor: "#6D2142"}}><LogOutIcon /></Button>
                    </Flex>
                </Flex>
            </>
        );
    }
}

export default Profile;