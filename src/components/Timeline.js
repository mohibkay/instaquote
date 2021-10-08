import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/usePhotos";
import Post from "./Posts";

export default function Timeline() {
  const { photos } = usePhotos();

  return (
    <div className="container col-span-3 md:col-span-2">
      {!photos ? (
        <Skeleton count={4} height={500} width={640} className="mb-5" />
      ) : photos?.length > 0 ? (
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <p className="text-center text-2xl">Follow people to see photos</p>
      )}
    </div>
  );
}
