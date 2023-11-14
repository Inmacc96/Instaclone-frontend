import { useState } from "react";
import { Image } from "semantic-ui-react";
import { Post } from "../../../__generated__/graphql";
import ModalPost from "../../Modal/ModalPost";
import "./PreviewPost.scss";

interface PreviewPostProps {
  post: Post;
}
const PreviewPost = ({ post }: PreviewPostProps) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="preview-post" onClick={() => setShowModal(true)}>
        <Image className="preview-post__image" src={post.urlFile} />
      </div>

      <ModalPost show={showModal} setShow={setShowModal} post={post}/>
    </>
  );
};

export default PreviewPost;
