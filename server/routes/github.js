const express = require("express");
const router = express.Router();
const {
  getUser,
  getRepo,
  getUserRepos,
  getRepoCommits,
} = require("../services/github");

// Fetch GitHub user details by username
router.get("/users/:username", async (req, res) => {
  try {
    const data = await getUser(req.params.username);
    res.json({
      provider: "github",
      username: data.login,
      avatar_url: data.avatar_url,
      html_url: data.html_url,
      name: data.name,
      bio: data.bio,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch GitHub user repositories
router.get("/users/:username/repos", async (req, res) => {
  try {
    const repos = await getUserRepos(req.params.username);
    res.json(repos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch GitHub repository details
router.get("/repos/:owner/:repo", async (req, res) => {
  try {
    const data = await getRepo(req.params.owner, req.params.repo);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch last 5 commits for a GitHub repository
router.get("/repos/:owner/:repo/commits", async (req, res) => {
  try {
    const commits = await getRepoCommits(req.params.owner, req.params.repo);
    res.json(commits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
