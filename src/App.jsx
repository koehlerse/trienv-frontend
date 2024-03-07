import Header from "./components/Header";
import { createEffect } from "solid-js";

import { createStore } from "solid-js/store";
import { UserContext } from "./context/UserContext";
import { api } from "./utilities/api";

function App(props) {
  const [user, setUser] = createStore([
    {
      id: 1,
      email: "",
      username: "",
      tag: "",
      image: "",
      admin: 0,
      createdAt: "",
      updatedAt: ""
    }
  ])

  async function getUser() {
    const response = await api.get('/user/me');
    const data = response.data;
    return data;
  }

  createEffect(() => {
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
