import "./Followers.scss";

interface FollowersProps {
  username: string;
}

const Followers = ({ username }: FollowersProps) => {
  return (
    <div className="followers">
      <p>
        <span>50</span> posts
      </p>
      <p className="link">
        <span>350</span> followers
      </p>
      <p className="link">
        <span>240</span> followings
      </p>
    </div>
  );
};

export default Followers;
