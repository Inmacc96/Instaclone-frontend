import { Button } from "semantic-ui-react";
import "./SettingsForm.scss";

interface SettingsFormProps {
  setShowModal: (v: boolean) => void;
}

const SettingsForm = ({ setShowModal }: SettingsFormProps) => {
  return (
    <div className="settings-form">
      <Button>Cambiar contraseña</Button>
      <Button>Cambiar email</Button>
      <Button>Descripción</Button>
      <Button>Sitio Web</Button>
      <Button>Cerrar sesión</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
    </div>
  );
};

export default SettingsForm;
