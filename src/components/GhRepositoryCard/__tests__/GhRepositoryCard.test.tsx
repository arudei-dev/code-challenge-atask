import { ComponentProps } from "react";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";

import GhRepositoryCard from "../GhRepositoryCard";

describe("GhRepositoryCard", () => {
  const defaultProps: ComponentProps<typeof GhRepositoryCard> = {
    repoTitle: "test-repo",
    repoURL: "https://github.com/test/test-repo",
    repoStarsCount: 10,
  };

  it("renders the repository title as a link", () => {
    render(<GhRepositoryCard {...defaultProps} />);
    const linkElement = screen.getByRole("link", { name: "test-repo" });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute(
      "href",
      "https://github.com/test/test-repo"
    );
    expect(linkElement).toHaveAttribute("target", "_blank");
    expect(linkElement).toHaveAttribute("rel", "noreferrer");
  });

  it("renders the repository description when provided", () => {
    const propsWithDescription = {
      ...defaultProps,
      repoDescription: "This is a test repository description.",
    };
    render(<GhRepositoryCard {...propsWithDescription} />);
    const descriptionElement = screen.getByText(
      "This is a test repository description."
    );
    expect(descriptionElement).toBeInTheDocument();
  });

  it("renders the placeholder text when no description is provided", () => {
    const propsWithoutDescription = {
      ...defaultProps,
      repoDescription: null,
    };
    render(<GhRepositoryCard {...propsWithoutDescription} />);
    const placeholderElement = screen.getByText(
      "No description, website, or topics provided."
    );
    expect(placeholderElement).toBeInTheDocument();
    expect(placeholderElement).toHaveClass("text-black/50");
  });

  it("renders with proper accessibility attributes", () => {
    render(<GhRepositoryCard {...defaultProps} />);
    const linkElement = screen.getByRole("link", { name: /test-repo/ });
    expect(linkElement).toHaveAccessibleName("test-repo");
    expect(linkElement).toBeVisible();
  });
});
