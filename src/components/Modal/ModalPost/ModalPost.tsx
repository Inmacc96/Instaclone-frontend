import { Modal, Grid } from "semantic-ui-react";
import "./ModalPost.scss";
import { Post } from "../../../__generated__/graphql";

interface IModalPostProps {
  show: boolean;
  setShow: (v: boolean) => void;
  post: Post;
}

const ModalPost = ({ show, setShow, post }: IModalPostProps) => {
  const onClose = () => setShow(false);
  return (
    <Modal open={show} onClose={onClose} className="modal-post">
      <Grid>
        <Grid.Column className="modal-post__left" width={10}>
          <h3>image</h3>
        </Grid.Column>
        <Grid.Column className="modal-post__right" width={6}>
          <h3>comments</h3>
        </Grid.Column>
      </Grid>
    </Modal>
  );
};

export default ModalPost;
