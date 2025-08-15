import { Link } from "react-router-dom";
import styles from "./styles/UserCard.module.css";

/**
 * UserCard Component
 *
 * Displays a user's avatar and username inside a clickable card.
 * Clicking the card navigates to the user's detailed page.
 *
 * @param {Object} user - The user object containing provider, username, and avatar.
 */
const UserCard = ({ user }) => {
  return (
    // Link to the user's page using React Router
    <Link
      to={`/user/${user.provider}/${user.username}`}
      className={styles.card}
    >
      {/* User avatar */}
      <img src={user.avatar} alt={user.username} className={styles.avatar} />

      {/* Display username */}
      <p className={styles.username}>{user.username}</p>
    </Link>
  );
};

export default UserCard;
