/**
 * Main server entry point.
 * Sets up Express, middleware, routes, and starts the server.
 */
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
const searchRoutes = require("./routes/search");
const githubRoutes = require("./routes/github");
const gitlabRoutes = require("./routes/gitlab");

app.use("/api/search", searchRoutes);
app.use("/api/github", githubRoutes);
app.use("/api/gitlab", gitlabRoutes);

// Production setup
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

// Start server only if not in test environment
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the app for testing
module.exports = app;
