import Header from "./components/Header";
import { createEffect } from "solid-js";

import { createStore } from "solid-js/store";
import { UserContext } from "./context/UserContext";
import { api } from "./utilities/api";
import { checkUser } from "./utilities/checkUser";

function App(props) {
  const [user, setUser] = createStore([
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
  ]);

  async function getUser() {
    try {
      const response = await api.get('/user/me');
      const data = response.data;
      return data;
    } catch (err) {
      return null;
    }
  }

  createEffect(() => {
    if (!checkUser()) { 
      setUser({});
      return; 
    }
    getUser().then((user) => {
      console.log(user);
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
