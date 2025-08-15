// Import supertest to make HTTP requests to our Express app
const request = require("supertest");

// Import the Express app instance
const app = require("../index");

// Mock the entire services/github module to avoid real API calls during tests
jest.mock("../services/github", () => ({
  // Mock axios instance for any internal HTTP calls
  axiosInstance: {
    get: jest.fn(),
  },

  // Mock function for searching GitHub users
  // Resolves with an array of 5 fake user objects
  searchUsers: jest.fn().mockResolvedValue([
    { login: "user1", avatar_url: "url1", html_url: "url1" },
    { login: "user2", avatar_url: "url2", html_url: "url2" },
    { login: "user3", avatar_url: "url3", html_url: "url3" },
    { login: "user4", avatar_url: "url4", html_url: "url4" },
    { login: "user5", avatar_url: "url5", html_url: "url5" },
  ]),

  // Mock function for fetching a single GitHub user
  // Resolves with a fake user object
  getUser: jest.fn().mockResolvedValue({
    login: "testuser",
    avatar_url: "avatar_url",
    html_url: "html_url",
    name: "Test User",
    bio: "Test Bio",
  }),

  // Mock function for fetching repository details
  getRepo: jest.fn().mockResolvedValue({
    name: "test-repo",
    description: "Test repository",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-02T00:00:00Z",
  }),

  // Mock function for fetching the last 5 commits of a repository
  getRepoCommits: jest.fn().mockResolvedValue([
    {
      sha: "abc123",
      commit: {
        message: "First commit",
        author: { date: "2023-01-01T00:00:00Z" },
      },
    },
    {
      sha: "def456",
      commit: {
        message: "Second commit",
        author: { date: "2023-01-02T00:00:00Z" },
      },
    },
    {
      sha: "ghi789",
      commit: {
        message: "Third commit",
        author: { date: "2023-01-03T00:00:00Z" },
      },
    },
    {
      sha: "jkl012",
      commit: {
        message: "Fourth commit",
        author: { date: "2023-01-04T00:00:00Z" },
      },
    },
    {
      sha: "mno345",
      commit: {
        message: "Fifth commit",
        author: { date: "2023-01-05T00:00:00Z" },
      },
    },
  ]),
}));

// Test suite for GitHub API service
describe("GitHub API Service", () => {
  // Import the mocked functions for easier access
  const {
    searchUsers,
    getUser,
    getRepo,
    getRepoCommits,
  } = require("../services/github");

  // Reset all mock call counts before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Ensure the searchUsers function returns 5 users
  it("should return 5 users for a valid query", async () => {
    const users = await searchUsers("test");
    expect(users.length).toBe(5);
  });

  // Test 2: Ensure the API endpoint returns user details correctly
  it("should fetch user details", async () => {
    const response = await request(app).get("/api/github/users/testuser");
    expect(response.status).toBe(200);
    expect(response.body.username).toBe("testuser");
    expect(response.body.avatar_url).toBe("avatar_url");
  });

  // Test 3: Ensure the getRepo function fetches repository details correctly
  it("should fetch repository details", async () => {
    const repo = await getRepo("testuser", "test-repo");
    expect(repo.name).toBe("test-repo");
    expect(repo.description).toBe("Test repository");
  });

  // Test 4: Ensure the getRepoCommits function returns the last 5 commits
  it("should fetch the last 5 commits for a repository", async () => {
    const commits = await getRepoCommits("testuser", "test-repo");
    expect(commits.length).toBe(5);
  });
});
