const axios = require("axios");

// Axios instance for GitLab API
const axiosInstance = axios.create({
  baseURL: "https://gitlab.com/api/v4",
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${process.env.GITLAB_API_TOKEN}`,
  },
});

/**
 * Search GitLab users by query.
 * Returns an array of user objects.
 */
const searchUsers = async (query) => {
  try {
    const response = await axiosInstance.get("/users", {
      params: { search: query, per_page: 5 },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching users on GitLab:", error.message);
    return [];
  }
};

/**
 * Fetch GitLab user details by username.
 * Returns user profile data.
 */
const getUser = async (username) => {
  try {
    const response = await axiosInstance.get("/users", {
      params: { username },
    });
    if (!response.data || response.data.length === 0) {
      throw new Error("User not found");
    }
    return response.data[0];
  } catch (error) {
    console.error(
      `Error fetching user ${username} from GitLab:`,
      error.message
    );
    throw error;
  }
};

/**
 * Fetch repositories for a GitLab user.
 * Returns an array of repository objects.
 */
const getUserRepos = async (username) => {
  try {
    const response = await axiosInstance.get(
      `/users/${encodeURIComponent(username)}/projects`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching repos for user ${username} from GitLab:`,
      error.message
    );
    throw error;
  }
};

/**
 * Fetch GitLab repository details by project ID.
 * Returns repository data.
 */
const getRepo = async (projectId) => {
  try {
    const response = await axiosInstance.get(
      `/projects/${encodeURIComponent(projectId)}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching repo ${projectId} from GitLab:`,
      error.message
    );
    throw error;
  }
};

/**
 * Fetch the last 5 commits for a GitLab repository.
 * Returns an array of commit objects.
 */
const getRepoCommits = async (projectId) => {
  try {
    const response = await axiosInstance.get(
      `/projects/${encodeURIComponent(projectId)}/repository/commits`,
      {
        params: { per_page: 5 },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching commits for repo ${projectId} from GitLab:`,
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
