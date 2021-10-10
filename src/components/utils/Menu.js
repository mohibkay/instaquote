import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";

export default function MenuList({ setModalStatus, setShowEditModal }) {
  const handleClick = (e) => e.stopPropagation();

  return (
    <Menu
      className="border border-gray-primary"
      align="center"
      position="auto"
      arrow={true}
      portal={true}
      menuButton={
        <svg
          onClick={handleClick}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 p-1 rounded-full cursor-pointer ml-auto"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      }
    >
      <MenuItem
        className="border-b border-gray-primary"
        styles={{ active: "bg-primary" }}
        onClick={() => setShowEditModal(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
        Edit
      </MenuItem>
      <MenuItem onClick={() => setModalStatus(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        Delete
      </MenuItem>
    </Menu>
  );
}
