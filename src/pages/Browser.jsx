import Content from "../components/Content";

function Browser() {
  return (
    <div class="min-h-screen">
      <div class="flex justify-center items-center">
        <div class="fixed">
          <input
            class="w-96 p-2.5 mt-40 border-8 border-trienv-navbar-900 rounded-md "
            type="text"
            placeholder="Suche ..."
          />
        </div>
      </div>

      <div class="flex justify-center items-center">
        <Content />
        <Content />
        <Content />
      </div>
    </div>
  );
}
export default Browser;
