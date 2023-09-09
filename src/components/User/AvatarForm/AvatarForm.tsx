import { useCallback } from "react";
import { Button } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import "./AvatarForm.scss";
import { useQuery } from "@apollo/client";
import { GENERATE_UPLOAD_URL } from "../../../gql/user";

interface IAvatarForm {
  setShowModal: (v: boolean) => void;
}
const AvatarForm = ({ setShowModal }: IAvatarForm) => {

  // Esta funcion siempre sera la misma entre renderizados, la funcion no se recreará
  const onDrop = useCallback((acceptedFile: File[]) => {
    const file = acceptedFile[0];

  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/jpeg": [".jpeg"], "image/png": [".png"] },
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  return (
    <div className="avatar-form">
      <Button {...(getRootProps() as any)}>Cargar una foto</Button>
      <Button>Eliminar foto actual</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
      <input {...getInputProps()} />
    </div>
  );
};

export default AvatarForm;
