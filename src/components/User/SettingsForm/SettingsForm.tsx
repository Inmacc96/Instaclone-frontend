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
    setTitleModal("Cambiar tu contraseña");
    setChildrenModal(<PasswordForm />);
  };

  const onLogOut = () => {
    client.clearStore();
    logOut();
    navigate("/");
  };

  return (
    <div className="settings-form">
      <Button onClick={onChangePassword}>Cambiar contraseña</Button>
      <Button>Cambiar email</Button>
      <Button>Descripción</Button>
      <Button>Sitio Web</Button>
      <Button onClick={onLogOut}>Cerrar sesión</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
    </div>
  );
};

export default SettingsForm;
