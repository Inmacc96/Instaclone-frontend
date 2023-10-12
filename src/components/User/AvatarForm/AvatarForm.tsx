import { useCallback, useState } from "react";
import { Button } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import "./AvatarForm.scss";
import { UploadUrl } from "../../../__generated__/graphql";
import { ResponseCloudinary } from "../../../types/responseCloudinary";
import { useMutation } from "@apollo/client";
import { DELETE_AVATAR, UPDATE_AVATAR } from "../../../gql/user";
import { toast } from "react-toastify";

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
  const [updateAvatar] = useMutation(UPDATE_AVATAR);
  const [deleteAvatar] = useMutation(DELETE_AVATAR);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_NAME
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result: ResponseCloudinary = await uploadResponse.json();
      const { url } = result;
      await updateAvatar({ variables: { urlImage: url } });
    } catch (err) {
      toast.warning("Error updating profile image");
      console.error("Error uploading image:", err);
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/jpeg": [".jpeg"], "image/png": [".png"] },
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  const onDeleteAvatar = async () => {
    try {
      await deleteAvatar();
    } catch (err) {
      toast.warning("Error deleting avatar")
      console.log(err);
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div className="avatar-form">
      <Button {...(getRootProps() as any)} loading={loading}>
       Upload a image
      </Button>
      <Button onClick={onDeleteAvatar}>Remove current image</Button>
      <Button onClick={() => setShowModal(false)}>Cancel</Button>
      <input {...getInputProps()} />
    </div>
  );
};

export default AvatarForm;
