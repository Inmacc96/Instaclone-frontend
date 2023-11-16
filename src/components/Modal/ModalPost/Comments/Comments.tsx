import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_COMMENTS } from "../../../../gql/comment";
import ImageNoFound from "../../../../assets/png/avatar.png";
import "./Comments.scss";

interface ICommentsProps {
  idPost: string;
}

const Comments = ({ idPost }: ICommentsProps) => {
  const { loading, data, error } = useQuery(GET_COMMENTS, {
    variables: { idPost },
  });

  if (loading || error) return null;

  const { getComments } = data!;
  return (
    <div className="comments">
      {getComments.map((comment) => (
        <Link
          key={comment.id}
          to={`/${comment.idUser.username}`}
          className="comment"
        >
          <Image src={comment.idUser.avatar ?? ImageNoFound} avatar />
          <div>
            <p>{comment.idUser.username}</p>
            <p>{comment.comment}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Comments;
