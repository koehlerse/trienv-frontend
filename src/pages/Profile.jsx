import { UserContext } from "../context/UserContext";
import { useContext } from "solid-js";

function Profile() {

    const [user] = useContext(UserContext);
  return (
    <div class="grid grid-cols-4 gap-10">
          <p>Dein Name lautet {user.username} </p>
          <p>Deine Email lautet {user.email} </p>
        
    </div>
  ); 
}

export default Profile;
