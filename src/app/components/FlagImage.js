import styles from "../styles/page.module.css";

export default function FlagImage({ flag, name }) {
  return (
    <div className={styles.flagImageWrapper}>
      <img src={flag} alt={`Flag of ${name}`} className={styles.flagImage} />
    </div>
  );
}
