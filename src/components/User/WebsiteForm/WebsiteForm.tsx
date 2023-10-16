import { Button, Form } from "semantic-ui-react";
import { toast } from "react-toastify";
import { ApolloError, useMutation } from "@apollo/client";
import IconPopup from "../../IconPopup";
import useForm from "../../../hooks/useForm";
import { UPDATE_USER } from "../../../gql/user";
import {
  INITIAL_ERRORS_CHANGE_WEBSITE,
  INITIAL_TOUCHED_FIELDS_CHANGE_WEBSITE,
  VALIDATIONS_CHANGE_WEBSITE,
} from "../../../utils/constants";
import {
  ChangeWebsiteFormData,
  ChangeWebsiteFormTouched,
  ValidateChangeWebsite,
} from "../../../types/forms";
import "./webSiteForm.scss";

interface webSiteFormProps {
  setShowModal: (v: boolean) => void;
  currentWebsite?: string | null;
}

const webSiteForm = ({ setShowModal, currentWebsite }: webSiteFormProps) => {
  const { formData, handleChange, handleBlur, onSubmit, errorsForm } = useForm<
    ChangeWebsiteFormData,
    ChangeWebsiteFormTouched,
    ValidateChangeWebsite
  >(
    { website: currentWebsite ?? "" },
    INITIAL_ERRORS_CHANGE_WEBSITE,
    INITIAL_TOUCHED_FIELDS_CHANGE_WEBSITE,
    VALIDATIONS_CHANGE_WEBSITE,
    handleSubmit
  );
  const [updateUser] = useMutation(UPDATE_USER);

  async function handleSubmit() {
    const { website } = formData;
    try {
      await updateUser({ variables: { input: { website } } });
      toast.success("Website successfully updated")
      setShowModal(false)
    } catch (error) {
      const err = error as ApolloError;
      toast.error(err.message);
    }
  }

  return (
    <Form className="website-form" onSubmit={onSubmit}>
      <Form.Input
        type="text"
        name="website"
        placeholder="Write your site web"
        value={formData.website}
        onChange={handleChange}
        onBlur={() => handleBlur("website")}
        error={!!errorsForm.website}
        icon={
          !!errorsForm.website && <IconPopup message={errorsForm.website} />
        }
      />
      <Button type="submit" className="btn-submit">
        Update
      </Button>
    </Form>
  );
};

export default webSiteForm;
