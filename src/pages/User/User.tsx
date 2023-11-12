import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../../gql/post";
import Profile from "../../components/User/Profile";

const User = () => {
  const { username } = useParams();
  const { data, loading, error } = useQuery(GET_POSTS, {
    variables: { username: username ?? "" },
  });

  if (loading || error) return null;

  const { getPosts } = data!;

  return (
    <div>
      <Profile username={username} totalPosts={getPosts.length} />
    </div>
  );
};

export default User;
