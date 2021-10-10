import Modal from "react-modal";

Modal.setAppElement("*");

export default function DeleteModal({
  modalStatus,
  setModalStatus,
  handleDeletePost,
  postId,
  title = "",
}) {
  let subtitle;

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setModalStatus(false);
  }

  function deleteHandler() {
    if (postId) {
      handleDeletePost(postId);
    }
    closeModal();
  }

  return (
    <div className="group">
      <Modal
        isOpen={modalStatus}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className="modal"
        contentLabel="Delete Modal"
      >
        <div className="flex justify-between mb-4">
          <h2
            className="capitalize"
            ref={(_subtitle) => (subtitle = _subtitle)}
          >
            Delete {title}?
          </h2>
          <button onClick={closeModal}>X</button>
        </div>
        <div>
          <p>Are you sure you want to delete the {title}?</p>
          <div className="flex items-center space-x-4 mt-4">
            <button className="button w-20" onClick={deleteHandler}>
              Yes
            </button>
            <button
              className="w-20 button-secondary"
              onClick={() => setModalStatus(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
