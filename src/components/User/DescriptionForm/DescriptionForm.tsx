import { Form, Button, TextArea } from "semantic-ui-react";
import "./DescriptionForm.scss";

interface DescriptionFormProps {
  setShowModal: (v: boolean) => void;
}

const DescriptionForm = ({
  setShowModal,
}: DescriptionFormProps) => {
  return (
    <Form className="description-form">
      <TextArea
        name="description"
        placeholder="Write a description"
        error={true}
      />
      <Button type="submit" className="btn-submit">
        Update
      </Button>
    </Form>
  );
};

export default DescriptionForm;
