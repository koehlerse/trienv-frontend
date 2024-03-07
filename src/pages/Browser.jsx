import Content from "../components/Content";

function Browser() {
  return (
    <div class="min-h-screen">
      <div class="flex justify-center items-center">
        <div class="fixed ml-20 bg-gradient-to-br mt-40 from-trienv-light-blue-300 via-trienv-blue-500 to-trienv-blue-700 p-1 rounded-md">
          <input
            class="w-96 p-1 rounded-md "
            type="text"
            placeholder="Suche ..."
          />
        </div>
      </div>

      <div class="grid grid-cols-3 justify-center items-center min-h-screen mt-14 ml-48">
        <Content />
        <Content />
        <Content />
        <Content />
      </div>
    </div>
  );
}
export default Browser;
