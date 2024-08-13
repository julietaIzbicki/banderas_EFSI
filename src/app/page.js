"use client";

import styles from "../app/styles/page.module.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import FlagImage from "./components/FlagImage";
import GuessInput from "./components/GuessInput";
import Timer from "./components/Timer";
import Feedback from "./components/Feedback";

export default function Home() {
  const [banderas, setBanderas] = useState([]);
  const [selectedFlag, setSelectedFlag] = useState(null);
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [points, setPoints] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const timerRef = useRef(null);

  useEffect(() => {
    axios.get("https://countriesnow.space/api/v0.1/countries/flag/images").then((response) => {
      setBanderas(response.data.data);
      selectRandomFlag(response.data.data);
    });
  }, []);

  const selectRandomFlag = (flags) => {
    if (flags.length === 0) return;
    const random = Math.floor(Math.random() * flags.length);
    const flag = flags[random];
    setSelectedFlag(flag);
    setFeedback('');
    resetTimer();
  };

  const handleGuess = () => {
    if (!selectedFlag) return;

    if (userGuess.toLowerCase() === selectedFlag.name.toLowerCase()) {
      setPoints(prevPoints => prevPoints + 10 + timeLeft);
      setFeedback('Correcto! Has ganado puntos');
    } else {
      setPoints(prevPoints => prevPoints - 1);
      setFeedback(`Incorrecto. La respuesta correcta era ${selectedFlag.name}`);
    }
    setUserGuess('');
    setTimeout(() => {
      if (banderas.length > 0) {
        selectRandomFlag(banderas);
      } else {
        setFeedback('No hay más banderas disponibles');
        setSelectedFlag(null);
      }
    }, 2000);
  };

  const resetTimer = () => {
    setTimeLeft(15);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          setFeedback(`Se termino el tiempo :( `);
          setPoints(prevPoints => prevPoints - 1);
          setTimeout(() => {
            if (banderas.length > 0) {
              selectRandomFlag(banderas);
            } else {
              setFeedback('No hay más banderas disponibles!! Ganaste el juego :)');
              setSelectedFlag(null);
            }
          }, 2000);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (selectedFlag) {
      console.log("Bandera actual en pantalla:", selectedFlag);
    }
  }, [selectedFlag]);

  return (
    <main className={styles.main}>
      <header className={styles.topBar}>
        <h2 className={styles.title}>Adivina la Bandera</h2>
      </header>
      {selectedFlag ? (
        <div className={styles.gameContainer}>
          <FlagImage flag={selectedFlag.flag} name={selectedFlag.name} />
          <GuessInput userGuess={userGuess} onChange={(e) => setUserGuess(e.target.value)} onGuess={handleGuess} />
          <h2>Puntos: {points}</h2>
          <Timer timeLeft={timeLeft} />
          <Feedback feedback={feedback} />
        </div>
      ) : null}
    </main>
  );
}
