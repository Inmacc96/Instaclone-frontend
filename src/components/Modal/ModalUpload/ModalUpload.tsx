import { Modal } from "semantic-ui-react";
import "./ModalUpload.scss";

interface IModalUploadProps {
  show: boolean;
  setShow: (v: boolean) => void;
}

const ModalUpload = ({ show, setShow }: IModalUploadProps) => {
  return (
    <Modal
      size="small"
      open={show}
      onClose={() => setShow(false)}
      className="modal-upload"
    >
      <h1>Upload file</h1>
    </Modal>
  );
};

export default ModalUpload;
