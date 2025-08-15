// Import supertest to make HTTP requests to our Express app without running a real server
const request = require("supertest");

// Import the Express app instance
const app = require("../index");

// Mock the GitHub service to prevent real API calls during tests
// searchUsers resolves with a single fake GitHub user
jest.mock("../services/github", () => ({
  searchUsers: jest
    .fn()
    .mockResolvedValue([{ login: "octocat", avatar_url: "x", html_url: "y" }]),
}));

// Mock the GitLab service to prevent real API calls during tests
// searchUsers resolves with a single fake GitLab user
jest.mock("../services/gitlab", () => ({
  searchUsers: jest
    .fn()
    .mockResolvedValue([
      { username: "gitlabuser", avatar_url: "a", web_url: "b" },
    ]),
}));

// Test Suite for /api/search Endpoint

describe("GET /api/search", () => {
  // Reset all mock function calls before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Ensure the API returns combined results from GitHub and GitLab
  it("returns combined results from GitHub and GitLab", async () => {
    // Make a GET request to /api/search?q=cat
    const res = await request(app).get("/api/search").query({ q: "cat" });

    // Validate HTTP response status
    expect(res.statusCode).toBe(200);

    // Check that results property exists
    expect(res.body.results).toBeDefined();

    // Ensure we get exactly 2 results (1 from GitHub, 1 from GitLab)
    expect(res.body.results.length).toBe(2);

    // Find the GitHub result in the combined array
    const githubUser = res.body.results.find(
      (user) => user.provider === "github"
    );
    // Find the GitLab result in the combined array
    const gitlabUser = res.body.results.find(
      (user) => user.provider === "gitlab"
    );

    // Validate that both GitHub and GitLab users exist in the response
    expect(githubUser).toBeDefined();
    expect(gitlabUser).toBeDefined();
  });

  // Test 2: Ensure the API returns 400 Bad Request when query parameter is missing
  it("returns 400 if query parameter is missing", async () => {
    // Make a GET request without a query parameter
    const res = await request(app).get("/api/search");

    // Validate HTTP response status
    expect(res.statusCode).toBe(400);

    // Validate error message returned in the response body
    expect(res.body.error).toBe("Query parameter 'q' is required");
  });
});
