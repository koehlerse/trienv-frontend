import Header from "./components/Header";

import { createStore } from "solid-js/store";
import { UserContext } from "./context/UserContext";

function App(props) {
  const [user, setUser] = createStore([
    {
        email: "",
        password: "",
        username: ""
    }
  ])

  return (
    <div class="min-h-screen bg-trienv-background-500">
      <UserContext.Provider value={[user, setUser]}>
        <Header />
        <div class="ml-32">{props.children}</div>
      </UserContext.Provider>
    </div>
    
  );
}

export default App;
