import React, { useEffect } from "react";

import UserCard from "../Components/UserCard";

export default function Neighbors({ allUsers, validateUser }) {
  //   fetch user and set user data to state
  useEffect(() => {
    validateUser();
  }, []);

  const displayNeighbors = () => {
    return allUsers.map((user) => <UserCard user={user} />);
  };

  return (
    <>
      <h2>Neighbors</h2>
      <div className="neighbors">{displayNeighbors()}</div>
    </>
  );
}
