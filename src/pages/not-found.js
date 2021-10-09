import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "Not Found - InstaQuote";
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center space-y-4">
      <h1 className="text-blue-medium text-6xl font-bold">404</h1>
      <h1 className="text-blue-medium text-4xl font-bold">Page Not Found</h1>
    </div>
  );
}
