import { useNavigate } from "@remix-run/react";
import { cloneElement } from "react";
import { Modal } from "./Modal";

export const ModalTrigger = (props) => {
  const { children, size, className, title, header } = props;
  const navigate = useNavigate();

  const closeModal = () => {
    const setTitle = title.toLowerCase();
    navigate(`/admin/${setTitle}/list`);
  };

  const childrenComponent = cloneElement(children, {
    closeModal,
  });

  const headerComponent = header && cloneElement(header, { closeModal });

  return (
    <div className="modal-trigger">
      <Modal
        show={true}
        onHide={closeModal}
        header={headerComponent}
        {...{ size, className, title }}
      >
        {childrenComponent}
      </Modal>
    </div>
  );
};
