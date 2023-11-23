import { Image, Loader } from "semantic-ui-react";
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
        <div>
          <p>{post.urlFile}</p>
        </div>
      ))}
    </div>
  );
};

export default Feed;
