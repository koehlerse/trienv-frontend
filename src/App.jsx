import Header from "./components/Header";
import { createEffect } from "solid-js";
import { getUser } from "./utilities/getUser";
import { createStore } from "solid-js/store";
import { UserContext } from "./context/UserContext";
import { checkUser } from "./utilities/checkUser";

function App(props) {
  const [user, setUser] = createStore(
    {
      user_id: 1,
      email: "",
      username: "",
      tag: "",
      image: "",
      bg_color: "",
      admin: 0,
      created_at: "",
      updated_at: ""
    }
  );

  createEffect(() => {
    if (!checkUser()) { 
      setUser({});
      return; 
    }
    getUser().then((user) => {
      setUser(user);
    })
  }, { once: true }) 

  return (
    <div class="min-h-screen">
      <UserContext.Provider value={[user, setUser]}>
        <Header />
        <div>{props.children}</div>
      </UserContext.Provider>
    </div>
    
  );
}

export default App;
