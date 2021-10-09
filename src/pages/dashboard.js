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
    <div className="">
      <Header />
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <Timeline photos={photos} />
        <Sidebar />
      </div>
    </div>
  );
}
