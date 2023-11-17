import { Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import { ApolloError, useMutation } from "@apollo/client";
import { LIKE } from "../../../../gql/like";
import "./Actions.scss";

interface IActionsProps {
  idPost: string;
}

const Actions = ({ idPost }: IActionsProps) => {
  const [like] = useMutation(LIKE);

  const onLike = async () => {
    try {
      await like({ variables: { idPost } });
    } catch (error) {
      const err = error as ApolloError;
      toast.error(err.message);
    }
  };

  return (
    <div className="actions">
      <Icon className="like" name="heart" onClick={onLike} />
      27 likes
    </div>
  );
};

export default Actions;
