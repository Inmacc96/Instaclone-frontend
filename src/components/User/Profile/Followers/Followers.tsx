import { useQuery } from "@apollo/client";
import { GET_FOLLOWERS } from "../../../../gql/follow";
import "./Followers.scss";

interface FollowersProps {
  username: string;
}

const Followers = ({ username }: FollowersProps) => {
  const { data: dataFollowers, loading: loadingFollowers } = useQuery(
    GET_FOLLOWERS,
    {
      variables: { username },
    }
  );

  if (loadingFollowers) return null;

  const { getFollowers } = dataFollowers!;
  return (
    <div className="followers">
      <p>
        <span>50</span> posts
      </p>
      <p className="link">
        <span>{getFollowers.length}</span> followers
      </p>
      <p className="link">
        <span>240</span> followings
      </p>
    </div>
  );
};

export default Followers;
