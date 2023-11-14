import { Form, Button } from "semantic-ui-react";
import IconPopup from "../../../IconPopup";
import useForm from "../../../../hooks/useForm";
import {
    INITIAL_ERRORS_ADD_COMMENT,
    INITIAL_TOUCHED_FIELDS_ADD_COMMENT,
    VALIDATIONS_ADD_COMMENT,
} from "../../../../utils/constants";
import "./CommentForm.scss";

const CommentForm = () => {
  const { formData, handleChange, errorsForm, handleBlur, onSubmit } = useForm(
    { comment: "" },
    INITIAL_ERRORS_ADD_COMMENT,
    INITIAL_TOUCHED_FIELDS_ADD_COMMENT,
    VALIDATIONS_ADD_COMMENT,
    handleSubmit
  );

  function handleSubmit() {
    console.log("añadir comentario");
  }
  return (
    <Form className="comment-form" onSubmit={onSubmit}>
      <Form.Input
        placeholder="Add a comment..."
        name="comment"
        value={formData.comment}
        onChange={handleChange}
        onBlur={() => handleBlur("comment")}
        error={!!errorsForm.comment}
      />
      <Button type="submit">Publish</Button>
    </Form>
  );
};

export default CommentForm;
