import { AddCommentFormData } from "../types/forms";

export const validateComment = (formData: AddCommentFormData) => {
  const comment = formData.comment;
  if (!comment) {
    return "Comment is required";
  } else {
    return "";
  }
};
