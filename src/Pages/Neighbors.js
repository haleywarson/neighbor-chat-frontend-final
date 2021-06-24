import React, { useEffect } from "react";

import UserCard from "../Components/UserCard";

export default function Neighbors({
  allUsers,
  validateUser,
  saveContact,
  newContactId,
  setNewContactId,
  user,
  fetchAllUsers,
}) {
  useEffect(() => {
    validateUser();
    fetchAllUsers();
    // eslint-disable-next-line
  }, []);

  const displayNeighbors = () => {
    return allUsers.map((user) => (
      <UserCard
        user={user}
        key={user.id}
        saveContact={saveContact}
        newContactId={newContactId}
        setNewContactId={setNewContactId}
      />
    ));
  };

  return (
    <>
      <h2>Neighbors</h2>
      <div className="neighbors">{displayNeighbors()}</div>
    </>
  );
}
