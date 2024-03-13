import { createSignal, For } from "solid-js";
import { createDropzone } from "@solid-primitives/upload";
import { api } from "../utilities/api";
export default function ChangeUserPicture() {

    const [error, setError] = createSignal("");

    const { setRef: dropzoneUserPictureRef, files: droppedUserPictureFile } = createDropzone();


    async function uploadUserPicture() {
        if (droppedUserPictureFile().length <= 0) {
            setError("Bitte Bild hochladen.");
            return;
        }

        try {
            const pictureFileData = new FormData();
            pictureFileData.append("image", droppedUserPictureFile().at(0).file);
            await api.post("/user/image", pictureFileData);
        } catch (err) {
            if (err.reponse.status == 422) {
                setError("Das Bild ist zu groß.");
                return;
            }
        }
    }

    return (
        <div class="flex justify-center items-center">
            <div class="p-2 flex flex-col justify-center items-center">
                <span class="font-medium mb-2.5">Bild hochladen</span>
                <div ref={dropzoneUserPictureRef()} class=" mt-2.5 mb-2.5 w-28 h-28 bg-trienv-light-blue-200 rounded-lg flex flex-col items-center justify-center">
                    <span class="font-medium">max. 256KB</span>
                    <For each={droppedUserPictureFile()}>{file => <p class="text-xs">{file.name}</p>}</For>
                </div>
                {error() && (
                    <span class="text-red-500 bg-white p-1 rounded-md">{error()}</span>
                )}
                <button onClick={async () => await uploadUserPicture()} class="w-full p-2.5 mt-2 mb-2 trienv-button">Speichern</button>
            </div>
        </div>
    );
}