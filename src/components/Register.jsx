import { A } from '@solidjs/router'
import { useUserContext } from '../context/UserContext'

export default function Register() {

    const {user, setUser} = useUserContext();

    return (
        <div class="h-full justify-center items-center flex">
            <form class="w-72 p-5 border-2 border-black border-solid rounded-md shadow-md shadow-black">
                <h3 class="mb-5 text-center">Registrieren</h3>
                <div class="mb-4">
                    <label class="mb-1.5 block">Email</label>
                    <input class="w-full p-2 border-2 border-black border-solid rounded-sm" type="email" onInput={(e) => setUser['email'](e.target.value)} required/>
                </div>
                <div class="mb-4">
                    <label class="mb-1.5 block">Passwort</label>
                    <input class="w-full p-2 border-2 border-black border-solid rounded-sm" type="password" onInput={(e) => setUser['password'](e.target.value)}  required/>
                </div>
                <div class="mb-4">
                    <label class="mb-1.5 block">Benutzername</label>
                    <input class="w-full p-2 border-2 border-black border-solid rounded-sm" type="text" onInput={(e) => setUser['username'](e.target.value)} required/>
                </div>
                
                <button class="w-full p-2.5 bg-blue_2-500 text-white border-none rounded-sm curser-pointer" type="submit">Registrieren</button>
                <span>Schon einen Account? <A href="../pages.Login.jsx">Login hier</A></span>
            </form>
            <p>Der Name lautet {user['username']}</p>
        </div> 
    )
}