import { Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import useAuth from "../../../../hooks/useAuth";
import { FOLLOW_USER, IS_FOLLOWING } from "../../../../gql/follow";
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
  const [followUser] = useMutation(FOLLOW_USER, {
    update(cache) {
      cache.writeQuery({
        query: IS_FOLLOWING,
        variables: { username },
        data: {
          isFollowing: true,
        },
      });
    },
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
      <Button className="btn-action" onClick={onFollow}>
        Follow
      </Button>
    );
  };

  const onFollow = async () => {
    try {
      await followUser({ variables: { username } });
    } catch (error) {
      const err = error as ApolloError;
      toast.error(err.message);
    }
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
