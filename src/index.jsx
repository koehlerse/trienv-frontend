/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import App from "./App";
import "./index.css";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Browser from "./pages/Browser";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Registration from "./pages/Registration"; 
import { UserContextProvider } from "./context/UserContext";
const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(
  () => (
    
    <Router root={App}>
      <UserContextProvider>
        <Route path="/" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/browser" component={Browser} />
        <Route path="/settings" component={Settings} />
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
      </UserContextProvider>
    </Router>
    
  ),
  root
);
