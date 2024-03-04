
import { createContext, useContext } from "solid-js";

export const UserContext = createContext();

export function useUserContext() {
    return useContext(UserContext);
}
