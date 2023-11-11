import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Icon, Modal } from "semantic-ui-react";
import "./ModalUpload.scss";

interface IModalUploadProps {
  show: boolean;
  setShow: (v: boolean) => void;
}

const ModalUpload = ({ show, setShow }: IModalUploadProps) => {
  const onDrop = useCallback(async (acceptedFile: File[]) => {
    const file = acceptedFile[0];
    console.log(acceptedFile);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/jpeg": [".jpeg"], "image/png": [".png"] },
    noKeyboard: true,
    multiple: false,
    onDrop,
  });
  return (
    <Modal
      open={show}
      onClose={() => setShow(false)}
      className="modal-upload"
    >
      <div {...getRootProps()} className="dropzone">
        <Icon name="cloud upload" />
        <p>Select or drag your photo to be published</p>
        <input {...getInputProps()} />
      </div>
    </Modal>
  );
};

export default ModalUpload;
