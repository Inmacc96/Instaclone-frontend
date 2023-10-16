import { Form, Button, TextArea } from "semantic-ui-react";
import { ApolloError, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import IconPopup from "../../IconPopup";
import useForm from "../../../hooks/useForm";
import {
  INITIAL_ERRORS_CHANGE_DESCRIPTION,
  INITIAL_TOUCHED_FIELDS_CHANGE_DESCRIPTION,
  VALIDATIONS_CHANGE_DESCRIPTION,
} from "../../../utils/constants";
import {
  ChangeDescriptionFormData,
  ChangeDescriptionFormTouched,
  ValidateChangeDescription,
} from "../../../types/forms";
import { UPDATE_USER } from "../../../gql/user";
import "./DescriptionForm.scss";

interface DescriptionFormProps {
  setShowModal: (v: boolean) => void;
  currentDescription?: string | null;
}

const DescriptionForm = ({
  setShowModal,
  currentDescription,
}: DescriptionFormProps) => {
  const { formData, handleChange, handleBlur, errorsForm, onSubmit } = useForm<
    ChangeDescriptionFormData,
    ChangeDescriptionFormTouched,
    ValidateChangeDescription
  >(
    { description: currentDescription ?? "" },
    INITIAL_ERRORS_CHANGE_DESCRIPTION,
    INITIAL_TOUCHED_FIELDS_CHANGE_DESCRIPTION,
    VALIDATIONS_CHANGE_DESCRIPTION,
    handleSubmit
  );
  const [updateUser] = useMutation(UPDATE_USER);

  async function handleSubmit() {
    const { description } = formData;
    try {
      await updateUser({ variables: { input: { description } } });
      toast.success("Description successfully updated");
      setShowModal(false);
    } catch (error) {
      const err = error as ApolloError;
      toast.error(err.message);
    }
  }

  return (
    <Form className="description-form" onSubmit={onSubmit}>
      <TextArea
        name="description"
        placeholder="Write a description"
        value={formData.description}
        onChange={handleChange}
        onBlur={() => handleBlur("description")}
        className={errorsForm.description && "error"}
      />
      <div className="icon-error-form">
        {!!errorsForm.description && (
          <IconPopup message={errorsForm.description} />
        )}
      </div>
      <Button type="submit" className="btn-submit">
        Update
      </Button>
    </Form>
  );
};

export default DescriptionForm;
