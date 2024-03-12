import { A, useNavigate } from "@solidjs/router";
import { createSignal, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { api } from "../utilities/api";
import jsCookie from "js-cookie";
import { UserContext } from "../context/UserContext";
import { getUser } from "../utilities/getUser";

export default function Login() {
  const router = useNavigate();

  const [error, setError] = createSignal(null);

  const [userInput, setUserInput] = createStore({
    email: "",
    password: "",
  });

  const [user, setUser] = useContext(UserContext);

  async function login() {
    if (userInput.email === "" || userInput.password === "") {
      setError("Bitte füllen Sie alle Felder aus!");
      return;
    }

    const userData = new URLSearchParams(userInput);

    const res = await api.post('/auth/signin', userData);

    if (res.status == 403) {
      setError("Email oder Password falsch.");
      return;
    }

    const data = res.data;

    jsCookie.set("trienv_refresh_token", data["refresh_token"], { sameSite: "strict", expires: 7 });
    jsCookie.set("trienv_access_token", data["access_token"] , { sameSite: "strict", expires: 7 });

    setUser(await getUser());

    router("/browser");
  }

  return (
    <div class="h-screen w-screen justify-center items-center flex">
      <div class="w-72 p-5 border-2 border-black border-solid rounded-md shadow-md shadow-black">
        <h3 class="mb-5 text-center">Anmelden</h3>
        <div class="mb-4">
          <label class="mb-1.5 block">Email</label>
          <input
            class="w-full p-2 border-2 border-black border-solid rounded-sm"
            type="email"
            name="email"
            onChange={(e) => setUserInput({ ...user, email: e.target.value })}
            required
          />
        </div>
        <div class="mb-4">
          <label class="mb-1,5 block">Password</label>
          <input
            class="w-full p-2 border-2 border-black border-solid rounded-sm"
            type="password"
            name="password"
            onChange={(e) => setUserInput({ ...user, password: e.target.value })}
            required
          />
        </div>
        {error() && (
          <span class="text-red-500 bg-white p-1 rounded-md">{error()}</span>
        )}
        <button
          class="w-full p-2.5 mt-2 bg-gradient-to-tr from-trienv-light-blue-300 via-trienv-blue-500 to-trienv-blue-700 hover:bg-gradient-to-br text-white border-none rounded-sm curser-pointer"
          onClick={login}
        >
          Anmelden
        </button>
        <span>
          Noch keinen Account? <A href="/register">Hier klicken.</A>
        </span>
      </div>
    </div>
  );
}
