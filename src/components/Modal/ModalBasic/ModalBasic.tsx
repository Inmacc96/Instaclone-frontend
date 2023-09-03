import { Modal } from "semantic-ui-react";
import "./ModalBasic.scss";

interface IModalBasicProps {
  show: boolean;
  setShow: (v: boolean) => void;
  title: string;
  children: JSX.Element | JSX.Element[];
}

const ModalBasic = ({ show, setShow, title, children }: IModalBasicProps) => {
  const onClose = () => {
    setShow(false);
  };

  return (
    <Modal size="mini" open={show} onClose={onClose} className="modal-basic">
      {title && <Modal.Header>{title}</Modal.Header>}
      {children}
    </Modal>
  );
};

export default ModalBasic;
