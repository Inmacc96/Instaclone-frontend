import { useState } from "react";
import { Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { COUNT_LIKES, DISLIKE, IS_LIKE, LIKE } from "../../../../gql/like";
import "./Actions.scss";

interface IActionsProps {
  idPost: string;
}

const Actions = ({ idPost }: IActionsProps) => {
  const [isLoadingAction, setIsLoadingAction] = useState(false);
  const { loading, error, data } = useQuery(IS_LIKE, { variables: { idPost } });
  const {
    loading: loadingCountLikes,
    error: errorCountLikes,
    data: dataCountLikes,
  } = useQuery(COUNT_LIKES, { variables: { idPost } });
  const [like] = useMutation(LIKE, {
    update: (cache) => {
      cache.writeQuery({
        query: IS_LIKE,
        variables: { idPost },
        data: {
          isLike: true,
        },
      });

      const countLikesQuery = cache.readQuery({
        query: COUNT_LIKES,
        variables: { idPost },
      });

      if (
        countLikesQuery?.countLikes !== undefined &&
        countLikesQuery?.countLikes !== null
      ) {
        cache.writeQuery({
          query: COUNT_LIKES,
          variables: { idPost },
          data: {
            countLikes: countLikesQuery.countLikes + 1,
          },
        });
      }
    },
  });
  const [dislike] = useMutation(DISLIKE, {
    update: (cache) => {
      cache.writeQuery({
        query: IS_LIKE,
        variables: { idPost },
        data: {
          isLike: false,
        },
      });

      const countLikesQuery = cache.readQuery({
        query: COUNT_LIKES,
        variables: { idPost },
      });

      if (
        countLikesQuery?.countLikes !== undefined &&
        countLikesQuery?.countLikes !== null
      ) {
        cache.writeQuery({
          query: COUNT_LIKES,
          variables: { idPost },
          data: {
            countLikes: countLikesQuery.countLikes - 1,
          },
        });
      }
    },
  });

  const onLike = async () => {
    setIsLoadingAction(true);
    try {
      await like({ variables: { idPost } });
    } catch (error) {
      const err = error as ApolloError;
      toast.error(err.message);
    } finally {
      setIsLoadingAction(false);
    }
  };

  const onDislike = async () => {
    setIsLoadingAction(true);
    try {
      await dislike({ variables: { idPost } });
    } catch (error) {
      const err = error as ApolloError;
      toast.error(err.message);
    } finally {
      setIsLoadingAction(false);
    }
  };

  const onAction = () => {
    if (!isLoadingAction) {
      isLike ? onDislike() : onLike();
    }
  };

  if (loading || error || loadingCountLikes || errorCountLikes) return null;

  const { isLike } = data!;
  const { countLikes } = dataCountLikes!;

  return (
    <div className="actions">
      <Icon
        className={isLike ? "like active" : "like"}
        name={isLike ? "heart" : "heart outline"}
        onClick={onAction}
      />
      {countLikes} {countLikes === 1 ? "like" : "likes"}
    </div>
  );
};

export default Actions;
