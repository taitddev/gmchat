import { ReactNode } from "react";
import DesktopSidebar from "./DesktopSidebar";

const Sidebar = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full">
      <DesktopSidebar />
      <main className="h-full lg:pl-20">{children}</main>
    </div>
  );
};

export default Sidebar;
