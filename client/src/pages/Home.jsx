// Import React's useState hook to manage component state
import { useState } from "react";

// Import components
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import styles from "./styles/Home.module.css";

// Home component: main page for the GitHub and GitLab search app
const Home = () => {
  // State to store search results separately for GitHub and GitLab
  const [results, setResults] = useState({ github: [], gitlab: [] });

  // State to indicate whether a search is currently loading
  const [loading, setLoading] = useState(false);

  // Function to handle search queries from the SearchBar component
  const handleSearch = async (query) => {
    // Set loading state to true while fetching data
    setLoading(true);
    try {
      // Call backend API with the search query
      const response = await fetch(
        `http://localhost:5000/api/search?q=${query}`
      );
      const data = await response.json();

      // Separate results into GitHub and GitLab arrays
      const githubResults = data.results.filter(
        (user) => user.provider === "github"
      );
      const gitlabResults = data.results.filter(
        (user) => user.provider === "gitlab"
      );

      // Update state with filtered results
      setResults({ github: githubResults, gitlab: gitlabResults });
    } catch (error) {
      // Log any errors to the console for debugging
      console.error("Search error:", error);
    } finally {
      // Reset loading state after API call completes
      setLoading(false);
    }
  };

  return (
    <div>
      {/* App title */}
      <h1 className={styles.heading}>GitHub and GitLab Search App</h1>

      {/* Search bar component, passing handleSearch as a prop */}
      <SearchBar onSearch={handleSearch} />

      {/* Conditional rendering: show loading text while fetching results */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        // Display results in two columns for GitHub and GitLab
        <div className={styles.resultsContainer}>
          <div className={styles.column}>
            <h2 style={{ color: "#333" }}>GitHub</h2>
            {/* Map over GitHub results and render a UserCard for each */}
            {results.github.map((user) => (
              <UserCard key={user.username} user={user} />
            ))}
          </div>
          <div className={styles.column}>
            <h2 style={{ color: "#fc6d26" }}>GitLab</h2>
            {/* Map over GitLab results and render a UserCard for each */}
            {results.gitlab.map((user) => (
              <UserCard key={user.username} user={user} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Export Home component for use in routing
export default Home;
