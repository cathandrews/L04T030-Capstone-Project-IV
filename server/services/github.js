const axios = require("axios");

// Axios instance for GitHub API
const axiosInstance = axios.create({
  baseURL: "https://api.github.com",
  timeout: 5000,
  headers: {
    Accept: "application/vnd.github.v3+json",
    Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
  },
});

/**
 * Search GitHub users by query.
 * Returns an array of the first 5 user objects.
 */
const searchUsers = async (query) => {
  try {
    const response = await axiosInstance.get("/search/users", {
      params: { q: query, per_page: 5 },
    });
    return response.data.items.slice(0, 5);
  } catch (error) {
    console.error("Error searching users on GitHub:", error.message);
    return [];
  }
};

/**
 * Fetch GitHub user details by username.
 * Returns user profile data.
 */
const getUser = async (username) => {
  try {
    const response = await axiosInstance.get(
      `/users/${encodeURIComponent(username)}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching user ${username} from GitHub:`,
      error.message
    );
    throw error;
  }
};

/**
 * Fetch repositories for a GitHub user.
 * Returns an array of repository objects.
 */
const getUserRepos = async (username) => {
  try {
    const response = await axiosInstance.get(
      `/users/${encodeURIComponent(username)}/repos`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching repos for user ${username} from GitHub:`,
      error.message
    );
    throw error;
  }
};

/**
 * Fetch GitHub repository details by owner and repo name.
 * Returns repository data.
 */
const getRepo = async (owner, repo) => {
  try {
    const response = await axiosInstance.get(
      `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching repo ${owner}/${repo} from GitHub:`,
      error.message
    );
    throw error;
  }
};

/**
 * Fetch the last 5 commits for a GitHub repository.
 * Returns an array of commit objects.
 */
const getRepoCommits = async (owner, repo) => {
  try {
    const response = await axiosInstance.get(
      `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/commits`,
      { params: { per_page: 5 } }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching commits for ${owner}/${repo} from GitHub:`,
      error.message
    );
    throw error;
  }
};

// Export axiosInstance for testing
module.exports = {
  axiosInstance,
  searchUsers,
  getUser,
  getUserRepos,
  getRepo,
  getRepoCommits,
};
