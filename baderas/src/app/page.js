"use client";

import styles from "./page.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [banderas, setBanderas] = useState([]);
  const [selectedFlag, setSelectedFlag] = useState(null);
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [points, setPoints] = useState(0);

  console.log("la bandera es, ", selectedFlag);

  useEffect(() => {
    axios.get("https://countriesnow.space/api/v0.1/countries/flag/images").then((response) => {
      setBanderas(response.data.data);
      selectRandomFlag(response.data.data);
    });
  }, []);

  const selectRandomFlag = (flags) => {
    if (flags.length === 0) return;
    const randomIndex = Math.floor(Math.random() * flags.length);
    setSelectedFlag(flags[randomIndex]);
    //console.log("la bandera es, ", selectedFlag);
    setFeedback('');
  };

  const handleGuess = () => {
    if (!selectedFlag) return;

    if (userGuess.toLowerCase() === selectedFlag.name.toLowerCase()) {
      setPoints(prevPoints => prevPoints + 10);
      setFeedback('¡Correcto! Has ganado puntos.');
    } else {
      setPoints(prevPoints => prevPoints - 1);
      setFeedback(`Incorrecto. La respuesta correcta era ${selectedFlag.name}.`);
    }
    setUserGuess('');
    setTimeout(() => {
      if (banderas.length > 0) {
        selectRandomFlag(banderas);
      } else {
        setFeedback('No hay más banderas disponibles.');
        setSelectedFlag(null);
      }
    }, 2000);
  };

  return (
    <main className={styles.main}>
      {selectedFlag ? (
        <div className={styles.gameContainer}>
          <div className={styles.flagImageWrapper}>
            <img src={selectedFlag.flag} alt={`Flag of ${selectedFlag.name}`} className={styles.flagImage} />
          </div>
          <div className={styles.guessContainer}>
            <input
              type="text"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              placeholder="Escribe el nombre del país"
              className={styles.guessInput}
            />
            <button onClick={handleGuess} className={styles.guessButton}>Adivinar</button>
          </div>
          <h2>Puntos: {points}</h2>
          {feedback && <p className={styles.feedback}>{feedback}</p>}
        </div>
      ) : null}
    </main>
  );
}
