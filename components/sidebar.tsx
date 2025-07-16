import React, { forwardRef } from "react";

type SidebarProps = {
  onAddFolder: () => void;
};

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(({ onAddFolder }, ref) => {
  return (
    <div ref={ref}>
      <button onClick={onAddFolder}>Add Folder</button>
      {/* ...existing sidebar content... */}
    </div>
  );
});

export default Sidebar;