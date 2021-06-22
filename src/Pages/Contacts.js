import React, { useEffect } from "react";

import UserCard from "../Components/UserCard";

export default function Contacts({ myContacts, validateUser, user }) {
  useEffect(() => {
    // eslint-disable-next-line
    validateUser();
  }, []);

  const displayMyContacts = () => {
    return myContacts.map((user) => <UserCard user={user} key={user.id} />);
  };

  return (
    <>
      <h2>My contacts</h2>
      <div className="my-contacts">{displayMyContacts()}</div>
    </>
  );
}
