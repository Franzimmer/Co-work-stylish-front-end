import femaleIdle from './female_idle.svg';
import female_paper from './female_paper.svg';
import female_rock from './female_rock.svg';
import female_scissors from './female_scissors.svg';
import male_paper from './male_paper.svg';
import male_rock from './male_rock.svg';
import male_scissors from './male_scissors.svg';
import maleIdle from './male_idle.svg';
import rock_icon from './rock_icon.svg';
import paper_icon from './paper_icon.svg';
import scissors_icon from './scissors_icon.svg';
import random_icon from './random_icon.svg';
import { motion } from 'framer-motion';
import { React, useEffect, useState } from 'react';
import './game.css';
import api from '../../../utils/api';
import styled from 'styled-components';
import ad1 from './ad_demo1.mp4';
import ad2 from './ad_demo2.mp4';
import ad3 from './ad_demo3.mp4';
const AdWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const AdPlayer = styled.video`
  position: absolute;
  z-index: 102;
  background-color: #000;
  top: 150px;
  width: 80vw;
  height: 45vw;
`;
const Ad = styled.source``;
const AdCloseBtn = styled.div`
  line-height: 40px;
  text-align: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  z-index: 101;
  position: absolute;
  top: 50px;
  right: 20px;
  color: #000;
  background-color: #ddd;
  font-weight: 500;
  font-size: 30px;
`;

function Game({ setGameProgress, userId, jwtToken, setShowMask }) {
  const [userChoice, setUserChoice] = useState(maleIdle);
  const [computerChoice, setComputerChoice] = useState(femaleIdle);
  const [maleImg, setMaleImg] = useState(maleIdle);
  const [femaleImg, setFemaleImg] = useState(femaleIdle);
  const [result, setResult] = useState("Let's see who wins");
  const [gameOver, setGameOver] = useState(false);
  const [splash, setSplash] = useState(false);
  const choices = ['rock', 'paper', 'scissors'];
  const [chance, setChance] = useState(3);
  const [showAd, setShowAd] = useState(false);
  const [adSource, setAdSource] = useState();
  const [showAdCloseBtn, setShowAdCloseBtn] = useState(false);
  const handleClick = (value) => {
    setUserChoice(value);
    generateComputerChoice();
    if (value === 'scissors') {
      setMaleImg(male_scissors);
    } else if (value === 'rock') {
      setMaleImg(male_rock);
    } else {
      setMaleImg(male_paper);
    }
  };

  const randomClick = () => {
    const randomClick = choices[Math.floor(Math.random() * choices.length)];
    setUserChoice(randomClick);
    generateComputerChoice();
    if (randomClick === 'scissors') {
      setMaleImg(male_scissors);
    } else if (randomClick === 'rock') {
      setMaleImg(male_rock);
    } else {
      setMaleImg(male_paper);
    }
  };

  const randomChoice = choices[Math.floor(Math.random() * choices.length)];
  const generateComputerChoice = () => {
    setComputerChoice(randomChoice);
    if (randomChoice === 'scissors') {
      setFemaleImg(female_scissors);
    } else if (randomChoice === 'rock') {
      setFemaleImg(female_rock);
    } else {
      setFemaleImg(female_paper);
    }
  };
  function closeAd() {
    setShowMask(false);
    setShowAd(false);
    setAdSource();
    setSplash(false);
    setResult();
    setGameOver(false);
  }
  function playAd() {
    setShowMask(true);
    setShowAd(true);
    setAdSource(Math.floor(Math.random() * 3 + 1));
    setTimeout(() => setShowAdCloseBtn(true), 8000);
  }
  useEffect(() => {
    const comboMoves = userChoice + computerChoice;
    async function updateGame() {
      const { data } = await api.updateGameStatus(userId, jwtToken);
      setGameProgress(data.progress);
    }

    if (comboMoves === 'scissorspaper' || comboMoves === 'rockscissors' || comboMoves === 'paperrock') {
      setResult('You Win');
      const gameOff = true;
      setTimeout(() => {
        setGameOver(gameOff);
      }, 1000);
      setTimeout(() => {
        updateGame();
      }, 2000);
    }
    if (comboMoves === 'paperscissors' || comboMoves === 'scissorsrock' || comboMoves === 'rockpaper') {
      setChance(chance - 1);
      if (chance === 0) {
        setResult('You Lose');
        const gameOff = true;
        setTimeout(() => {
          setGameOver(gameOff);
          playAd();
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
                        ease: 'easeOut',
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
                      transition={{ ease: 'easeOut', duration: 0.5 }}
                      initial={{ x: 100, y: 0, rotate: -90 }}
                      animate={{ x: 0, y: 0, rotate: -90 }}
                    />
                  </div>
                </div>
                <div className="ui">
                  <div className="ui-box">
                    <img src={rock_icon} alt="" className="rock_icon" onClick={() => handleClick(choices[0])} />
                    <img src={paper_icon} alt="" className="paper_icon" onClick={() => handleClick(choices[1])} />
                    <img src={scissors_icon} alt="" className="scissors_icon" onClick={() => handleClick(choices[2])} />
                    <img src={random_icon} alt="" className="random_icon" onClick={() => randomClick()} />
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
              {result === 'You Win' ? (
                <>
                  <motion.img
                    src={result === 'You Win'}
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
                    src={result === 'You Lose'}
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
        <motion.div className="splash" initial={{ y: 1000 }} transition={{ duration: 1 }} animate={{ y: 0 }}>
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
      {showAd && (
        <AdWrapper>
          {showAdCloseBtn && <AdCloseBtn onClick={closeAd}>X</AdCloseBtn>}
          <AdPlayer autoPlay={true} loop={true}>
            {adSource === 1 && <Ad src={ad1} type="video/mp4" />}
            {adSource === 2 && <Ad src={ad2} type="video/mp4" />}
            {adSource === 3 && <Ad src={ad3} type="video/mp4" />}
          </AdPlayer>
        </AdWrapper>
      )}
    </>
  );
}

export default Game;
