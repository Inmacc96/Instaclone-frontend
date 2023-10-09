import { Button } from "semantic-ui-react";
import useAuth from "../../../../hooks/useAuth";
import "./HeaderProfile.scss";

interface HeaderProfileProps {
  username?: string;
}

const HeaderProfile = ({ username }: HeaderProfileProps) => {
  const { auth } = useAuth();

  return (
    <div className="header-profile">
      <h2>{username}</h2>
      {auth && username === auth.username ? (
        <Button>Ajustes</Button>
      ) : (
        <Button>Seguir</Button>
      )}
    </div>
  );
};

export default HeaderProfile;
