import { Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import useAuth from "../../../../hooks/useAuth";
import {
  FOLLOW_USER,
  GET_FOLLOWERS,
  GET_FOLLOWINGS,
  IS_FOLLOWING,
  UNFOLLOW_USER,
} from "../../../../gql/follow";
import "./HeaderProfile.scss";
import { GET_USER } from "../../../../gql/user";

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
      // Actualizar isFollowing
      cache.writeQuery({
        query: IS_FOLLOWING,
        variables: { username },
        data: {
          isFollowing: true,
        },
      });

      // Actualizar getFollowers
      const getFollowersQuery = cache.readQuery({
        query: GET_FOLLOWERS,
        variables: { username },
      });
      const getAuthUserQuery = cache.readQuery({
        query: GET_USER,
        variables: { username: auth?.username },
      });

      if (getFollowersQuery?.getFollowers && getAuthUserQuery?.getUser) {
        cache.writeQuery({
          query: GET_FOLLOWERS,
          variables: { username },
          data: {
            getFollowers: [
              ...getFollowersQuery?.getFollowers,
              getAuthUserQuery?.getUser,
            ],
          },
        });
      }

      // Actualizar getFollowings
      const getFollowingsQuery = cache.readQuery({
        query: GET_FOLLOWINGS,
        variables: { username: auth?.username ?? "" },
      });
      const getCurrentUserQuery = cache.readQuery({
        query: GET_USER,
        variables: { username },
      });

      if (getFollowingsQuery?.getFollowings && getCurrentUserQuery?.getUser) {
        cache.writeQuery({
          query: GET_FOLLOWINGS,
          variables: { username: auth?.username ?? "" },
          data: {
            getFollowings: [
              ...getFollowingsQuery?.getFollowings,
              getCurrentUserQuery?.getUser,
            ],
          },
        });
      }
    },
  });

  const [unFollowUser] = useMutation(UNFOLLOW_USER, {
    update(cache) {
      cache.writeQuery({
        query: IS_FOLLOWING,
        variables: { username },
        data: {
          isFollowing: false,
        },
      });

      // Actualizar getFollowers
      const getFollowersQuery = cache.readQuery({
        query: GET_FOLLOWERS,
        variables: { username },
      });
      const getAuthUserQuery = cache.readQuery({
        query: GET_USER,
        variables: { username: auth?.username },
      });

      if (getFollowersQuery?.getFollowers && getAuthUserQuery?.getUser) {
        cache.writeQuery({
          query: GET_FOLLOWERS,
          variables: { username },
          data: {
            getFollowers: getFollowersQuery.getFollowers.filter(
              (user) => user.id !== getAuthUserQuery.getUser.id
            ),
          },
        });
      }

      // Actualizar getFollowings
      const getFollowingsQuery = cache.readQuery({
        query: GET_FOLLOWINGS,
        variables: { username: auth?.username ?? "" },
      });
      const getCurrentUserQuery = cache.readQuery({
        query: GET_USER,
        variables: { username },
      });

      if (getFollowingsQuery?.getFollowings && getCurrentUserQuery?.getUser) {
        cache.writeQuery({
          query: GET_FOLLOWINGS,
          variables: { username: auth?.username ?? "" },
          data: {
            getFollowings: getFollowingsQuery.getFollowings.filter(
              (user) => user.id !== getCurrentUserQuery.getUser.id
            ),
          },
        });
      }
    },
  });

  const buttonFollow = () => {
    if (data?.isFollowing) {
      return (
        <Button className="btn-danger" onClick={onUnFollow}>
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

  const onUnFollow = async () => {
    try {
      await unFollowUser({ variables: { username } });
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
