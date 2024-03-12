import { createEffect } from "solid-js";
import { checkUser } from "../utilities/checkUser";
import { useNavigate } from "@solidjs/router";
import ChangeBackgroundColor from "../components/ChangeBackgroundColor";
import ChangeName from "../components/ChangeName"
import { createSignal } from "solid-js";
function Settings() {
    const router = useNavigate();

    createEffect(() => {
        if (!checkUser()) {
            router("/login");
        }
    }, { once: true });
  
    const [showChangeName, setShowChangeName] = createSignal(false);
    const [showChangeBackground, setShowChangeBackground] = createSignal(false);

    return (
        <div class="h-screen w-full flex justify-center items-center">
            <div class="w-96 p-5 border border-trienv-shade-500 border-solid rounded-md shadow shadow-trienv-shade-500">
                <h1 class="mb-5 text-center text-2xl">Settings</h1>
                <div>
                    {!showChangeName() ? <div> </div>  : <ChangeName />}
                    {!showChangeBackground() ? <div> </div> : <ChangeBackgroundColor />}
                    <button onClick={() => setShowChangeName(!showChangeName())} class="w-full p-2.5 mt-2 mb-2 bg-trienv-blue-600 hover:bg-trienv-light-blue-700 transition-colors text-white border-none rounded-md curser-pointer">Name ändern</button>
                    <button onClick={() => setShowChangeBackground(!showChangeBackground())} class="w-full p-2.5 mt-2 mb-2 bg-trienv-blue-600 hover:bg-trienv-light-blue-700 transition-colors text-white border-none rounded-md curser-pointer">Hintergrundfarbe ändern</button>
                </div>
            </div>
        </div>
    )
} 

export default Settings;