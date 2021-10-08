import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getUserByUserId, getFollowedUserPhotos } from "../services/firebase";

export default function usePhotos() {
  const [photos, setPhotos] = useState(null);
  const { user } = useContext(UserContext);
  const userId = user?.uid;

  useEffect(() => {
    async function getTimelinePhotos() {
      const [{ following }] = await getUserByUserId(userId);
      let followedUserPhotos = [];

      //does the user follow people?
      if (following?.length > 0) {
        followedUserPhotos = await getFollowedUserPhotos(userId, following);
      }
      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      setPhotos(followedUserPhotos);
    }

    getTimelinePhotos(); //TODO: find out why we didnt need condition to check userId exits
  }, [userId]);

  return { photos };
}
