"use client";

import { signOut } from "next-auth/react";

const Conversations = () => {
  return <button onClick={() => signOut()}>Logout</button>;
};

export default Conversations;
