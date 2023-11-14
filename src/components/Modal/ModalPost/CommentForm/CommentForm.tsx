import { Form, Button } from "semantic-ui-react";
import "./CommentForm.scss";

const CommentForm = () => {
  return (
    <Form className="comment-form">
      <Form.Input placeholder="Add a comment..." name="comment" />
      <Button type="submit">Publish</Button>
    </Form>
  );
};

export default CommentForm;
