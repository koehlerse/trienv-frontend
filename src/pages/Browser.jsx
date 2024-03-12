import SceneCard from "../components/SceneCard";
import { api } from "../utilities/api";
import { createEffect, createResource, createSignal, For } from "solid-js";
import { checkUser } from "../utilities/checkUser";
import { useNavigate } from "@solidjs/router";

function Browser() {

  const router = useNavigate();

  createEffect(() => {
    if (!checkUser()) {
      router("/login");
    }
  }, { once: true });

  async function getScenes(query) {
    try {
      let param = "";

      if (query == "") {
        param = "sceneId=all";
      } else {
        param = `name=${query}`;
      }

      console.log(param)

      const res = await api.get(`/scenes?${param}`);
      return res.data
    } catch (err) {
      return null;
    }
  }
  const [search, setSearch] = createSignal("");
  const [sceneData] = createResource(() => search(), getScenes);

  return (
    <div class="ml-24 min-h-screen p-10">
      <h1 class="text-4xl font-semibold mb-8">
        Szenenbrowser
      </h1>
      <div class="pb-8">
        <h2 class="p-1 rounded-md border-2 border-trienv-shade-300 shadow-lg w-64">
          <input type="text" placeholder="Name..." 
            class="rounded-sm p-1 w-full focus:ring-2 focus:ring-offset-4 ring-trienv-light-blue-500 outline-none" 
            onChange={(e) => setSearch(e.target.value)}
          />
        </h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 min-[1080px]:grid-cols-3 2xl:grid-cols-4 min-[1800px]:grid-cols-5 gap-12 justify-evenly justify-items-center items-center content-center">
        {sceneData() &&
          <For each={sceneData().scenes}>
          {
            (item) => <SceneCard name={item.name} description={item.description} banner_url={item.banner_url}/>
          }
          </For>
        }
      </div>
    </div>
  );
}
export default Browser;
