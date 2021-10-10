import Modal from "react-modal";

Modal.setAppElement("*");

export default function EditModal({
  modalStatus,
  setModalStatus,
  taskName,
  setTaskName,
  handleUpdate,
}) {
  let subtitle;

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setModalStatus(false);
  }

  const handleEditProject = () => {
    if (taskName) {
      handleUpdate();
      closeModal();
    }
  };

  return (
    <div className="group">
      <Modal
        isOpen={modalStatus}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className="modal"
        contentLabel="Edit Task Modal"
      >
        <div className="flex justify-between mb-4">
          <h2
            className="capitalize"
            ref={(_subtitle) => (subtitle = _subtitle)}
          >
            Edit Post
          </h2>
          <button onClick={closeModal}>X</button>
        </div>
        <div>
          <input
            type="text"
            value={taskName}
            onChange={({ target }) => setTaskName(target.value)}
            className="w-full px-2 py-1.5 rounded my-2 border border-gray-primary bg-white focus:outline-none"
            placeholder="Name your project"
          />

          <div className="flex items-center space-x-4 mt-4">
            <button className="button w-20" onClick={handleEditProject}>
              Update
            </button>
            <button className="button-secondary w-20" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
