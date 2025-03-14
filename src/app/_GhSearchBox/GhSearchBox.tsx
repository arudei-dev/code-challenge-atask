"use client";

import { ChangeEvent, KeyboardEvent, useState } from "react";
import Image from "next/image";
import { SearchIcon } from "lucide-react";

import LogoGitHub from "@/assets/logo-github.png";
import useQueryParams from "@/hooks/useQueryParams";

export default function GhSearchBox() {
  const [qs, setQs] = useQueryParams("q");
  const [value, setValue] = useState(qs);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClickSearch = () => {
    setQs(value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClickSearch();
    }
  };

  return (
    <div className="w-full relative">
      <Image
        className="w-6 absolute left-3 top-[50%] translate-y-[-50%]"
        src={LogoGitHub}
        alt="GitHub Logo"
      />

      <input
        className="relative rounded-md p-4 px-11 w-full outline-blue-500"
        placeholder="Search GitHub username here"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <button
        className="cursor-pointer absolute right-3 top-[50%] translate-y-[-50%] transition-all duration-200 hover:text-blue-500 active:text-blue-950 outline-blue-500"
        onClick={handleClickSearch}
      >
        <SearchIcon className="w-6" />
      </button>
    </div>
  );
}
