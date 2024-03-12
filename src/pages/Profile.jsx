import { UserContext } from "../context/UserContext";
import { createEffect, createResource, useContext, For, createSignal } from "solid-js";
import { createDropzone } from "@solid-primitives/upload";
import { checkUser } from "../utilities/checkUser";
import { useNavigate } from "@solidjs/router";
import ProfileSceneCard from "../components/ProfileSceneCard";
import { api } from "../utilities/api";
import { createStore } from "solid-js/store";
import clsx from "clsx";
import jsCookie from "js-cookie";

function Profile() {

  const router = useNavigate();
  const [isOpen, setOpen] = createSignal(false);
  const [error, setError] = createSignal("");

  const [sceneData, setSceneData] = createStore(
    {
      name: null,
      description: null,
    }
  );

  const { setRef: dropzoneSceneRef, files: droppedSceneFiles } = createDropzone();
  const { setRef: dropzoneIconRef, files: droppedIconFiles } = createDropzone();
  const { setRef: dropzoneBannerRef, files: droppedBannerFiles } = createDropzone();

  async function getProfileScenes() {
    try {
      const res = await api.get("/scenes/all");
      console.log(res.data.scenes)
      return res.data
    } catch (err) {
      return null;
    }
  }

  async function uploadScene() {
    if (
      !sceneData.name ||
      !sceneData.description ||
      droppedSceneFiles().length <= 0 ||
      droppedIconFiles().length <= 0 ||
      droppedBannerFiles().length <= 0
    ) {
      setError("Alle Felder müssen gefüllt sein.")
      return;
    }

    try {
      const sceneRes = await api.post("/scenes", new URLSearchParams(sceneData));

      const newScene = sceneRes.data.scene;

      const sceneFileData = new FormData();
      sceneFileData.append("scene_id", newScene.scene_id);
      sceneFileData.append("scene", droppedSceneFiles().at(0).file);

      await api.patch("/scenes/data", sceneFileData);

      const iconFileData = new FormData();
      iconFileData.append("scene_id", newScene.scene_id);
      iconFileData.append("icon", droppedIconFiles().at(0).file);

      await api.patch("/scenes/icon", iconFileData);

      const bannerFileData = new FormData();
      bannerFileData.append("scene_id", newScene.scene_id);
      bannerFileData.append("banner", droppedBannerFiles().at(0).file);

      await api.patch("/scenes/banner", bannerFileData);

      setOpen(false);

    } catch (err) {
      if (err.response.status == 403) {
        setError("Ihre letzte Szene wird noch bearbeitet.");
        return;
      }
    }
  }

  const [userScenes] = createResource(getProfileScenes);

  createEffect(() => {
    if (!checkUser()) {
      router("/login");
    }
  }, { once: true });

  const [user, setUser] = useContext(UserContext);
  return (
    <>
      <div class="ml-24">
        <div class="px-8 py-4">
          <h1 class="font-semibold text-4xl">Profil</h1>
          <div class="w-full pt-8 flex items-center justify-center">
            <div class="bg-white border-trienv-shade-100 shadow-lg border-2 rounded-lg p-1.5 w-fit flex flex-col items-center">
              {user.image ?
                <img src={user.image} alt="UserProfileIcon" />
                :
                <img src="/unknown_user.svg" alt="UserProfileIcon" class="w-48 h-48"/>
              }
              <p>{user.username + " #" + user.tag} </p>
              <p>E-Mail: {user.email} </p>
              <p>Account erstellt am {new Date(user.created_at).toLocaleDateString("de")}</p>
              <button class="bg-trienv-blue-400 font-medium p-1 mt-2 rounded-lg hover:bg-trienv-blue-500 hover:text-white transition-colors duration-300 ease-in-out"
                onClick={() => {
                  jsCookie.remove("trienv_refresh_token");
                  jsCookie.remove("trienv_access_token");
                  setUser(null);

                  router("/login");
                }}
              >
                Abmelden
              </button>
            </div>
          </div>
          <h1 class="font-semibold text-4xl pt-8">Szenen</h1>
          <button
            class="bg-trienv-blue-400 font-medium p-1.5 mt-2 mb-4 rounded-lg hover:bg-trienv-blue-500 hover:text-white transition-colors duration-300 ease-in-out"
            onClick={() => setOpen(true)}
          >
            Szene hinzufügen
          </button>
          <div class="grid grid-cols-1 md:grid-cols-2 min-[1080px]:grid-cols-3 2xl:grid-cols-4 min-[1800px]:grid-cols-5 gap-12 justify-evenly justify-items-center items-center content-center">
            {userScenes() &&
              <For each={userScenes().scenes}>
                {(item) =>
                  <ProfileSceneCard name={item.name} description={item.description} banner_url={item.banner_url}/>
                }
              </For>
            }
          </div>
        </div>
      </div>
      <div class={clsx("fixed inset-0 bg-trienv-shade-700 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center transition-all duration-500 ease-in-out",
        isOpen() ? "opacity-100" : "opacity-0 pointer-events-none")}
      >
        <div class={clsx("p-8 border w-[30rem] shadow-lg rounded-md bg-white transition-all duration-500 ease-in-out", isOpen() ? "opacity-100 scale-100" : "opacity-0 scale-75")}>
          <div class="text-center">
            <h3 class="text-2xl font-bold text-electos-black-950">Szene erstellen</h3>
            <div class="mt-2 px-7 py-3">
              <div class="p-0.5 rounded-md border-2 border-trienv-shade-300 shadow-lg w-full">
                <input type="text" placeholder="Name..."
                  class="rounded-sm p-0.5 w-full focus:ring-2 focus:ring-offset-4 ring-trienv-light-blue-500 outline-none"
                  onChange={(e) => setSceneData({ ...sceneData, name: e.target.value })}
                />
              </div>
              <div class="p-0.5 rounded-md border-2 border-trienv-shade-300 shadow-lg w-full mt-2">
                <input type="text" placeholder="Beschreibung..."
                  class="rounded-sm p-0.5 w-full focus:ring-2 focus:ring-offset-4 ring-trienv-light-blue-500 outline-none"
                  onChange={(e) => setSceneData({ ...sceneData, description: e.target.value })}
                />
              </div>
              <div class="mt-4 flex flex-row gap-4 items-center justify-center">
                <div ref={dropzoneSceneRef} class="w-28 h-28 bg-trienv-light-blue-200 rounded-lg flex flex-col items-center justify-center">
                  <span class="font-medium">Szene</span>
                  <span class="font-medium">max. 50MB</span>
                  <For each={droppedSceneFiles()}>{file => <p class="text-xs">{file.name}</p>}</For>
                </div>
                <div ref={dropzoneIconRef} class="w-28 h-28 bg-trienv-light-blue-200 rounded-lg flex flex-col items-center justify-center">
                  <span class="font-medium">Icon</span>
                  <span class="font-medium">max. 256KB</span>
                  <For each={droppedIconFiles()}>{file => <p class="text-xs">{file.name}</p>}</For>
                </div>
                <div ref={dropzoneBannerRef} class="w-28 h-28 bg-trienv-light-blue-200 rounded-lg flex flex-col items-center justify-center">
                  <span class="font-medium">Banner</span>
                  <span class="font-medium">max. 4MB</span>
                  <For each={droppedBannerFiles()}>{file => <p class="text-xs">{file.name}</p>}</For>
                </div>
              </div>
            </div>
            <div class="flex flex-col justify-center mt-4">
              {error() &&
                <span class="text-red-500">{error()}</span>
              }
              <button
                class="bg-trienv-blue-400 font-medium p-1.5 mt-2 mb-4 rounded-lg hover:bg-trienv-blue-500 hover:text-white transition-colors duration-300 ease-in-out"
                onClick={async () => await uploadScene()}
              >
                Szene hochladen
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
