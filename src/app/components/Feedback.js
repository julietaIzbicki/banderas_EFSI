import styles from "../styles/page.module.css";

export default function Feedback({ feedback }) {
  return feedback ? <p className={styles.feedback}>{feedback}</p> : null;
}
