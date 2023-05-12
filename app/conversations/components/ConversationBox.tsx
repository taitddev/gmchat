import { FC } from "react";
import { FullConversationType } from "@/app/types";

interface IConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox: FC<IConversationBoxProps> = ({ data, selected }) => {
  return <div>ConversationBox</div>;
};

export default ConversationBox;
