import { useCallback } from "react";
import { Button } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import "./AvatarForm.scss";
import { UploadUrl } from "../../../__generated__/graphql";

interface IAvatarForm {
  setShowModal: (v: boolean) => void;
  generateUploadUrl: UploadUrl;
  userId: string;
}
const AvatarForm = ({
  setShowModal,
  generateUploadUrl,
  userId,
}: IAvatarForm) => {
  // Esta funcion siempre sera la misma entre renderizados, la funcion no se recreará
  const onDrop = useCallback(async (acceptedFile: File[]) => {
    const file = acceptedFile[0];

    const { signature, timestamp } = generateUploadUrl;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "instaclone/avatar");
    formData.append("allowed_formats", ["png", "jpeg"].toString());
    formData.append("public_id", userId);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", signature);
    formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);

    try {
      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_NAME
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await uploadResponse.json();
      console.log(data);
    } catch (err) {
      console.error("Error uploading image:", err);
    }
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
