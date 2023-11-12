import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Icon, Modal } from "semantic-ui-react";
import { UploadedFile } from "../../../types/UploadedFile";
import "./ModalUpload.scss";
import { GENERATE_UPLOAD_URL } from "../../../gql/user";
import { useMutation, useQuery } from "@apollo/client";
import { ResponseCloudinary } from "../../../types/responseCloudinary";
import { toast } from "react-toastify";
import { PUBLISH } from "../../../gql/post";

interface IModalUploadProps {
  show: boolean;
  setShow: (v: boolean) => void;
}
const folder = "posts";

const ModalUpload = ({ show, setShow }: IModalUploadProps) => {
  const {
    data: uploadUrlData,
    loading: uploadUrlLoading,
    error: uploadUrlError,
  } = useQuery(GENERATE_UPLOAD_URL, { variables: { folder } });
  const [publish] = useMutation(PUBLISH);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);

  const onDrop = useCallback(async (acceptedFile: File[]) => {
    const file = acceptedFile[0];
    setUploadedFile({
      type: "image",
      file,
      preview: URL.createObjectURL(file),
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/jpeg": [".jpeg"], "image/png": [".png"] },
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  if (uploadUrlLoading || uploadUrlError) return null;

  const { generateUploadUrl } = uploadUrlData!;

  const onPublish = async () => {
    if (uploadedFile) {
      const { signature, timestamp, public_id } = generateUploadUrl;
      const formData = new FormData();
      formData.append("file", uploadedFile.file);
      formData.append("folder", `instaclone/${folder}`);
      formData.append("allowed_formats", ["png", "jpeg"].toString());
      formData.append("public_id", public_id);
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
        const result: ResponseCloudinary = await uploadResponse.json();
        const { url } = result;
        await publish({
          variables: { urlFile: url, typeFile: uploadedFile.type },
        });
      } catch (err) {
        toast.warning("Error publishing post");
        console.error("Error uploading post:", err);
      }
    }
  };

  return (
    <Modal open={show} onClose={() => setShow(false)} className="modal-upload">
      <div
        {...getRootProps()}
        className="dropzone"
        style={uploadedFile ? { border: 0 } : {}}
      >
        {!uploadedFile && (
          <>
            <Icon name="cloud upload" />
            <p>Select or drag your photo to be published</p>
          </>
        )}
        <input {...getInputProps()} />
      </div>

      {uploadedFile?.type === "image" && (
        <div
          className="image"
          style={{ backgroundImage: `url("${uploadedFile.preview}")` }}
        />
      )}

      {uploadedFile && (
        <Button className="btn-upload btn-action" onClick={onPublish}>
          Publish
        </Button>
      )}
    </Modal>
  );
};

export default ModalUpload;
