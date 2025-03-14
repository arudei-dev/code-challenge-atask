import { expect, test, describe } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import CollapsibleCard from "../CollapsibleCard";

describe("CollapsibleCard", () => {
  test("renders header title", () => {
    render(<CollapsibleCard headerTitle="Test Title">Content</CollapsibleCard>);
    const header = screen.getByText("Test Title");
    expect(header).toBeInTheDocument();
  });

  test("renders content when expanded", () => {
    render(<CollapsibleCard headerTitle="Title">Test Content</CollapsibleCard>);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const content = screen.getByText("Test Content");
    expect(content).toBeInTheDocument();
  });

  test("does not render content when collapsed", () => {
    render(<CollapsibleCard headerTitle="Title">Test Content</CollapsibleCard>);
    const content = screen.queryByText("Test Content");
    expect(content).toBeNull();
  });

  test("toggles content visibility on button click", () => {
    render(<CollapsibleCard headerTitle="Title">Test Content</CollapsibleCard>);
    const button = screen.getByRole("button");

    // Initially collapsed
    let content = screen.queryByText("Test Content");
    expect(content).toBeNull();

    // Expand
    fireEvent.click(button);
    content = screen.getByText("Test Content");
    expect(content).toBeInTheDocument();

    // Collapse
    fireEvent.click(button);
    content = screen.queryByText("Test Content");
    expect(content).toBeNull();
  });

  test("renders the button", () => {
    render(<CollapsibleCard headerTitle="Title">Content</CollapsibleCard>);
    const element = screen.getByRole("button");
    expect(element).toBeDefined();
  });
});
