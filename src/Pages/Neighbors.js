import React, { useEffect } from "react";

import UserCard from "../Components/UserCard";

export default function Neighbors({ allUsers, validateUser }) {
  useEffect(() => {
    // eslint-disable-next-line
    validateUser();
  }, []);

  const displayNeighbors = () => {
    return allUsers.map((user) => <UserCard user={user} key={user.id} />);
  };

  return (
    <>
      <h2>Neighbors</h2>
      <div className="neighbors">{displayNeighbors()}</div>
    </>
  );
}
