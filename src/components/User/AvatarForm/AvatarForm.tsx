import { Button } from "semantic-ui-react";
import "./AvatarForm.scss";

interface IAvatarForm {
  setShowModal: (v: boolean) => void;
}
const AvatarForm = ({ setShowModal }: IAvatarForm) => {
  return (
    <div className="avatar-form">
      <Button>Cargar una foto</Button>
      <Button>Eliminar foto actual</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
    </div>
  );
};

export default AvatarForm;
