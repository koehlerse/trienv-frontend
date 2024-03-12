/* eslint-disable no-useless-catch */
import { A, useNavigate } from "@solidjs/router";
import { createStore } from "solid-js/store";
import { createSignal } from "solid-js";
import { api } from "../utilities/api";

export default function Register() {
  const router = useNavigate();

  const [error, setError] = createSignal(null);

  const [user, setUser] = createStore({
    email: "",
    password: "",
    username: "",
  });

  async function register() {
    if (user.email === "" || user.password === "" || user.username === "") {
      setError("Bitte füllen Sie alle Felder aus.");
      return;
    }

    const userData = new URLSearchParams(user);

    const response = await api.post('/auth/signup', userData);

    if (response.status == 403) {
      setError("E-Mail schon verwendet.");
      return;
    }
    

    router('/login');
  }

  return (
    <div class="h-screen w-screen justify-center items-center flex">
      <div class="w-72 p-5 border-2 border-black border-solid rounded-md shadow-md shadow-black">
        <h3 class="mb-5 text-center">Registrieren</h3>
        <div class="mb-4">
          <label class="mb-1.5 block">Email</label>
          <input
            class="w-full p-2 border-2 border-black border-solid rounded-sm"
            type="email"
            name="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>
        <div class="mb-4">
          <label class="mb-1.5 block">Passwort</label>
          <input
            class="w-full p-2 border-2 border-black border-solid rounded-sm"
            type="password"
            name="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
        </div>
        <div class="mb-4">
          <label class="mb-1.5 block">Benutzername</label>
          <input
            class="w-full p-2 border-2 border-black border-solid rounded-sm"
            type="text"
            name="username"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            required
          />
        </div>
        {error() && (
          <span class="text-red-500 bg-white p-1 rounded-md">
            {error()}
          </span>
        )}

        <button
          class="w-full p-2.5 mt-2 bg-blue_2-500 text-white border-none rounded-sm curser-pointer"
          onClick={register}
        >
          Registrieren
        </button>
        <span>
          Schon einen Account? <A href="/login">Login hier</A>
        </span>
      </div>
    </div>
  );
}
