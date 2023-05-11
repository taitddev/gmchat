"use client";

import clsx from "clsx";
import EmptyState from "../components/EmptyState";

const Conversations = () => {
  return (
    <div className={clsx("hidden h-full lg:block lg:pl-80")}>
      <EmptyState />
    </div>
  );
};

export default Conversations;
