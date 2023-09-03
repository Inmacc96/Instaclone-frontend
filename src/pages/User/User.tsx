import { useParams } from "react-router-dom";
import Profile from "../../components/Profile";

const User = () => {
  const { username } = useParams();

  return (
    <div>
      <Profile username={username} />
    </div>
  );
};

export default User;
