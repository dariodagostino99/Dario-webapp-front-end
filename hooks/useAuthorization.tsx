import {useEffect, useState} from "react";
import {useToast} from "@chakra-ui/react";
import {useRouter} from "next/router";


const useAuthorization = () => {
    const [user, setUser] = useState(null);
    const [authToken, setAuthToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const router = useRouter();

    useEffect(() => {
        const currentUser = localStorage.getItem("user");
        const authToken = localStorage.getItem("authToken");
        if (currentUser !== "null") {
            setUser(JSON.parse(currentUser));
        }
        if (authToken !== "null") {
            setAuthToken(JSON.parse(authToken));
        }
    }, []);

    const onLogOut = async () => {
        localStorage.setItem("user", null);
        localStorage.setItem("authToken", null);
        const currentUser = localStorage.getItem("user");
        const authToken = localStorage.getItem("authToken");
        setUser(JSON.parse(currentUser));
        setAuthToken(JSON.parse(authToken));
    }

    const onLogIn = async (formData: any) => {
        const options = {
            method: "GET"
        }
        const user = await fetch(`http://localhost:8080/v1/users/${formData.email}/${formData.password}`, options).then(response => response.json());
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        //
        const authorization = await fetch(`http://localhost:8080/v1/authorization/${user.id}`, options).then(response => response.json());
        localStorage.setItem("authToken", JSON.stringify(authorization.authToken));
        setAuthToken(authorization.authToken);
    }

    const onRefreshPage = (redirect?: string) => {
        setLoading(true);
        if (redirect !== undefined) {
            router.push(redirect).then(() => {
                location.reload();
            });
        } else {
            location.reload();
        }
        setLoading(false);
    }

    return (
        { user, onLogOut, onRefreshPage, loading, onLogIn, authToken }
    );
}

export default useAuthorization;