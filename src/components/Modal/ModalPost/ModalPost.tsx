import { Modal, Grid } from "semantic-ui-react";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import Actions from "./Actions";
import { FeedPost, Post } from "../../../__generated__/graphql";
import "./ModalPost.scss";

interface IModalPostProps {
  show: boolean;
  setShow: (v: boolean) => void;
  post: Post | FeedPost;
}

const ModalPost = ({ show, setShow, post }: IModalPostProps) => {
  const onClose = () => setShow(false);
  return (
    <Modal open={show} onClose={onClose} className="modal-post">
      <Grid>
        <Grid.Column
          className="modal-post__left"
          width={10}
          style={{ backgroundImage: `url("${post.urlFile}")` }}
        />

        <Grid.Column className="modal-post__right" width={6}>
          <Comments idPost={post.id} />
          <Actions idPost={post.id} />
          <CommentForm idPost={post.id} />
        </Grid.Column>
      </Grid>
    </Modal>
  );
};

export default ModalPost;
