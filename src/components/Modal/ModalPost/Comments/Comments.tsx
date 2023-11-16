import { useQuery } from "@apollo/client";
import { GET_COMMENTS } from "../../../../gql/comment";
import "./Comments.scss";

interface ICommentsProps {
  idPost: string;
}

const Comments = ({ idPost }: ICommentsProps) => {
  const { loading, data, error } = useQuery(GET_COMMENTS, {
    variables: { idPost },
  });
  
  if (loading || error) return null;
  return (
    <div>
      <h3>Comments...</h3>
    </div>
  );
};

export default Comments;
