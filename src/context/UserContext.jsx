import { createStore } from "solid-js/store";
import { createContext, useContext } from "solid-js";

export const UserContext = createContext();

export function UserContextProvider(props) {
    const [user, setUser] = createStore([
        {
            email: "",
            password: "",
            username: ""
        }
    ])

    return (
        <UserContext.Provider value={{user, setUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    return useContext(UserContext);
}
