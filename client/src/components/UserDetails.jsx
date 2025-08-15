import React from "react";
import styles from "./styles/UserDetails.module.css";

/**
 * UserDetails Component
 *
 * Displays detailed information about a user, including:
 * - Avatar
 * - Username
 * - Bio
 * - Link to the user's GitHub or GitLab profile
 * - List of repositories with clickable links
 *
 * @param {Object} user - User object containing avatar_url, username, bio, html_url/web_url
 * @param {Array} repos - Array of repository objects for the user
 * @param {string} provider - Either 'github' or 'gitlab' to customize styling
 */
const UserDetails = ({ user, repos, provider }) => {
  return (
    <div className={styles.container}>
      {/* User avatar */}
      <img
        src={user.avatar_url}
        alt={user.username}
        className={styles.avatar}
      />

      {/* Username */}
      <h2>{user.username}</h2>

      {/* User bio */}
      <p>{user.bio}</p>

      {/* Link to user's profile on the correct platform */}
      <a
        href={user.html_url || user.web_url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: provider === "github" ? "#333" : "#fc6d26" }}
      >
        View {provider} Profile
      </a>

      {/* Repositories list */}
      <h3>Repositories:</h3>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetails;
