/* eslint-disable @next/next/no-img-element */
"use client";

import { ReactNode, useState } from "react";
import { ChevronDownIcon } from "lucide-react";

import { Card } from "../ui/card";

interface Props {
  headerTitle: string;
  headerAvatarURL?: string;
  children: ReactNode;
}

export default function CollapsibleCard(props: Props) {
  const { headerTitle, headerAvatarURL, children } = props;

  const [collapsed, setCollapsed] = useState(true);

  const handleClickHeader = () => {
    setCollapsed((value) => !value);
  };

  return (
    <Card className="p-0 gap-0 shadow-none">
      <button
        className="cursor-pointer p-2 flex items-center justify-between bg-white rounded-xl hover:bg-gray-50 active:bg-gray-100 sticky top-0"
        onClick={handleClickHeader}
      >
        <div className="flex items-center gap-1">
          <div className="rounded-full overflow-hidden">
            <img className="w-6" src={headerAvatarURL} alt="Avatar" />
          </div>
          <p className="font-bold">{headerTitle}</p>
        </div>

        <ChevronDownIcon className="w-4" />
      </button>

      {!collapsed && <div className="p-2 border-t">{children}</div>}
    </Card>
  );
}
