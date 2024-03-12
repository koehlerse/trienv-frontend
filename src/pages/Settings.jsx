function Settings() {
    return (
        <div class="h-screen w-full flex justify-center items-center">
            <div class="w-72 p-5 border border-trienv-shade-500 border-solid rounded-md shadow shadow-trienv-shade-500">
                <h1 class="mb-5 text-center text-2xl">Settings</h1>
                <div class="mb-4">
                    <label class="mb-1.5 block">Username ändern</label>
                    <input class="w-full p-2 border border-black border-solid rounded-sm" type="text" name="username" required/>
                </div>

                <div class="mb-4">
                    <label class="mb-1.5 block">Tag ändern</label>
                    <input class="w-full p-2 border border-black border-solid rounded-sm" type="text" required/>
                </div>
                <button class="w-full p-2.5 mt-2 mb-2 bg-trienv-blue-600 hover:bg-trienv-light-blue-700 transition-colors text-white border-none rounded-md curser-pointer">Speichern</button>
                <div class="mb-4">
                    <label class="mb-1.5 block">Hintergrundfarbe ändern</label>
                    <input class="w-full p-2 border border-solid border-black rounded-sm" type="text" data-coloris/>
                </div>
                <button class="w-full p-2.5 mt-2 mb-2 bg-trienv-blue-600 hover:bg-trienv-light-blue-700 transition-colors text-white border-none rounded-md curser-pointer">Speichern</button>
            </div>
        </div>
    )
}

export default Settings