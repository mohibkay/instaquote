import React, { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Timeline from "../components/Timeline";
import usePhotos from "../customHooks/usePhotos";

export default function Dashboard() {
  const { photos } = usePhotos();

  useEffect(() => {
    document.title = "Home - InstaQuote";
  }, []);

  return (
    <div className="m-0 p-0">
      <Header />
      <div className="grid grid-cols-3 gap-0 md:gap-4 justify-between md:mx-auto max-w-screen-lg px-4 md:px-0">
        <Timeline photos={photos} />
        <Sidebar />
      </div>
    </div>
  );
}
