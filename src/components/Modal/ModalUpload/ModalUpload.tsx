import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Icon, Modal } from "semantic-ui-react";
import { UploadedFile } from "../../../types/UploadedFile";
import "./ModalUpload.scss";

interface IModalUploadProps {
  show: boolean;
  setShow: (v: boolean) => void;
}

const ModalUpload = ({ show, setShow }: IModalUploadProps) => {
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
    </Modal>
  );
};

export default ModalUpload;
