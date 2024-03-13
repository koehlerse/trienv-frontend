import { createStore } from "solid-js/store";
import { createSignal } from "solid-js";
import { api } from "../utilities/api";
export default function ChangeName() {

    const [error, setError] = createSignal(null);

    const [username, setUsername] = createStore({
        name: "",
        tag: "",
    });

    async function changeName() {
        if (username.name === "" || username.tag === "") {
            setError("Bitte alle Felder ausfüllen!!");
        }

        const userData = new URLSearchParams();
        userData.append("new_username", username.name);
        userData.append("new_tag", username.tag);
        await api.patch('/user/username', userData);
    }

    return (
        <div class="flex justify-center items-center">
            <div class="p-2">
                <div class="mb-2.5">
                    <input onInput={(e) => setUsername({...username, name: e.target.value })} class="p-2 border border-solid border-trienv-shade-700 rounded-md" placeholder="Name ändern" type="text"/>
                </div>
                <div class="mb-2.5">
                    <input onInput={(e) => setUsername({...username, tag: e.target.value })} class="p-2 border border-solid border-trienv-shade-700 rounded-md" placeholder="Tag ändern" type="text"/>
                </div>
                {error() && (
                    <span class="text-red-500 bg-white p-1 rounded-md">{error()}</span>
                )}
                <button onClick={changeName} class="w-full p-2.5 mt-2 mb-2 trienv-button">Speichern</button>
            </div>
        </div>
    );
}