import { Button } from "semantic-ui-react";
import { useApolloClient } from "@apollo/client";
import "./SettingsForm.scss";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface SettingsFormProps {
  setShowModal: (v: boolean) => void;
}

const SettingsForm = ({ setShowModal }: SettingsFormProps) => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const client = useApolloClient();

  const onLogOut = () => {
    client.clearStore();
    logOut();
    navigate("/");
  };

  return (
    <div className="settings-form">
      <Button>Cambiar contraseña</Button>
      <Button>Cambiar email</Button>
      <Button>Descripción</Button>
      <Button>Sitio Web</Button>
      <Button onClick={onLogOut}>Cerrar sesión</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
    </div>
  );
};

export default SettingsForm;
