import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";

import CopyFooter from "../CopyFooter";

describe("CopyFooter", () => {
  it("renders the copyright text with the current year", () => {
    render(<CopyFooter />);
    const currentYear = new Date().getFullYear();
    const copyrightText = screen.getByText(
      `Design © ${currentYear} Aldey Wahyu Putra.`
    );

    expect(copyrightText).toBeInTheDocument();
  });

  it("renders the GitHub affiliation text", () => {
    render(<CopyFooter />);

    const affiliationText = screen.getByText(
      "GitHub and its affiliates are a brand of Microsoft."
    );

    expect(affiliationText).toBeInTheDocument();
  });

  it("renders the link to the author's GitHub profile", () => {
    render(<CopyFooter />);

    const linkElement = screen.getByRole("link", {
      name: /Design © \d{4} Aldey Wahyu Putra\./,
    });

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "//github.com/arudei-dev");
    expect(linkElement).toHaveAttribute("target", "_blank");
    expect(linkElement).toHaveAttribute("rel", "noreferrer,noopener");
  });

  it("renders with proper accessibility attributes", () => {
    render(<CopyFooter />);

    const linkElement = screen.getByRole("link", {
      name: /Design © \d{4} Aldey Wahyu Putra\./,
    });

    expect(linkElement).toHaveAccessibleName(
      `Design © ${new Date().getFullYear()} Aldey Wahyu Putra.`
    );
    expect(linkElement).toBeVisible();
  });
});
