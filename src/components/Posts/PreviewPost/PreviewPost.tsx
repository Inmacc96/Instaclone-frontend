import { Image } from "semantic-ui-react";
import { Post } from "../../../__generated__/graphql";
import "./PreviewPost.scss";

interface PreviewPostProps {
  post: Post;
}
const PreviewPost = ({ post }: PreviewPostProps) => {
  return (
    <div className="preview-post">
      <Image className="preview-post__image" src={post.urlFile} />
    </div>
  );
};

export default PreviewPost;
