import { Button } from "semantic-ui-react";
import useAuth from "../../../../hooks/useAuth";
import "./HeaderProfile.scss";

interface HeaderProfileProps {
  username?: string;
  handlerModal: (v: string) => void;
}

const HeaderProfile = ({ username, handlerModal }: HeaderProfileProps) => {
  const { auth } = useAuth();

  return (
    <div className="header-profile">
      <h2>{username}</h2>
      {username === auth?.username ? (
        <Button onClick={() => handlerModal("settings")}>Settings</Button>
      ) : (
        <Button>Seguir</Button>
      )}
    </div>
  );
};

export default HeaderProfile;
