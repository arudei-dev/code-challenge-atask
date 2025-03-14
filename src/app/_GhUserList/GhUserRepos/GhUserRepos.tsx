import { CircleAlertIcon, PackageOpenIcon } from "lucide-react";

import useGhUserRepos from "@/api/gh-user-repos";
import { GhRepositoryCard } from "@/components/GhRepositoryCard";
import RenderIfVisible from "@/components/RenderIfVisible/RenderIfVisible";
import { Spinner } from "@/components/ui/spinner";

interface Props {
  username: string;
}

export default function GhUserRepos(props: Props) {
  const { username } = props;

  const [response] = useGhUserRepos(username);

  if (response.status === "failed") {
    return (
      <div className="py-4 px-2 flex flex-col items-center justify-center gap-1 opacity-70">
        <CircleAlertIcon />

        <p className="text-center">
          Hmm, something went wrong. Please try again later.
        </p>
      </div>
    );
  }

  if (response.status === "done") {
    if (response.data.length < 1) {
      return (
        <div className="py-4 px-2 flex flex-col items-center justify-center gap-1 opacity-70">
          <PackageOpenIcon />

          <p className="text-center">
            {username} doesn&apos;t have any public repositories yet.
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-1.5">
        {response.data.map((repo) => {
          return (
            <RenderIfVisible key={repo.id}>
              <GhRepositoryCard
                repoURL={repo.html_url}
                repoTitle={repo.name}
                repoStarsCount={repo.stargazers_count}
                repoDescription={repo.description}
              />
            </RenderIfVisible>
          );
        })}
      </div>
    );
  }

  return (
    <div className="h-10 flex items-center justify-center">
      <Spinner />
    </div>
  );
}
