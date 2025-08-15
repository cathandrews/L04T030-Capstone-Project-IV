const express = require("express");
const router = express.Router();
const {
  getUser,
  getUserRepos,
  getRepo,
  getRepoCommits,
} = require("../services/gitlab");

// Fetch GitLab user details by username
router.get("/users/:username", async (req, res) => {
  try {
    const data = await getUser(req.params.username);
    res.json({
      provider: "gitlab",
      username: data.username,
      avatar_url: data.avatar_url,
      web_url: data.web_url,
      name: data.name,
      bio: data.bio,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch GitLab user repositories
router.get("/users/:username/repos", async (req, res) => {
  try {
    const repos = await getUserRepos(req.params.username);
    res.json(repos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch GitLab repository details by project ID
router.get("/repos/:projectId", async (req, res) => {
  try {
    const data = await getRepo(req.params.projectId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch last 5 commits for a GitLab repository
router.get("/repos/:projectId/commits", async (req, res) => {
  try {
    const commits = await getRepoCommits(req.params.projectId);
    res.json(commits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
