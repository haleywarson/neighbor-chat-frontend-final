import React, { useEffect } from "react";

import UserCard from "../Components/UserCard";

export default function Contacts({ validateUser, user }) {
  useEffect(() => {
    validateUser();
    // eslint-disable-next-line
  }, []);

  const displayMyContacts = () => {
    return user.friends.map((user) => <UserCard user={user} key={user.id} />);
  };

  return (
    <>
      <h2>My contacts</h2>
      <div className="my-contacts">
        {user.friends ? displayMyContacts() : null}
      </div>
    </>
  );
}
