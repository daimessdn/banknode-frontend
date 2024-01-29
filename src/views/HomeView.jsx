import React, { useEffect } from "react";

function HomeView() {
  const loadTransaction = async () => {
    console.log(localStorage.getItem("token"));
  };

  useEffect(() => {
    loadTransaction();
  }, []);

  return (
    <>
      <div>
        <h1>Home</h1>
      </div>
    </>
  );
}

export default HomeView;
