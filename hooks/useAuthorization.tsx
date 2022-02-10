import {useEffect, useState} from "react";
import {useRouter} from "next/router";


const useAuthorization = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const currentUser = localStorage.getItem("user");
        if (currentUser !== "null") {
            setUser(JSON.parse(currentUser));
        }
    }, []);

    const onLogOut = async () => {
        localStorage.setItem("user", null);
        const currentUser = localStorage.getItem("user");
        setUser(JSON.parse(currentUser));
    }

    const onLogIn = async (formData: any) => {
        const options = {
            method: "GET"
        }
        const user = await fetch(`http://localhost:8080/v1/users/${formData.email}/${formData.password}`, options).then(response => response.json());
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
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
        { user, onLogOut, onRefreshPage, loading, onLogIn, authToken: user?.authToken }
    );
}

export default useAuthorization;