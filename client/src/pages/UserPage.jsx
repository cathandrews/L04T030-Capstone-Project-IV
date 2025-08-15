import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles/UserPage.module.css";

/**
 * UserPage component: Shows user profile, list of repositories, and selected repository details with commits.
 */
const UserPage = () => {
  const { provider, username } = useParams();

  // State for user, repos, selected repo, commits, and loading status
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Fetch user info and 5 repositories on component mount
   */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/${provider}/users/${username}`
        );
        const data = await response.json();
        setUser(data);

        const reposResponse = await fetch(
          `http://localhost:5000/api/${provider}/users/${username}/repos`
        );
        const reposData = await reposResponse.json();
        setRepos(reposData.slice(0, 5)); 
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [provider, username]);

  /**
   * Fetch details and commits for a selected repository
   */
  const fetchRepoDetails = async (repo) => {
    try {
      let repoResponse, commitsResponse;

      if (provider === "github") {
        repoResponse = await fetch(
          `http://localhost:5000/api/${provider}/repos/${username}/${repo.name}`
        );
        commitsResponse = await fetch(
          `http://localhost:5000/api/${provider}/repos/${username}/${repo.name}/commits`
        );
      } else if (provider === "gitlab") {
        repoResponse = await fetch(
          `http://localhost:5000/api/${provider}/repos/${repo.id}`
        );
        commitsResponse = await fetch(
          `http://localhost:5000/api/${provider}/repos/${repo.id}/commits`
        );
      }

      const repoData = await repoResponse.json();
      const commitsData = await commitsResponse.json();

      setSelectedRepo(repoData);
      setCommits(commitsData);
    } catch (error) {
      console.error("Error fetching repo details:", error);
    }
  };

  // Show loading or user not found messages
  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className={`${styles.container} ${provider}`}>
      {/* User profile section */}
      <div className={styles.userInfo}>
        <img
          src={user.avatar_url}
          alt={user.username}
          className={styles.avatar}
        />
        <h2>{user.username}</h2>
        <p>{user.bio}</p>
        <a
          href={user.html_url || user.web_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: provider === "github" ? "#333" : "#fc6d26" }}
        >
          View {provider} Profile
        </a>
      </div>

      {/* Repositories list */}
      <div className={styles.repos}>
        <h3>Repositories:</h3>
        <ul>
          {repos.map((repo) => (
            <li key={repo.id || repo.name}>
              <button onClick={() => fetchRepoDetails(repo)}>
                {repo.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Selected repository details and last 5 commits */}
      {selectedRepo && (
        <div className={styles.repoDetails}>
          <h3>{selectedRepo.name}</h3>
          <p>{selectedRepo.description}</p>
          <p>
            Created:{" "}
            {new Date(
              selectedRepo.created_at || selectedRepo.created_at
            ).toLocaleDateString()}
          </p>
          <p>
            Last updated:{" "}
            {new Date(
              selectedRepo.updated_at || selectedRepo.last_activity_at
            ).toLocaleDateString()}
          </p>

          <h4>Last 5 Commits:</h4>
          <ul>
            {commits.map((commit) => (
              <li key={commit.sha || commit.id}>
                <p>{commit.commit ? commit.commit.message : commit.message}</p>
                <small>
                  Committed on:{" "}
                  {new Date(
                    commit.commit
                      ? commit.commit.author.date
                      : commit.committed_date
                  ).toLocaleDateString()}
                </small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserPage;
