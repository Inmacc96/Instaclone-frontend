import { Link } from "react-router-dom";
import { Image, Loader } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { GET_NOTFOLLOWINGS } from "../../../gql/follow";
import ImageNotFound from "../../../assets/png/avatar.png";
import "./UsersNotFollowings.scss";

const UsersNotFollowings = () => {
  const { loading, error, data } = useQuery(GET_NOTFOLLOWINGS);

  if (loading) return <Loader />;
  if (error) return null;

  const { getNotFollowings } = data!;

  return (
    <div className="users-notfollowings">
      <h3>Unfollowed users</h3>
      {getNotFollowings.map((user) => (
        <Link
          key={user.id}
          to={`${user.username}`}
          className="users-notfollowings__user"
        >
          <Image src={user.avatar ?? ImageNotFound} avatar />
          <span>{user.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default UsersNotFollowings;
