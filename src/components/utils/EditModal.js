import Modal from "react-modal";
import TextareaAutosize from "react-textarea-autosize";

Modal.setAppElement("*");

export default function EditModal({
  modalStatus,
  setModalStatus,
  post,
  setPost,
  postId,
  handleUpdate,
}) {
  let subtitle;

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setModalStatus(false);
  }

  const handleEditPost = () => {
    if (post) {
      handleUpdate(postId, post);
      closeModal();
    }
  };

  return (
    <div className="group">
      <Modal
        isOpen={modalStatus}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className="modal md:w-1/3"
        contentLabel="Edit Post Modal"
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
          <TextareaAutosize
            minRows="2"
            placeholder="Write your quote"
            className="p-1 w-full outline-none inline-block text-xl"
            value={post}
            onChange={({ target }) => setPost(target.value)}
          />

          <div className="flex items-center space-x-4 mt-4">
            <button className="button w-20" onClick={handleEditPost}>
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
