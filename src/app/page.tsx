import { CardWithDeco } from "@/components/ui/card";
import { CopyFooter } from "@/components/CopyFooter";

import { GhSearchBox } from "./_GhSearchBox";
import { GhUserList } from "./_GhUserList";

export default function Home() {
  return (
    <div className="bg-gradient-to-b md:bg-gradient-to-bl from-[#07093f] via-[#6f64c0] to-[#416589] min-h-[100vh] flex flex-col items-center justify-center p-2">
      <CardWithDeco
        className="w-full max-w-[500px]"
        classNameContent="flex flex-col"
      >
        <GhSearchBox />
        <GhUserList />
      </CardWithDeco>

      <CopyFooter />
    </div>
  );
}
