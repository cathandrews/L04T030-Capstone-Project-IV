import { useState } from "react";
import styles from "./styles/SearchBar.module.css";

/**
 * SearchBar Component
 *
 * A reusable search input component that allows users to enter a search query.
 * When the form is submitted, it calls the `onSearch` function with the current query.
 *
 * @param {Function} onSearch - Callback function to handle the search query.
 */
const SearchBar = ({ onSearch }) => {
  // Local state to store the current input value
  const [query, setQuery] = useState("");

  /**
   * Handle form submission
   * Prevents default form behavior and calls the onSearch callback
   * with the current query value
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* Input field bound to the query state */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users..."
        className={styles.input}
      />
      {/* Submit button triggers handleSubmit */}
      <button type="submit" className={styles.button}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
