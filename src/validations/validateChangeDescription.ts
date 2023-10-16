import { ChangeDescriptionFormData } from "../types/forms";

export const validateDescription = (formData: ChangeDescriptionFormData) => {
    const description = formData.description;
    if (!description) {
      return "Description is required";
    } else {
      return "";
    }
  };