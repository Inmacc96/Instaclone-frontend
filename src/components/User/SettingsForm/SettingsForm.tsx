import { Button } from "semantic-ui-react";
import { useApolloClient } from "@apollo/client";
import "./SettingsForm.scss";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import PasswordForm from "../PasswordForm";
import EmailForm from "../EmailForm";
import { User } from "../../../__generated__/graphql";
import DescriptionForm from "../DescriptionForm";
import WebsiteForm from "../WebsiteForm";

interface SettingsFormProps {
  setShowModal: (v: boolean) => void;
  setTitleModal: (v: string) => void;
  setChildrenModal: (v: JSX.Element) => void;
  user: Omit<User, "password">;
}

const SettingsForm = ({
  setShowModal,
  setTitleModal,
  setChildrenModal,
  user,
}: SettingsFormProps) => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const client = useApolloClient();

  const onChangePassword = () => {
    setTitleModal("Change your password");
    setChildrenModal(<PasswordForm setShowModal={setShowModal} />);
  };

  const onChangeEmail = () => {
    setTitleModal("Change your email");
    setChildrenModal(
      <EmailForm setShowModal={setShowModal} currentEmail={user.email} />
    );
  };

  const onChangeDescription = () => {
    setTitleModal("Update your biography");
    setChildrenModal(
      <DescriptionForm
        setShowModal={setShowModal}
        currentDescription={user.description}
      />
    );
  };

  const onChangewebSite = () => {
    setTitleModal("Update your website");
    setChildrenModal(
      <WebsiteForm setShowModal={setShowModal} currentWebsite={user.website} />
    );
  };

  const onLogOut = () => {
    client.clearStore();
    logOut();
    navigate("/");
  };

  return (
    <div className="settings-form">
      <Button onClick={onChangePassword}>Change password</Button>
      <Button onClick={onChangeEmail}>Change email</Button>
      <Button onClick={onChangeDescription}>Description</Button>
      <Button onClick={onChangewebSite}>Website</Button>
      <Button onClick={onLogOut}>Log out</Button>
      <Button onClick={() => setShowModal(false)}>Cancel</Button>
    </div>
  );
};

export default SettingsForm;
