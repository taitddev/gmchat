"use client";

import { FC, useEffect, useRef, useState } from "react";
import axios from "axios";
import { FullMessageType } from "@/app/types";
import useConversation from "@/hooks/useConversation";
import MessageBox from "./MessageBox";

interface IBodyProps {
  initialMessages: FullMessageType[];
}

const Body: FC<IBodyProps> = ({ initialMessages }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(initialMessages);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, index) => (
        <MessageBox
          key={message.id}
          isLast={index === messages.length - 1}
          message={message}
        />
      ))}
    </div>
  );
};

export default Body;