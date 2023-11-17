import { Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { IS_LIKE, LIKE } from "../../../../gql/like";
import "./Actions.scss";

interface IActionsProps {
  idPost: string;
}

const Actions = ({ idPost }: IActionsProps) => {
  const { loading, error, data } = useQuery(IS_LIKE, { variables: { idPost } });
  const [like] = useMutation(LIKE, {
    update: (cache) => {
      cache.writeQuery({
        query: IS_LIKE,
        variables: { idPost },
        data: {
          isLike: true,
        },
      });
    },
  });

  const onLike = async () => {
    try {
      await like({ variables: { idPost } });
    } catch (error) {
      const err = error as ApolloError;
      toast.error(err.message);
    }
  };

  if (loading || error) return null;

  const { isLike } = data!;

  return (
    <div className="actions">
      <Icon
        className={isLike ? "like active" : "like"}
        name={isLike ? "heart" : "heart outline"}
        onClick={onLike}
      />
      27 likes
    </div>
  );
};

export default Actions;
