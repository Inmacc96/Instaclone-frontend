import { Form, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import useForm from "../../../../hooks/useForm";
import { ApolloError, useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../../../gql/comment";
import {
  INITIAL_ERRORS_ADD_COMMENT,
  INITIAL_TOUCHED_FIELDS_ADD_COMMENT,
  VALIDATIONS_ADD_COMMENT,
} from "../../../../utils/constants";
import "./CommentForm.scss";

interface ICommentFormProps {
  idPost: string;
}

const CommentForm = ({ idPost }: ICommentFormProps) => {
  const {
    formData,
    handleChange,
    errorsForm,
    handleBlur,
    onSubmit,
    resetForm,
  } = useForm(
    { comment: "" },
    INITIAL_ERRORS_ADD_COMMENT,
    INITIAL_TOUCHED_FIELDS_ADD_COMMENT,
    VALIDATIONS_ADD_COMMENT,
    handleSubmit
  );
  const [addComment] = useMutation(ADD_COMMENT);

  async function handleSubmit() {
    const { comment } = formData;
    try {
      await addComment({ variables: { input: { idPost, comment } } });
      toast.success("Comment succesfully added");
      resetForm();
    } catch (error) {
      const err = error as ApolloError;
      toast.error(err.message);
    }
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
