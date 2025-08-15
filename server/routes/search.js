const express = require("express");
const router = express.Router();
const { searchUsers: searchGithubUsers } = require("../services/github");
const { searchUsers: searchGitlabUsers } = require("../services/gitlab");

// Unified search endpoint for GitHub and GitLab users
router.get("/", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: "Query parameter 'q' is required" });
  }
  try {
    // Search GitHub users
    const githubUsers = (await searchGithubUsers(q)).map((user) => ({
      provider: "github",
      username: user.login,
      avatar: user.avatar_url,
      url: user.html_url,
    }));
    // Search GitLab users
    const gitlabUsers = (await searchGitlabUsers(q)).map((user) => ({
      provider: "gitlab",
      username: user.username,
      avatar: user.avatar_url,
      url: user.web_url,
    }));
    // Combine and return results
    const results = [...githubUsers, ...gitlabUsers];
    res.json({ results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
