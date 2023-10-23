import { Button } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import useAuth from "../../../../hooks/useAuth";
import { IS_FOLLOWING } from "../../../../gql/follow";
import "./HeaderProfile.scss";

interface HeaderProfileProps {
  username: string;
  handlerModal: (v: string) => void;
}

const HeaderProfile = ({ username, handlerModal }: HeaderProfileProps) => {
  const { auth } = useAuth();
  const { loading, data } = useQuery(IS_FOLLOWING, {
    variables: { username },
  });

  const buttonFollow = () => {
    if (data?.isFollowing) {
      return (
        <Button className="btn-danger" onClick={() => console.log("unfollow")}>
          Unfollow
        </Button>
      );
    }
    return (
      <Button className="btn-action" onClick={() => console.log("follow")}>
        Follow
      </Button>
    );
  };

  return (
    <div className="header-profile">
      <h2>{username}</h2>
      {username === auth?.username ? (
        <Button onClick={() => handlerModal("settings")}>Settings</Button>
      ) : (
        !loading && buttonFollow()
      )}
    </div>
  );
};

export default HeaderProfile;
