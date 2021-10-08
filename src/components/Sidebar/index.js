import useUser from "../../hooks/useUser";
import User from "./User";
import Suggestions from "./Suggestions";

export default function Sidebar() {
  const {
    user: { fullName, username, userId, following, docId },
  } = useUser();

  return (
    <aside className="p-4 col-span-1 h-screen sticky top-20 md:inline">
      <User username={username} fullName={fullName} />
      <Suggestions
        userId={userId}
        following={following}
        loggedInUserDocId={docId}
      />
    </aside>
  );
}
