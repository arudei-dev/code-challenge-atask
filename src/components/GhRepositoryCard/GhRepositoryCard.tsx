import { StarIcon } from "lucide-react";

import { Card } from "@/components/ui/card";

interface Props {
  repoTitle: string;
  repoURL: string;
  repoDescription?: string | null;
  repoStarsCount: number;
}

export default function GhRepositoryCard(props: Props) {
  const { repoTitle, repoURL, repoDescription, repoStarsCount } = props;

  return (
    <Card className="rounded-lg p-2 gap-1">
      <div className="flex justify-between items-center gap-2">
        <a
          href={repoURL}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-bold break-all"
        >
          {repoTitle}
        </a>

        <div className="flex items-center gap-1">
          <p className="text-sm font-bold">{repoStarsCount}</p>
          <StarIcon className="w-4" />
        </div>
      </div>
      <p className="break-all">
        {repoDescription || (
          <em className="text-black/50">
            No description, website, or topics provided.
          </em>
        )}
      </p>
    </Card>
  );
}
