import femaleIdle from "./female_idle.svg";
import female_paper from "./female_paper.svg";
import female_rock from "./female_rock.svg";
import female_scissors from "./female_scissors.svg";
import male_paper from "./male_paper.svg";
import male_rock from "./male_rock.svg";
import male_scissors from "./male_scissors.svg";
import maleIdle from "./male_idle.svg";
import rock_icon from "./rock_icon.svg";
import paper_icon from "./paper_icon.svg";
import scissors_icon from "./scissors_icon.svg";
import random_icon from "./random_icon.svg";
import restart from "./restart.svg";
import result_cpu from "./result_cpu.svg";
import result_user from "./result_user.svg";
import { motion } from "framer-motion";
import { React, useEffect, useState, useRef } from "react";
import "./game.css";
import ConfettiExplosion from "react-confetti-explosion";

function Game() {
  const [userChoice, setUserChoice] = useState(maleIdle);
  const [computerChoice, setComputerChoice] = useState(femaleIdle);
  const [maleImg, setMaleImg] = useState(maleIdle);
  const [femaleImg, setFemaleImg] = useState(femaleIdle);
  const [result, setResult] = useState("Let's see who wins");
  const [gameOver, setGameOver] = useState(false);
  const [splash, setSplash] = useState(false);
  const choices = ["rock", "paper", "scissors"];
  const [chance, setChance] = useState(3);

  const handleClick = (value) => {
    setUserChoice(value);
    generateComputerChoice();
    if (value === "scissors") {
      setMaleImg(male_scissors);
    } else if (value === "rock") {
      setMaleImg(male_rock);
    } else {
      setMaleImg(male_paper);
    }
  };

  const randomClick = () => {
    const randomClick = choices[Math.floor(Math.random() * choices.length)];
    setUserChoice(randomClick);
    generateComputerChoice();
    if (randomClick === "scissors") {
      setMaleImg(male_scissors);
    } else if (randomClick === "rock") {
      setMaleImg(male_rock);
    } else {
      setMaleImg(male_paper);
    }
  };

  const randomChoice = choices[Math.floor(Math.random() * choices.length)];
  const generateComputerChoice = () => {
    setComputerChoice(randomChoice);
    if (randomChoice === "scissors") {
      setFemaleImg(female_scissors);
    } else if (randomChoice === "rock") {
      setFemaleImg(female_rock);
    } else {
      setFemaleImg(female_paper);
    }
  };

  useEffect(() => {
    const comboMoves = userChoice + computerChoice;
    if (
      comboMoves === "scissorspaper" ||
      comboMoves === "rockscissors" ||
      comboMoves === "paperrock"
    ) {
      setResult("You Win");
      const gameOff = true;
      setTimeout(() => {
        setGameOver(gameOff);
      }, 1000);
    }

    if (
      comboMoves === "paperscissors" ||
      comboMoves === "scissorsrock" ||
      comboMoves === "rockpaper"
    ) {
      setChance(chance - 1);
      if (chance === 0) {
        setResult("You Lose");
        const gameOff = true;
        setTimeout(() => {
          setGameOver(gameOff);
        }, 1000);
      }
    }
  }, [computerChoice, userChoice]);
  return (
    <>
      {splash && (
        <div className="Game">
          {!gameOver && (
            <>
              <div className="game">
                <div className="wrapper">
                  <div className="top">
                    <motion.img
                      key={computerChoice}
                      src={femaleImg}
                      alt=""
                      transition={{
                        ease: "easeOut",
                        duration: 0.5,
                      }}
                      initial={{ x: -100, y: 0, rotate: -90 }}
                      animate={{ x: 0, y: 0, rotate: -90 }}
                    />
                  </div>
                  <div className="bottom">
                    <p className="userMsg">You</p>
                    <p className="userMsg">Chances left: {chance}</p>
                    <motion.img
                      src={maleImg}
                      key={userChoice}
                      alt=""
                      transition={{ ease: "easeOut", duration: 0.5 }}
                      initial={{ x: 100, y: 0, rotate: -90 }}
                      animate={{ x: 0, y: 0, rotate: -90 }}
                    />
                  </div>
                </div>
                <div className="ui">
                  <div className="ui-box">
                    <img
                      src={rock_icon}
                      alt=""
                      className="rock_icon"
                      onClick={() => handleClick(choices[0])}
                    />
                    <img
                      src={paper_icon}
                      alt=""
                      className="paper_icon"
                      onClick={() => handleClick(choices[1])}
                    />
                    <img
                      src={scissors_icon}
                      alt=""
                      className="scissors_icon"
                      onClick={() => handleClick(choices[2])}
                    />
                    <img
                      src={random_icon}
                      alt=""
                      className="random_icon"
                      onClick={() => randomClick()}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          {gameOver && (
            <motion.div
              className="result"
              animate={{ scale: 1.3 }}
              transition={{
                duration: 0.5,
              }}
            >
              {result === "You Win" ? (
                <>
                  <motion.img
                    src={result === "You Win"}
                    alt=""
                    animate={{
                      scale: [1, 1.5, 1.5, 1, 1],
                      rotate: [0, 0, 270, 270, 0],
                    }}
                    transition={{ duration: 1 }}
                  />
                  <p className="result-msg">{result}</p>
                </>
              ) : (
                <>
                  <motion.img
                    src={result === "You Lose"}
                    alt=""
                    animate={{
                      scale: [1, 1.5, 1.5, 1, 1],
                      rotate: [0, 0, 270, 270, 0],
                    }}
                    transition={{ duration: 1 }}
                  />
                  <p className="result-msg">{result}</p>
                </>
              )}
            </motion.div>
          )}
        </div>
      )}
      {!splash && (
        <motion.div
          className="splash"
          initial={{ y: 1000 }}
          transition={{ duration: 1 }}
          animate={{ y: 0 }}
        >
          <p className="title">每日遊戲</p>
          <motion.button
            onClick={() => {
              setSplash(true);
            }}
            animate={{
              rotate: [0, 0, 10, -10, 0],
            }}
            transition={{ repeat: Infinity, duration: 1.2, delay: 1 }}
          >
            Start
          </motion.button>
        </motion.div>
      )}
    </>
  );
}

export default Game;
