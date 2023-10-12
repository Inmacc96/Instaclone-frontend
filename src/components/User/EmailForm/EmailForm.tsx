import { Form, Button } from "semantic-ui-react";
import "./EmailForm.scss";

interface EmailFormProps {
  setShowModal: (v: boolean) => void;
}

const EmailForm = ({ setShowModal }: EmailFormProps) => {
  return (
    <Form className="email-form">
      <Form.Input type="text" name="email" placeholder="Write your new email" />
      <Button type="submit" className="btn-submit">Update</Button>
    </Form>
  );
};

export default EmailForm;
