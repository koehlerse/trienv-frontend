import clsx from "clsx";
import { createSignal } from "solid-js";

export default function ProfileSceneCard(props) {
    const [show, setShow] = createSignal(false);

    return (
        <>
            <div class={clsx("w-80 h-52 hover:bg-trienv-shade-500",
                "text-center rounded-md cursor-pointer transition-all duration-300",
                "ease-in-out hover:-translate-y-1 flex flex-col items-center justify-center bg-cover bg-center", !props.banner_url && "bg-trienv-shade-300")}
                style={{ "background-image": clsx(props.banner_url && `url(${props.banner_url})`) }}
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
            >
                <h1 class={clsx("text-2xl font-semibold transition-transform duration-300 ease-in-out", show() ? "" : "translate-y-2")}>
                    {props.name}
                </h1>
                <p class={clsx(show() ? "opacity-100" : "opacity-0", "transition-opacity duration-300 ease-in-out")}>
                    {props.description}
                </p>
            </div>
        </>
    )
}