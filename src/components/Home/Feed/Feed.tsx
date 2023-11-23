import { Image, Loader } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_FEED } from "../../../gql/post";
import ImageNotFound from "../../../assets/png/avatar.png";
import "./Feed.scss";

const Feed = () => {
  const { loading, data, error } = useQuery(GET_FEED);

  if (loading) return <Loader />;
  if (error) return <p>Hubo un error al obtener el feed</p>;

  const { getFeed } = data!;
  return (
    <div className="feed">
      {getFeed.map((post) => (
        <div key={post.id} className="feed__box">
          <Link to={`/${post.idUser.username}`}>
            <div className="feed__box-user">
              <Image src={post.idUser.avatar ?? ImageNotFound} avatar />
              <span>{post.idUser.name}</span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Feed;
