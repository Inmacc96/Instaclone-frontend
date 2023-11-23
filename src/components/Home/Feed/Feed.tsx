import { useState } from "react";
import { Image, Loader } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_FEED } from "../../../gql/post";
import Actions from "../../Modal/ModalPost/Actions";
import CommentForm from "../../Modal/ModalPost/CommentForm";
import ModalPost from "../../Modal/ModalPost";
import { FeedPost } from '../../../__generated__/graphql';
import ImageNotFound from "../../../assets/png/avatar.png";
import "./Feed.scss";

const Feed = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<FeedPost | null>(null);
  const { loading, data, error } = useQuery(GET_FEED);

  if (loading) return <Loader />;
  if (error) return <p>Hubo un error al obtener el feed</p>;

  const { getFeed } = data!;

  const openPost = (post: FeedPost) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  return (
    <>
      <div className="feed">
        {getFeed.map((post) => (
          <div key={post.id} className="feed__box">
            <Link to={`/${post.idUser.username}`}>
              <div className="feed__box-user">
                <Image src={post.idUser.avatar ?? ImageNotFound} avatar />
                <span>{post.idUser.name}</span>
              </div>
            </Link>
            <div
              className="feed__box-photo"
              style={{ backgroundImage: `url("${post.urlFile}")` }}
              onClick={() => openPost(post)}
            />
            <div className="feed__box-actions">
              <Actions idPost={post.id} />
            </div>
            <div className="feed__box-form">
              <CommentForm idPost={post.id} />
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedPost && (
        <ModalPost
          show={showModal}
          setShow={setShowModal}
          post={selectedPost}
        />
      )}
    </>
  );
};

export default Feed;
