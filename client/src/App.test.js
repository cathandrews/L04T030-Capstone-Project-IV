import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  /**
   * Test 1: Check if the app title is rendered.
   *
   * Uses a regex search to find the title text regardless of case.
   */
  it("renders the app title", () => {
    render(<App />);
    const titleElement = screen.getByText(/GitHub and GitLab Search App/i);
    expect(titleElement).toBeInTheDocument();
  });

  /**
   * Test 2: Check if the search form is rendered.
   *
   * We find the input by its placeholder text.
   * We find the submit button using getByRole with the name option
   * to avoid conflicts with other elements that contain "Search".
   */
  it("renders the search form", () => {
    render(<App />);

    // Check that the search input exists
    const searchInput = screen.getByPlaceholderText(/Search users.../i);
    expect(searchInput).toBeInTheDocument();

    // Check that the search button exists (targets only the button)
    const searchButton = screen.getByRole("button", { name: /Search/i });
    expect(searchButton).toBeInTheDocument();
  });

  /**
   * Test 3: Check if the results columns are rendered.
   *
   * The column headings for GitHub and GitLab are h2 elements.
   * We use getByRole with level: 2 to target the correct heading,
   * avoiding matches with the main app title (h1) which also contains "GitHub/GitLab".
   */
  it("renders the results columns", () => {
    render(<App />);

    // Check that the GitHub column heading exists
    const githubColumn = screen.getByRole("heading", {
      level: 2,
      name: /GitHub/i,
    });
    expect(githubColumn).toBeInTheDocument();

    // Check that the GitLab column heading exists
    const gitlabColumn = screen.getByRole("heading", {
      level: 2,
      name: /GitLab/i,
    });
    expect(gitlabColumn).toBeInTheDocument();
  });
});
