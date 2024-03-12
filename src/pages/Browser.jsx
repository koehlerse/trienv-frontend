import SceneCard from "../components/SceneCard";

function Browser() {
  return (
    <div class="ml-24 min-h-screen p-10">
      <h1 class="text-4xl font-semibold mb-8">
        Szenenbrowser
      </h1>
      <div class="pb-8">
        <h2 class="p-1 rounded-md border-2 border-trienv-shade-300 shadow-lg w-64">
          <input type="text" placeholder="Name..." class="rounded-sm p-1 w-full focus:ring-2 focus:ring-offset-4 ring-trienv-light-blue-500 outline-none" />
        </h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 min-[1080px]:grid-cols-3 2xl:grid-cols-4 min-[1800px]:grid-cols-5 gap-12 justify-evenly justify-items-center items-center content-center">
        <SceneCard />
        <SceneCard />
        <SceneCard />
        <SceneCard />
        <SceneCard />
        <SceneCard />
        <SceneCard />
        <SceneCard />
        <SceneCard />
        <SceneCard />
        <SceneCard />
        <SceneCard />
        <SceneCard />
        <SceneCard />
        <SceneCard />
        <SceneCard />
        <SceneCard />
      </div>
    </div>
  );
}
export default Browser;
