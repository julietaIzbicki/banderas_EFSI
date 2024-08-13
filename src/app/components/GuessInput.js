import styles from "../styles/page.module.css";

export default function GuessInput({ userGuess, onChange, onGuess }) {
  return (
    <div className={styles.guessContainer}>
      <input
        type="text"
        value={userGuess}
        onChange={onChange}
        placeholder="Escribe el nombre del país"
        className={styles.guessInput}
      />
      <button onClick={onGuess} className={styles.guessButton}>Adivinar</button>
    </div>
  );
}
