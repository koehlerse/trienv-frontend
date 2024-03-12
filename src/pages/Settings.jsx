import { createEffect } from "solid-js";
import { checkUser } from "../utilities/checkUser";
import { useNavigate } from "@solidjs/router";

function Settings() {
    const router = useNavigate();

    createEffect(() => {
        if (!checkUser()) {
            router("/login");
        }
    }, { once: true });

    return (
        <div class="grid grid-cols-4 gap-10 my-">

        </div>
    )
}

export default Settings;