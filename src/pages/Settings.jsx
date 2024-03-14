import { createEffect } from "solid-js";
import { checkUser } from "../utilities/checkUser";
import { useNavigate } from "@solidjs/router";
import ChangeBackgroundColor from "../components/ChangeBackgroundColor";
import ChangeName from "../components/ChangeName"
import { createSignal } from "solid-js";
import ChangeUserPicture from "../components/ChangeUserPicture";
function Settings() {
    const router = useNavigate();

    createEffect(() => {
        if (!checkUser()) {
            router("/login");
        }
    }, { once: true });
  
    const [showChangeName, setShowChangeName] = createSignal(false);
    const [showChangeBackground, setShowChangeBackground] = createSignal(false);
    const [showChangeUserPicture, setShowChangeUserPicture] = createSignal(false);

    const handleNameButtonClick = () => {
        setShowChangeName(true);
        setShowChangeBackground(false);
        setShowChangeUserPicture(false);
    }

    const handleBackgroundButtonClick = () => {
        setShowChangeName(false);
        setShowChangeBackground(true);
        setShowChangeUserPicture(false);
    }

    const handleUserPictureButtonClick = () => {
        setShowChangeName(false);
        setShowChangeBackground(false);
        setShowChangeUserPicture(true);
    }

    return (
        <div class="h-screen w-full flex justify-center items-center">
            <div class="w-96 p-5 border border-trienv-shade-500 border-solid rounded-md shadow shadow-trienv-shade-500">
                <h1 class="mb-5 text-center text-2xl">Settings</h1>
                <div>
                    {showChangeName() && <ChangeName /> }
                    {showChangeBackground() && <ChangeBackgroundColor /> }
                    {showChangeUserPicture() && <ChangeUserPicture />}
                    <button onClick={handleNameButtonClick} class="w-full p-2.5 mt-2 mb-2 trienv-button">Name ändern</button>
                    <button onClick={handleBackgroundButtonClick} class="w-full p-2.5 mt-2 mb-2 trienv-button">Hintergrundfarbe ändern</button>
                    <button onClick={handleUserPictureButtonClick} class="w-full p-2.5 mt-2 mb-2 trienv-button">Profilbild hochladen</button>
                </div>
            </div>
        </div>
    )
} 

export default Settings;