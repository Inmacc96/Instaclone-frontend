import { Button } from "semantic-ui-react";
import { useApolloClient } from "@apollo/client";
import "./SettingsForm.scss";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import PasswordForm from "../PasswordForm";

interface SettingsFormProps {
  setShowModal: (v: boolean) => void;
  setTitleModal: (v: string) => void;
  setChildrenModal: (v: JSX.Element) => void;
}

const SettingsForm = ({
  setShowModal,
  setTitleModal,
  setChildrenModal,
}: SettingsFormProps) => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const client = useApolloClient();

  const onChangePassword = () => {
    setTitleModal("Change your password");
    setChildrenModal(<PasswordForm setShowModal={setShowModal} />);
  };

  const onLogOut = () => {
    client.clearStore();
    logOut();
    navigate("/");
  };

  return (
    <div className="settings-form">
      <Button onClick={onChangePassword}>Change password</Button>
      <Button>Change email</Button>
      <Button>Description</Button>
      <Button>Website</Button>
      <Button onClick={onLogOut}>Log out</Button>
      <Button onClick={() => setShowModal(false)}>Cancel</Button>
    </div>
  );
};

export default SettingsForm;
