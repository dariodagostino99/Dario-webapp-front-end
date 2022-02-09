import {useEffect, useState} from "react";
import {useToast} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {set} from "react-hook-form";


const useAuthorization = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const router = useRouter();

    useEffect(() => {
        const currentUser = localStorage.getItem("user");
        if (currentUser !== "null") {
            setUser(JSON.parse(currentUser));
        }
    }, []);

    const onLogOut = () => {
        setLoading(true);
        localStorage.setItem("user", null);
        const currentUser = localStorage.getItem("user");
        setUser(JSON.parse(currentUser));
        setLoading(false);
    }

    const onLogIn = (formData: any) => {
        setLoading(true);
        const options = {
            method: "GET"
        }
        fetch(`http://localhost:8080/v1/users/${formData.email}/${formData.password}`, options)
            .then((response: Response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        const user = JSON.stringify(data);
                        localStorage.setItem("user", user);
                        setUser(JSON.parse(user));
                        onRefreshPage("/");
                        setLoading(false);
                    })
                } else {
                    toast({
                        title: "User not found",
                        description: "The account does no exists.",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                        position: "top-right"
                    })
                    setLoading(false);
                }
            })
    }

    const onRefreshPage = (redirect?: string) => {
        setLoading(true);
        if (redirect !== undefined){
            router.push(redirect).then(() => {
                location.reload();
                setLoading(false);
            });
        } else {
            location.reload();
            setLoading(false);
        }
    }

    return (
        {user, onLogOut, onLogIn, onRefreshPage, loading}
    );
}

export default useAuthorization;