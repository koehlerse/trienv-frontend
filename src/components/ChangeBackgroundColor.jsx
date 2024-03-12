import { createSignal } from "solid-js";
import { api } from "../utilities/api";
export default function ChangeBackgroundColor() {
    
    const [error, setError] = createSignal(null);

    const [backgroundColor, setBackgroundColor] = createSignal("");
    
    async function changeBackground() {
        if (backgroundColor.color === "") {
            setError("Bitte das Feld ausfüllen!!");
        }
        console.log(backgroundColor());
        const userColor = new URLSearchParams();
        userColor.append("new_color", backgroundColor())
        await api.patch('/user/color', userColor);
        
    }

    return (
        <div class="flex justify-center items-center">
            <div class="p-2">
                <div class="mb-2.5">
                    <input onChange={(e) => setBackgroundColor(e.target.value)} class="p-2 border border-solid border-trienv-shade-700 rounded-md" type="text" placeholder="Farbe ändern" data-coloris/>
                </div>
                {error() && (
                    <span class="text-red-500 bg-white p-1 rounded-md">{error()}</span>
                )}
                <button onClick={changeBackground} class="w-full p-2.5 mt-2 mb-2 bg-trienv-blue-600 hover:bg-trienv-light-blue-700 transition-colors text-white border-none rounded-md curser-pointer">Speichern</button>
            </div>
        </div>
    );
}