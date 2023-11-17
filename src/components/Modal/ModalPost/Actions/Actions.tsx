import { Icon } from "semantic-ui-react";
import "./Actions.scss";

interface IActionsProps {
  idPost: string;
}

const Actions = ({ idPost }: IActionsProps) => {
  return (
    <div className="actions">
      <Icon
        className="like"
        name="heart"
        onClick={() => {
          console.log("like");
        }}
      />
      27 likes
    </div>
  );
};

export default Actions;
