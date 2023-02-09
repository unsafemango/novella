import { useEffect, useState } from "react";

const NotFound = () => {
  const [title] = useState("404 Error!");

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <div className="content">
        <h1>404: Page not found!</h1>
      </div>
    </>
  );
};

export default NotFound;
