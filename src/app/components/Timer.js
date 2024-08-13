import styles from "../styles/page.module.css";

export default function Timer({ timeLeft }) {
  return (
    <h3>Tiempo restante: {timeLeft}s</h3>
  );
}
