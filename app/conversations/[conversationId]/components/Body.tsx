"use client";

import { FC } from "react";
import { FullMessageType } from "@/app/types";
import useConversation from "@/hooks/useConversation";

interface IBodyProps {
  initialMessages: FullMessageType[];
}

const Body: FC<IBodyProps> = ({ initialMessages }) => {
  const { conversationId } = useConversation();
  return <div className="flex-1 overflow-y-auto"></div>;
};

export default Body;
