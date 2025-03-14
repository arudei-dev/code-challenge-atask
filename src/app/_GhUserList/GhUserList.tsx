"use client";
import { CircleAlertIcon, CircleHelpIcon } from "lucide-react";

import useGhSearchUsers from "@/api/gh-search-users";
import useQueryParams from "@/hooks/useQueryParams";
import { CollapsibleCard } from "@/components/CollapsibleCard";
import { Spinner } from "@/components/ui/spinner";

import { GhUserRepos } from "./GhUserRepos";
import { GhUserListContentProps as ContentProps } from "./types";

function Content(props: ContentProps) {
  const { searchQuery } = props;

  const [response] = useGhSearchUsers(searchQuery);

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
    if (response.data.items.length < 1) {
      return (
        <div className="py-4 px-2 flex flex-col items-center justify-center gap-1">
          <CircleHelpIcon />

          <p className="text-center">
            Hmm, your search did not match any users.
          </p>
        </div>
      );
    }

    return response.data.items.map((user) => (
      <CollapsibleCard
        key={user.id}
        headerTitle={user.login}
        headerAvatarURL={user.avatar_url}
      >
        <GhUserRepos username={user.login} />
      </CollapsibleCard>
    ));
  }

  return (
    <div className="h-12 flex items-center justify-center">
      <Spinner />
    </div>
  );
}

export default function GhUserList() {
  const [searchQuery] = useQueryParams("q");

  if (!searchQuery) return null;

  return (
    <div className="py-2 border-t flex flex-col">
      <p className="px-3 text-sm italic mb-2 opacity-70">
        Showing users for &ldquo;{searchQuery}&rdquo;
      </p>

      <div className="px-3 mb-2 flex flex-col gap-2 max-h-[70vh] overflow-hidden overflow-y-auto">
        <Content searchQuery={searchQuery} />
      </div>
    </div>
  );
}
